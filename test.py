import requests
import json
import sys

URL = "https://chat.llmasaservice.io/"
PROJECT_ID = "379aeb32-8de9-4854-af83-1a0796d1fcd0"  # this is YOUR project id!

def callLLMAsAService(prompt, messages=[{"role": "system", "content": "Answer in plain text formatting, in a comical way"}]):
    payload = {
        "projectId": PROJECT_ID,
        "prompt": prompt,
        "messages": messages,
        "customer": {},  # Optional { "customer_id": "1234", "customer_name": "John Doe" }
    }

    headers = {
        "Content-Type": "text/plain",
    }

    try:
        response = requests.post(URL, data=json.dumps(payload), headers=headers)
        if response.status_code != 200:
            print(f"Error: Network error for service. ({response.status_code} {response.reason})")
        else:
            print(response.text)
    except requests.RequestException as error:
        print(f"Error: Having trouble connecting to chat service. ({error})")

prompt = sys.argv[1] if len(sys.argv) > 1 else "What are 3 modern boy names?"

# Execute the function
callLLMAsAService(prompt)