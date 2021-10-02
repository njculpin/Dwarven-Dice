import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Modal from 'react-modal';
import axios from 'axios'

Modal.setAppElement("#__next")

export default function Game() {

  const router = useRouter()
  const [game, setGameState] = useState()
  const [winner, setWinner] = useState('')
  const [profile, setProfile] = useState(null)
  const [headDie, setHeadDie] = useState(0)
  const [headModalIsOpen, setHeadModalOpen] = useState(false)
  const [lanternDie, setLanternDie] = useState(0)
  const [lanternModalIsOpen, setLanternModalIsOpen] = useState(false)
  const [isLoadModalOpen, setLoadModalIsOpen] = useState(false)

  useEffect(() => {
    fetchProfile()
  })

  let mySubscription = null;

  useEffect(()=>{
    getInitialGame()
    getGameAndSubscribe()
  },[])

  async function getInitialGame(){
    const {data, error} = await supabase.from('gamestates').select().match({game_uid: router.query.id})
    if (error){
      console.log(`error -> ${JSON.stringify(error)}`)
    } else {
      setGameState(data[0])
    }
  }

  function getGameAndSubscribe(){
    if (!mySubscription){
      mySubscription = supabase
        .from("gamestates")
        .on("*", (payload) => {
          setGameState(payload.new)
        })
        .subscribe();
    }
  }

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

  function openHeadModal(die) {
    if (die === 1){
      if (game.die1_state === 0){
        setHeadDie(die)
        setHeadModalOpen(true)
      }
    }
    if (die === 2){
      if (game.die2_state === 0){
        setHeadDie(die)
        setHeadModalOpen(true)
      }
    }
    if (die === 3){
      if (game.die3_state === 0){
        setHeadDie(die)
        setHeadModalOpen(true)
      }
    }
    if (die === 4){
      if (game.die4_state === 0){
        setHeadDie(die)
        setHeadModalOpen(true)
      }
    }
    if (die === 5){
      if (game.die5_state === 0){
        setHeadDie(die)
        setHeadModalOpen(true)
      }
    }
    if (die === 6){
      if (game.die6_state === 0){
        setHeadDie(die)
        setHeadModalOpen(true)
      }
    }
    if (die === 7){
      if (game.die7_state === 0){
        setHeadDie(die)
        setHeadModalOpen(true)
      }
    }
    if (die === 8){
      if (game.die8_state === 0){
        setHeadDie(die)
        setHeadModalOpen(true)
      }
    }
  }

  function closeLanternModal(color) {
    setLoadModalIsOpen(true)
    setLanternModalIsOpen(false);
    axios.post(`/api/game/spend/lanterns`, {
      die: lanternDie, 
      game_uid: router.query.id, 
      color: color
    }).then(()=>{
      setLoadModalIsOpen(false)
    })
  }

  function closeHeadModal(secondary_player) {
    setLoadModalIsOpen(true)
    setHeadModalOpen(false);
    axios.post(`/api/game/spend/heads`, {
      die: headDie, 
      game_uid: router.query.id, 
      secondary_player: secondary_player
    }).then(()=>{
      setLoadModalIsOpen(false)
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
    setLoadModalIsOpen(true)
    axios.post('/api/game/roll', {game_uid: router.query.id, pid: profile.id}).then(()=>{
      setLoadModalIsOpen(false)
    })
  }

  function passTurn(){
    setLoadModalIsOpen(true)
    axios.post('/api/game/pass', {game_uid: router.query.id, active_player: game.active_player, pid: profile.id}).then(()=>{
      setLoadModalIsOpen(false)
    })
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

  const collectOnCommits = () => {
    setLoadModalIsOpen(true)
    axios.post(`/api/game/collect/collect`, {
      game_uid: router.query.id
    }).then(()=>{
      setLoadModalIsOpen(false)
    })
  }

  const getTip = (action, face) => {
    if (action === 'spend'){
      switch (face) {
        case 0:
          return 'Take the remaining dice divided in half and rounded up and give them to another player of your choice. Select a color of gem they control. Each player rolls. If you roll more heads from the player you selected, you recieve all the gems of the chosen color.'
        case 1:
          return 'select a color gem of your choice from the mine and move it to the table'
        case 2:
          return 'remove three random gems from the mine and move them to the table'
        case 3:
          return 'remove a random gem from the mine and move them to the table'
        case 4:
          return 'get 2 rerolls'
        case 5:
          return 'get 1 reroll'
      }
    }
    if (action === 'commit'){
      switch (face) {
        case 0:
          return 'Keep 3 Heads then press commit to collect all green gems from the table'
        case 1:
          return 'Keep 3 Heads then press commit to collect all purple gems from the table'
        case 2:
          return 'Keep 3 Heads then press commit to collect all red gems from the table'
        case 3:
          return 'Keep 3 Heads then press commit to collect all blue gems from the table'
        case 4:
          return 'Keep 1 Horn and 2 Beers then press commit to collect all black gems from the table'
        case 5:
          return 'Keep 3 Beers then press commit to collect all black gems from the table'
      }
    }
  }

  const activateDie = (action, face, number) => {
    setLoadModalIsOpen(true)
    if (action === 'spend'){
      if (face === 0){
        openHeadModal(number)
      }
      if (face === 1){
        if (
          game.green_mine + 
          game.purple_mine + 
          game.red_mine + 
          game.blue_mine + 
          game.black_mine >= 3){
          setLoadModalIsOpen(false)
        }
        openLanternModal(number)
      }
      if (face === 2 || face === 3){
        axios.post(`/api/game/spend/axebombs`, {
          die: number, 
          game_uid: router.query.id, 
          pid:profile.id}).then(()=>{
            setLoadModalIsOpen(false)
          })
      }
      if (face === 4 || face === 5){
        axios.post(`/api/game/spend/beerhorns`, {
          die: number, 
          game_uid: router.query.id, 
          pid:profile.id}).then(()=>{
            setLoadModalIsOpen(false)
          })
      }

      // if mine count is less than or equal to
      // zero after this spend action
      // the game is over
      if (game.green_mine + 
        game.purple_mine + 
        game.red_mine + 
        game.blue_mine + 
        game.black_mine <= 0){
          console.log('end game')
          axios.post(`/api/game/end`, {
            game_uid: router.query.id
          }).then(res => {
            setLoadModalIsOpen(false)
            setWinner(res.data.message.player_uid)
          })
        }
    }

    if (action === 'commit'){
      axios.post(`/api/game/commit/commit`, {
        die: number,
        game_uid: router.query.id
      }).then(()=>{
        setLoadModalIsOpen(false)
      })
      }

  }

  const dieSpendButtonStyle = (state) => {
    switch(state){
      case 1:
        return "border px-4 py-2 text-center bg-black"
      case 2:
        return "border px-4 py-2 text-center"
      default:
          return "border px-4 py-2 text-center shadow-lg has-tooltip"
    }
  }

  const dieCommitButtonStyle = (state) => {
    switch(state){
      case 1:
        return "border px-4 py-2 text-center"
      case 2:
        return "border px-4 py-2 text-center bg-black"
      default:
          return "border px-4 py-2 text-center shadow-lg has-tooltip"
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

  const getDiceStyle = (value) => {
    switch (value) {
      case 0:
        return "bg-green-500 rounded-full h-14 text-white flex justify-center items-center"
      case 1:
        return "bg-purple-500 rounded-full h-14 text-white flex justify-center items-center"
      case 2:
        return "bg-red-500 rounded-full h-14 text-white flex justify-center items-center"
      case 3:
        return "bg-blue-500 rounded-full h-14 text-white flex justify-center items-center"
      case 4:
        return "bg-black rounded-full h-14 text-white flex justify-center items-center"
      case 5:
        return "bg-black rounded-full h-14 text-white flex justify-center items-center"
    }
  }

  if (winner !== ''){ return <div className="p-2 flex flex-col justify-center items-center space-y-4">
   <h1>WINNER {winner}!</h1> 
  </div> }

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
            <h1>{rollsAvailable(game.p2_address)} rolls remaining</h1>
            <h1 className="truncate p-2">{game.p3_address? game.p3_address : 'empty'}</h1>
            <div className="grid grid-flow-col grid-cols-5">
              <div className="span-1 bg-green-500 p-2">{game.green_p33}</div>
              <div className="span-1 bg-purple-500 p-2">{game.purple_p3}</div>
              <div className="span-1 bg-red-500 p-2">{game.red_p3}</div>
              <div className="span-1 bg-blue-500 p-2">{game.blue_p3}</div>
              <div className="span-1 bg-gray-500 p-2">{game.black_p3}</div>
            </div>
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
            <button className={dieSpendButtonStyle(game.die1_state)} onClick={()=>activateDie('spend',game.die1_face,1)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('spend',game.die1_face)}</span>
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die1_face)}>{getFaceValue(game.die1_face)}</div>
            <button className={dieCommitButtonStyle(game.die1_state)} onClick={()=>activateDie('commit',game.die1_face,1)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('commit',game.die1_face)}</span>
              <h1>Keep</h1>
            </button>
          </div>
  
          <div className={activeDieStyle(game.die2_location)}>
            <button className={dieSpendButtonStyle(game.die2_state)} onClick={()=>activateDie('spend',game.die2_face,2)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('spend',game.die2_face)}</span>
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die2_face)}>{getFaceValue(game.die2_face)}</div>
            <button className={dieCommitButtonStyle(game.die2_state)} onClick={()=>activateDie('commit',game.die2_face,2)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('commit',game.die2_face)}</span>
              <h1>Keep</h1>
            </button>
          </div>
  
          <div className={activeDieStyle(game.die3_location)}>
            <button className={dieSpendButtonStyle(game.die3_state)} onClick={()=>activateDie('spend',game.die3_face,3)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('spend',game.die3_face)}</span>
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die3_face)}>{getFaceValue(game.die3_face)}</div>
            <button className={dieCommitButtonStyle(game.die3_state)} onClick={()=>activateDie('commit',game.die3_face,3)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('commit',game.die3_face)}</span>
              <h1>Keep</h1>
            </button>
          </div>
  
          <div className={activeDieStyle(game.die4_location)}>
            <button className={dieSpendButtonStyle(game.die4_state)} onClick={()=>activateDie('spend',game.die4_face,4)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('spend',game.die4_face)}</span>
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die4_face)}>{getFaceValue(game.die4_face)}</div>
            <button className={dieCommitButtonStyle(game.die4_state)} onClick={()=>activateDie('commit',game.die4_face, 4)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('commit',game.die4_face)}</span>
              <h1>Keep</h1>
            </button>
          </div>
  
          <div className={activeDieStyle(game.die5_location)}>
            <button className={dieSpendButtonStyle(game.die5_state)} onClick={()=>activateDie('spend',game.die5_face,5)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('spend',game.die5_face)}</span>
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die5_face)}>{getFaceValue(game.die5_face)}</div>
            <button className={dieCommitButtonStyle(game.die5_state)} onClick={()=>activateDie('commit',game.die5_face, 5)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('commit',game.die6_face)}</span>
              <h1>Keep</h1>
            </button>
          </div>
  
          <div className={activeDieStyle(game.die6_location)}>
            <button className={dieSpendButtonStyle(game.die6_state)}  onClick={()=>activateDie('spend',game.die6_face,6)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('spend',game.die6_face)}</span>
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die6_face)}>{getFaceValue(game.die6_face)}</div>
            <button className={dieCommitButtonStyle(game.die6_state)} onClick={()=>activateDie('commit',game.die6_face, 6)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('commit',game.die6_face)}</span>
              <h1>Keep</h1>
            </button>
          </div>
  
          <div className={activeDieStyle(game.die7_location)}>
            <button className={dieSpendButtonStyle(game.die7_state)} onClick={()=>activateDie('spend',game.die7_face,7)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('spend',game.die7_face)}</span>
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die7_face)}>{getFaceValue(game.die7_face)}</div>
            <button className={dieCommitButtonStyle(game.die7_state)} onClick={()=>activateDie('commit',game.die7_face,7)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('commit',game.die7_face)}</span>
              <h1>Keep</h1>
            </button>
          </div>
  
          <div className={activeDieStyle(game.die8_location)}>
            <button className={dieSpendButtonStyle(game.die8_state)} onClick={()=>activateDie('spend',game.die8_face,8)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('spend',game.die8_face)}</span>
              <h1>Spend</h1>
            </button>
            <div className={getDiceStyle(game.die8_face)}>{getFaceValue(game.die8_face)}</div>
            <button className={dieCommitButtonStyle(game.die8_state)} onClick={()=>activateDie('commit',game.die8_face,8)}>
              <span className='tooltip rounded shadow-lg p-2 bg-white text-black'>{getTip('commit',game.die8_face)}</span>
              <h1>Keep</h1>
            </button>
          </div>
  
        </div>
  
        <div className="w-1/2 flex justify-between items-center p-4">
          <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>rollAllDie()}><h1>Roll</h1></button>
          <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>collectOnCommits()}><h1>Collect</h1></button>
          <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>passTurn()}><h1>Pass</h1></button>
          <p>Turn {game.turns}</p>
        </div>


        {/* LANTERN COLOR SELECTOR MODAL */}
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

          {/* HEAD SECONDARY PLAYER SELECTOR MODAL */}
          <Modal
          isOpen={headModalIsOpen}
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
            <div className="grid grid-flow-col grid-cols-1 grid-rows-5">

              {game.p1_address !== '' && 
              game.p1_address !== profile.id && 
              <div className="span-1 p-2">
                <button className="w-full h-full" 
                onClick={()=>closeHeadModal(game.p1_address)}>
                1
                </button>
              </div>}

              {game.p2_address !== '' && 
              game.p12address !== profile.id && 
              <div className="span-1 p-2">
                <button className="w-full h-full" 
                onClick={()=>closeHeadModal(game.p2_address)}>
                2
                </button>
              </div>}

              {game.p3_address !== '' && 
              game.p3_address !== profile.id && 
              <div className="span-1 p-2">
                <button className="w-full h-full" 
                onClick={()=>closeHeadModal(game.p3_address)}>
                3
                </button>
              </div>}

              {game.p4_address !== '' && 
              game.p4_address !== profile.id && 
              <div className="span-1 p-2">
                <button className="w-full h-full" 
                onClick={()=>closeHeadModal(game.p4_address)}>
                4
                </button>
              </div>}

              {game.p5_address !== '' && 
              game.p5_address !== profile.id && 
              <div className="span-1 p-2">
                <button className="w-full h-full" 
                onClick={()=>closeHeadModal(game.p5_address)}>
                5
                </button>
              </div>}

            </div>
        </Modal>

      <Modal
      isOpen={isLoadModalOpen}
      style={{
        overlay:{
          backgroundColor: 'rgba(0, 0, 0, 0.0)'
        },
        content: {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          outline: 'none',
          border: '0px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      >
        <Loader
        type="Oval"
        color="#000000"
        height={100}
        width={100}
        timeout={3000}
        />
      </Modal>


      </div>
    )
  }
}