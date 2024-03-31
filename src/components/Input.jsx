import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { UserContext } from '../Usercontext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = () => {
    const user = useContext(UserContext);
    const butt = useRef();
    const pass = useRef();
    const required = useRef();

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:3000/");

            const data = await response.json();
            user.setdata(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const HandleChange = (e) => {

        user.settemp(prevTemp => ({
            ...prevTemp,
            [e.target.name]: e.target.value,
            ["ID"]: uuidv4()
        }));
    }

    useEffect(() => {
        if (user.temp.username && user.temp.website && user.temp.password &&
            user.temp.username.trim() !== '' && user.temp.website.trim() !== '' && user.temp.password.trim() !== '') {
            user.Disabled.current = false;
            butt.current.style.backgroundColor = "rgb(14,116,144)";
            required.current.style.display = "none";
        } else {
            user.Disabled.current = true;
            butt.current.style.backgroundColor = "white";
            required.current.style.display = "block";
        }
    }, [user.temp]);

    const EyeChange = () => {
        const image = pass.current.nextSibling.querySelector('img');
        if (pass.current.type === "password") {
            pass.current.type = "text";
            image.src = "eye.svg";
        } else {
            pass.current.type = "password";
            image.src = "eye-crossed.svg";
        }
    }

    const Saved = async () => {

        const id = user.persistID;
        let finder;
        if (id) {
            finder = user.data.find(items => items.ID === id);
        }

        if (finder) {

            const response = await fetch('http://localhost:3000/delete', {
                method: 'POST',
                body: JSON.stringify(finder)

            });

        }

        if (user.temp.username && user.temp.website && user.temp.password) {
            const response = await fetch('http://localhost:3000/add', {
                method: 'POST',
                body: JSON.stringify(user.temp)
            });
            await fetchData();
            user.settemp({});
            user.Disabled.current = true;
            toast("Password saved");
        }
    }

    return (
        <div className='flex justify-center min-h-96'>
            <div className='flex flex-col gap-10 justify-center w-3/5'>
                <div className='flex gap-2 max-md:flex-wrap'>
                    <label className='text-lg font-bold' htmlFor="website">Website</label>
                    <input className='rounded-sm min-w-64 w-full h-7 outline-none' type="text" name={"website"} id="website" value={user.temp.website || ''} onChange={HandleChange} />
                </div>
                <div className='flex gap-3 justify-between'>
                    <div className='flex gap-3 max-md:flex-wrap'>
                        <label className='text-lg font-bold' htmlFor="username">Username</label>
                        <input className='w-full min-w-28 rounded-sm h-7 outline-none' type="text" name="username" id="username" value={user.temp.username || ''} onChange={HandleChange} />
                    </div>
                    <div className='flex gap-3 max-md:flex-wrap'>
                        <label className='text-lg font-bold' htmlFor="password">Password</label>
                        <div className='flex justify-center items-center bg-white rounded-sm'>
                            <input ref={pass} className='w-10/12 min-w-24 h-7 outline-none' type="password" name="password" id="password" value={user.temp.password || ''} onChange={HandleChange} />
                            <div onClick={EyeChange} className='mr-1 cursor-pointer'><img className='min-w-4' width={20} src="eye-crossed.svg" alt="" /></div>
                        </div>
                    </div>
                </div>
                <div className='flexed flex-col text-lg font-bold'>
                    <button ref={butt} onClick={Saved} disabled={user.Disabled.current} className='border-2 border-black w-1/4 rounded-md'>Save</button>
                    <div ref={required} className='text-xs text-red-700'>All fields are required</div>
                </div>
            </div>
        </div>
    );
}

export default Input;
