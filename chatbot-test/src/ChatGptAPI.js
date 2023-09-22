
export default async function generate (query, benefits, category, setText) {

  const API_URL = "https://api.openai.com/v1/chat/completions";
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const conversation = [
    // { role: 'system', content: '주어진 정보를 바탕으로 카드 혜택 정보를 항목별로 요약해줘'},
    { role: 'user', content: '1. 주어진 정보에서 정확한 카드 이름을 찾아\n'
      + '2. json 양식: {카드 이름 : [혜택정보]} 으로 답변해\n'
      + '카드 혜택 정보:\n' + benefits
      + '\n\n' + category + ' 질문: ' + query},
    // { role: 'user', content: '카드 혜택 정보:\n' + benefits},
    // // { role: 'user', content: '양식: 카드이름\n  카드혜택\n'},
    // { role: "user", content: '\n\n' + category + ' 질문: ' + query},
  ];

  
  try {
    // Fetch the response from the OpenAI API with the signal from AbortController
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        messages: conversation,
        max_tokens: 500,
        temperature: 0.1,
        model: "gpt-3.5-turbo-16k-0613",
        stream: true,
      }),
    });
    
    // Read the response as a stream of data
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let resultText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return resultText;
      }
      // Massage and parse the chunk of data
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      const parsedLines = lines
        .filter((line) => line !== "" && line !== "data: [DONE]") // Remove empty lines and "[DONE]"z
        .map((line) => JSON.parse(line.replace(/^data: /, "").trim()));

      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        // Update the UI with the new content
        if (content) {
          resultText += content;  
          setText(resultText);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};