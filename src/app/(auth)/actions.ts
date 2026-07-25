'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('name') as string,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signInWithProvider(provider: 'github' | 'discord') {
  const supabase = await createClient()
  
  // Use Vercel's NEXT_PUBLIC_VERCEL_URL if available, otherwise fallback to headers
  const getURL = () => {
    // Hardcode to production URL to prevent Supabase redirect mismatch
    let url = process.env.NEXT_PUBLIC_APP_URL ?? 'https://zenith-guard-nine.vercel.app'
    
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${getURL()}auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}
