import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for sessions when Supabase is not available
// Using global to share state between API routes
declare global {
  var mockSessions: Map<string, any>;
  var mockInteractions: Map<string, any[]>;
  var mockAnalysisResults: Map<string, any[]>;
}

// Initialize global mock storage
if (!global.mockSessions) {
  global.mockSessions = new Map();
}
if (!global.mockInteractions) {
  global.mockInteractions = new Map();
}
if (!global.mockAnalysisResults) {
  global.mockAnalysisResults = new Map();
}

export async function POST(request: NextRequest) {
  try {
    // Try to use Supabase first
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert({
          created_at: new Date().toISOString()
        })
        .select();

      if (!error) {
        return NextResponse.json({ sessionId: data[0].id });
      }
    } catch (supabaseError) {
      console.warn('Supabase error, falling back to mock:', supabaseError);
    }

    // Fallback to mock implementation
    const sessionId = uuidv4();
    global.mockSessions.set(sessionId, {
      id: sessionId,
      created_at: new Date().toISOString()
    });

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Try to use Supabase first
    try {
      // Get session data
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (!sessionError) {
        // Get interactions for this session
        const { data: interactions, error: interactionsError } = await supabase
          .from('interactions')
          .select('*')
          .eq('session_id', sessionId)
          .order('created_at', { ascending: true });

        if (interactionsError) throw interactionsError;

        // Get analysis results for this session
        const { data: analysisResults, error: analysisError } = await supabase
          .from('analysis_results')
          .select('*')
          .eq('session_id', sessionId)
          .order('created_at', { ascending: true });

        if (analysisError) throw analysisError;

        return NextResponse.json({
          session,
          interactions,
          analysisResults
        });
      }
    } catch (supabaseError) {
      console.warn('Supabase error, falling back to mock:', supabaseError);
    }

    // Fallback to mock implementation
    const session = global.mockSessions.get(sessionId) || null;

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const interactions = global.mockInteractions.get(sessionId) || [];
    const analysisResults = global.mockAnalysisResults.get(sessionId) || [];

    return NextResponse.json({
      session,
      interactions,
      analysisResults
    });
  } catch (error) {
    console.error('Error getting session data:', error);
    return NextResponse.json(
      { error: 'Failed to get session data' },
      { status: 500 }
    );
  }
}
