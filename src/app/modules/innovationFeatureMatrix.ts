import natural from 'natural';
import grok from '../lib/grok';

/**
 * Innovation Feature Matrix
 *
 * Implements detection algorithms for:
 * 1. Semantic elasticity (flexibility and contextual adaptation)
 * 2. Emotional expression richness and authenticity
 * 3. Reference ability for personal experiences and specific details
 * 4. Performance in handling ambiguous/conflicting information
 * 5. Creative thinking and unconventional solution capabilities
 * 6. Time perception and natural response rhythm
 */
export class InnovationFeatureMatrix {
  private tokenizer = new natural.WordTokenizer();

  /**
   * Analyzes semantic elasticity (flexibility and contextual adaptation)
   * @param text The text to analyze
   * @returns Semantic elasticity score and analysis
   */
  async analyzeSemanticElasticity(text: string): Promise<{
    score: number;
    analysis: string;
    humanVsAI: string;
  }> {
    try {
      // Use Grok to analyze semantic elasticity
      const response = await grok.chat(
        [
          {
            role: 'system',
            content: `Analyze the following text for semantic elasticity (flexibility and contextual adaptation).

            Human text typically shows:
            - Natural topic transitions
            - Willingness to acknowledge knowledge gaps
            - Flexible reasoning patterns

            AI text typically shows:
            - Rigid logical structures
            - Overuse of transition phrases
            - Reluctance to admit uncertainty

            Score the text from 0 (very AI-like) to 1 (very human-like) and provide a brief analysis.`
          },
          { role: 'user', content: text }
        ],
        {
          temperature: 0.3,
          max_tokens: 250
        }
      );

      const analysisText = response.choices[0].message.content || '';

      // Extract score from analysis (assuming the AI includes a numeric score)
      const scoreMatch = analysisText.match(/score:?\s*([0-9.]+)/i);
      const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0.5;

      return {
        score: Math.min(Math.max(score, 0), 1), // Ensure score is between 0 and 1
        analysis: analysisText,
        humanVsAI: "Human: topic natural transitions, acknowledges knowledge gaps\nAI: rigid logical structure, overuses transition phrases"
      };
    } catch (error) {
      console.error('Error analyzing semantic elasticity:', error);
      return {
        score: 0.5,
        analysis: 'Error analyzing semantic elasticity',
        humanVsAI: "Human: topic natural transitions, acknowledges knowledge gaps\nAI: rigid logical structure, overuses transition phrases"
      };
    }
  }

  /**
   * Analyzes emotional expression richness and authenticity
   * @param text The text to analyze
   * @returns Emotional expression score and analysis
   */
  async analyzeEmotionalExpression(text: string): Promise<{
    score: number;
    analysis: string;
    humanVsAI: string;
  }> {
    try {
      // Use Grok to analyze emotional expression
      const response = await grok.chat(
        [
          {
            role: 'system',
            content: `Analyze the following text for emotional expression richness and authenticity.

            Human text typically shows:
            - Micro-emotional fluctuations (hesitation, humor)
            - Asymmetric emotional responses
            - Authentic personal reactions

            AI text typically shows:
            - Flat emotional tone
            - Excessive political correctness
            - Balanced, measured responses

            Score the text from 0 (very AI-like) to 1 (very human-like) and provide a brief analysis.`
          },
          { role: 'user', content: text }
        ],
        {
          temperature: 0.3,
          max_tokens: 250
        }
      );

      const analysisText = response.choices[0].message.content || '';

      // Extract score from analysis
      const scoreMatch = analysisText.match(/score:?\s*([0-9.]+)/i);
      const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0.5;

      return {
        score: Math.min(Math.max(score, 0), 1),
        analysis: analysisText,
        humanVsAI: "Human: micro-emotional fluctuations, asymmetric responses\nAI: flat emotional tone, excessive political correctness"
      };
    } catch (error) {
      console.error('Error analyzing emotional expression:', error);
      return {
        score: 0.5,
        analysis: 'Error analyzing emotional expression',
        humanVsAI: "Human: micro-emotional fluctuations, asymmetric responses\nAI: flat emotional tone, excessive political correctness"
      };
    }
  }

