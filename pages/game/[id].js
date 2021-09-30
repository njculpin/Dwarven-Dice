import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import Modal from 'react-modal';
import axios from 'axios'

Modal.setAppElement("#__next")

export default function Game() {

  const router = useRouter()
  const [game, setGame] = useState()
  const [profile, setProfile] = useState(null)
  const [lanternDie, setLanternDie] = useState(0)
  const [lanternModalIsOpen, setLanternModalIsOpen] = useState(false);

  useEffect(() => {
    fetchProfile()
  },[])

  useEffect(async ()=>{
    const {data, error} = await supabase.from('gamestates').select().match({game_uid: router.query.id})
    if (error){
      console.log(`error -> ${JSON.stringify(error)}`)
    } else {
      setGame(data[0])
    }
  },[game])


  function openLanternModal(die) {
    if (die === 1){
      if (game.die1_state === 0){
        setLanternDie(die)
        setLanternModalIsOpen(true)
      }
    }
    if (die === 2){
      if (game.die2_state === 0){
        setLanternDie(die)
        setLanternModalIsOpen(true)
      }
    }
    if (die === 3){
      if (game.die3_state === 0){
        setLanternDie(die)
        setLanternModalIsOpen(true)
      }
    }
    if (die === 4){
      if (game.die4_state === 0){
        setLanternDie(die)
        setLanternModalIsOpen(true)
      }
    }
    if (die === 5){
      if (game.die5_state === 0){
        setLanternDie(die)
        setLanternModalIsOpen(true)
      }
    }
    if (die === 6){
      if (game.die6_state === 0){
        setLanternDie(die)
        setLanternModalIsOpen(true)
      }
    }
    if (die === 7){
      if (game.die7_state === 0){
        setLanternDie(die)
        setLanternModalIsOpen(true)
      }
    }
    if (die === 8){
      if (game.die8_state === 0){
        setLanternDie(die)
        setLanternModalIsOpen(true)
      }
    }
  }

  function closeLanternModal(color) {
    setLanternModalIsOpen(false);
    axios.post(`/api/game/spend/lanterns`, {
      die: lanternDie, 
      game_uid: router.query.id, 
      color: color
    })

  }

  async function fetchProfile() {
    const profileData = await supabase.auth.user()
    if (!profileData) {
      router.push('/sign-in')
    } else {
      setProfile(profileData)
    }
  }

  function rollAllDie(){
    axios.post('/api/game/roll', {game_uid: router.query.id, pid: profile.id})
  }

  function passTurn(){
    axios.post('/api/game/pass', {game_uid: router.query.id, active_player: game.active_player, pid: profile.id})
  }

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

  const useDie = (action, face, number) => {
    if (action === 'spend'){
      if (face === 0){
        const secondary_player = ''
        axios.post(`/api/game/spend/heads`, {
          game_uid: router.query.id, 
          secondary_player:secondary_player})
      }
      if (face === 1){
        if (
          game.green_mine + 
          game.purple_mine + 
          game.red_mine + 
          game.blue_mine + 
          game.black_mine >= 3){
          openLanternModal(number)
        }
      }
      if (face === 2 || face === 3){
        axios.post(`/api/game/spend/axebombs`, {
          die: number, 
          game_uid: router.query.id, 
          pid:profile.id})
      }
      if (face === 4 || face === 5){
        axios.post(`/api/game/spend/beerhorns`, {
          die: number, 
          game_uid: router.query.id, 
          pid:profile.id})
      }
    }
  }

  const dieSpendButtonStyle = (state) => {
    switch(state){
      case 1:
        return "border px-4 py-2 text-center bg-black"
      case 2:
        return "border px-4 py-2 text-center opacity-50"
      default:
          return "border px-4 py-2 text-center shadow-lg"
    }
  }

  const dieCommitButtonStyle = (state) => {
    switch(state){
      case 1:
        return "border px-4 py-2 text-center"
      case 2:
        return "border px-4 py-2 text-center bg-black opacity-50"
      default:
          return "border px-4 py-2 text-center shadow-lg"
    }
  }

  const rollsAvailable = (player) => {
    if (player){
      if (game.active_player === player){
        return game.active_player_rolls
      }
      
      if (game.secondary_player === player){
        return game.secondary_player_rolls
      }

    }
  }

  const activePlayerStyle = (player_address) => {
    if (player_address !== ''){
      if (game.active_player === player_address){
        return "w-full p-2 border-4 border-green-400"
      }
      if (game.secondary_player === player_address){
        return "w-full p-2 border-4 border-blue-400"
      }
      if (game.active_player !== player_address &&  game.active_player !== player_address){
        return "w-full p-2 border-4 border-black"
      }
    } else {
      return "w-full p-2 border-2 border-black"
    }
  }

  const activeDieStyle = (player_location) => {
    if (player_location !== ''){
      if (player_location === game.active_player){
        return "grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border-4 border-green-400 p-2"
      }
      if (player_location === game.secondary_player){
        return "grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border-4 border-blue-400 p-2"
      }
      if (player_location !== game.active_player && player_location !== game.secondary_player){
        return "grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2"
      }
    } else {
      return "grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2"
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
          <div className={activePlayerStyle(game.p1_address)}>
            <h1>{rollsAvailable(game.p1_address)} rolls remaining</h1>
            <h1 className="truncate p-2">{game.p1_address? game.p1_address : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_p1}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_p1}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_p1}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_p1}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_p1}</div>
            </div>
          </div>
          <div className={activePlayerStyle(game.p2_address)}>
            <h1>{rollsAvailable(game.p2_address)} rolls remaining</h1>
            <h1 className="truncate p-2">{game.p2_address? game.p2_address : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_p2}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_p2}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_p2}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_p2}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_p2}</div>
            </div>
          </div>
          <div className={activePlayerStyle(game.p3_address)}>
            <button>
              <h1>{rollsAvailable(game.p3_address)} rolls remaining</h1>
              <h1 className="truncate p-2">{game.p3_address? game.p3_address : 'empty'}</h1>
              <div className="grid grid-flow-col grid-cols-5">
                <div className="span-1 bg-green-500 p-3">{game.green_p3}</div>
                <div className="span-1 bg-purple-500 p-3">{game.purple_p3}</div>
                <div className="span-1 bg-red-500 p-3">{game.red_p3}</div>
                <div className="span-1 bg-blue-500 p-3">{game.blue_p3}</div>
                <div className="span-1 bg-gray-500 p-3">{game.black_p3}</div>
              </div>
            </button>
          </div>
          <div className={activePlayerStyle(game.p4_address)}>
            <h1>{rollsAvailable(game.p4_address)} rolls remaining</h1>
            <h1 className="truncate p-2">{game.p4_address? game.p4_address : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_p4}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_p4}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_p4}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_p4}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_p4}</div>
            </div>
          </div>
          <div className={activePlayerStyle(game.p5_address)}>
            <h1>{rollsAvailable(game.p5_address)} rolls remaining</h1>
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

          <div className={activeDieStyle(game.die1_location)}>
            <button className={dieSpendButtonStyle(game.die1_state)} onClick={()=>useDie('spend',game.die1_face,1)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die1_face)}</div>
            <button className={dieCommitButtonStyle(game.die1_state)} onClick={()=>useDie('commit',1)}><h1>Keep</h1></button>
          </div>
  
          <div className={activeDieStyle(game.die2_location)}>
            <button className={dieSpendButtonStyle(game.die2_state)} onClick={()=>useDie('spend',game.die2_face,2)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die2_face)}</div>
            <button className={dieCommitButtonStyle(game.die2_state)} onClick={()=>useDie('commit',2)}><h1>Keep</h1></button>
          </div>
  
          <div className={activeDieStyle(game.die3_location)}>
            <button className={dieSpendButtonStyle(game.die3_state)} onClick={()=>useDie('spend',game.die3_face,3)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die3_face)}</div>
            <button className={dieCommitButtonStyle(game.die3_state)} onClick={()=>useDie('commit',3)}><h1>Keep</h1></button>
          </div>
  
          <div className={activeDieStyle(game.die4_location)}>
            <button className={dieSpendButtonStyle(game.die4_state)} onClick={()=>useDie('spend',game.die4_face,4)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die4_face)}</div>
            <button className={dieCommitButtonStyle(game.die4_state)} onClick={()=>useDie('commit',4)}><h1>Keep</h1></button>
          </div>
  
          <div className={activeDieStyle(game.die5_location)}>
            <button className={dieSpendButtonStyle(game.die5_state)} onClick={()=>useDie('spend',game.die5_face,5)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die5_face)}</div>
            <button className={dieCommitButtonStyle(game.die5_state)} onClick={()=>useDie('commit',5)}><h1>Keep</h1></button>
          </div>
  
          <div className={activeDieStyle(game.die6_location)}>
            <button className={dieSpendButtonStyle(game.die6_state)}  onClick={()=>useDie('spend',game.die6_face,6)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die6_face)}</div>
            <button className={dieCommitButtonStyle(game.die6_state)} onClick={()=>useDie('commit',6)}><h1>Keep</h1></button>
          </div>
  
          <div className={activeDieStyle(game.die7_location)}>
            <button className={dieSpendButtonStyle(game.die7_state)} onClick={()=>useDie('spend',game.die7_face,7)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die7_face)}</div>
            <button className={dieCommitButtonStyle(game.die7_state)} onClick={()=>useDie('commit',7)}><h1>Keep</h1></button>
          </div>
  
          <div className={activeDieStyle(game.die8_location)}>
            <button className={dieSpendButtonStyle(game.die8_state)} onClick={()=>useDie('spend',game.die8_face,8)}><h1>Spend</h1></button>
            <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{getFaceValue(game.die8_face)}</div>
            <button className={dieCommitButtonStyle(game.die8_state)} onClick={()=>useDie('commit',8)}><h1>Keep</h1></button>
          </div>
  
        </div>
  
        <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>rollAllDie()}><h1>Roll</h1></button>
        <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>passTurn()}><h1>Pass</h1></button>

        <Modal
          isOpen={lanternModalIsOpen}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
          contentLabel="Select a color to remove from the Mine"
        >
            <div className="grid grid-flow-col grid-cols-5">
              {game.green_mine >= 1 && <div className="span-1 bg-green-500 p-2"><button className="w-full h-full" onClick={()=>closeLanternModal('green')}>{game.green_mine}</button></div>}
              {game.purple_mine >= 1 &&<div className="span-1 bg-purple-500 p-2"><button className="w-full h-full" onClick={()=>closeLanternModal('purple')}>{game.purple_mine}</button></div>}
              {game.red_mine >= 1 &&<div className="span-1 bg-red-500 p-2"><button className="w-full h-full" onClick={()=>closeLanternModal('red')}>{game.red_mine}</button></div>}
              {game.blue_mine >= 1 &&<div className="span-1 bg-blue-500 p-2"><button className="w-full h-full" onClick={()=>closeLanternModal('blue')}>{game.blue_mine}</button></div>}
              {game.black_mine >= 1 &&<div className="span-1 bg-gray-500 p-2"><button className="w-full h-full" onClick={()=>closeLanternModal('black')}>{game.black_mine}</button></div>}
            </div>
        </Modal>         
      </div>
    )
  }
}