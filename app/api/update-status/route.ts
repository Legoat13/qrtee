import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

const statusLabels: Record<string, string> = {
  pending: '⏳ En attente',
  production: '🏭 En cours de production',
  shipping: '📦 En cours de livraison',
  delivered: '✅ Livré',
}

const statusMessages: Record<string, string> = {
  pending: 'Votre commande a bien été reçue et est en attente de traitement.',
  production: 'Bonne nouvelle ! Votre tee-shirt QRTEE est en cours de production.',
  shipping: 'Votre tee-shirt est en route ! Vous le recevrez dans quelques jours.',
  delivered: 'Votre tee-shirt QRTEE a été livré ! Nous espérons qu\'il vous plaît.',
}

export async function POST(req: Request) {
  const { orderId, status } = await req.json()

  const { data: order } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single()

  if (!order) return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })

  if (order.email) {
    await resend.emails.send({
      from: 'QRTEE <onboarding@resend.dev>',
      to: order.email,
      subject: `Mise à jour de votre commande ${order.order_number} — ${statusLabels[status]}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0ABFBC;">👕 QRTEE</h1>
          <h2 style="color: #1A1A1A;">Mise à jour de votre commande</h2>
          <div style="background: #F7F7F7; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p style="font-size: 16px; font-weight: 700; color: #1A1A1A;">${statusLabels[status]}</p>
            <p style="color: #555;">${statusMessages[status]}</p>
          </div>
          <p style="color: #555;">N° de commande : <strong>${order.order_number}</strong></p>
          <p style="color: #555;">Taille : <strong>${order.size}</strong></p>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px;">Une question ? Répondez directement à cet email.</p>
          </div>
        </div>
      `
    })
  }

  return NextResponse.json({ success: true })
}