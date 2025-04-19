
-- Create the chat_messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'bot')),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable row-level security
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (this is a public chat)
CREATE POLICY "Allow public access to chat messages" 
ON public.chat_messages
FOR ALL 
USING (true);

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
