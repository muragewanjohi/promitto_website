-- FAQs Table Schema
-- Run this SQL in your Supabase SQL editor to create the faqs table

CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on display_order for sorting
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON faqs(display_order);

-- Create an index on published for faster queries
CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(published);

-- Enable Row Level Security (RLS)
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published FAQs
CREATE POLICY "Public can view published FAQs"
ON faqs
FOR SELECT
USING (published = true);

-- Policy: Allow authenticated users to manage FAQs
CREATE POLICY "Authenticated users can manage FAQs"
ON faqs
FOR ALL
USING (auth.role() = 'authenticated');

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_faqs_updated_at
BEFORE UPDATE ON faqs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert 5 initial FAQs based on company profile
INSERT INTO faqs (question, answer, display_order, published) VALUES
(
  'What is Promitto Limited?',
  'Promitto is your one-stop shop for turning your dream of homeownership into reality. We provide construction cash flow help for both residential and commercial projects, and our comprehensive services include site visits, cost estimates (BQ preparation), 3D architectural and structural drawings, securing approvals, and doing the construction for you.',
  1,
  true
),
(
  'How much funding can I get for my construction project?',
  'We fund up to 70% of the total construction costs for the client, with a repayment grace period of 1-7 years. The remaining 30% is required as a deposit. The loan to be advanced is up to 70% of the total project cost, with an interest rate of 12% per annum on reducing balance.',
  2,
  true
),
(
  'What are the requirements to register with Promitto?',
  'For individuals: Passport Photos, National ID, Title Deed, Desired House Plan, Registration Fee of Ksh. 30,000, and KRA Certificate. For corporate clients: Directors Passport Photos, Directors National ID, Directors KRA Certificate, Title Deed copy, Certificate of Incorporation, Company PIN Certificate, and CR.',
  3,
  true
),
(
  'What types of projects does Promitto finance?',
  'We fund the construction of both Residential and Commercial/Rental projects with repayment periods ranging from 1-7 years for residential and 1-10 years for commercial units. We also provide funding for renovations/finishings (up to 5 years repayment) and perimeter walls construction (up to 2 years repayment), all at an interest rate of 12% per annum on reducing balance.',
  4,
  true
),
(
  'What services does Promitto provide beyond financing?',
  'Promitto offers comprehensive construction services including Construction Project Management (overseeing everything from site visit to construction monitoring and approvals), Design Consultancy (site analysis, conceptual and schematic design, design development, interior design oversight, cost estimation, and Bill of Quantities creation), and full Construction services where we construct hassle-free for the client and hand over a complete project.',
  5,
  true
);

