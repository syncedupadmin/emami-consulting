export interface IntakeSubmission {
  goal: string
  technology: string | string[]
  currentSetup: string
  budget: string
  timeline: string
  operator: string
  name: string
  practice: string
  email: string
  phone: string
}

export async function sendIntakeEmail(data: IntakeSubmission): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY
  const from = process.env.INTAKE_EMAIL_FROM ?? 'support@syncedupsolutions.com'
  const to = process.env.INTAKE_EMAIL_TO ?? 'admin@syncedupsolutions.com'

  if (!apiKey) throw new Error('SENDGRID_API_KEY not set')

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#0B1A28;">
      <div style="background:#0B1A28;padding:32px;border-radius:12px 12px 0 0;">
        <p style="font-family:monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#CDA251;margin:0 0 8px;">Emami Consulting</p>
        <h1 style="font-size:26px;color:#F4EFE6;margin:0;font-weight:400;">New Intake Submission</h1>
      </div>
      <div style="background:#F4EFE6;padding:32px;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;"><strong>Practice</strong></td><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;">${data.practice}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;"><strong>Name</strong></td><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;">${data.name}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;"><strong>Email</strong></td><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;">${data.email}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;"><strong>Phone</strong></td><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;">${data.phone}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;"><strong>Goal</strong></td><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;">${data.goal}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;"><strong>Technology</strong></td><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;">${Array.isArray(data.technology) ? data.technology.join(', ') : data.technology}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;"><strong>Current Setup</strong></td><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;">${data.currentSetup || 'Not provided'}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;"><strong>Budget</strong></td><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;">${data.budget}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;"><strong>Timeline</strong></td><td style="padding:12px 0;border-bottom:1px solid #E3D8C5;">${data.timeline}</td></tr>
          <tr><td style="padding:12px 0;"><strong>Operator</strong></td><td style="padding:12px 0;">${data.operator}</td></tr>
        </table>
      </div>
    </div>
  `

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: 'Emami Consulting Intake' },
      subject: `New Emami Intake — ${data.practice}`,
      content: [{ type: 'text/html', value: html }],
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`SendGrid error ${res.status}: ${body}`)
  }
}
