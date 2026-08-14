-- Delete implausible existing entries first so constraints can be added
DELETE FROM public.blockfall_scores
WHERE score < 0
   OR lines < 0
   OR lines > 5000
   OR level < 1
   OR level > 99
   OR level <> LEAST(99, (lines / 10) + 1)
   OR score > (lines * 325 * level) + 100;

ALTER TABLE public.blockfall_scores
  ADD CONSTRAINT blockfall_scores_plausible_values CHECK (
    score >= 0
    AND lines >= 0
    AND lines <= 5000
    AND level >= 1
    AND level <= 99
    AND level = LEAST(99, (lines / 10) + 1)
    AND score <= (lines * 325 * level) + 100
  );