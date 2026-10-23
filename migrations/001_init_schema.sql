ALTER SYSTEM SET row_level_security = on;

CREATE TABLE organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  user_id UUID NOT NULL,
  role VARCHAR(50) DEFAULT 'member',
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE TABLE diagnostics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  responses JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE diagnostics ENABLE ROW LEVEL SECURITY;
