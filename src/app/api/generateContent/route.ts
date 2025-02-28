// app/api/generateContent/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Generate content with Cohere using axios
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate', // Cohere's text generation endpoint
      {
        model: 'command-r-plus-08-2024', // Use the appropriate model
        prompt: `You are a social media assistant for athletes. Expand on the following post while maintaining the original tone and message:\n\n${prompt}`,
        max_tokens: 250, // Specify token limit
        temperature: 0.8, // Adjust temperature for creativity
        stop_sequences: [],
        return_likelihoods: 'NONE'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`, // Use your Cohere API key
        },
      }
    );

    // Extract the generated text from the axios response data
    const generatedText = response.data.generations[0].text;

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error('Error generating content:', error);
    
    // Provide more detailed error information
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
      return NextResponse.json({ 
        error: 'Failed to generate content', 
        details: error.response?.data || error.message 
      }, { status: error.response?.status || 500 });
    }
    
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}