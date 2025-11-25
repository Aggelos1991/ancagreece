export const fetchGreekSummerFact = async (): Promise<string> => {
  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgeable Greek guide. Provide a short, fascinating, culturally rich Greek Summer fact."
          },
          { role: "user", content: "Tell me a fact" }
        ]
      })
    });

    if (!response.ok) {
      return "The Oracle is silent right now.";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "Greece is waiting for you!";
  } catch (err) {
    return "The Oracle is silent right now.";
  }
};