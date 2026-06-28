CREATE TABLE IF NOT EXISTS discovery_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text,
  selected_date date,
  selected_time text,
  project_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE discovery_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_anon_insert" ON discovery_calls FOR INSERT
  TO anon, authenticated WITH CHECK (true);
