CREATE TABLE public.tetris_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  display_name text NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 40),
  score integer NOT NULL CHECK (score >= 0 AND score <= 10000000),
  lines integer NOT NULL CHECK (lines >= 0 AND lines <= 100000),
  level smallint NOT NULL CHECK (level >= 1 AND level <= 99),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX tetris_scores_score_idx ON public.tetris_scores (score DESC, created_at ASC);

GRANT SELECT ON public.tetris_scores TO anon;
GRANT SELECT, INSERT ON public.tetris_scores TO authenticated;
GRANT ALL ON public.tetris_scores TO service_role;

ALTER TABLE public.tetris_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tetris scores are public" ON public.tetris_scores
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "players insert own scores" ON public.tetris_scores
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);