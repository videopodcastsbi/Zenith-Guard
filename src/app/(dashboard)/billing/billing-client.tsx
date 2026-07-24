'use client'

import { useState, useTransition, useEffect } from 'react'
import { Check, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
  import { upgradeToPro, verifySession } from './actions'
  import { useSearchParams } from 'next/navigation'

  export function BillingClient({ currentPlan }: { currentPlan: string }) {
    const [isPending, startTransition] = useTransition()
    const [isVerifying, setIsVerifying] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const searchParams = useSearchParams()

    useEffect(() => {
      const sessionId = searchParams.get('session_id')
      if (sessionId) {
        setIsVerifying(true)
        verifySession(sessionId).then((res) => {
          if (res.success) {
            window.location.href = '/billing?verified=true'
          } else {
            setIsVerifying(false)
            setError('Payment verification failed or is still processing.')
          }
        })
      }
    }, [searchParams])

    const handleUpgrade = () => {
      setError(null)
      startTransition(async () => {
        const result = await upgradeToPro()
        
        if (result.error) {
          setError(result.error)
        } else if (result.url) {
          window.location.href = result.url
        }
      })
    }

    const isPro = currentPlan === 'pro' || currentPlan === 'enterprise'

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {searchParams.get('verified') && (
          <div className="col-span-1 md:col-span-2 bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-lg flex items-center">
            <Check className="h-5 w-5 mr-3" />
            Your payment was successful! You are now on the Pro plan.
          </div>
        )}
        
        {isVerifying && (
          <div className="col-span-1 md:col-span-2 bg-blue-500/10 border border-blue-500/50 text-blue-400 p-4 rounded-lg flex items-center">
            <Loader2 className="h-5 w-5 mr-3 animate-spin" />
            Verifying your payment, please wait...
          </div>
        )}
        
        {error && (
          <div className="col-span-1 md:col-span-2 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-3" />
            {error}
          </div>
        )}

      {/* Free Plan */}
      <Card className={`bg-[#111118]/50 backdrop-blur border-gray-800 relative overflow-hidden ${!isPro ? 'ring-2 ring-blue-500/50' : 'opacity-70'}`}>
        {!isPro && <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500 text-xs font-bold text-white rounded-bl-lg">CURRENT</div>}
        <CardHeader>
          <CardTitle className="text-xl text-gray-200">Free Tier</CardTitle>
          <CardDescription>Perfect for testing and small games.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl font-bold text-white">$0<span className="text-sm text-gray-500 font-normal">/mo</span></div>
          <ul className="space-y-2 mt-6">
            <li className="flex items-center text-sm text-gray-300"><Check className="h-4 w-4 mr-2 text-green-400" /> Up to 2 games</li>
            <li className="flex items-center text-sm text-gray-300"><Check className="h-4 w-4 mr-2 text-green-400" /> Basic exploit detection</li>
            <li className="flex items-center text-sm text-gray-300"><Check className="h-4 w-4 mr-2 text-green-400" /> 24h Data retention</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button disabled variant="outline" className="w-full bg-gray-900 border-gray-700 text-gray-400">
            {isPro ? 'Downgrade' : 'Current Plan'}
          </Button>
        </CardFooter>
      </Card>

      {/* Pro Plan */}
      <Card className={`bg-[#1a1a24] border-blue-500/30 relative overflow-hidden ${isPro ? 'ring-2 ring-purple-500' : ''}`}>
        {isPro && <div className="absolute top-0 right-0 px-3 py-1 bg-purple-500 text-xs font-bold text-white rounded-bl-lg">CURRENT</div>}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <CardHeader>
          <CardTitle className="text-xl flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
            Pro Tier <Sparkles className="h-4 w-4 ml-2 text-purple-400" />
          </CardTitle>
          <CardDescription className="text-gray-400">Advanced protection for serious developers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl font-bold text-white">$29<span className="text-sm text-gray-500 font-normal">/mo</span></div>
          <ul className="space-y-2 mt-6">
            <li className="flex items-center text-sm text-gray-300"><Check className="h-4 w-4 mr-2 text-blue-400" /> Unlimited games</li>
            <li className="flex items-center text-sm text-gray-300"><Check className="h-4 w-4 mr-2 text-blue-400" /> Advanced AI exploit detection</li>
            <li className="flex items-center text-sm text-gray-300"><Check className="h-4 w-4 mr-2 text-blue-400" /> 30-day Data retention</li>
            <li className="flex items-center text-sm text-gray-300"><Check className="h-4 w-4 mr-2 text-blue-400" /> Discord webhooks</li>
          </ul>
        </CardContent>
        <CardFooter>
          {isPro ? (
            <Button variant="outline" className="w-full bg-gray-900 border-gray-700 text-gray-400 hover:text-white">
              Manage Subscription
            </Button>
          ) : (
            <Button 
              onClick={handleUpgrade} 
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isPending ? 'Processing...' : 'Upgrade to Pro'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
