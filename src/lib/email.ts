import { Resend } from 'resend'

const fromEmail = process.env.FROM_EMAIL || 'Lakiyo\'s Oasis <lakiyooasis@gmail.com>'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function bookingConfirmationEmail(params: {
  email: string
  name: string
  eventName: string
  date: string
  time: string
  venue: string
}) {
  const { data, error } = await getResend().emails.send({
    from: fromEmail,
    to: [params.email],
    subject: `Booking Confirmed — ${params.eventName} | Lakiyo's Oasis`,
    html: `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
        <h1 style="font-family: 'Playfair Display', serif; color: #C7603A; font-size: 28px;">You're in!</h1>
        <p style="color: #2C2C2C; font-size: 16px; line-height: 1.6;">Hi ${params.name},</p>
        <p style="color: #2C2C2C; font-size: 16px; line-height: 1.6;">Your spot at <strong>${params.eventName}</strong> is confirmed. Here are the details:</p>
        <div style="background: #F5F0EB; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>Event:</strong> ${params.eventName}</p>
          <p style="margin: 0 0 8px;"><strong>Date:</strong> ${params.date}</p>
          <p style="margin: 0 0 8px;"><strong>Time:</strong> ${params.time}</p>
          <p style="margin: 0 0 0;"><strong>Venue:</strong> ${params.venue}</p>
        </div>
        <p style="color: #7A7065; font-size: 14px;">What to bring: Just yourself and an open mind. All materials are provided.</p>
        <p style="color: #7A7065; font-size: 14px;">You will receive a reminder 24 hours before the event.</p>
        <br/>
        <p style="color: #2C2C2C; font-size: 16px;">See you at the Oasis!<br/>— The YOASIS Team</p>
      </div>
    `,
  })
  return { data, error }
}

export async function orderConfirmationEmail(params: {
  email: string
  name: string
  items: string
  total: string
}) {
  const { data, error } = await getResend().emails.send({
    from: fromEmail,
    to: [params.email],
    subject: `Order Confirmed — Lakiyo's Oasis`,
    html: `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
        <h1 style="font-family: 'Playfair Display', serif; color: #C7603A; font-size: 28px;">Order Confirmed!</h1>
        <p style="color: #2C2C2C; font-size: 16px;">Thank you for your order, ${params.name}.</p>
        <div style="background: #F5F0EB; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>Items:</strong></p>
          <p style="margin: 0; color: #7A7065;">${params.items}</p>
          <p style="margin: 16px 0 0; font-size: 18px;"><strong>Total:</strong> ${params.total}</p>
        </div>
        <p style="color: #7A7065; font-size: 14px;">We'll notify you when your order ships.</p>
        <br/>
        <p style="color: #2C2C2C; font-size: 16px;">Enjoy!<br/>— The YOASIS Team</p>
      </div>
    `,
  })
  return { data, error }
}
