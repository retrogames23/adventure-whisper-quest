ALTER TABLE public.tetris_scores RENAME TO blockfall_scores;
ALTER INDEX tetris_scores_score_idx RENAME TO blockfall_scores_score_idx;
ALTER POLICY "tetris scores are public" ON public.blockfall_scores RENAME TO "blockfall scores are public";