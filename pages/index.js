import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'

export default function Home() {

  /*

  TODO: 
  Move game logic outside of API Routes. 
  Next / Vercel Api routes maybe a bottleneck to using 
  supabase realtime db to full speed

  */

  const router = useRouter()

  const [profile, setProfile] = useState(null)
  const [games, setGames] = useState([])
  const [status, setStatus] = useState('')
  const [gameUid, setGameUID] = useState('')

  useEffect(() => {
    fetchProfile()
    return (()=>{
      setGames([])
    })
  },[])

  useEffect(()=>{
    fetchGames()
  }, [games])

  async function fetchProfile() {
    const profileData = supabase.auth.user()
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
    axios.post('api/close', { game_uid: game_uid}).then(() => {
      console.log('closed game')
    })
  }

  const hostedGameStyle = (host) => {
    if (host === profile.id){
      return "py-4 flex w-full justify-between items-center space-x-4 p-2 bg-green-200"
    } else {
      return "py-4 flex w-full justify-between items-center space-x-4 p-2"
    }
  }

  if (!profile) return null

  return (
    <div className="p-2 flex flex-col justify-center items-center space-y-4">

      <div className="flex flex-col gap-8 my-4">
        
        <div className="w-full flex flex-row justify-between items-center space-x-4">
          <button onClick={()=>createGame()} className="h-12 border px-4 py-2 rounded-full w-32">
            <h1 className="text-center">New Game</h1>
          </button>
          <input
          type="text" 
          name="code"
          onChange={(e)=>setGameUID(e.target.value)}
          className="w-64 border px-4 py-2 rounded-full flex flex-row justify-between items-center"
          placeholder="paste Game UID to join"
          ></input>
          <button onClick={()=>joinGame(gameUid)} className="h-12 border px-4 py-2 rounded-full w-32">
            <h1 className="text-center">Join Game</h1>
          </button>
        </div>

        <div className="w-full text-lg font-bold"><h1>Games</h1></div>
        {games? <ul role="list" className="divide-y divide-gray-200 p-4">
            {games.map(function(game, index){
              return <li className={hostedGameStyle(game.host)} key={index}>
                <div className="flex flex-col border-r px-4">
                <p>Host UID : {game.host}</p>
                <p>Game UID : {game.game_uid}</p>
                <p>Players : {game.players}</p>
                </div>
                <div className="flex flex-col justify-between items-center space-y-4">
                  <button className="px-4 py-2 rounded-full w-32 bg-green-800 text-white" onClick={()=>joinGame(game.game_uid)}>Join</button>
                  <button className="px-4 py-2 rounded-full w-32 bg-green-800 text-white" onClick={()=>closeGame(game.game_uid)}>Close</button>
                </div>
                </li>
            })}
          </ul> : <div>no games</div>}
        <div><p>{status}</p></div>
      </div>


    </div>
  )
}
