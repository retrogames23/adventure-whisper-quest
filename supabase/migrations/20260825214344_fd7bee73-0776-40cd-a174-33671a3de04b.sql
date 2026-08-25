drop policy if exists "players insert own scores" on public.blockfall_scores;
revoke insert, update, delete on public.blockfall_scores from authenticated, anon;
grant all on public.blockfall_scores to service_role;