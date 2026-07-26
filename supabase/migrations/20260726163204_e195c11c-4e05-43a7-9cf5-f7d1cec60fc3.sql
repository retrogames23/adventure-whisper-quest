
CREATE TABLE public.anon_cloud_usage (
  anon_id text PRIMARY KEY,
  request_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.anon_cloud_usage TO service_role;
ALTER TABLE public.anon_cloud_usage ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.try_increment_anon_cloud_request_count(_anon_id text, _hard_limit integer)
RETURNS TABLE(new_count integer, limit_reached boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _new_count integer;
BEGIN
  INSERT INTO public.anon_cloud_usage (anon_id, request_count)
  VALUES (_anon_id, 0)
  ON CONFLICT (anon_id) DO NOTHING;

  UPDATE public.anon_cloud_usage
  SET request_count = request_count + 1,
      updated_at = now()
  WHERE anon_id = _anon_id
    AND request_count < _hard_limit
  RETURNING request_count INTO _new_count;

  IF _new_count IS NULL THEN
    SELECT request_count INTO _new_count
    FROM public.anon_cloud_usage
    WHERE anon_id = _anon_id;
    RETURN QUERY SELECT COALESCE(_new_count, _hard_limit), true;
    RETURN;
  END IF;

  RETURN QUERY SELECT _new_count, false;
END;
$$;
