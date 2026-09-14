// api/chat.js
import { GoogleGenAI } from '@google/genai';
import { RANKRESUME_KNOWLEDGE_BASE } from './chatbotData.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('CRITICAL: GEMINI_API_KEY is not defined in process.env');
    return res.status(500).json({
      error: 'Missing API key',
      reply: 'The server cannot find the GEMINI_API_KEY. Please verify your environment configuration.'
    });
  }

  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message string is required.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Updated model to gemini-3.6-flash
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction: RANKRESUME_KNOWLEDGE_BASE,
      },
    });

    return res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error('Gemini Execution Error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process AI response',
      reply: 'I am having trouble connecting right now. Feel free to explore the project sections directly or drop a message via the contact form!'
    });
  }
}