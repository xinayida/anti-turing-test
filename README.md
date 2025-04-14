# Anti-Turing Test

A revolutionary application that flips the traditional Turing Test paradigm by challenging humans to prove they're not AI.

## Core Functionality Modules

### 1. Dynamic Semantic Analysis Engine
- **Dual-model architecture**: Grok-3 generates "AI-style ideal answers" while traditional NLP models (LSTM+Attention) analyze text structure features
- **Real-time interaction protocol**: Initializes 10 categories of open-ended questions and generates follow-up questions based on user responses

### 2. Multi-dimensional AI Similarity Scoring
| Indicator | Detection Dimension | Algorithm Principle |
|-----------|---------------------|---------------------|
| Vocabulary Complexity | Academic vocabulary density, connector word frequency | TF-IDF weighted Markov chain |
| Emotional Fluctuation Value | Emotional polarity standard deviation (10-second sliding window) | VADER sentiment analysis + dynamic time warping |
| Creative Divergence Index | Concept jump distance (Word2Vec vector space) | Knowledge graph-based association decay algorithm |

### 3. Innovation Feature Matrix
| Dimension | Detection Target | Human vs. AI Characteristics |
|-----------|------------------|------------------------------|
| Semantic Elasticity | Response flexibility and contextual adaptation | Human: natural topic transitions, acknowledges knowledge gaps<br>AI: rigid logical structure, overuses transition phrases |
| Emotional Expression | Richness and authenticity of emotional expression | Human: micro-emotional fluctuations, asymmetric responses<br>AI: flat emotional tone, excessive political correctness |
| Reference Ability | Ability to reference personal experiences and specific details | Human: concrete examples ("last week's client meeting")<br>AI: generic examples ("according to relevant research") |
| Ambiguity Handling | Performance when handling ambiguous/conflicting information | Human: temporary contradictions, self-correction<br>AI: forced consistency, avoidance of uncertainty |
| Creative Thinking | Creative association and unconventional solution capabilities | Human: cross-domain analogies, imperfect but novel ideas<br>AI: pattern-based innovation, formulaic creativity |
| Time Perception | Response rhythm and naturalness of time-related expressions | Human: reasonable delays (thinking time), vague time references<br>AI: instant responses, precise time references |

## Technical Architecture
- Frontend interaction layer
- Edge computing node
- Semantic analysis microservice cluster
- Feature vector database
- Dynamic scoring engine
- Blockchain verification system

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/anti-turing-test.git
cd anti-turing-test
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Grok API Configuration
GROK_API_KEY=your_grok_api_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Database Setup
1. Create a new Supabase project
2. Run the SQL script in `supabase/schema.sql` to set up the database schema

## Features
- Dynamic question generation based on user responses
- Real-time analysis of text structure, vocabulary complexity, emotional fluctuation, and creative divergence
- Comprehensive evaluation of human-like communication patterns
- Detailed results with visualizations and explanations

## License
This project is licensed under the MIT License - see the LICENSE file for details.
