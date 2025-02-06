// src/services/nimAPI.ts
import OpenAI from 'openai';

// src/services/nimAPI.ts
const API_KEY = import.meta.env.VITE_NIM_API_KEY || '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';

export const sendMessageToNIM = async (message: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content || "No response received";
  } catch (error) {
    console.error("Error calling NIM API:", error);
    return "Sorry, there was an error processing your request.";
  }
}