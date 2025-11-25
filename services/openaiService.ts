const apiKey = process.env.API_KEY || '';

export const fetchGreekSummerFact = async (): Promise<string> => {
  if (!apiKey) {
    return "Please configure your API_KEY to see AI-generated Greek facts!";
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a knowledgeable Greek guide. Provide a short, fascinating, and culturally rich fact about Greek Summer, the Aegean Sea, or Greek Islands. It should be one or two sentences max. Make it sound inviting and magical."
          },
          {
            role: "user",
            content: "Tell me a fact."
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
       const errorData = await response.json().catch(() => ({}));
       console.error("OpenAI API Error:", response.status, errorData);
       throw new Error(`OpenAI API returned ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Greece is waiting for you!";
  } catch (error) {
    console.error("OpenAI Request Failed:", error);
    return "The Oracle is silent right now. Check back later!";
  }
};