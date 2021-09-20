import { useState } from 'react'

export default function Game() {

  const [dieOne, setDieOne] = useState({spent: false,commit: false,face: ''})
  const [dieTwo, setDieTwo] = useState({spent: false,commit: false,face: ''})
  const [dieThree, setDieThree] = useState({spent: false,commit: false,face: ''})
  const [dieFour, setDieFour] = useState({spent: false,commit: false,face: ''})
  const [dieFive, setDieFive] = useState({spent: false,commit: false,face: ''})
  const [dieSix, setDieSix] = useState({spent: false,commit: false,face: ''})
  const [dieSeven, setDieSeven] = useState({spent: false,commit: false,face: ''})
  const [dieEight, setDieEight] = useState({spent: false,commit: false,face: ''})

  const randomFace = () => {
    const items = ['head','axe','lantern','horns','bomb','beers']
    const randomFace = items[Math.floor(Math.random()*items.length)]
    return randomFace
  }

  function rollAllDie(){
    setDieOne({...dieOne, face: randomFace()})
    setDieTwo({...dieTwo, face: randomFace()})
    setDieThree({...dieThree, face: randomFace()})
    setDieFour({...dieFour, face: randomFace()})
    setDieFive({...dieFive, face: randomFace()})
    setDieSix({...dieSix, face: randomFace()})
    setDieSeven({...dieSeven, face: randomFace()})
    setDieEight({...dieEight, face: randomFace()})
  }

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
          <h1>Player 1</h1>
          <div className="grid grid-flow-col grid-cols-5">
            <div className="span-1 bg-green-500 p-2">00</div>
            <div className="span-1 bg-purple-500 p-2">00</div>
            <div className="span-1 bg-red-500 p-2">00</div>
            <div className="span-1 bg-blue-500 p-2">00</div>
            <div className="span-1 bg-gray-500 p-2">00</div>
          </div>
        </div>
        <div className="border w-full">
          <h1>Player 2</h1>
          <div className="grid grid-flow-col grid-cols-5">
          <div className="span-1 bg-green-500 p-2">00</div>
            <div className="span-1 bg-purple-500 p-2">00</div>
            <div className="span-1 bg-red-500 p-2">00</div>
            <div className="span-1 bg-blue-500 p-2">00</div>
            <div className="span-1 bg-gray-500 p-2">00</div>
          </div>
        </div>
        <div className="border w-full">
          <h1>Player 3</h1>
          <div className="grid grid-flow-col grid-cols-5">
            <div className="span-1 bg-green-500 p-2">00</div>
            <div className="span-1 bg-purple-500 p-2">00</div>
            <div className="span-1 bg-red-500 p-2">00</div>
            <div className="span-1 bg-blue-500 p-2">00</div>
            <div className="span-1 bg-gray-500 p-2">00</div>
          </div>
        </div>
        <div className="border w-full">
          <h1>Player 4</h1>
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
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Spend</h1></button>
          <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{dieOne.face}</div>
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Keep</h1></button>
        </div>

        <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Spend</h1></button>
          <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{dieTwo.face}</div>
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Keep</h1></button>
        </div>

        <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Spend</h1></button>
          <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{dieThree.face}</div>
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Keep</h1></button>
        </div>

        <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Spend</h1></button>
          <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{dieFour.face}</div>
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Keep</h1></button>
        </div>

        <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Spend</h1></button>
          <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{dieFive.face}</div>
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Keep</h1></button>
        </div>

        <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Spend</h1></button>
          <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{dieSix.face}</div>
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Keep</h1></button>
        </div>

        <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Spend</h1></button>
          <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{dieSeven.face}</div>
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Keep</h1></button>
        </div>

        <div className="grid grid-flow-col grid-cols-1 grid-rows-3 justify-center items-center gap-4 border p-2">
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Spend</h1></button>
          <div className="bg-black rounded-full h-14 text-white flex justify-center items-center">{dieEight.face}</div>
          <button className="border px-4 py-2 text-center shadow-lg"><h1>Keep</h1></button>
        </div>

      </div>

      <button className="border px-4 py-2 text-center shadow-lg" onClick={()=>rollAllDie()}><h1>Roll</h1></button>

      <div className="border text-center">
        <h1>My Keep</h1>
        <div className="grid grid-flow-col grid-cols-5">
            <div className="span-1 bg-green-500 p-2">00</div>
            <div className="span-1 bg-purple-500 p-2">00</div>
            <div className="span-1 bg-red-500 p-2">00</div>
            <div className="span-1 bg-blue-500 p-2">00</div>
            <div className="span-1 bg-gray-500 p-2">00</div>
        </div>
      </div>
      
    </div>
  )
}
