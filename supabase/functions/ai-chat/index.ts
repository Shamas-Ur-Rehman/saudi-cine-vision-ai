
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

    // Get relevant production data from Supabase
    const { data: scenes } = await supabase
      .from('scenes')
      .select('*, crew_members!scene_crew(name, role)');
    
    const { data: crewMembers } = await supabase
      .from('crew_members')
      .select('*');

    // Create context from production data
    const context = `
      Current production state:
      Scenes: ${JSON.stringify(scenes)}
      Crew: ${JSON.stringify(crewMembers)}
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant for a film production team. You have access to current production data and can help with scheduling, crew management, and general production queries. Always be professional and concise. Here's the current production context: ${context}`
          },
          { role: 'user', content: message }
        ],
      }),
    });

    const aiResponse = await response.json();
    const aiMessage = aiResponse.choices[0].message.content;

    // Store the conversation in the database
    await supabase.from('chat_messages').insert([
      { text: message, sender: 'user' },
      { text: aiMessage, sender: 'bot' }
    ]);

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
