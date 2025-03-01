import sys
import json
import pathway as pw
import cohere
import os
from dotenv import load_dotenv
import time
from datetime import datetime

load_dotenv()

cohere_api_key = os.getenv("COHERE_API_KEY", "3tcFn7pnKShxnPDFu0ZzgLf356fvpLAxKYGtmAqc")
if not cohere_api_key:
    print(json.dumps({"error": "Missing Cohere API key"}))
    sys.exit(1)

# Initialize Cohere client
co = cohere.Client(cohere_api_key)

def moderate_content(text):
    """Use Cohere API to moderate content"""
    if not text or len(text.strip()) == 0:
        return {
            "flagged": False,
            "message": "No content to moderate"
        }
    
    try:
        # Call Cohere's moderation API
        response = co.moderate(
            inputs=[text]
        )
        
        # Extract moderation results
        if response and response.results:
            mod_result = response.results[0]
            
            categories = {k: v for k, v in mod_result.flagged.items()}
            
            # Determine overall flag status
            is_flagged = any(categories.values())
            
            confidence_scores = {k: float(v) for k, v in mod_result.confidence_scores.items()}
            
            highest_risk = ""
            highest_score = 0
            
            for category, score in confidence_scores.items():
                if categories.get(category, False) and score > highest_score:
                    highest_score = score
                    highest_risk = category
            
            message = "Content appears safe" if not is_flagged else f"Content flagged for {highest_risk}"
            
            return {
                "flagged": is_flagged,
                "message": message,
                "categories": categories,
                "confidence_scores": confidence_scores
            }
        
        return {
            "flagged": False,
            "message": "Unable to analyze content",
            "error": "No results from moderation API"
        }
        
    except Exception as e:
        return {
            "flagged": False,
            "message": "Error during content moderation",
            "error": str(e)
        }

def process_content_with_pathway(posts_data):
    # Parse the input JSON
    try:
        posts = json.loads(posts_data)
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON: {str(e)}"}))
        sys.exit(1)
    
    # Define Pathway schema for posts
    class PostSchema(pw.Schema):
        id: str
        type: str  # "post" or "stride"
        content: str
        author_id: str
        created_at: str
    
    normalized_posts = []
    for post in posts:
        normalized_posts.append({
            "id": post.get("id", f"post-{len(normalized_posts)}"),
            "type": post.get("type", "post"),  # Default to "post" if not specified
            "content": post.get("caption", post.get("content", "")),  # Handle both caption and content fields
            "author_id": post.get("author_id", post.get("userId", "")),  # Handle different author ID fields
            "created_at": post.get("created_at", post.get("createdAt", datetime.now().isoformat()))  # Handle different timestamp fields
        })
    
    input_collection = pw.debug.table_from_pandas(
        pw.pandas.DataFrame(normalized_posts)
    )
    
 
    def moderate_batch(batch):
        results = []
        for content in batch:
            time.sleep(0.1)
            results.append(moderate_content(content))
        return results
    
    
    prepared_data = input_collection.select(
        id=pw.this.id,
        type=pw.this.type,
        content=pw.this.content,
        author_id=pw.this.author_id,
        created_at=pw.this.created_at
    )
    
    with_moderation = prepared_data.select(
        id=pw.this.id,
        type=pw.this.type,
        content=pw.this.content,
        author_id=pw.this.author_id,
        created_at=pw.this.created_at,
        moderation_result=pw.apply(moderate_content, pw.this.content)
    )
    
    results_with_severity = with_moderation.select(
        id=pw.this.id,
        type=pw.this.type,
        content=pw.this.content,
        author_id=pw.this.author_id,
        created_at=pw.this.created_at,
        moderation_result=pw.this.moderation_result,
        severity_score=pw.apply(
            lambda mod_result: sum(
                score * 100 for category, score in 
                mod_result.get("confidence_scores", {}).items() 
                if mod_result.get("categories", {}).get(category, False)
            ),
            pw.this.moderation_result
        )
    )
    
    final_results = results_with_severity.select(
        id=pw.this.id,
        type=pw.this.type,
        content=pw.this.content,
        author_id=pw.this.author_id,
        created_at=pw.this.created_at,
        moderation_result=pw.this.moderation_result,
        severity_score=pw.this.severity_score,
        processed_at=pw.apply(lambda _: datetime.now().isoformat(), pw.this.id)
    )
    
    result_dataframe = pw.debug.compute_and_fetch(final_results)
    
    output_results = []
    for _, row in result_dataframe.iterrows():
        # Convert any non-serializable types
        result_dict = row.to_dict()
        if isinstance(result_dict["moderation_result"], str):
            try:
                result_dict["moderation_result"] = json.loads(result_dict["moderation_result"])
            except:
                result_dict["moderation_result"] = {
                    "flagged": False,
                    "message": "Error parsing moderation result"
                }
        
        output_results.append(result_dict)
    
    return output_results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input file provided"}))
        sys.exit(1)
        
    input_file = sys.argv[1]
    try:
        with open(input_file, 'r') as file:
            posts_data = file.read().strip()
    except Exception as e:
        print(json.dumps({"error": f"Could not read input file: {str(e)}"}))
        sys.exit(1)
    
    try:
        results = process_content_with_pathway(posts_data)
        print(json.dumps(results))
    except Exception as e:
        print(json.dumps({"error": f"Processing error: {str(e)}"}))
        sys.exit(1)