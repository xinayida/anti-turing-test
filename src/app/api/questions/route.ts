import { NextRequest, NextResponse } from 'next/server';
import semanticAnalysisEngine from '@/app/modules/semanticAnalysisEngine';
import { supabase } from '@/app/lib/supabase';

// Reference to the mock storage from sessions route
// In a real app, you'd use a proper state management solution
declare global {
  var mockSessions: Map<string, any>;
  var mockInteractions: Map<string, any[]>;
  var mockAnalysisResults: Map<string, any[]>;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    // Get a random question from the specified category or a random category
    const question = semanticAnalysisEngine.getRandomQuestion(category || undefined);

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Error getting question:', error);
    return NextResponse.json(
      { error: 'Failed to get question' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { originalQuestion, userResponse, depth, sessionId } = await request.json();

    if (!originalQuestion || !userResponse) {
      return NextResponse.json(
        { error: 'Original question and user response are required' },
        { status: 400 }
      );
    }

    // Generate a follow-up question based on the user's response
    const followUpQuestion = await semanticAnalysisEngine.generateFollowUpQuestion(
      originalQuestion,
      userResponse,
      depth || 1
    );

    // Store the interaction in Supabase if sessionId is provided
    if (sessionId) {
      try {
        await supabase.from('interactions').insert({
          session_id: sessionId,
          question: originalQuestion,
          response: userResponse,
          follow_up_question: followUpQuestion,
          depth: depth || 1
        });
      } catch (supabaseError) {
        console.warn('Supabase error, falling back to mock:', supabaseError);

        // Fallback to mock implementation
        if (!global.mockInteractions) {
          global.mockInteractions = new Map();
        }

        if (!global.mockInteractions.has(sessionId)) {
          global.mockInteractions.set(sessionId, []);
        }

        const interactions = global.mockInteractions.get(sessionId);
        interactions?.push({
          id: Date.now().toString(),
          session_id: sessionId,
          question: originalQuestion,
          response: userResponse,
          follow_up_question: followUpQuestion,
          depth: depth || 1,
          created_at: new Date().toISOString()
        });
      }
    }

    return NextResponse.json({ followUpQuestion });
  } catch (error) {
    console.error('Error generating follow-up question:', error);
    return NextResponse.json(
      { error: 'Failed to generate follow-up question' },
      { status: 500 }
    );
  }
}
