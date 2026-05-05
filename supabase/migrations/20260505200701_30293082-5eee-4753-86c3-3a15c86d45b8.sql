
CREATE OR REPLACE FUNCTION public.enforce_pub_chat_identity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  jwt_claims jsonb;
  is_anon boolean;
  user_email text;
  local_part text;
BEGIN
  jwt_claims := nullif(current_setting('request.jwt.claims', true), '')::jsonb;
  is_anon := COALESCE((jwt_claims->>'is_anonymous')::boolean, true);
  user_email := jwt_claims->>'email';

  IF NOT is_anon AND user_email IS NOT NULL AND user_email <> '' THEN
    local_part := substr(split_part(user_email, '@', 1), 1, 24);
    IF local_part = '' THEN
      local_part := 'Spieler';
    END IF;
    NEW.display_name := local_part;
    NEW.is_anonymous := false;
  ELSE
    NEW.is_anonymous := true;
    IF NEW.shift_number IS NULL OR NEW.shift_number < 1 THEN
      RAISE EXCEPTION 'shift_number required for anonymous pub chat';
    END IF;
    NEW.display_name := 'Layard · Schicht ' || NEW.shift_number::text;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_pub_chat_identity_trg ON public.pub_chat_messages;
CREATE TRIGGER enforce_pub_chat_identity_trg
BEFORE INSERT ON public.pub_chat_messages
FOR EACH ROW EXECUTE FUNCTION public.enforce_pub_chat_identity();

CREATE OR REPLACE FUNCTION public.enforce_toilet_graffiti_identity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  jwt_claims jsonb;
  is_anon boolean;
  user_email text;
  local_part text;
BEGIN
  jwt_claims := nullif(current_setting('request.jwt.claims', true), '')::jsonb;
  is_anon := COALESCE((jwt_claims->>'is_anonymous')::boolean, true);
  user_email := jwt_claims->>'email';

  IF NOT is_anon AND user_email IS NOT NULL AND user_email <> '' THEN
    local_part := substr(split_part(user_email, '@', 1), 1, 24);
    IF local_part = '' THEN
      local_part := 'Spieler';
    END IF;
    NEW.display_name := local_part;
    NEW.is_anonymous := false;
  ELSE
    NEW.is_anonymous := true;
    IF NEW.display_name !~ '^Layard · Schicht [0-9]{1,4}$' THEN
      NEW.display_name := 'Layard · Schicht ?';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_toilet_graffiti_identity_trg ON public.toilet_graffiti;
CREATE TRIGGER enforce_toilet_graffiti_identity_trg
BEFORE INSERT ON public.toilet_graffiti
FOR EACH ROW EXECUTE FUNCTION public.enforce_toilet_graffiti_identity();
