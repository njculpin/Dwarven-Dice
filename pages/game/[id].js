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
    axios.post('/api/game/roll', {gameuid: router.query.id})
    /*
    if (dieOne.spent !== true || dieOne.commit !== true){
      setDieOne({...dieOne, face: randomFace()})
    }
    if (dieTwo.spent !== true || dieTwo.commit !== true){
      setDieTwo({...dieTwo, face: randomFace()})
    }
    if (dieThree.spent !== true || dieThree.commit !== true){
      setDieThree({...dieThree, face: randomFace()})
    }
    if (dieFour.spent !== true || dieFour.commit !== true){
      setDieFour({...dieFour, face: randomFace()})
    }
    if (dieFive.spent !== true || dieFive.commit !== true){
      setDieFive({...dieFive, face: randomFace()})
    }
    if (dieSix.spent !== true || dieSix.commit !== true){
      setDieSix({...dieSix, face: randomFace()})
    }
    if (dieSeven.spent !== true || dieSeven.commit !== true){
      setDieSeven({...dieSeven, face: randomFace()})
    }
    if (dieEight.spent !== true || dieEight.commit !== true){
      setDieEight({...dieEight, face: randomFace()})
    }
    */
  }

  useEffect(() => {
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
    const {data, error} = await supabase.from('games').select().match({gameuid: router.query.id})
    if (error){
      console.log(`error -> ${JSON.stringify(error)}`)
    } else {
      setGame(data[0])
    }
  },[game])

  useEffect(()=>{
    // supabase
    // .from(`games:gameuid=${router.query.id}`)
    // .on('UPDATE', payload => {
    //   console.log('Update change received!', payload)
    // })
    // .on('DELETE', payload => {
    //   console.log('Deleted', payload)
    // })
    // .subscribe()
  },[])

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
      axios.post('/api/game/spend', {die: number})
    }
    if (action === 'commit'){
      axios.post('/api/game/commit', {die: number})
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
              <div className="span-1 bg-green-500 p-2">03</div>
              <div className="span-1 bg-purple-500 p-2">04</div>
              <div className="span-1 bg-red-500 p-2">06</div>
              <div className="span-1 bg-blue-500 p-2">12</div>
              <div className="span-1 bg-gray-500 p-2">60</div>
            </div>
          </div>
          <div className="border w-full bg-black">
            <h1 className="text-white font-bold text-lg">Table</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">00</div>
              <div className="span-1 bg-purple-500 p-2">00</div>
              <div className="span-1 bg-red-500 p-2">00</div>
              <div className="span-1 bg-blue-500 p-2">00</div>
              <div className="span-1 bg-gray-500 p-2">00</div>
            </div>
          </div>
        </div>
  
        <div className="grid grid-flow-col grid-cols-2 grid-rows-3 md:grid-cols-4 md:grid-rows-1 gap-4 text-center">
          <div className="border w-full">
            <h1 className="truncate">{game.p1? game.p1 : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">00</div>
              <div className="span-1 bg-purple-500 p-2">00</div>
              <div className="span-1 bg-red-500 p-2">00</div>
              <div className="span-1 bg-blue-500 p-2">00</div>
              <div className="span-1 bg-gray-500 p-2">00</div>
            </div>
          </div>
          <div className="border w-full">
            <h1 className="truncate">{game.p2? game.p2 : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
            <div className="span-1 bg-green-500 p-2">00</div>
              <div className="span-1 bg-purple-500 p-2">00</div>
              <div className="span-1 bg-red-500 p-2">00</div>
              <div className="span-1 bg-blue-500 p-2">00</div>
              <div className="span-1 bg-gray-500 p-2">00</div>
            </div>
          </div>
          <div className="border w-full">
            <h1 className="truncate">{game.p3? game.p3 : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">00</div>
              <div className="span-1 bg-purple-500 p-2">00</div>
              <div className="span-1 bg-red-500 p-2">00</div>
              <div className="span-1 bg-blue-500 p-2">00</div>
              <div className="span-1 bg-gray-500 p-2">00</div>
            </div>
          </div>
          <div className="border w-full">
            <h1 className="truncate">{game.p4? game.p4 : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">00</div>
              <div className="span-1 bg-purple-500 p-2">00</div>
              <div className="span-1 bg-red-500 p-2">00</div>
              <div className="span-1 bg-blue-500 p-2">00</div>
              <div className="span-1 bg-gray-500 p-2">00</div>
            </div>
          </div>
          <div className="border w-full">
            <h1 className="truncate">{game.p5? game.p5 : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">00</div>
              <div className="span-1 bg-purple-500 p-2">00</div>
              <div className="span-1 bg-red-500 p-2">00</div>
              <div className="span-1 bg-blue-500 p-2">00</div>
              <div className="span-1 bg-gray-500 p-2">00</div>
            </div>
          </div>
        </div>
  
        <div className="grid grid-flow-col grid-cols-4 grid-rows-2 md:grid-cols-8 md:grid-rows-1 gap-4">
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('spend',1)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die1)}</div>
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('commit',1)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('spend',2)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die2)}</div>
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('commit',2)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('spend',3)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die3)}</div>
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('commit',3)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('spend',4)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die4)}</div>
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('commit',4)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('spend',5)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die5)}</div>
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('commit',5)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('spend',5)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die6)}</div>
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('commit',5)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('spend',6)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die7)}</div>
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('commit',6)}><h1>Keep</h1></button>
          </div>
  
          <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('spend',7)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die8)}</div>
            <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>useDie('commit',7)}><h1>Keep</h1></button>
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