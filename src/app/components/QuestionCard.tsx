import React, { useState, useEffect, useRef } from 'react';

interface QuestionCardProps {
  question: string;
  onSubmit: (response: string, responseDelays: number[]) => void;
  isLoading?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSubmit,
  isLoading = false
}) => {
  const [response, setResponse] = useState('');
  const [responseDelays, setResponseDelays] = useState<number[]>([]);
  const [lastKeyTime, setLastKeyTime] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [question]);

  // Handle key press to record response delays
  const handleKeyPress = () => {
    const currentTime = Date.now();

    if (lastKeyTime) {
      const delay = currentTime - lastKeyTime;
      // Only record delays between 100ms and 10000ms (10 seconds)
      // to filter out anomalies
      if (delay >= 100 && delay <= 10000) {
        setResponseDelays(prev => [...prev, delay]);
      }
    }

    setLastKeyTime(currentTime);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (response.trim()) {
      onSubmit(response, responseDelays);
      setResponse('');
      setResponseDelays([]);
      setLastKeyTime(null);
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg shadow-lg p-6 mb-6 border border-blue-100">
      <h3 className="text-xl font-semibold mb-4 text-indigo-900">{question}</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            ref={textareaRef}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            rows={6}
            placeholder="Type your response here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={!response.trim() || isLoading}
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionCard;
