import grok from '../lib/grok';
import natural from 'natural';
import { TfIdf } from 'natural';

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

/**
 * Dynamic Semantic Analysis Engine
 *
 * This module implements the dual-model architecture:
 * - GPT-4 for generating "AI-style ideal answers"
 * - Traditional NLP model (LSTM+Attention) for analyzing text structure features
 */
export class SemanticAnalysisEngine {
  private questionCategories: string[] = [
    'Workplace Conflicts',
    'Emergency Responses',
    'Ethical Dilemmas',
    'Creative Problem Solving',
    'Personal Growth',
    'Leadership Challenges',
    'Technical Decisions',
    'Cultural Sensitivity',
    'Future Planning',
    'Interpersonal Relationships'
  ];

  private questions: Record<string, string[]> = {
    'Workplace Conflicts': [
      'How would you handle a disagreement with a colleague about a project approach?',
      'What would you do if your manager assigned you a task that you believe is outside your job description?',
      'How would you address a team member who consistently misses deadlines?'
    ],
    'Emergency Responses': [
      'How would you respond if a critical system went down during a major client presentation?',
      'What would you do if you discovered a major security vulnerability just before a product launch?',
      'How would you handle an unexpected crisis that requires immediate attention?'
    ],
    // Additional categories would be populated similarly
  };

  /**
   * Generates an "AI-style ideal answer" using GPT-4
   * @param question The question to generate an answer for
   * @returns The generated AI answer
   */
  async generateAIAnswer(question: string): Promise<string> {
    try {
      const response = await grok.chat(
        [
          { role: 'system', content: 'You are an AI assistant. Provide a detailed, helpful response to the following question.' },
          { role: 'user', content: question }
        ],
        {
          temperature: 0.7,
          max_tokens: 500
        }
      );

      return response.choices[0].message.content || '';
    } catch (error) {
      console.error('Error generating AI answer:', error);
      return '';
    }
  }

  /**
   * Analyzes text structure features using traditional NLP techniques
   * @param text The text to analyze
   * @returns Analysis results
   */
  analyzeTextStructure(text: string) {
    // Tokenize the text
    const tokens = tokenizer.tokenize(text);

    // Calculate lexical diversity (type-token ratio)
    const uniqueTokens = new Set(tokens.map(token => stemmer.stem(token.toLowerCase())));
    const lexicalDiversity = uniqueTokens.size / tokens.length;

    // Calculate average sentence length
    const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim().length > 0);
    const avgSentenceLength = tokens.length / sentences.length;

    // Calculate TF-IDF for key terms
    const tfidf = new TfIdf();
    tfidf.addDocument(text);

    // Extract key terms (top 5 terms by TF-IDF score)
    const keyTerms: {term: string, score: number}[] = [];
    tfidf.listTerms(0).slice(0, 5).forEach(item => {
      keyTerms.push({term: item.term, score: item.tfidf});
    });

    return {
      lexicalDiversity,
      avgSentenceLength,
      keyTerms,
      tokenCount: tokens.length,
      sentenceCount: sentences.length
    };
  }

  /**
   * Generates a follow-up question based on the user's response
   * @param originalQuestion The original question
   * @param userResponse The user's response
   * @param depth The current depth of follow-up (1-3)
   * @returns A follow-up question
   */
  async generateFollowUpQuestion(originalQuestion: string, userResponse: string, depth: number): Promise<string> {
    try {
      const response = await grok.chat(
        [
          {
            role: 'system',
            content: `You are an interviewer conducting a deep conversation. Generate a thoughtful follow-up question (depth level ${depth}/3) based on the original question and the response. The follow-up should dig deeper into the reasoning, experiences, or values behind the response.`
          },
          { role: 'user', content: `Original question: ${originalQuestion}\n\nResponse: ${userResponse}` }
        ],
        {
          temperature: 0.8,
          max_tokens: 100
        }
      );

      return response.choices[0].message.content || '';
    } catch (error) {
      console.error('Error generating follow-up question:', error);
      return '';
    }
  }

  /**
   * Records and analyzes response delay patterns
   * @param delayTimes Array of delay times in milliseconds
   * @returns Analysis of delay patterns
   */
  analyzeResponseDelays(delayTimes: number[]): {
    averageDelay: number;
    isHumanLike: boolean;
    confidenceScore: number;
  } {
    // Calculate average delay
    const averageDelay = delayTimes.reduce((sum, time) => sum + time, 0) / delayTimes.length;

    // Human typical hesitation time is between 1.2-3.4 seconds (1200-3400ms)
    const isWithinHumanRange = averageDelay >= 1200 && averageDelay <= 3400;

    // Calculate variance in delay times (humans tend to have more variance)
    const variance = delayTimes.reduce((sum, time) => sum + Math.pow(time - averageDelay, 2), 0) / delayTimes.length;
    const standardDeviation = Math.sqrt(variance);

    // Higher standard deviation indicates more human-like variation in response times
    const hasHumanVariation = standardDeviation > 500;

    // Combine factors for overall assessment
    const isHumanLike = isWithinHumanRange && hasHumanVariation;

    // Calculate confidence score (0-1)
    let confidenceScore = 0.5; // Default neutral score

    if (isWithinHumanRange) confidenceScore += 0.25;
    if (hasHumanVariation) confidenceScore += 0.25;

    return {
      averageDelay,
      isHumanLike,
      confidenceScore
    };
  }

  /**
   * Gets a random question from a specific category
   * @param category The category to get a question from
   * @returns A random question from the specified category
   */
  getRandomQuestion(category?: string): string {
    if (!category) {
      // If no category specified, pick a random category
      const randomCategoryIndex = Math.floor(Math.random() * this.questionCategories.length);
      category = this.questionCategories[randomCategoryIndex];
    }

    // Get questions for the category
    const categoryQuestions = this.questions[category] || [];

    // If no questions in the category, return a default question
    if (categoryQuestions.length === 0) {
      return 'Tell me about a challenging situation you faced and how you handled it.';
    }

    // Return a random question from the category
    const randomQuestionIndex = Math.floor(Math.random() * categoryQuestions.length);
    return categoryQuestions[randomQuestionIndex];
  }
}

export default new SemanticAnalysisEngine();
