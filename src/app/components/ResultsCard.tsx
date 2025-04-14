import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface FeatureResult {
  score: number;
  analysis: string;
  humanVsAI: string;
}

interface ResultsCardProps {
  textStructure: {
    lexicalDiversity: number;
    avgSentenceLength: number;
    keyTerms: { term: string; score: number }[];
    tokenCount: number;
    sentenceCount: number;
  };
  aiSimilarity: {
    vocabularyComplexity: number;
    emotionalFluctuation: number;
    creativeDivergence: number;
    overallScore: number;
  };
  innovationFeatures: {
    semanticElasticity: FeatureResult;
    emotionalExpression: FeatureResult;
    referenceAbility: FeatureResult;
    ambiguityHandling: FeatureResult;
    creativeThinking: FeatureResult;
    timePerception: FeatureResult;
    overallScore: number;
  };
  overallHumanLikenessScore: number;
  classification: string;
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  textStructure,
  aiSimilarity,
  innovationFeatures,
  overallHumanLikenessScore,
  classification
}) => {
  // Helper function to format scores as percentages
  const formatScore = (score: number | null | undefined) => {
    if (score == null) return 'N/A';
    return `${Math.round(score * 100)}%`;
  };

  // Helper function to determine color based on score
  const getScoreColor = (score: number | null | undefined, isHumanScore = true) => {
    // Return default color if score is null or undefined
    if (score == null) return 'text-gray-600';

    // For human scores, higher is better (more human-like)
    // For AI scores, lower is better (less AI-like)
    const adjustedScore = isHumanScore ? score : 1 - score;

    if (adjustedScore >= 0.7) return 'text-green-600';
    if (adjustedScore <= 0.3) return 'text-red-600';
    return 'text-yellow-600';
  };

  // Reference to the results card for export functionality
  const resultsCardRef = useRef<HTMLDivElement>(null);

  // Function to create a simplified version of the results card for export
  const createExportableVersion = () => {
    if (!resultsCardRef.current) return null;

    // Create a new div element that will be a simplified version of the results card
    const exportDiv = document.createElement('div');
    exportDiv.style.backgroundColor = '#f0f4f8';
    exportDiv.style.padding = '24px';
    exportDiv.style.borderRadius = '8px';
    exportDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    exportDiv.style.fontFamily = 'Arial, sans-serif';
    exportDiv.style.color = '#000000';
    exportDiv.style.width = '800px';
    exportDiv.style.margin = '0 auto';

    // Clone the content of the results card
    exportDiv.innerHTML = resultsCardRef.current.innerHTML;

    // Replace all Tailwind classes with inline styles
    const elements = exportDiv.querySelectorAll('*');
    elements.forEach(el => {
      const element = el as HTMLElement;

      // Remove all classes (which might contain Tailwind classes with oklch colors)
      element.removeAttribute('class');

      // Apply basic styling
      element.style.margin = '0';
      element.style.padding = '0';

      // Style headings
      if (element.tagName === 'H2') {
        element.style.fontSize = '24px';
        element.style.fontWeight = 'bold';
        element.style.marginBottom = '16px';
        element.style.color = '#1e3a8a'; // dark blue
      }

      if (element.tagName === 'H3') {
        element.style.fontSize = '20px';
        element.style.fontWeight = 'bold';
        element.style.marginBottom = '12px';
        element.style.color = '#1e3a8a'; // dark blue
      }

      // Style buttons (hide them as they're not needed in export)
      if (element.tagName === 'BUTTON') {
        element.style.display = 'none';
      }

      // Style score bars
      if (element.classList && element.classList.contains('rounded-full')) {
        if (element.classList.contains('bg-gray-200')) {
          element.style.backgroundColor = '#e5e7eb';
          element.style.height = '10px';
          element.style.width = '100%';
          element.style.borderRadius = '9999px';
        } else if (element.classList.contains('bg-blue-600')) {
          element.style.backgroundColor = '#2563eb';
          element.style.height = '10px';
          element.style.borderRadius = '9999px';
        } else if (element.classList.contains('bg-purple-600')) {
          element.style.backgroundColor = '#9333ea';
          element.style.height = '10px';
          element.style.borderRadius = '9999px';
        }
      }

      // Style text colors based on the original classes
      if (element.classList) {
        if (element.classList.contains('text-green-600')) {
          element.style.color = '#16a34a';
        } else if (element.classList.contains('text-red-600')) {
          element.style.color = '#dc2626';
        } else if (element.classList.contains('text-yellow-600')) {
          element.style.color = '#ca8a04';
        } else if (element.classList.contains('text-gray-600')) {
          element.style.color = '#4b5563';
        } else if (element.classList.contains('text-gray-900')) {
          element.style.color = '#111827';
        } else if (element.classList.contains('text-indigo-900')) {
          element.style.color = '#312e81';
        } else if (element.classList.contains('text-purple-800')) {
          element.style.color = '#6b21a8';
        } else if (element.classList.contains('text-green-800')) {
          element.style.color = '#166534';
        } else if (element.classList.contains('text-blue-800')) {
          element.style.color = '#1e40af';
        }
      }

      // Style background colors based on the original classes
      if (element.classList) {
        if (element.classList.contains('bg-indigo-50')) {
          element.style.backgroundColor = '#eef2ff';
        } else if (element.classList.contains('bg-purple-50')) {
          element.style.backgroundColor = '#faf5ff';
        } else if (element.classList.contains('bg-green-50')) {
          element.style.backgroundColor = '#f0fdf4';
        } else if (element.classList.contains('bg-blue-50')) {
          element.style.backgroundColor = '#eff6ff';
        }
      }

      // Style borders
      if (element.classList) {
        if (element.classList.contains('border-indigo-100')) {
          element.style.border = '1px solid #e0e7ff';
        } else if (element.classList.contains('border-purple-200')) {
          element.style.border = '1px solid #e9d5ff';
        } else if (element.classList.contains('border-green-200')) {
          element.style.border = '1px solid #bbf7d0';
        } else if (element.classList.contains('border-blue-200')) {
          element.style.border = '1px solid #bfdbfe';
        }
      }
    });

    // Add the exportable div to the document temporarily
    document.body.appendChild(exportDiv);

    return exportDiv;
  };

  // Function to export as PDF
  const exportAsPDF = () => {
    try {
      const exportDiv = createExportableVersion();
      if (!exportDiv) return;

      html2canvas(exportDiv, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true,
      }).then(canvas => {
        // Remove the temporary div
        exportDiv.remove();

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        // Calculate the width and height to fit in PDF
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('anti-turing-test-results.pdf');
      }).catch(error => {
        // Remove the temporary div in case of error
        exportDiv.remove();
        console.error('Error generating PDF:', error);
        alert('There was an error generating the PDF. Please try again.');
      });
    } catch (error) {
      console.error('Error in PDF export process:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  };

  // Function to export as image
  const exportAsImage = () => {
    try {
      const exportDiv = createExportableVersion();
      if (!exportDiv) return;

      html2canvas(exportDiv, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true,
      }).then(canvas => {
        // Remove the temporary div
        exportDiv.remove();

        const link = document.createElement('a');
        link.download = 'anti-turing-test-results.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }).catch(error => {
        // Remove the temporary div in case of error
        exportDiv.remove();
        console.error('Error generating image:', error);
        alert('There was an error generating the image. Please try again.');
      });
    } catch (error) {
      console.error('Error in image export process:', error);
      alert('There was an error generating the image. Please try again.');
    }
  };

  // Helper function to render a score bar
  const ScoreBar = ({ score, label, isHumanScore = true }: { score: number | null | undefined; label: string; isHumanScore?: boolean }) => (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-gray-900">{label}</span>
        <span className={getScoreColor(score, isHumanScore)}>{formatScore(score)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${isHumanScore ? 'bg-blue-600' : 'bg-purple-600'}`}
          style={{ width: score != null ? `${score * 100}%` : '0%' }}
        ></div>
      </div>
    </div>
  );

  return (
    <div ref={resultsCardRef} className="bg-indigo-50 rounded-lg shadow-lg p-6 border border-indigo-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center text-indigo-900">Analysis Results</h2>
        <div className="flex space-x-2">
          <button
            onClick={exportAsPDF}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            PDF
          </button>
          <button
            onClick={exportAsImage}
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Image
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2 text-center">
              <span className={getScoreColor(overallHumanLikenessScore)}>
                {formatScore(overallHumanLikenessScore)}
              </span>
            </div>
            <div className="text-xl font-semibold">
              <span className='text-black'> Classification:</span>
              <span className={`ml-2 ${
                classification === 'Human' ? 'text-green-600' :
                classification === 'AI' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {classification}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Similarity Scores */}
        <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 text-purple-800">AI Similarity Analysis</h3>

          <ScoreBar
            score={aiSimilarity?.vocabularyComplexity}
            label="Vocabulary Complexity"
            isHumanScore={false}
          />
          <ScoreBar
            score={aiSimilarity?.emotionalFluctuation}
            label="Emotional Fluctuation"
            isHumanScore={false}
          />
          <ScoreBar
            score={aiSimilarity?.creativeDivergence}
            label="Creative Divergence"
            isHumanScore={false}
          />
          <div className="mt-4 pt-4 border-t">
            <ScoreBar
              score={aiSimilarity?.overallScore}
              label="Overall AI Similarity"
              isHumanScore={false}
            />
          </div>
        </div>

        {/* Innovation Feature Matrix */}
        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 text-green-800">Innovation Feature Matrix</h3>

          <ScoreBar
            score={innovationFeatures.semanticElasticity?.score}
            label="Semantic Elasticity"
          />
          <ScoreBar
            score={innovationFeatures.emotionalExpression?.score}
            label="Emotional Expression"
          />
          <ScoreBar
            score={innovationFeatures.referenceAbility?.score}
            label="Reference Ability"
          />
          <ScoreBar
            score={innovationFeatures.ambiguityHandling?.score}
            label="Ambiguity Handling"
          />
          <ScoreBar
            score={innovationFeatures.creativeThinking?.score}
            label="Creative Thinking"
          />
          <ScoreBar
            score={innovationFeatures.timePerception?.score}
            label="Time Perception"
          />
          <div className="mt-4 pt-4 border-t">
            <ScoreBar
              score={innovationFeatures.overallScore}
              label="Overall Human Features"
            />
          </div>
        </div>
      </div>

      {/* Text Structure Analysis */}
      <div className="mt-6 border border-blue-200 bg-blue-50 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">Text Structure Analysis</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-900"><span className="font-semibold">Lexical Diversity:</span> {textStructure.lexicalDiversity != null ? textStructure.lexicalDiversity.toFixed(2) : 'N/A'}</p>
            <p className="text-gray-900"><span className="font-semibold">Avg. Sentence Length:</span> {textStructure.avgSentenceLength != null ? textStructure.avgSentenceLength.toFixed(1) : 'N/A'} words</p>
            <p className="text-gray-900"><span className="font-semibold">Token Count:</span> {textStructure.tokenCount ?? 'N/A'}</p>
            <p className="text-gray-900"><span className="font-semibold">Sentence Count:</span> {textStructure.sentenceCount ?? 'N/A'}</p>
          </div>

          <div>
            <p className="font-semibold mb-2 text-gray-900">Key Terms:</p>
            <ul className="list-disc pl-5">
              {textStructure.keyTerms && textStructure.keyTerms.length > 0 ?
                textStructure.keyTerms.map((term, index) => (
                  <li key={index} className="text-gray-900">
                    {term.term} <span className="text-gray-600">({term.score != null ? term.score.toFixed(2) : 'N/A'})</span>
                  </li>
                ))
              : <li className="text-gray-900">No key terms available</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Feature Analysis */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-indigo-800">Detailed Feature Analysis</h3>

        <div className="space-y-4">
          {Object.entries(innovationFeatures).map(([key, value]) => {
            // Skip the overallScore entry
            if (key === 'overallScore') return null;

            const feature = value as FeatureResult;
            if (!feature) return null;

            return (
              <div key={key} className="border border-indigo-200 bg-indigo-50 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2 capitalize text-indigo-800">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-gray-900">{feature.analysis || 'No analysis available'}</p>
                  </div>

                  <div className="bg-gray-100 p-3 rounded">
                    <p className="font-semibold mb-2 text-gray-900">Human vs AI Characteristics:</p>
                    <p className="whitespace-pre-line text-sm text-gray-800">{feature.humanVsAI || 'No comparison available'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