  /**
   * Analyzes reference ability for personal experiences and specific details
   * @param text The text to analyze
   * @returns Reference ability score and analysis
   */
  async analyzeReferenceAbility(text: string): Promise<{
    score: number;
    analysis: string;
    humanVsAI: string;
  }> {
    try {
      // Use Grok to analyze reference ability
      const response = await grok.chat(
        [
          {
            role: 'system',
            content: `Analyze the following text for reference ability (personal experiences and specific details).

            Human text typically shows:
            - Concrete, specific examples ("last week's client meeting")
            - Idiosyncratic details that aren't necessary but add authenticity
            - Temporal anchoring to personal timeline

            AI text typically shows:
            - Generic examples ("a client meeting")
            - Reference to studies or general knowledge
            - Lack of specific temporal anchoring

            Score the text from 0 (very AI-like) to 1 (very human-like) and provide a brief analysis.`
          },
          { role: 'user', content: text }
        ],
        {
          temperature: 0.3,
          max_tokens: 250
        }
      );

      const analysisText = response.choices[0].message.content || '';

      // Extract score from analysis
      const scoreMatch = analysisText.match(/score:?\s*([0-9.]+)/i);
      const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0.5;

      return {
        score: Math.min(Math.max(score, 0), 1),
        analysis: analysisText,
        humanVsAI: "Human: concrete examples, idiosyncratic details\nAI: generic examples, references to studies"
      };
    } catch (error) {
      console.error('Error analyzing reference ability:', error);
      return {
        score: 0.5,
        analysis: 'Error analyzing reference ability',
        humanVsAI: "Human: concrete examples, idiosyncratic details\nAI: generic examples, references to studies"
      };
    }
  }

  /**
   * Analyzes performance in handling ambiguous/conflicting information
   * @param text The text to analyze
   * @returns Ambiguity handling score and analysis
   */
  async analyzeAmbiguityHandling(text: string): Promise<{
    score: number;
    analysis: string;
    humanVsAI: string;
  }> {
    try {
      // Use Grok to analyze ambiguity handling
      const response = await grok.chat(
        [
          {
            role: 'system',
            content: `Analyze the following text for handling of ambiguity and conflicting information.

            Human text typically shows:
            - Temporary contradictions
            - Self-correction and revision of thoughts
            - Comfort with uncertainty

            AI text typically shows:
            - Forced consistency
            - Avoidance of uncertainty
            - Balanced presentation of alternatives

            Score the text from 0 (very AI-like) to 1 (very human-like) and provide a brief analysis.`
          },
          { role: 'user', content: text }
        ],
        {
          temperature: 0.3,
          max_tokens: 250
        }
      );

      const analysisText = response.choices[0].message.content || '';

      // Extract score from analysis
      const scoreMatch = analysisText.match(/score:?\s*([0-9.]+)/i);
      const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0.5;

      return {
        score: Math.min(Math.max(score, 0), 1),
        analysis: analysisText,
        humanVsAI: "Human: temporary contradictions, self-correction\nAI: forced consistency, avoidance of uncertainty"
      };
    } catch (error) {
      console.error('Error analyzing ambiguity handling:', error);
      return {
        score: 0.5,
        analysis: 'Error analyzing ambiguity handling',
        humanVsAI: "Human: temporary contradictions, self-correction\nAI: forced consistency, avoidance of uncertainty"
      };
    }
  }

  /**
   * Analyzes creative thinking and unconventional solution capabilities
   * @param text The text to analyze
   * @returns Creative thinking score and analysis
   */
  async analyzeCreativeThinking(text: string): Promise<{
    score: number;
    analysis: string;
    humanVsAI: string;
  }> {
    try {
      // Use Grok to analyze creative thinking
      const response = await grok.chat(
        [
          {
            role: 'system',
            content: `Analyze the following text for creative thinking and unconventional solution capabilities.

            Human text typically shows:
            - Cross-domain analogies
            - Imperfect but novel ideas
            - Unexpected connections

            AI text typically shows:
            - Pattern-based innovation
            - Formulaic creativity ("combining X with Y")
            - Reference to established frameworks

            Score the text from 0 (very AI-like) to 1 (very human-like) and provide a brief analysis.`
          },
          { role: 'user', content: text }
        ],
        {
          temperature: 0.3,
          max_tokens: 250
        }
      );

      const analysisText = response.choices[0].message.content || '';

      // Extract score from analysis
      const scoreMatch = analysisText.match(/score:?\s*([0-9.]+)/i);
      const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0.5;

      return {
        score: Math.min(Math.max(score, 0), 1),
        analysis: analysisText,
        humanVsAI: "Human: cross-domain analogies, imperfect but novel ideas\nAI: pattern-based innovation, formulaic creativity"
      };
    } catch (error) {
      console.error('Error analyzing creative thinking:', error);
      return {
        score: 0.5,
        analysis: 'Error analyzing creative thinking',
        humanVsAI: "Human: cross-domain analogies, imperfect but novel ideas\nAI: pattern-based innovation, formulaic creativity"
      };
    }
  }

