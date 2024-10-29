import React, { useEffect, useState } from 'react'
import Loading from './loading'
import { useNavigate } from 'react-router-dom'

const Oldmsg = () => {
    const Navigate = useNavigate()
    //Loading inticator
    const [isloading, setIsloading] = useState(true)
    const [fetchmessage, setFetchmessage] = useState()

    useEffect(() => {
        const connectbackend = async () => {

            const response = await fetch('http://localhost:5000/app', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const finall = await response.json()
            setFetchmessage(finall)


            setIsloading(false)

        }
        connectbackend()
    }, [])
    return (
        <div className='bg-blue-600 px-3 py-3'>
            <div className='py-2 rounded-lg bg-blue-100'>
                <button className='my-5 mx-3 bg-blue-50 px-3 py-2 rounded-md' onClick={() => { Navigate('/chat') }}>Back</button>
                {isloading ? <Loading /> :

                    fetchmessage.map((msg) => (<div className='mt-2 mx-3 bg-blue-50 max-w-fit px-3 py-2 rounded-md'>{msg}</div>))
                }
                <button className='my-5 mx-3 bg-blue-50 px-3 py-2 rounded-md' onClick={() => { Navigate('/chat') }}>Back</button>
            </div>
        </div >
    )
}


export default Oldmsg;