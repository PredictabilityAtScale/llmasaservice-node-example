const URL = "https://chat.llmasaservice.io/";
const PROJECT_ID = "379aeb32-8de9-4854-af83-1a0796d1fcd0";

async function callLLMAsAService(
  prompt,
  messages = [
    {
      role: "system",
      content:
        "Answer in plain text formatting (no markdown), in a comical way",
    },
  ]
) {
  const responseBody = JSON.stringify({
    projectId: PROJECT_ID,
    prompt: prompt,
    messages: messages,
    customer: {}, // Optional { customer_id: "1234", customer_name: "John Doe" }
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: responseBody,
  };

  try {
    const response = await fetch(URL, options);
    if (!response.ok) {
      console.log(
        `Error: Network error for service. (${response.status} ${response.statusText})`
      );
    } else {
      const reader = response?.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      console.log(await readStreamToEnd(reader, decoder));
    }
  } catch (error) {
    console.log(
      `Error: Having trouble connecting to chat service. (${error.message})`
    );
  }
}

async function readStreamToEnd(reader, decoder) {
  let result = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    result += decoder.decode(value);
  }

  return result;
}

// Parse command-line arguments
const prompt = process.argv[2] || "What are 3 modern boy names?";

// Execute the function
callLLMAsAService(prompt);
