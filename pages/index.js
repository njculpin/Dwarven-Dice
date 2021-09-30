import axios from 'axios'
import { useState, useEffect } from 'react'
import { ClipboardIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'

export default function Home() {

  const router = useRouter()

  const [profile, setProfile] = useState(null)
  const [games, setGames] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetchProfile()
    
  })

  useEffect(()=>{
    fetchGames()
  },[])

  async function fetchProfile() {
    const profileData = await supabase.auth.user()
    if (!profileData) {
      router.push('/sign-in')
    } else {
      setProfile(profileData)
    }
  }

  async function fetchGames(){
    axios.get('api/games').then(res => {
      setGames(res.data.message)
    })
  }

  const createGame = () => {
    setStatus(`creating game`)

    axios.post('/api/create', { userid: profile.id }).then(res => {
      setStatus(`created game ${res.data.game_uid}`)
      setStatus(`initializing game ${res.data.game_uid}`)

      axios.post('/api/initialize', { game_uid: res.data.game_uid, host: res.data.host }).then(res => {
        setStatus(`initialized game ${res.data.game_uid}`)

        router.push({
          pathname: '/game/[id]',
          query: { id: res.data.game_uid }
        })

      })
    })

  }

  const joinGame = (game_uid) => {
    if (game_uid && profile){

      setStatus(`joining game ${game_uid}`)

      axios.post('/api/join', { game_uid:game_uid, userid: profile.id }).then(res => {
        setStatus(`joined game ${res.data.game_uid}`)

        const game_uid = res.data.message[0].game_uid
        router.push({
          pathname: '/game/[id]',
          query: { id: game_uid }
      })

      }).catch(error => console.log(`failed join ${JSON.stringify(error)}`))
    } else {
      console.log('no game_uid')
    }
  }

  const closeGame = (game_uid) => {
    console.log(`closing game -> ${game_uid}`)
  }

  if (!profile) return null

  return (
    <div className="p-2 flex flex-col justify-center items-center space-y-4">

      <div className="grid grid-cols-1 grid-rows-2 gap-8 my-4">
        <div className="flex flex-row w-full space-x-2">

          <button onClick={()=>createGame()} className="border px-4 py-2 rounded-full w-32">
            <h1 className="text-center">New Game</h1>
          </button>

        </div>
        {games? <ul role="list" className="divide-y divide-gray-200 shadow-lg p-4">
            {games.map(function(game, index){
              return <li className="py-4 flex w-full justify-between items-center space-x-4" key={index}>
                <div className="flex flex-col border-r px-4">
                <p>host : {game.host}</p>
                <p>game uuid : {game.game_uid}</p>
                <p>players: {game.players}</p>
                </div>
                <div className="flex flex-col justify-between items-center">
                  <button className="border px-4 py-2 rounded-full w-32" onClick={()=>joinGame(game.game_uid)}>Join</button>
                  <button className="border px-4 py-2 rounded-full w-32" onClick={()=>closeGame(game.game_uid)}>Close</button>
                </div>
                </li>
            })}
          </ul> : <div>no games</div>}
        <div><p>{status}</p></div>
      </div>


    </div>
  )
}
