import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import axios from 'axios'

export default function Game() {

  const router = useRouter()
  const [game, setGame] = useState()
  const [profile, setProfile] = useState(null)

  /*
  const [dieOne, setDieOne] = useState({spent: false,commit: false,face: ''})
  const [dieTwo, setDieTwo] = useState({spent: false,commit: false,face: ''})
  const [dieThree, setDieThree] = useState({spent: false,commit: false,face: ''})
  const [dieFour, setDieFour] = useState({spent: false,commit: false,face: ''})
  const [dieFive, setDieFive] = useState({spent: false,commit: false,face: ''})
  const [dieSix, setDieSix] = useState({spent: false,commit: false,face: ''})
  const [dieSeven, setDieSeven] = useState({spent: false,commit: false,face: ''})
  const [dieEight, setDieEight] = useState({spent: false,commit: false,face: ''})
  */

  /*
  const randomFace = () => {
    const items = ['head','axe','lantern','horns','bomb','beers']
    const randomFace = items[Math.floor(Math.random()*items.length)]
    return randomFace
  }
  */

  function rollAllDie(){
    if (game.active_player === profile.id){
      axios.post('/api/game/roll', {game_uid: router.query.id})
    }
  }

  useEffect(() => {
    console.log(router.query)
    fetchProfile()
  },[])

  async function fetchProfile() {
    const profileData = await supabase.auth.user()
    if (!profileData) {
      router.push('/sign-in')
    } else {
      setProfile(profileData)
    }
  }

  useEffect(async ()=>{
    const {data, error} = await supabase.from('games').select().match({game_uid: router.query.id})
    if (error){
      console.log(`error -> ${JSON.stringify(error)}`)
    } else {
      setGame(data[0])
    }
  },[game])

  const getFaceValue = (value) => {
    switch (value) {
      case 0:
        return 'head'
      case 1:
        return 'lantern'
      case 2:
        return 'bomb'
      case 3:
        return 'axe'
      case 4:
        return 'horns'
      case 5:
        return 'beers'
    }
  }

  const useDie = (action, number) => {
    if (action === 'spend'){
      axios.post('/api/game/spend', {die: number, game_uid: router.query.id})
    }
    if (action === 'commit'){
      axios.post('/api/game/commit', {die: number, game_uid: router.query.id})
    }
  }

  const dieSpendButtonStyle = (state) => {
    switch(state){
      case 1:
        return "border px-4 py-2 text-center bg-black"
      default:
          return "border px-4 py-2 text-center shadow-lg"
    }
  }

  const dieCommitButtonStyle = (state) => {
    switch(state){
      case 2:
        return "border px-4 py-2 text-center bg-black"
      default:
          return "border px-4 py-2 text-center shadow-lg"
    }
  }

  if (!game){ return null }
  if (game) {
    return (
      <div className="p-2 flex flex-col justify-center items-center space-y-4">
  
        <div className="grid grid-flow-col grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4 text-center">
          <div className="border w-full bg-black">
            <h1 className="text-white font-bold text-lg">Mine</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_mine}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_mine}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_mine}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_mine}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_mine}</div>
            </div>
          </div>
          <div className="border w-full bg-black">
            <h1 className="text-white font-bold text-lg">Table</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_table}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_table}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_table}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_table}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_table}</div>
            </div>
          </div>
        </div>
  
        <div className="grid grid-flow-col grid-cols-2 grid-rows-3 md:grid-cols-5 md:grid-rows-1 gap-4 text-center">
          <div className="border w-full p-2">
            <h1>{game.p1_rolls} rolls remaining</h1>
            <h1 className="truncate p-2">{game.p1_address? game.p1_address : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_p1}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_p1}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_p1}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_p1}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_p1}</div>
            </div>
          </div>
          <div className="border w-full p-2">
            <h1>{game.p2_rolls} rolls remaining</h1>
            <h1 className="truncate p-2">{game.p2_address? game.p2_address : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_p2}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_p2}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_p2}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_p2}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_p2}</div>
            </div>
          </div>
          <div className="border w-full p-2">
            <h1>{game.p3_rolls} rolls remaining</h1>
            <h1 className="truncate p-2">{game.p3_address? game.p3_address : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-3">{game.green_p3}</div>
              <div className="span-1 bg-purple-500 p-3">{game.purple_p3}</div>
              <div className="span-1 bg-red-500 p-3">{game.red_p3}</div>
              <div className="span-1 bg-blue-500 p-3">{game.blue_p3}</div>
              <div className="span-1 bg-gray-500 p-3">{game.black_p3}</div>
            </div>
          </div>
          <div className="border w-full p-2">
            <h1>{game.p4_rolls} rolls remaining</h1>
            <h1 className="truncate p-2">{game.p4_address? game.p4_address : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_p4}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_p4}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_p4}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_p4}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_p4}</div>
            </div>
          </div>
          <div className="border w-full p-2">
            <h1>{game.p5_rolls} rolls remaining</h1>
            <h1 className="truncate p-2">{game.p5_address? game.p5_address : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_p5}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_p5}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_p5}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_p5}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_p5}</div>
            </div>
          </div>
        </div>
  
        <div className="grid grid-flow-col grid-cols-4 grid-rows-2 md:grid-cols-8 md:grid-rows-1 gap-4">

          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className={dieSpendButtonStyle(game.die1_state)} onClick={()=>useDie('spend',1)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die1_face)}</div>
            <button className={dieCommitButtonStyle(game.die1_state)} onClick={()=>useDie('commit',1)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className={dieSpendButtonStyle(game.die2_state)} onClick={()=>useDie('spend',2)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die2_face)}</div>
            <button className={dieCommitButtonStyle(game.die2_state)} onClick={()=>useDie('commit',2)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className={dieSpendButtonStyle(game.die3_state)} onClick={()=>useDie('spend',3)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die3_face)}</div>
            <button className={dieCommitButtonStyle(game.die3_state)} onClick={()=>useDie('commit',3)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className={dieSpendButtonStyle(game.die4_state)} onClick={()=>useDie('spend',4)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die4_face)}</div>
            <button className={dieCommitButtonStyle(game.die4_state)} onClick={()=>useDie('commit',4)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className={dieSpendButtonStyle(game.die5_state)} onClick={()=>useDie('spend',5)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die5_face)}</div>
            <button className={dieCommitButtonStyle(game.die5_state)} onClick={()=>useDie('commit',5)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className={dieSpendButtonStyle(game.die6_state)}  onClick={()=>useDie('spend',6)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die6_face)}</div>
            <button className={dieCommitButtonStyle(game.die6_state)} onClick={()=>useDie('commit',6)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className={dieSpendButtonStyle(game.die7_state)} onClick={()=>useDie('spend',7)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die7_face)}</div>
            <button className={dieCommitButtonStyle(game.die7_state)} onClick={()=>useDie('commit',7)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className={dieSpendButtonStyle(game.die8_state)} onClick={()=>useDie('spend',8)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die8_face)}</div>
            <button className={dieCommitButtonStyle(game.die8_state)} onClick={()=>useDie('commit',8)}><h1>Keep</h1></button>
          </div>
  
        </div>
  
        <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>rollAllDie()}><h1>Roll</h1></button>
  
        {/* <div className="border text-center">
          <h1>My Keep</h1>
          <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">00</div>
              <div className="span-1 bg-purple-500 p-2">00</div>
              <div className="span-1 bg-red-500 p-2">00</div>
              <div className="span-1 bg-blue-500 p-2">00</div>
              <div className="span-1 bg-gray-500 p-2">00</div>
          </div>
        </div> */}
        
      </div>
    )
  }
}