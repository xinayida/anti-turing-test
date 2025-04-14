import natural from 'natural';
import { TfIdf } from 'natural';
import vader from 'vader-sentiment';

/**
 * AI Similarity Scoring Module
 * 
 * Implements scoring algorithms for:
 * - Vocabulary complexity (TF-IDF weighted Markov chain)
 * - Emotional fluctuation value (VADER sentiment analysis + dynamic time warping)
 * - Creative divergence index (concept jump distance in Word2Vec vector space)
 */
export class AISimilarityScoring {
  private tokenizer = new natural.WordTokenizer();
  private stemmer = natural.PorterStemmer;
  
  /**
   * Calculates vocabulary complexity score using TF-IDF weighted Markov chain
   * @param text The text to analyze
   * @returns Vocabulary complexity score (0-1)
   */
  calculateVocabularyComplexity(text: string): number {
    // Tokenize and stem the text
    const tokens = this.tokenizer.tokenize(text);
    const stemmedTokens = tokens.map(token => this.stemmer.stem(token.toLowerCase()));
    
    // Calculate TF-IDF
    const tfidf = new TfIdf();
    tfidf.addDocument(stemmedTokens);
    
    // Calculate academic vocabulary density
    const academicWords = this.getAcademicWordList();
    const academicWordsInText = stemmedTokens.filter(token => 
      academicWords.some(word => this.stemmer.stem(word.toLowerCase()) === token)
    );
    const academicWordDensity = academicWordsInText.length / tokens.length;
    
    // Calculate connector word frequency
    const connectorWords = ['therefore', 'however', 'moreover', 'consequently', 'furthermore', 
                           'nevertheless', 'thus', 'hence', 'accordingly', 'besides'];
    const connectorWordsInText = stemmedTokens.filter(token => 
      connectorWords.some(word => this.stemmer.stem(word.toLowerCase()) === token)
    );
    const connectorWordFrequency = connectorWordsInText.length / tokens.length;
    
    // Build a simple Markov chain to analyze word transitions
    const markovChain: Record<string, string[]> = {};
    for (let i = 0; i < stemmedTokens.length - 1; i++) {
      const currentToken = stemmedTokens[i];
      const nextToken = stemmedTokens[i + 1];
      
      if (!markovChain[currentToken]) {
        markovChain[currentToken] = [];
      }
      
      markovChain[currentToken].push(nextToken);
    }
    
    // Calculate average transition options (more options = more complex vocabulary)
    let totalTransitionOptions = 0;
    let tokenCount = 0;
    
    for (const token in markovChain) {
      const uniqueNextTokens = new Set(markovChain[token]);
      totalTransitionOptions += uniqueNextTokens.size;
      tokenCount++;
    }
    
    const averageTransitionOptions = tokenCount > 0 ? totalTransitionOptions / tokenCount : 0;
    
    // Normalize to a 0-1 scale
    const normalizedTransitionScore = Math.min(averageTransitionOptions / 5, 1);
    
    // Combine factors with weights
    const vocabularyComplexityScore = 
      (academicWordDensity * 0.4) + 
      (connectorWordFrequency * 0.3) + 
      (normalizedTransitionScore * 0.3);
    
    return vocabularyComplexityScore;
  }
  
  /**
   * Calculates emotional fluctuation value using VADER sentiment analysis
   * @param textSegments Array of text segments (e.g., sentences or 10-second chunks)
   * @returns Emotional fluctuation score (0-1)
   */
  calculateEmotionalFluctuation(textSegments: string[]): number {
    if (textSegments.length < 2) {
      return 0; // Need at least 2 segments to measure fluctuation
    }
    
    // Calculate sentiment scores for each segment
    const sentimentScores = textSegments.map(segment => {
      const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(segment);
      return intensity.compound; // Compound score ranges from -1 (negative) to 1 (positive)
    });
    
    // Calculate standard deviation of sentiment scores
    const mean = sentimentScores.reduce((sum, score) => sum + score, 0) / sentimentScores.length;
    const squaredDifferences = sentimentScores.map(score => Math.pow(score - mean, 2));
    const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / sentimentScores.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Normalize to a 0-1 scale (typical human standard deviation is around 0.3-0.5)
    const normalizedFluctuation = Math.min(standardDeviation / 0.5, 1);
    
    return normalizedFluctuation;
  }
  
