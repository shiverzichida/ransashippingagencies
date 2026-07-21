-- Supabase / PostgreSQL Database Schema for Ransa Group Portal

CREATE TABLE IF NOT EXISTS inquiries (
    id BIGSERIAL PRIMARY KEY,
    division VARCHAR(100) NOT NULL DEFAULT 'General Ransa Group',
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service_line VARCHAR(100),
    commodity VARCHAR(100),
    fleet_type VARCHAR(100),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from web inquiry forms
CREATE POLICY "Allow public form submissions" ON inquiries 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Allow service_role to view inquiries
CREATE POLICY "Allow service_role read access" ON inquiries 
    FOR SELECT 
    TO service_role 
    USING (true);
