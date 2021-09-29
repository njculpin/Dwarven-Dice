/* pages/_app.js */
import '../styles/globals.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import axios from 'axios'

function App({ Component, pageProps }) {
  const [authenticatedState, setAuthenticatedState] = useState('not-authed')
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('/profile')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })
    checkUser()
    return () => {
      authListener.unsubscribe()
    }
  })

  async function checkUser() {
    const user = await supabase.auth.user()
    if (user) {
      setAuthenticatedState('authenticated')
      const player_data = {
        "handle": user.email,
        "address": user.id, 
        "game_uid": '',
        "online": true,
        "ingame": false
      }
      axios.post('/api/register', { player_data: player_data })
    }
  }
  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  return (
    <div className="h-screen">
      <nav className="bg-white p-2">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 flex justify-between items-center">
          <Link href="/">
            <a className="mr-4 text-black text-2xl font-bold">
              Dwarven Dice
            </a>
          </Link>
          <div className="flex flex-row space-x-10">
          <div className="flex flex-row justify-center items-center text-black">
          <Link href="/profile">
            <a className="mr-6 font-bold">
              Profile
            </a>
          </Link>
          {
            authenticatedState === 'not-authed' && (
              <Link href="/sign-in">
                <a className="mr-6 font-bold">
                  Sign In
                </a>
              </Link>
            )
          }
          </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default App