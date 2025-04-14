-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create interactions table to store question-response pairs
CREATE TABLE IF NOT EXISTS interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  response TEXT NOT NULL,
  follow_up_question TEXT,
  depth INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analysis_results table to store the results of text analysis
CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  ai_similarity_score FLOAT NOT NULL,
  innovation_feature_score FLOAT NOT NULL,
  overall_score FLOAT NOT NULL,
  classification TEXT NOT NULL,
  text_structure JSONB,
  vocabulary_complexity FLOAT,
  emotional_fluctuation FLOAT,
  creative_divergence FLOAT,
  semantic_elasticity FLOAT,
  emotional_expression FLOAT,
  reference_ability FLOAT,
  ambiguity_handling FLOAT,
  creative_thinking FLOAT,
  time_perception FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policies for sessions
CREATE POLICY "Allow anonymous access to sessions" ON sessions
  FOR ALL USING (true);

-- Create policies for interactions
CREATE POLICY "Allow anonymous access to interactions" ON interactions
  FOR ALL USING (true);

-- Create policies for analysis_results
CREATE POLICY "Allow anonymous access to analysis_results" ON analysis_results
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_interactions_session_id ON interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_analysis_results_session_id ON analysis_results(session_id);
