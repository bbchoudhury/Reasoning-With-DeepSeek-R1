import ollama

def query_deepseek_r1(prompt: str) -> str:
    """
    Queries the locally installed DeepSeek R1 model using Ollama.
    Returns the model's response.
    """
    try:
        response = ollama.chat(model='deepseek-r1', messages=[{"role": "user", "content": prompt}])
        return response['message']['content']
    except Exception as e:
        return f"Error: {str(e)}"
