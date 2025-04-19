
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = 'https://agqixwckqnvbdiqfdgii.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    console.log("Received message:", message);

    // Get relevant production data from Supabase
    const { data: scenes, error: scenesError } = await supabase
      .from('scenes')
      .select('*, crew_members!scene_crew(name, role)');
    
    if (scenesError) console.error("Error fetching scenes:", scenesError);
    
    const { data: crewMembers, error: crewError } = await supabase
      .from('crew_members')
      .select('*');
    
    if (crewError) console.error("Error fetching crew members:", crewError);

    // Create context from production data
    const context = `
      Current production state:
      Scenes: ${JSON.stringify(scenes || [])}
      Crew: ${JSON.stringify(crewMembers || [])}
    `;

    console.log("Sending request to OpenAI...");
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant for a film production team. You have access to current production data and can help with scheduling, crew management, and general production queries. Always be professional and concise. Here's the current production context: ${context}`
          },
          { role: 'user', content: message }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const aiResponse = await response.json();
    const aiMessage = aiResponse.choices[0].message.content;
    console.log("Received AI response:", aiMessage);

    // Store the conversation in the database
    const { error: insertUserError } = await supabase.from('chat_messages').insert([
      { text: message, sender: 'user' }
    ]);
    if (insertUserError) console.error("Error inserting user message:", insertUserError);
    
    const { error: insertBotError } = await supabase.from('chat_messages').insert([
      { text: aiMessage, sender: 'bot' }
    ]);
    if (insertBotError) console.error("Error inserting bot message:", insertBotError);

    return new Response(JSON.stringify({ response: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