  /**
   * Analyzes time perception and natural response rhythm
   * @param text The text to analyze
   * @param responseDelays Array of response delay times in milliseconds
   * @returns Time perception score and analysis
   */
  async analyzeTimePerception(
    text: string,
    responseDelays: number[]
  ): Promise<{
    score: number;
    analysis: string;
    humanVsAI: string;
  }> {
    // Calculate average response delay
    const avgDelay = responseDelays.length > 0
      ? responseDelays.reduce((sum, delay) => sum + delay, 0) / responseDelays.length
      : 0;

    // Check for time-related expressions in text
    const timeExpressions = [
      'recently', 'lately', 'the other day', 'last week', 'a while ago',
      'a few days ago', 'some time ago', 'earlier', 'previously'
    ];

    // Tokenize text (not used directly but helps with debugging)
    this.tokenizer.tokenize(text.toLowerCase());
    const hasVagueTimeReferences = timeExpressions.some(expr =>
      text.toLowerCase().includes(expr)
    );

    // Check for precise time references (dates, specific times)
    const preciseDatePattern = /\b\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4}\b/;
    const preciseTimePattern = /\b\d{1,2}:\d{2}\b/;
    const hasPreciseTimeReferences =
      preciseDatePattern.test(text) || preciseTimePattern.test(text);

    // Human-like time perception score calculation
    let score = 0.5; // Default neutral score

    // Response delay factor (humans typically take 1.2-3.4 seconds to respond)
    if (avgDelay >= 1200 && avgDelay <= 3400) {
      score += 0.2;
    } else if (avgDelay < 500) {
      score -= 0.2; // Too fast is AI-like
    }

    // Vague vs precise time references
    if (hasVagueTimeReferences) {
      score += 0.15; // Humans often use vague time references
    }
    if (hasPreciseTimeReferences) {
      score -= 0.15; // AIs often use precise time references
    }

    // Ensure score is between 0 and 1
    score = Math.min(Math.max(score, 0), 1);

    // Generate analysis text
    let analysis = `Time perception analysis:\n`;
    analysis += `- Average response delay: ${Math.round(avgDelay)}ms\n`;
    analysis += `- Uses vague time references: ${hasVagueTimeReferences ? 'Yes' : 'No'}\n`;
    analysis += `- Uses precise time references: ${hasPreciseTimeReferences ? 'Yes' : 'No'}\n`;
    analysis += `- Overall time perception score: ${score.toFixed(2)}\n`;

    if (score > 0.7) {
      analysis += `The text shows human-like time perception patterns.`;
    } else if (score < 0.3) {
      analysis += `The text shows AI-like time perception patterns.`;
    } else {
      analysis += `The text shows mixed time perception patterns.`;
    }

    return {
      score,
      analysis,
      humanVsAI: "Human: reasonable delays, vague time references\nAI: instant responses, precise time references"
    };
  }

  /**
   * Calculates overall human-likeness score based on all feature dimensions
   * @param scores Object containing scores for each dimension
   * @returns Overall human-likeness score (0-1)
   */
  calculateOverallScore(scores: {
    semanticElasticity: number;
    emotionalExpression: number;
    referenceAbility: number;
    ambiguityHandling: number;
    creativeThinking: number;
    timePerception: number;
  }): number {
    // Weights for each dimension
    const weights = {
      semanticElasticity: 0.2,
      emotionalExpression: 0.2,
      referenceAbility: 0.15,
      ambiguityHandling: 0.15,
      creativeThinking: 0.15,
      timePerception: 0.15
    };

    // Calculate weighted average
    const weightedScore =
      (scores.semanticElasticity * weights.semanticElasticity) +
      (scores.emotionalExpression * weights.emotionalExpression) +
      (scores.referenceAbility * weights.referenceAbility) +
      (scores.ambiguityHandling * weights.ambiguityHandling) +
      (scores.creativeThinking * weights.creativeThinking) +
      (scores.timePerception * weights.timePerception);

    return weightedScore;
  }
}

export default new InnovationFeatureMatrix();
