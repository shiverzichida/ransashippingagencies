// Vercel Serverless Function: api/contact.js
// Connects web inquiry forms to Supabase PostgreSQL Database

export default async function handler(req, res) {
  // CORS & Method Handling
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { division, name, email, phone, company, service, commodity, fleet_type, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    // If Supabase keys are configured in Vercel Environment Variables
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          division: division || 'General Ransa Group',
          name,
          email,
          phone: phone || '',
          service_line: service || '',
          commodity: commodity || '',
          fleet_type: fleet_type || '',
          message: company ? `Company: ${company}\n\n${message}` : message
        })
      });

      if (!response.ok) {
        throw new Error(`Supabase API Error: ${response.statusText}`);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully! Our team will contact you shortly.'
    });

  } catch (error) {
    console.error('Contact Handler Error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your inquiry.'
    });
  }
}
