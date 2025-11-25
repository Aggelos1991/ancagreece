export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  try {
    const { model, messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY" }),
        { status: 500 }
      );
    }

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 80
      })
    });

    const data = await completion.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Oracle failed", details: err.message }),
      { status: 500 }
    );
  }
}
