'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import ResultsCard from '../components/ResultsCard';

export default function TestPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [originalQuestion, setOriginalQuestion] = useState<string>('');
  const [questionDepth, setQuestionDepth] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize session and get first question
  useEffect(() => {
    const initializeSession = async () => {
      try {
        setIsLoading(true);

        // Create a new session
        const sessionResponse = await fetch('/api/sessions', {
          method: 'POST'
        });

        if (!sessionResponse.ok) {
          throw new Error('Failed to create session');
        }

        const sessionData = await sessionResponse.json();
        setSessionId(sessionData.sessionId);

        // Get the first question
        const questionResponse = await fetch('/api/questions');

        if (!questionResponse.ok) {
          throw new Error('Failed to get question');
        }

        const questionData = await questionResponse.json();
        setCurrentQuestion(questionData.question);
        setOriginalQuestion(questionData.question);
      } catch (err) {
        setError('Failed to initialize test. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  // Handle user response submission
  const handleSubmitResponse = async (response: string, responseDelays: number[]) => {
    try {
      setIsLoading(true);

      if (questionDepth < 3) {
        // Get follow-up question
        const followUpResponse = await fetch('/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            originalQuestion,
            userResponse: response,
            depth: questionDepth,
            sessionId
          })
        });

        if (!followUpResponse.ok) {
          throw new Error('Failed to get follow-up question');
        }

        const followUpData = await followUpResponse.json();
        setCurrentQuestion(followUpData.followUpQuestion);
        setQuestionDepth(questionDepth + 1);
      } else {
        // Final response, analyze the text
        setIsAnalyzing(true);

        const analysisResponse = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: response,
            responseDelays,
            sessionId
          })
        });

        if (!analysisResponse.ok) {
          throw new Error('Failed to analyze response');
        }

        const analysisData = await analysisResponse.json();
        setResults(analysisData);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  // Reset the test
  const handleReset = async () => {
    try {
      setIsLoading(true);
      setResults(null);
      setQuestionDepth(1);

      // Create a new session
      const sessionResponse = await fetch('/api/sessions', {
        method: 'POST'
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create session');
      }

      const sessionData = await sessionResponse.json();
      setSessionId(sessionData.sessionId);

      // Get a new question
      const questionResponse = await fetch('/api/questions');

      if (!questionResponse.ok) {
        throw new Error('Failed to get question');
      }

      const questionData = await questionResponse.json();
      setCurrentQuestion(questionData.question);
      setOriginalQuestion(questionData.question);
    } catch (err) {
      setError('Failed to reset test. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-sm underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-900">Anti-Turing Test</h1>
          <p className="text-lg text-white-900">
            {results
              ? 'Your results are ready! See how human-like your responses are.'
              : `Question ${questionDepth} of 3: Respond naturally to the question below. Our AI will analyze your response patterns.`
            }
          </p>
        </div>

        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-lg text-white-900 font-medium">Analyzing your responses...</p>
          </div>
        ) : results ? (
          <div>
            <ResultsCard
              textStructure={results.textStructure}
              aiSimilarity={results.aiSimilarity}
              innovationFeatures={results.innovationFeatures}
              overallHumanLikenessScore={results.overallHumanLikenessScore}
              classification={results.classification}
            />

            <div className="mt-8 text-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Take the Test Again
              </button>
            </div>
          </div>
        ) : (
          <QuestionCard
            question={currentQuestion}
            onSubmit={handleSubmitResponse}
            isLoading={isLoading}
          />
        )}
      </div>
    </Layout>
  );
}
