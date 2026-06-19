import { NextRequest, NextResponse } from 'next/server'
import { sendIntakeEmail } from '@/lib/sendgrid'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const required = ['name', 'practice', 'email', 'goal']
    for (const field of required) {
      if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    if (!body.email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    await sendIntakeEmail(body)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[intake] submission error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
