# python/pathway_processor.py
import sys
import json
import pathway as pw
import cohere
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get Cohere API key
cohere_api_key = os.getenv("3tcFn7pnKShxnPDFu0ZzgLf356fvpLAxKYGtmAqc")
if not cohere_api_key:
    print(json.dumps({"error": "Missing Cohere API key"}))
    sys.exit(1)

# Initialize Cohere client
co = cohere.Client(cohere_api_key)

def process_with_pathway(input_data):
    # Define Pathway processing logic
    class InputSchema(pw.Schema):
        text: str

    # Create a table from the input
    input_table = pw.io.memory.from_list(
        [{"text": input_data}],
        schema=InputSchema
    )
    
    # Process with Pathway
    result = input_table.select(
        text=pw.this.text,
        processed=pw.apply(lambda text: process_text(text), pw.this.text)
    )
    
    # Run the pipeline and get results
    pw.run()
    
    # Return the processed results
    return list(result)[0]["processed"]

def process_text(text):
    # Use Cohere for content moderation
    response = co.moderate(
        inputs=[text]
    )
    
    # Extract moderation results
    if response and response.results:
        mod_result = response.results[0]
        return {
            "flagged": any(mod_result.flagged.values()),
            "categories": {k: v for k, v in mod_result.flagged.items()},
            "confidence_scores": {k: float(v) for k, v in mod_result.confidence_scores.items()}
        }
    return {"error": "Failed to get moderation results"}

if __name__ == "__main__":
    # Read input from command line argument (a file path)
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input file provided"}))
        sys.exit(1)
        
    input_file = sys.argv[1]
    with open(input_file, 'r') as file:
        input_data = file.read().strip()
    
    # Process the input and print results as JSON
    result = process_with_pathway(input_data)
    print(json.dumps(result))