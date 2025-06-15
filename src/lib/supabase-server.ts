import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export const supabaseServer = () => {
  const cookieStore = cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, opts: any) {
          cookieStore.set({ name, value, ...opts })
        },
        remove(name: string, opts: any) {
          cookieStore.set({ name, value: '', ...opts })
        }
      }
    }
  )
}
