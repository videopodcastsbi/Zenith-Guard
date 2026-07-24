import { createClient } from '@/lib/supabase/server'
import { BillingClient } from './billing-client'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = { subscription_status: 'free' }
  
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
      
    if (data) {
      profile = data
    }
  }

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Billing & Subscription
        </h1>
        <p className="text-gray-400 mt-2">Manage your subscription plan and payment methods.</p>
      </div>
      
      <BillingClient currentPlan={profile.subscription_status} />
    </div>
  )
}
