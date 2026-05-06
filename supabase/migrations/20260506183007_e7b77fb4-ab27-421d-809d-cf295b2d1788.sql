CREATE OR REPLACE FUNCTION public.try_increment_cloud_request_count(_user_id uuid, _hard_limit integer)
RETURNS TABLE(new_count integer, donation_unlocked boolean, limit_reached boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _unlocked boolean;
  _new_count integer;
BEGIN
  SELECT p.donation_unlocked INTO _unlocked
  FROM public.profiles p
  WHERE p.user_id = _user_id;

  IF _unlocked IS NULL THEN
    RETURN QUERY SELECT 0, false, false;
    RETURN;
  END IF;

  IF _unlocked THEN
    UPDATE public.profiles
    SET cloud_request_count = cloud_request_count + 1
    WHERE user_id = _user_id
    RETURNING cloud_request_count INTO _new_count;
    RETURN QUERY SELECT _new_count, true, false;
    RETURN;
  END IF;

  UPDATE public.profiles
  SET cloud_request_count = cloud_request_count + 1
  WHERE user_id = _user_id
    AND cloud_request_count < _hard_limit
  RETURNING cloud_request_count INTO _new_count;

  IF _new_count IS NULL THEN
    SELECT cloud_request_count INTO _new_count
    FROM public.profiles
    WHERE user_id = _user_id;
    RETURN QUERY SELECT COALESCE(_new_count, _hard_limit), false, true;
    RETURN;
  END IF;

  RETURN QUERY SELECT _new_count, false, false;
END;
$$;

REVOKE ALL ON FUNCTION public.try_increment_cloud_request_count(uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.try_increment_cloud_request_count(uuid, integer) TO service_role;