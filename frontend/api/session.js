// api/session.js
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
      message: 'GEMINI_API_KEY is required to initialize a live voice session.'
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Request a single-use short-lived ephemeral token for real-time live connection
    const tokenResponse = await ai.authTokens.create({
      config: {
        uses: 1, // Single-use session token
        liveConnectConstraints: {
          model: 'gemini-2.0-flash-exp', // Live streaming voice model
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Aoede', // Options: Aoede, Puck, Charon, Fenrir, Kore
                },
              },
            },
            systemInstruction: {
              parts: [
                {
                  text: `${RANKRESUME_KNOWLEDGE_BASE}

=========================
VOICE & LIVE CALL INSTRUCTIONS
=========================
- You are RANKRESUME AI on a live, real-time voice call.
- Keep spoken answers concise, direct, and conversational (1 to 2 short sentences).
- Avoid raw markdown symbols, bullet formatting, or asterisks.
- Speak in natural, polished English.`
                }
              ]
            }
          }
        }
      }
    });

    // tokenResponse.name holds the temporary connection token
    return res.status(200).json({ token: tokenResponse.name });
  } catch (error) {
    console.error('Failed to create Gemini Live session token:', error);
    return res.status(500).json({
      error: error.message || 'Failed to create ephemeral live session token'
    });
  }
}