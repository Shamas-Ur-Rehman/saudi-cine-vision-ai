
-- Create the chat_messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'bot')),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create or replace the function to get chat messages
CREATE OR REPLACE FUNCTION public.get_chat_messages()
RETURNS TABLE (
  id UUID,
  text TEXT,
  sender TEXT,
  timestamp TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cm.id, 
    cm.text, 
    cm.sender, 
    cm.timestamp
  FROM 
    public.chat_messages cm
  ORDER BY 
    cm.timestamp ASC;
END;
$$ LANGUAGE plpgsql;

-- Enable row-level security
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (this is a public chat)
CREATE POLICY "Allow public access to chat messages" 
ON public.chat_messages
FOR ALL 
USING (true);

-- Grant execute permission on the function to the anon role
GRANT EXECUTE ON FUNCTION public.get_chat_messages() TO anon;
GRANT EXECUTE ON FUNCTION public.get_chat_messages() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_chat_messages() TO service_role;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
