import { NextRequest, NextResponse } from 'next/server';
import semanticAnalysisEngine from '@/app/modules/semanticAnalysisEngine';
import aiSimilarityScoring from '@/app/modules/aiSimilarityScoring';
import innovationFeatureMatrix from '@/app/modules/innovationFeatureMatrix';
import { supabase } from '@/app/lib/supabase';

// Reference to the mock storage from sessions route
// In a real app, you'd use a proper state management solution
declare global {
  var mockSessions: Map<string, any>;
  var mockInteractions: Map<string, any[]>;
  var mockAnalysisResults: Map<string, any[]>;
}

export async function POST(request: NextRequest) {
  try {
    const { text, responseDelays, sessionId } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Split text into segments for analysis
    const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim().length > 0);
    const textSegments = [];

    // Group sentences into segments of roughly equal length
    let currentSegment = '';
    for (const sentence of sentences) {
      if (currentSegment.length + sentence.length > 200) {
        textSegments.push(currentSegment);
        currentSegment = sentence;
      } else {
        currentSegment += (currentSegment ? ' ' : '') + sentence;
      }
    }
    if (currentSegment) {
      textSegments.push(currentSegment);
    }

    // Perform text structure analysis
    const textStructure = semanticAnalysisEngine.analyzeTextStructure(text);

    // Calculate AI similarity scores
    const vocabularyComplexity = aiSimilarityScoring.calculateVocabularyComplexity(text);
    const emotionalFluctuation = aiSimilarityScoring.calculateEmotionalFluctuation(textSegments);
    const creativeDivergence = aiSimilarityScoring.calculateCreativeDivergence(textSegments);

    const aiSimilarityScore = aiSimilarityScoring.calculateOverallScore(
      vocabularyComplexity,
      emotionalFluctuation,
      creativeDivergence
    );

    // Analyze innovation features - run all API calls in parallel
    const [
      semanticElasticityResult,
      emotionalExpressionResult,
      referenceAbilityResult,
      ambiguityHandlingResult,
      creativeThinkingResult,
      timePerceptionResult
    ] = await Promise.all([
      innovationFeatureMatrix.analyzeSemanticElasticity(text).catch(error => {
        console.error('Error analyzing semantic elasticity:', error);
        return { score: 0.5, analysis: 'Error analyzing semantic elasticity', humanVsAI: "Human: topic natural transitions, acknowledges knowledge gaps\nAI: rigid logical structure, overuses transition phrases" };
      }),
      innovationFeatureMatrix.analyzeEmotionalExpression(text).catch(error => {
        console.error('Error analyzing emotional expression:', error);
        return { score: 0.5, analysis: 'Error analyzing emotional expression', humanVsAI: "Human: micro-emotional fluctuations, asymmetric responses\nAI: flat emotional tone, excessive political correctness" };
      }),
      innovationFeatureMatrix.analyzeReferenceAbility(text).catch(error => {
        console.error('Error analyzing reference ability:', error);
        return { score: 0.5, analysis: 'Error analyzing reference ability', humanVsAI: "Human: concrete examples, idiosyncratic details\nAI: generic examples, references to studies" };
      }),
      innovationFeatureMatrix.analyzeAmbiguityHandling(text).catch(error => {
        console.error('Error analyzing ambiguity handling:', error);
        return { score: 0.5, analysis: 'Error analyzing ambiguity handling', humanVsAI: "Human: temporary contradictions, self-correction\nAI: forced consistency, avoidance of uncertainty" };
      }),
      innovationFeatureMatrix.analyzeCreativeThinking(text).catch(error => {
        console.error('Error analyzing creative thinking:', error);
        return { score: 0.5, analysis: 'Error analyzing creative thinking', humanVsAI: "Human: cross-domain analogies, imperfect but novel ideas\nAI: pattern-based innovation, formulaic creativity" };
      }),
      innovationFeatureMatrix.analyzeTimePerception(text, responseDelays || []).catch(error => {
        console.error('Error analyzing time perception:', error);
        return { score: 0.5, analysis: 'Error analyzing time perception', humanVsAI: "Human: reasonable delays, vague time references\nAI: instant responses, precise time references" };
      })
    ]);

    // Calculate overall human-likeness score
    const innovationFeatureScore = innovationFeatureMatrix.calculateOverallScore({
      semanticElasticity: semanticElasticityResult.score,
      emotionalExpression: emotionalExpressionResult.score,
      referenceAbility: referenceAbilityResult.score,
      ambiguityHandling: ambiguityHandlingResult.score,
      creativeThinking: creativeThinkingResult.score,
      timePerception: timePerceptionResult.score
    });

    // Combine scores (weighted average)
    const overallHumanLikenessScore = (
      (aiSimilarityScore * 0.4) +
      (innovationFeatureScore * 0.6)
    );

    // Determine final classification
    let classification = 'Undetermined';
    if (overallHumanLikenessScore >= 0.7) {
      classification = 'Human';
    } else if (overallHumanLikenessScore <= 0.3) {
      classification = 'AI';
    } else {
      classification = 'Ambiguous';
    }

    // Store results in Supabase if sessionId is provided
    if (sessionId) {
      try {
        await supabase.from('analysis_results').insert({
          session_id: sessionId,
          text: text,
          ai_similarity_score: aiSimilarityScore,
          innovation_feature_score: innovationFeatureScore,
          overall_score: overallHumanLikenessScore,
          classification: classification,
          text_structure: textStructure,
          vocabulary_complexity: vocabularyComplexity,
          emotional_fluctuation: emotionalFluctuation,
          creative_divergence: creativeDivergence,
          semantic_elasticity: semanticElasticityResult.score,
          emotional_expression: emotionalExpressionResult.score,
          reference_ability: referenceAbilityResult.score,
          ambiguity_handling: ambiguityHandlingResult.score,
          creative_thinking: creativeThinkingResult.score,
          time_perception: timePerceptionResult.score
        });
      } catch (supabaseError) {
        console.warn('Supabase error, falling back to mock:', supabaseError);

        // Fallback to mock implementation
        if (!global.mockAnalysisResults) {
          global.mockAnalysisResults = new Map();
        }

        if (!global.mockAnalysisResults.has(sessionId)) {
          global.mockAnalysisResults.set(sessionId, []);
        }

        const analysisResults = global.mockAnalysisResults.get(sessionId);
        analysisResults?.push({
          id: Date.now().toString(),
          session_id: sessionId,
          text: text,
          ai_similarity_score: aiSimilarityScore,
          innovation_feature_score: innovationFeatureScore,
          overall_score: overallHumanLikenessScore,
          classification: classification,
          text_structure: textStructure,
          vocabulary_complexity: vocabularyComplexity,
          emotional_fluctuation: emotionalFluctuation,
          creative_divergence: creativeDivergence,
          semantic_elasticity: semanticElasticityResult.score,
          emotional_expression: emotionalExpressionResult.score,
          reference_ability: referenceAbilityResult.score,
          ambiguity_handling: ambiguityHandlingResult.score,
          creative_thinking: creativeThinkingResult.score,
          time_perception: timePerceptionResult.score,
          created_at: new Date().toISOString()
        });
      }
    }

    // Return analysis results
    return NextResponse.json({
      textStructure,
      aiSimilarity: {
        vocabularyComplexity,
        emotionalFluctuation,
        creativeDivergence,
        overallScore: aiSimilarityScore
      },
      innovationFeatures: {
        semanticElasticity: {
          score: semanticElasticityResult.score,
          analysis: semanticElasticityResult.analysis,
          humanVsAI: semanticElasticityResult.humanVsAI
        },
        emotionalExpression: {
          score: emotionalExpressionResult.score,
          analysis: emotionalExpressionResult.analysis,
          humanVsAI: emotionalExpressionResult.humanVsAI
        },
        referenceAbility: {
          score: referenceAbilityResult.score,
          analysis: referenceAbilityResult.analysis,
          humanVsAI: referenceAbilityResult.humanVsAI
        },
        ambiguityHandling: {
          score: ambiguityHandlingResult.score,
          analysis: ambiguityHandlingResult.analysis,
          humanVsAI: ambiguityHandlingResult.humanVsAI
        },
        creativeThinking: {
          score: creativeThinkingResult.score,
          analysis: creativeThinkingResult.analysis,
          humanVsAI: creativeThinkingResult.humanVsAI
        },
        timePerception: {
          score: timePerceptionResult.score,
          analysis: timePerceptionResult.analysis,
          humanVsAI: timePerceptionResult.humanVsAI
        },
        overallScore: innovationFeatureScore
      },
      overallHumanLikenessScore,
      classification
    });
  } catch (error) {
    console.error('Error analyzing text:', error);
    return NextResponse.json(
      { error: 'Failed to analyze text' },
      { status: 500 }
    );
  }
}
