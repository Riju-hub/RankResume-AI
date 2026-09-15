// api/chat.js
import { GoogleGenAI } from '@google/genai';
import { RANKRESUME_KNOWLEDGE_BASE } from './chatbotData.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const PRIMARY_MODEL = 'gemini-3.6-flash';
const MAX_RETRIES = 3;

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
    const { message, isVoiceMode = false } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message string is required.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Voice mode constraints: short, conversational, and no special markdown/bullets
    const voiceModePrompt = `
=========================
VOICE & LIVE CALL MODE RULES (STRICT)
=========================
- You are speaking aloud on a live voice call.
- Provide a direct, conversational response in only 1 to 2 short sentences (maximum 30 words).
- DO NOT use bullet points (→ or •) or markdown symbols like asterisks (**) or backticks.
- Speak in natural, spoken English.
- Always append dynamic suggestions at the end: [SUGGESTIONS: Suggestion 1 | Suggestion 2 | Suggestion 3]`;

    const systemInstruction = isVoiceMode
      ? `${RANKRESUME_KNOWLEDGE_BASE}\n${voiceModePrompt}`
      : RANKRESUME_KNOWLEDGE_BASE;

    let lastError = null;

    // Retry loop to handle 503 high-demand or transient network spikes
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: PRIMARY_MODEL,
          contents: message,
          config: {
            systemInstruction,
          },
        });

        if (response && response.text) {
          return res.status(200).json({ reply: response.text });
        }
      } catch (error) {
        lastError = error;
        console.warn(`Attempt ${attempt} for ${PRIMARY_MODEL} failed: ${error.message || error.status}`);

        if (attempt < MAX_RETRIES) {
          const delay = attempt * 800; // 800ms, 1600ms backoff
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  } catch (error) {
    console.error('Gemini Execution Error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process AI response',
      reply: 'I am having trouble connecting right now. Feel free to explore the features directly or try again in a moment!'
    });
  }
}