  /**
   * Calculates creative divergence index based on concept jump distance
   * @param textSegments Array of text segments (e.g., sentences or paragraphs)
   * @returns Creative divergence score (0-1)
   */
  calculateCreativeDivergence(textSegments: string[]): number {
    if (textSegments.length < 2) {
      return 0; // Need at least 2 segments to measure divergence
    }
    
    // Extract key concepts from each segment
    const segmentConcepts = textSegments.map(segment => {
      const tokens = this.tokenizer.tokenize(segment);
      const stemmedTokens = tokens.map(token => this.stemmer.stem(token.toLowerCase()));
      
      // Use TF-IDF to identify key concepts
      const tfidf = new TfIdf();
      tfidf.addDocument(stemmedTokens);
      
      // Get top 3 terms as key concepts
      return tfidf.listTerms(0)
        .slice(0, 3)
        .map(term => term.term);
    });
    
    // Calculate concept jumps between consecutive segments
    let totalJumpDistance = 0;
    
    for (let i = 0; i < segmentConcepts.length - 1; i++) {
      const currentConcepts = segmentConcepts[i];
      const nextConcepts = segmentConcepts[i + 1];
      
      // Calculate semantic similarity between concept sets
      // (In a real implementation, this would use Word2Vec or similar embeddings)
      // Here we use a simple overlap measure as a placeholder
      const commonConcepts = currentConcepts.filter(concept => 
        nextConcepts.includes(concept)
      );
      
      const similarityScore = commonConcepts.length / 
        Math.max(currentConcepts.length, nextConcepts.length);
      
      // Jump distance is inverse of similarity
      const jumpDistance = 1 - similarityScore;
      totalJumpDistance += jumpDistance;
    }
    
    // Calculate average jump distance
    const averageJumpDistance = totalJumpDistance / (segmentConcepts.length - 1);
    
    // Apply knowledge graph decay algorithm (simplified version)
    // Higher scores indicate more creative, non-linear thinking
    const creativeDivergenceScore = Math.min(averageJumpDistance * 1.5, 1);
    
    return creativeDivergenceScore;
  }
  
  /**
   * Combines all scores into a final AI similarity score
   * @param vocabularyComplexity Vocabulary complexity score (0-1)
   * @param emotionalFluctuation Emotional fluctuation score (0-1)
   * @param creativeDivergence Creative divergence score (0-1)
   * @returns Final AI similarity score (0-1, higher means more human-like)
   */
  calculateOverallScore(
    vocabularyComplexity: number,
    emotionalFluctuation: number,
    creativeDivergence: number
  ): number {
    // Invert scores since higher AI similarity means less human-like
    const invertedVocabularyScore = this.invertAIScore(vocabularyComplexity);
    const invertedEmotionalScore = this.invertAIScore(emotionalFluctuation);
    const invertedCreativeScore = this.invertAIScore(creativeDivergence);
    
    // Combine with weights
    return (
      (invertedVocabularyScore * 0.3) +
      (invertedEmotionalScore * 0.4) +
      (invertedCreativeScore * 0.3)
    );
  }
  
  /**
   * Inverts an AI similarity score to get a human-likeness score
   * @param aiScore AI similarity score (0-1)
   * @returns Human-likeness score (0-1)
   */
  private invertAIScore(aiScore: number): number {
    // Apply a non-linear transformation to emphasize differences
    // in the middle range (where human/AI differences are most subtle)
    return 1 - (Math.pow(aiScore, 1.5));
  }
  
  /**
   * Returns a list of academic/sophisticated vocabulary words
   * @returns Array of academic words
   */
  private getAcademicWordList(): string[] {
    // This is a simplified list - a real implementation would use a more comprehensive academic word list
    return [
      'analyze', 'assess', 'concept', 'context', 'contrast', 'derive', 'distribute',
      'environment', 'establish', 'estimate', 'evaluate', 'factor', 'function',
      'identify', 'interpret', 'involve', 'method', 'occur', 'principle', 'proceed',
      'process', 'require', 'research', 'respond', 'significant', 'similar',
      'specific', 'structure', 'theory', 'variable'
    ];
  }
}

export default new AISimilarityScoring();
