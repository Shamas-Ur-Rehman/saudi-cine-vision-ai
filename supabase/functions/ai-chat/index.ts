
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT token from request headers
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid Authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // NOTE: In this implementation, we skip using OpenAI api key from secrets,
    // Instead, we call the passed custom `/sk-proj-...` endpoint you provided.

    const { message } = await req.json();

    // Use your provided OpenAI endpoint/key directly:
    // (Assume your endpoint is a custom OpenAI-compatible proxy.)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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/",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant for a film production team. Always be professional and concise.`
          },
          { role: 'user', content: message }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: errorText }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiResponse = await response.json();
    const aiMessage = (aiResponse.choices && aiResponse.choices[0].message.content) || "Sorry, no response.";

    return new Response(JSON.stringify({ response: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
