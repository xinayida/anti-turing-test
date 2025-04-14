import Image from "next/image";
import Link from "next/link";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900">Anti-Turing Test</h1>
          <p className="text-xl mb-8 text-gray-900">
            Can AI detect if you're human? Put your humanity to the test with our
            advanced AI detection system.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              href="/test"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Take the Test
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Dynamic Semantic Analysis</h2>
            <p className="text-gray-900">
              Our dual-model architecture uses Grok-3 to generate "AI-style ideal answers" while
              traditional NLP models analyze text structure features to identify human patterns.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg shadow-md border border-purple-100">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Multi-dimensional AI Similarity</h2>
            <p className="text-gray-900">
              We analyze vocabulary complexity, emotional fluctuation, and creative divergence
              to determine how closely your responses match AI-generated text patterns.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-100">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Innovation Feature Matrix</h2>
            <p className="text-gray-900">
              Our system evaluates semantic elasticity, emotional expression, reference ability,
              ambiguity handling, creative thinking, and time perception to identify human traits.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">How It Works</h2>
          <p className="text-lg mb-8 text-gray-900">
            Answer a series of open-ended questions while our AI analyzes your responses.
            We'll measure various aspects of your communication style to determine if you're
            human or AI. The results might surprise you!
          </p>

          <Link
            href="/test"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Start Now
          </Link>
        </div>
      </div>
    </Layout>
  );
}
