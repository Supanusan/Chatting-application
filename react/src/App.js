import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

export const App = () => {
  const Navigate = useNavigate()
  //Input value
  const [message, setMessage] = useState('')
  //user typing data
  const [responcess, setResponse] = useState([{
    text: 'hi',
    ismine: false
  }])

  //Room socket
  const [socket, setSocket] = useState(null)
  //public socket
  const [pubsocket, setPubsocket] = useState(null)

  //To display the yes OR no popup
  const [popup, setPopup] = useState(false)





  //To join normal message
  const join = () => {
    try {
      const pubsocket = io('http://localhost:5000')
      setPubsocket(pubsocket)
      pubsocket.on('message', (msg) => {
        setResponse((oldMessage) => [...oldMessage, {
          text: msg,
          ismine: true
        }])
      })

    } catch (error) {
      console.log(error.message)
    }

  }


  //To Room
  const joinroom = () => {
    try {
      const socket = io('http://localhost:5000/app')
      setSocket(socket)
      socket.emit('joinroom', 'room1')
      socket.on('roommessage', (msg) => {
        setResponse((oldMessage) =>
          [...oldMessage, { text: msg, ismine: true }]
        )
      })
    } catch (error) {
      console.log(error.message)
    }

  }

  //sent all messages to backend
  const response = async () => {
    fetch('http://localhost:5000/app', {
      method: "POST",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })

  }

  //Get all messages from backend
  const getmessage = async () => {
    setPopup(false)
    Navigate('/old')

  }
  //Sent message
  const sentmessage = () => {
    if (socket) {
      socket.emit('roommessage', message)
      //I will get all response in joiroom
      setMessage('')
      response()
    }
    if (pubsocket) {
      pubsocket.emit('message', message)
      setMessage('')
      //I will get response in join
      response()
    }

  }
  //To stop the Connection
  useEffect(() => {
    // Cleanup function to disconnect sockets when component unmounts
    setPopup(true)
    return () => {
      if (pubsocket) {
        pubsocket.disconnect();  // Disconnect only if pubsocket exists
      }
      if (socket) {
        socket.disconnect();  // Disconnect only if socket exists
      }

    };
  }, [pubsocket, socket,]);  // This effect runs when pubsocket or socket change




  const no = () => {
    setPopup(false)
  }

  return (
    <div className=' bg-blue-600 w-full h-screen flex flex-col justify-around items-center'>



      <div className='bg-blue-100 w-full h-4/5 px-10 relative flex flex-col items-center'>




        {(popup && (pubsocket || socket)) && <div className='bg-blue-200 w-1/2 rounded-lg h-50'>

          <div className='flex justify-center'>Do you want the oldermessages...</div>
          <div className='flex justify-evenly'>
            <button className='rounded-md bg-red-800 text-white w-20 h-10 ' onClick={no}>NO</button>
            <button className='rounded-md bg-blue-500 text-white w-20 h-10' onClick={getmessage}>Yes</button>          </div>
        </div>}
        <div className='w-full flex flex-col items-start overflow-auto'>

          {(responcess.map((msg, index) => ( // Render responses as a list
            <div key={index} className=''>{msg.text}</div>
          )))}
        </div>

      </div>

      <div className=' w-3/5 h-20 flex justify-around bg-gray-400 rounded-lg '>
        <div className='flex flex-col '>
          <button className='bg-transparent text-gray-200 my-2' onClick={joinroom}>join the room</button>
          <button className='bg-transparent text-gray-200 my-1' onClick={join}>join</button>
        </div>

        <input className='bg-transparent text-gray-200 w-4/6 border-gray-200' type="text" onChange={(e) => setMessage(e.target.value)} value={message} placeholder='Say Something...' />
        <button className='bg-transparent text-gray-200 border-1 border-gray-900 mr-3' onClick={sentmessage}  >Sent</button>
      </div>

    </div>

  )
}


export default App;
