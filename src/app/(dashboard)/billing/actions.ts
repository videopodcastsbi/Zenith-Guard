'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import Stripe from 'stripe'

export async function upgradeToPro() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY
  
  // If Stripe is not configured, we'll simulate the payment by directly updating the DB
  if (!stripeKey || stripeKey === 'your-stripe-secret-key') {
    console.log("Simulating Stripe payment because no real key is configured...")
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_status: 'pro' })
      .eq('id', user.id)
      
    if (error) {
      return { error: error.message }
    }
    revalidatePath('/billing')
    return { success: true, simulated: true }
  }

  // If Stripe IS configured, create a checkout session
  try {
    const stripe = new Stripe(stripeKey, { apiVersion: '2025-01-27.acacia' })
    
    // We should theoretically get the price ID from env or a constant
    const priceId = process.env.STRIPE_PRO_PRICE_ID
    
    // If we have a Stripe key but no price ID, fallback to simulation for easier testing
    if (!priceId) {
      console.log("Stripe key found, but no price ID. Simulating payment...")
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_status: 'pro' })
        .eq('id', user.id)
        
      if (error) return { error: error.message }
      revalidatePath('/billing')
      return { success: true, simulated: true }
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/billing?canceled=true`,
      client_reference_id: user.id, // Important: allows us to link the payment back to the user in the webhook
      customer_email: user.email,
    })

    return { url: session.url }
  } catch (err: any) {
    console.error('Stripe error:', err)
    return { error: err.message }
  }
}

export async function verifySession(sessionId: string) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) return { error: 'No Stripe key' }
  
  try {
    const stripe = new Stripe(stripeKey, { apiVersion: '2025-01-27.acacia' })
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status === 'paid') {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase
          .from('profiles')
          .update({ subscription_status: 'pro', stripe_customer_id: session.customer as string })
          .eq('id', user.id)
        
        revalidatePath('/billing')
        return { success: true }
      }
    }
    return { success: false }
  } catch (err) {
    return { error: 'Failed to verify session' }
  }
}
