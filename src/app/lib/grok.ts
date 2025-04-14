import axios from 'axios';

const GROK_API_URL = 'https://api.x.ai/v1';
const GROK_API_KEY = process.env.GROK_API_KEY;

interface GrokMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GrokCompletionRequest {
  messages: GrokMessage[];
  model: string;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

interface GrokCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class GrokClient {
  private apiKey: string;
  private model: string;

  constructor(apiKey = GROK_API_KEY, model = 'grok-3-latest') {
    if (!apiKey) {
      throw new Error('GROK_API_KEY is required');
    }
    this.apiKey = apiKey;
    this.model = model;
  }

  async chat(messages: GrokMessage[], options: { temperature?: number; max_tokens?: number } = {}) {
    try {
      const requestData: GrokCompletionRequest = {
        messages,
        model: this.model,
        stream: false,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens
      };

      const response = await axios.post<GrokCompletionResponse>(
        `${GROK_API_URL}/chat/completions`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error calling Grok API:', error);
      throw error;
    }
  }
}

export default new GrokClient();
