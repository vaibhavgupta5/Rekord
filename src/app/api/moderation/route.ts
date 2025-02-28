// app/api/moderation/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const execPromise = promisify(exec);
const writeFilePromise = promisify(fs.writeFile);
const unlinkPromise = promisify(fs.unlink);

export async function GET(request) {
  try {
    // Configure axios with a baseURL
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 
                    process.env.VERCEL_URL || 
                    'http://localhost:3000';
    
    console.log(`Fetching posts from: ${baseURL}/api/fetch/allPosts`);
    
    const response = await axios.get(`${baseURL}/api/fetch/allPosts`);
    
    if (!response.data.success) {
      return NextResponse.json(
        { error: 'Failed to fetch posts' }, 
        { status: 404 }
      );
    }
    
    // Use posts from the response
    const posts = response.data.posts;
    
    if (!posts || !Array.isArray(posts)) {
      console.error('Invalid posts data received:', posts);
      return NextResponse.json(
        { error: 'Invalid posts data format received' }, 
        { status: 500 }
      );
    }
    
    console.log(`Retrieved ${posts.length} posts for moderation`);
    
    // Create a temporary JSON file to pass to Python script
    const tempFilePath = path.join(process.cwd(), 'tmp', `posts-${uuidv4()}.json`);
    
    // Ensure the tmp directory exists
    const tmpDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    
    // Write posts to the temporary file
    await writeFilePromise(tempFilePath, JSON.stringify(posts));
    
    // Path to the Python script - adjust if necessary
    const scriptPath = path.join(process.cwd(), 'python', 'content_moderator.py');
    
    // Run the Python script with the temporary file as input
    const { stdout, stderr } = await execPromise(`python ${scriptPath} ${tempFilePath}`);
    
    if (stderr) {
      console.error('Python script error:', stderr);
    }
    
    // Clean up the temporary file
    await unlinkPromise(tempFilePath);
    
    // Parse the Python script output
    let moderatedPosts;
    try {
      moderatedPosts = JSON.parse(stdout);
    } catch (parseError) {
      console.error('Error parsing Python output:', parseError);
      console.log('Raw output:', stdout);
      return NextResponse.json(
        { success: false, error: 'Failed to parse moderation results' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: moderatedPosts,
      message: "Content moderated using Pathway and Cohere API"
    });
    
  } catch (error) {
    console.error('Error processing moderation request:', error);
    
    // Provide a JavaScript fallback if Python execution fails
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || 
                      process.env.VERCEL_URL || 
                      'http://localhost:3000';
      
      const response = await axios.get(`${baseURL}/api/fetch/allPosts`);
      
      if (!response.data.success) {
        throw new Error('Failed to fetch posts for fallback moderation');
      }
      
      const posts = response.data.posts;
      
      // Simple JS-based moderation as fallback
      const moderatedPosts = posts.map(post => {
        const content = post.content?.toLowerCase() || "";
        
        // Simple keyword checking
        const inappropriateWords = [
          "fuck", "shit", "ass", "dick", "porn", "sex", 
          "hate", "kill", "murder", "die", "attack",
          "racist", "nazi", "terrorism"
        ];
        
        const isFlagged = inappropriateWords.some(word => content.includes(word));
        
        return {
          id: post.id,
          type: post.type || "post",
          content: post.content || post.caption || "",
          author_id: post.author_id || post.userId || "",
          created_at: post.created_at || post.createdAt || new Date().toISOString(),
          moderation_result: {
            flagged: isFlagged,
            message: isFlagged ? "Content may contain inappropriate language" : "Content appears safe",
            categories: isFlagged ? { inappropriate: true } : {}
          }
        };
      });
      
      return NextResponse.json({ 
        success: true, 
        data: moderatedPosts,
        message: "Fallback moderation performed in JavaScript (Python execution failed)"
      });
      
    } catch (fallbackError) {
      console.error('Fallback moderation also failed:', fallbackError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Server error', 
          message: `Original error: ${error.message}. Fallback error: ${fallbackError.message}` 
        }, 
        { status: 500 }
      );
    }
  }
}