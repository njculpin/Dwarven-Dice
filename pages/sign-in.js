import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Modal from 'react-modal';

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function signIn() {
    const { error, data } = await supabase.auth.signIn({
      email
    })

    if (error) {
      console.log(error)
    } else {
      setSubmitted(true)
    }

  }

return (
    <div className=" h-screen w-screen bg-white sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-4">
          <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={e => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-black rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-red-500 focus:border-yellow-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => signIn()}>
                Sign in
              </button>
            </div>
        </div>
      </div>

      <Modal
      isOpen={submitted}
      style={{
        content: {
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
        <div><h1>Please check your email for link!</h1></div>
      </Modal>
    </div>
  )
}