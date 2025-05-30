import React from 'react'
import {useContext} from 'react';
import { UserDataContext } from '../Context/UserContext';

function Header() {
    const{user}=useContext(UserDataContext);
    console.log("The user is",user);
return (
    <div>
        <header className="p-4 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <h1 className="text-xl font-bold ">Hi</h1>
                <h3 className="text-[#13B8A7]">{user._id}</h3>
            </div>
            <div className="bg-white rounded-full p-2">
                <img src="..\src\assets\icon\question.png" alt="" className="w-4 h-4" />
            </div>
            <div className='bg-[#13B8A7] rounded-full p-1'>
                <img src="..\src\assets\icon\user.png" alt="" />
            </div>
        </header>
    </div>
)
}

export default Header