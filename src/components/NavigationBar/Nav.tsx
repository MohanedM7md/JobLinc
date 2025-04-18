import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

interface User {
  id: number;
  username: string;
  university: string;
  image: string;
}

const Nav: React.FC = () => {
  const [handleBtn, setHandleBtn] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const handleUserButton = async (id?: number): Promise<void> => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/users/${id || 1}`);
      setUser(data)
      console.log('====================================');
      console.log(data.id);
      console.log('====================================');
      localStorage.setItem('user', data.id.toString())
    } catch (error) {
      console.log(error);
    }
  }

  const handleBtnClick = (): void => {
    setHandleBtn(!handleBtn)
  }

  useEffect(() => {
    const userId = localStorage.getItem('user')
    if (!userId) {
      handleUserButton()
    } else {
      console.log('No user found');
    }
  }, [])

  return (
    <div className='Nav bg-rose-600 shadow-md'>
      <div className="container w-[80%] mx-auto p-3 flex flex-wrap justify-between items-center relative">
        <div className="Logo">
          <h1>Logo</h1>
        </div>

        <div className='links'>
          <ul className='flex flex-wrap space-x-2'>
            <li>
              <Link to={'/home'}>Home</Link>
            </li>
            <li>
              <Link to={'/home'}>Home</Link>
            </li>
            <li>
              <Link to={'/home'}>Home</Link>
            </li>
            <li>
              <Link to={'/home'}>Home</Link>
            </li>
            <li>
              <Link to={'/home'}>Home</Link>
            </li>
          </ul>
        </div>

        <div className={`btn cursor-pointer ${!handleBtn ? '' : 'overflow-hidden'}`} onClick={handleBtnClick}>
          {user && (
            <figure className={`w-[50px] h-[50px] rounded-full overflow-hidden`}>
              <img src={user.image} className='w-full' alt="user" />
            </figure>
          )}
          <figcaption className='flex items-center justify-center'>
            me <FontAwesomeIcon icon={faSortDown} className='mx-2' />
          </figcaption>
        </div>
        <div className={`card bg-white p-3 absolute top-25 shadow-2xl rounded-2xl end-0 w-[300px] duration-500 transition-all ease-in-out ${!handleBtn ? 'opacity-0' : 'opacity-100'}`}>
          {user && (
            <div className="header flex flex-wrap space-x-2 border-b-2 py-2 border-gray-300">
              <figure className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                <img src={user.image} alt="user" />
              </figure>
              <figcaption className='w-[200px]'>
                <p className='font-semibold capitalize text-xl'>{user.username}</p>
                <p>{user.university}</p>
              </figcaption>
              <Link to={'/profile'} className='w-full border rounded-4xl text-blue-400 my-2 hover:bg-blue-400 hover:text-white duration-500 transition-all ease-in-out text-center'>View Profile</Link>
            </div>
          )}
          <div className="body border-b-2 py-2 border-gray-300">
            <h3 className='text-xl capitalize font-semibold mb-2'>Account</h3>
            <ul className='space-y-2 text-gray-600'>
              <li>
                <Link className='hover:text-blue-400 duration-300' to="#">Try 1 month of Premium for EGP0</Link>
              </li>
              <li>
                <Link className='hover:underline' to="#">Settings & Privacy</Link>
              </li>
              <li>
                <Link className='hover:underline' to="#">Help</Link>
              </li>
              <li>
                <Link className='hover:underline' to="#">Language</Link>
              </li>
            </ul>
          </div>
          <div className="footer border-b-2 py-2 border-gray-300">
            <h3 className='text-xl capitalize font-semibold mb-2'>Manage</h3>
            <ul className='space-y-2 text-gray-600'>
              <li>
                <Link className='hover:underline' to="#">Posts & Activity</Link>
              </li>
              <li>
                <Link className='hover:underline' to="#">Job Posting Account</Link>
              </li>
            </ul>
          </div>
          <div className="final py-2 text-gray-600">
            <Link className='hover:underline' to="#">Sign Out</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav