import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  })

  async function fetchProfile() {
    const profileData = await supabase.auth.user()
    if (!profileData) {
      router.push('/sign-in')
    } else {
      setProfile(profileData)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }

  if (!profile) return null
  return (
    <div className="bg-white h-screen w-screen">
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h2>Hello, {profile.email}</h2>
      <p>User ID: {profile.id}</p>
      {/* <p>City: {profile.user_metadata.city}</p> */}
      <p>Member Since: {profile.created_at}</p>
      <button onClick={signOut}>Sign Out</button>
      {/* <button onClick={update}>Set Attribute</button> */}
    </div>
    </div>
  )
}