import React from 'react';
import Layout from '../components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-900">About the Anti-Turing Test</h1>

        <div className="prose lg:prose-xl prose-headings:text-indigo-800 prose-p:text-gray-900">
          <p>
            The Anti-Turing Test is a revolutionary approach to distinguishing between human and AI-generated text.
            Unlike the traditional Turing Test, which challenges AI to appear human, our test flips the paradigm by
            challenging humans to prove they're not AI.
          </p>

          <h2>Core Functionality Modules</h2>

          <h3>1. Dynamic Semantic Analysis Engine</h3>
          <p>
            Our dual-model architecture leverages GPT-4 to generate "AI-style ideal answers" as a reference point,
            while traditional NLP models (LSTM+Attention) analyze text structure features to identify patterns unique
            to human communication.
          </p>
          <p>
            The real-time interaction protocol initializes from a database of open-ended questions across 10 categories,
            including workplace conflicts, emergency responses, and ethical dilemmas. Based on your responses, the system
            generates follow-up questions that dig deeper into your thought processes, while recording response delay
            patterns that are characteristic of human hesitation.
          </p>

          <h3>2. Multi-dimensional AI Similarity Scoring</h3>
          <p>
            We analyze your responses across multiple dimensions:
          </p>
          <ul>
            <li>
              <strong>Vocabulary Complexity:</strong> Using TF-IDF weighted Markov chains to assess academic vocabulary
              density and connector word frequency.
            </li>
            <li>
              <strong>Emotional Fluctuation Value:</strong> Measuring emotional polarity standard deviation using VADER
              sentiment analysis with dynamic time warping.
            </li>
            <li>
              <strong>Creative Divergence Index:</strong> Calculating concept jump distances in Word2Vec vector space
              using knowledge graph-based association decay algorithms.
            </li>
          </ul>

          <h3>3. Innovation Feature Matrix</h3>
          <p>
            Our system evaluates six key dimensions that differentiate human from AI communication:
          </p>
          <ol>
            <li>
              <strong>Semantic Elasticity:</strong> Humans show natural topic transitions and acknowledge knowledge gaps,
              while AI tends toward rigid logical structures and overuse of transition phrases.
            </li>
            <li>
              <strong>Emotional Expression:</strong> Humans display micro-emotional fluctuations and asymmetric responses,
              while AI typically exhibits flat emotional tone and excessive political correctness.
            </li>
            <li>
              <strong>Reference Ability:</strong> Humans provide concrete, specific examples from personal experience,
              while AI relies on generalized cases and research references.
            </li>
            <li>
              <strong>Ambiguity Handling:</strong> Humans demonstrate temporary contradictions and self-correction,
              while AI forces consistency and avoids uncertainty.
            </li>
            <li>
              <strong>Creative Thinking:</strong> Humans make cross-domain analogies and imperfect but novel connections,
              while AI produces pattern-based, formulaic creativity.
            </li>
            <li>
              <strong>Time Perception:</strong> Humans show reasonable response delays and use vague time references,
              while AI responds instantly and uses precise time references.
            </li>
          </ol>

          <h2>Technical Architecture</h2>
          <p>
            The Anti-Turing Test is built on a sophisticated technical stack:
          </p>
          <ul>
            <li><strong>Frontend Interaction Layer:</strong> A responsive web interface built with Next.js and React</li>
            <li><strong>Edge Computing Node:</strong> For low-latency processing of user inputs</li>
            <li><strong>Semantic Analysis Microservice Cluster:</strong> Distributed NLP processing</li>
            <li><strong>Feature Vector Database:</strong> For storing and retrieving analysis patterns</li>
            <li><strong>Dynamic Scoring Engine:</strong> Real-time evaluation of human-likeness</li>
            <li><strong>Blockchain Verification System:</strong> For tamper-proof result certification</li>
          </ul>

          <h2>Why It Matters</h2>
          <p>
            As AI-generated content becomes increasingly sophisticated, the ability to distinguish between human and
            machine-generated text is more important than ever. The Anti-Turing Test provides a framework for understanding
            the unique qualities of human communication that AI still struggles to replicate perfectly.
          </p>
          <p>
            Whether you're a researcher, educator, content creator, or simply curious about the differences between
            human and AI communication, our test offers valuable insights into the nature of language, creativity,
            and human cognition.
          </p>
        </div>
      </div>
    </Layout>
  );
}
