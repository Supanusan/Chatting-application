import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const Navigate = useNavigate();
    //Username
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState('')
    const sent = async (e) => {
        e.preventDefault();
        try {
            const Response = await fetch('http://localhost:5000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            if (Response) {
                const data = await Response.json()
                setResponse(data)
                if (Response.ok) {
                    setTimeout(() => {
                        Navigate('/')
                    }, 2000);

                }
            }

        } catch (error) {
            setResponse(error.message)
            console.log(error.message)
        }

    }
    return (
        <div className='bg-slate-100 w-full h-screen flex flex-row justify-center items-center'>
            <div className='flex items-center justify-center rounded-2xl shadow-md h-1/2 w-1/2 bg-white'>

                <form onSubmit={sent} className='flex flex-col items-center justify-start w-1/2 h-1/2 bg-white'>
                    <h2 className='font-bold text-2xl ' >Create an Account</h2>
                    <input required onChange={(e) => { setUsername(e.target.value) }} value={username} placeholder='Username' type='text' className='w-3/4 bg-slate-100 h-8 rounded-lg px-3 py-3 text-slate-500 mb-5 mt-6'></input>
                    <input required onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' type='password' className='w-3/4 bg-slate-100 h-8 rounded-lg px-3 py-3 text-slate-500 mb-5'></input>
                    <h5 className=' text-sm my-4'>forgot your password</h5>
                    <button type='submit' className='bg-purple-700 px-7 py-1 rounded-md text-white'>Submit</button>
                    {response ? <div>{response}</div> : null}
                </form>
                <div className='bg-purple-700 w-1/2 h-full rounded-l-3xl rounded-2xl flex  flex-col items-center py-10'>
                    <h2 className='text-white font-extrabold text-2xl font-mono my-8'>
                        Hey , Buddy !
                    </h2>
                    <h4 className='text-center text-white mb-14'>
                        Register with your personal details to use all of site feature.
                    </h4>
                    <button onClick={() => Navigate('/')} className='border-solid border-white border-2 rounded-md px-5 py-1'>Login</button>
                </div>
            </div>

        </div >
    )
}

export default Create;
