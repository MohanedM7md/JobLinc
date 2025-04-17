import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, UseDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import { logOut } from '@store/user/userSlice';

interface User {
    id: number;
    username: string;
    university: string;
    image: string;
}

function MeCard(){
    const [handleBtn, setHandleBtn] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null)
    const [userId, setUserId]=useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

  // const handleUserButton = async (id?: number): Promise<void> => {
  //   try {
  //     const { data } = await axios.get(`https://dummyjson.com/users/${id || 1}`);
  //     setUser(data)
  //     console.log('====================================');
  //     console.log(data.id);
  //     console.log('====================================');
  //     localStorage.setItem('user', data.id.toString())
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleBtnClick = (): void => {
    setHandleBtn(!handleBtn)
  }
  const handleSignOut = async () => {
    await dispatch(logOut());
    navigate("/");
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userState") || "");
    setUserId(userData.userId)
    // const userId = localStorage.getItem('user')
    // if (!userId) {
    //   handleUserButton()
    // } else {
    //   console.log('No user found');
    // }
  }, [])
    return(
        <div className={`card bg-white p-3 shadow-2xl rounded-2xl w-[270px] duration-500 transition-all ease-in-out`}>
          <div className="body border-b-2 py-2 border-gray-300">
            <h3 className='text-xl capitalize font-semibold mb-2'>Account</h3>

            <ul className='space-y-2 text-gray-600'>
              <li>
                <Link className="cursor-pointer flex justify-center" to={`/profile/${userId}`}>
                  <button className='cursor-pointer border-2 px-15 py-0.5 rounded-full font-semibold hover:bg-lightGray hover:outline-1 text-crimsonRed border-crimsonRed'>View Profile</button>
                </Link>
              </li>
              <li>
                <Link className='hover:text-blue-400 duration-300' to="#">Try 1 month of Premium for EGP0</Link>
              </li>
              <li>
                <Link className='hover:underline' to="/settings">Settings & Privacy</Link>
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
            <Link className='hover:underline' to="#" onClick={handleSignOut}>Sign Out</Link>
          </div>
        </div>
    );
}
export default MeCard;