ALTER TABLE public.npc_memory ADD COLUMN IF NOT EXISTS run_id text NOT NULL DEFAULT 'legacy';
ALTER TABLE public.npc_gossip ADD COLUMN IF NOT EXISTS run_id text NOT NULL DEFAULT 'legacy';
ALTER TABLE public.npc_memory DROP CONSTRAINT IF EXISTS npc_memory_user_id_npc_id_key;
DROP INDEX IF EXISTS npc_memory_user_id_npc_id_key;
CREATE UNIQUE INDEX IF NOT EXISTS npc_memory_user_npc_run_key ON public.npc_memory (user_id, npc_id, run_id);
CREATE INDEX IF NOT EXISTS npc_gossip_user_run_idx ON public.npc_gossip (user_id, run_id);