-- Public read-only bucket for cached TTS audio
INSERT INTO storage.buckets (id, name, public)
VALUES ('tts-cache', 'tts-cache', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access
CREATE POLICY "TTS cache is publicly readable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'tts-cache');
