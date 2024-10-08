import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const App = () => {
  const [value, setValue] = useState('')
  const [responcess, setResponse] = useState([])
  const [socket, setSocket] = useState(null)
  const [pubsocket, setPubsocket] = useState(null)

  //To join normal message
  const join = () => {
    try {
      const pubsocket = io('http://localhost:5000')
      setPubsocket(pubsocket)
      pubsocket.on('message', (msg) => {
        setResponse((oldMessage) => [...oldMessage, msg])
        console.log(msg)
      })

    } catch (error) {
      console.log(error.message)
    }

  }


  //To Room
  const joinroom = () => {
    try {
      const socket = io('http://localhost:5000')
      setSocket(socket)
      socket.emit('joinroom', 'room1')
      socket.on('roommessage', (msg) => {
        setResponse(msg)
      })
    } catch (error) {
      console.log(error.message)
    }

  }
  const sentmessage = () => {
    if (socket) {
      socket.emit('roommessage', value
        //I will get all response in joiroom
      )
    }
    if (pubsocket) {
      pubsocket.emit('message', value)
      setValue('')
      //I will get response in join
    }
  }





  useEffect(() => {
    // Cleanup function to disconnect sockets when component unmounts
    return () => {
      if (pubsocket) {
        pubsocket.disconnect();  // Disconnect only if pubsocket exists
      }
      if (socket) {
        socket.disconnect();  // Disconnect only if socket exists
      }
    };
  }, [pubsocket, socket]);  // This effect runs when pubsocket or socket change

  return (
    <div className=' bg-blue-600 w-full h-screen flex flex-col justify-around items-center'>

      <div className='bg-blue-100 w-full h-4/5 px-10'>
        {responcess.map((msg, index) => ( // Render responses as a list
          <div key={index}>{msg}</div>
        ))}
      </div>

      <div className=' w-3/5 h-20 flex justify-around bg-gray-400 rounded-lg '>
        <div className='flex flex-col '>
          <button className='bg-transparent text-gray-200 my-2' onClick={joinroom}>join the room</button>
          <button className='bg-transparent text-gray-200 my-1' onClick={join}>join</button>
        </div>

        <input className='bg-transparent text-gray-200 w-4/6 border-gray-200' type="text" onChange={(e) => setValue(e.target.value)} value={value} placeholder='Say Something...' />
        <button className='bg-transparent text-gray-200 border-1 border-gray-900 mr-3' onClick={sentmessage}  >Sent</button>
      </div>

    </div>

  )
}


export default App;
