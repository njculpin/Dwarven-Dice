import axios from 'axios'
import { useState } from 'react'
import { ClipboardIcon } from '@heroicons/react/outline'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function Home() {

  const [state, setState] = useState({
    copied: false
  })
  const [code, setCode] = useState('')

  const createGame = () => {
    axios.post('/api/create').then(res => {
      console.log(res)
      let uuid = res.data.uuid
      setCode(uuid)
    })
  }

  const joinGame = () => {
    if (code){
      axios.post('/api/join', { code:code }).then(res => {
        console.log(res)
      })
    } else {
      console.log('no code')
    }
  }

  return (
    <div className="p-2 flex flex-col justify-center items-center space-y-4">

      <div className="grid grid-cols-1 grid-rows-2 gap-2">
        <div className="flex flex-row w-full space-x-2">

          <button onClick={()=>createGame()} className="border px-4 py-2 rounded-full w-32">
            <h1 className="text-center">Create</h1>
          </button>

          <CopyToClipboard text={code}
          onCopy={() => setState({copied: true})}>
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
