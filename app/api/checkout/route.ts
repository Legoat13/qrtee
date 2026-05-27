import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const { userId, size, name, email, address, orderNumber, customText, textPosition, isPremium, premiumX, premiumY, premiumTextSize } = await req.json()

  await supabase.from('orders').insert({ 
    user_id: userId, 
    size, 
    name, 
    email,
    address, 
    order_number: orderNumber,
    custom_text: customText || null,
    text_position: textPosition || null,
    is_premium: isPremium || false,
    premium_x: premiumX || null,
    premium_y: premiumY || null,
    premium_text_size: premiumTextSize || null
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Tee-shirt FunShirt 👕',
            description: `Taille ${size} · QR code unique imprimé au dos${customText ? ` · Texte: "${customText}"` : ''}${isPremium ? ' · Placement premium' : ''}`,
          },
          unit_amount: isPremium ? 2798 : 2499,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order`,
    metadata: { userId, size, name, email, address, orderNumber, customText, textPosition, isPremium: isPremium ? 'true' : 'false' },
  })

  return NextResponse.json({ url: session.url })
}