import axios from 'axios'
import { useState, useEffect } from 'react'
import { ClipboardIcon } from '@heroicons/react/outline'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'

export default function Home() {

  const router = useRouter()

  const [profile, setProfile] = useState(null)
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')

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

  const createGame = () => {
    axios.post('/api/create').then(res => {
      let uuid = res.data.uuid
      setCode(uuid)
    })
  }

  const joinGame = () => {
    if (code && profile){
      axios.post('/api/join', { code:code, userid: profile.id }).then(res => {
        const gameid = res.data.message[0].gameuid
        router.push({
          pathname: '/game/[id]',
          query: { id: gameid }
      })
      }).catch(error => console.log(`failed join ${JSON.stringify(error)}`))
    } else {
      console.log('no code')
    }
  }
  if (!profile) return null

  return (
    <div className="p-2 flex flex-col justify-center items-center space-y-4">

      <div className="grid grid-cols-1 grid-rows-2 gap-8 my-4">
        <div className="flex flex-row w-full space-x-2">

          <button onClick={()=>createGame()} className="border px-4 py-2 rounded-full w-32">
            <h1 className="text-center">Create</h1>
          </button>

          <CopyToClipboard text={code}
          onCopy={() => setCopied(true)}>
            <button className="w-64 border px-4 py-2 rounded-full flex flex-row justify-between items-center">
              <h1 className="text-center truncate">
                {code}
              </h1>
              <ClipboardIcon className="h-6 w-6"/>
            </button>
          </CopyToClipboard>

        </div>
        <div className="flex flex-row w-full space-x-2">
          <input
          type="text" 
          name="code"
          onChange={(e)=>setCode(e.target.value)}
          className="w-64 border px-4 py-2 rounded-full flex flex-row justify-between items-center"
          placeholder="paste code to join"
          ></input>
          <button onClick={()=>joinGame()} className="border px-4 py-2 rounded-full w-32">
            <h1 className="text-center">Join</h1>
          </button>
        </div>
      </div>


    </div>
  )
}
