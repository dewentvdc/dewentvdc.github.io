
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { prompt, type } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;

  let endpoint = 'https://api.openai.com/v1/chat/completions';
  let body = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  };

  if (type === 'imagen') {
    endpoint = 'https://api.openai.com/v1/images/generations';
    body = {
      prompt: prompt,
      n: 1,
      size: '512x512'
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (type === 'imagen') {
    return NextResponse.json({ result: data.data[0].url });
  } else {
    return NextResponse.json({ result: data.choices[0].message.content });
  }
}
