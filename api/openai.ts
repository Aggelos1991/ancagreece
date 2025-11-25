import { OpenAI } from "openai";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  try {
    const { model, messages } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // NOT VITE_ !!!
    });

    const completion = await client.chat.completions.create({
      model,
      messages,
      max_tokens: 80,
    });

    return new Response(JSON.stringify(completion), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "Oracle failed",
        details: err.message,
      }),
      { status: 500 }
    );
  }
}
