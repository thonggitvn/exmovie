import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setLogoutAction } from '../../stores/user';

const NavBarDesktopTablet = () => {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {infoUser} = useSelector((state)=> state.userSlice);

    const handleLogout = () => {
        dispatch(setLogoutAction());
    };

    return (
    <div  >
        
        {infoUser ? (
            <div className='text-white font-bold'>
                <span onClick={()=>{navigate("/info")}} className='cursor-pointer rounded-xl bg-green-500    py-1 px-2'> {infoUser?.hoTen}</span>
                <button 
                onClick={handleLogout}
                className='bg-red-500 px-2 py-1 rounded-xl ml-4 mr-5 '>Đăng Xuất</button>
            </div>
        ):(
            <div className='text-white' >
            <button onClick={()=>{
                navigate("/login");
                }} className='px-2 py-1 rounded-2xl bg-green-600' >Đăng Nhập</button>
            <button onClick={()=>{
                navigate("/register")
                }} className='ml-4 px-2 py-1 rounded-2xl bg-violet-400' >Đăng Ký</button>
        </div>
        )},
        
    </div>
  )
}

export default NavBarDesktopTablet