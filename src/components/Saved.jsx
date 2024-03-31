import React from 'react';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, createContext, useContext } from "react";
import { UserContext } from '../Usercontext';
const Saved = () => {
    const user = useContext(UserContext);
    const NoPass = useRef()
    const Head = useRef()

    async function fetchData() {
        try {
            const dt = await fetch("http://localhost:3000/");
            const data1 = await dt.json();
            user.setdata(data1);
            if (data1.length > 0) {
                NoPass.current.style.display = "none";
                Head.current.style.display = "block";
            } else {
                NoPass.current.style.display = "flex";
                Head.current.style.display = "none";
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
    
        fetchData();
    },[user.data]);

    const Copied = async (text) => {
        await navigator.clipboard.writeText(text)

        toast("Copied to clipboard!");

    }

    const Delete = async (id) => {
        const finder = user.data.find(items => items.ID === id)
        const response= await fetch('http://localhost:3000/delete', {
            method: 'POST',
            body: JSON.stringify(finder)
        });
        toast("Deleted!");
    }

    const Edit = async (id) => {
        const finder = user.data.find(items => items.ID === id)
        user.setpersistID(user.persistID=id)
        user.settemp(finder)
        user.Disabled.current = false
      
        
    }

   
    return (
        <div className=" w-full bg-cyan-600 min-h-[36vh] max-2xl:min-h-[49vh] ">

            <table className="w-full ">
                <thead ref={Head}>
                    <tr className="flexed gap-2 md:gap-5 max-md:text-[0.9rem]" >
                        <th className="flexed flexer  w-[30%]">Websites</th>
                        <th className="flexed flexer  w-[20%]">Username</th>
                        <th className="flexed flexer  w-[20%]">Password</th>
                        <th className="flex p-2 ">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody >
                    <tr ref={NoPass} className='flexed h-20 font-bold'>
                        <td>No Passwords to show</td>
                    </tr>
                    {user.data !== null && user.data.map((items) => (

                        <tr className="flexed gap-2 md;gap-5 max-md:text-[0.9rem]" key={items.ID}>
                            <td className="flexed flexer  w-[30%]">
                                <div className="w-full flex px-2">{items.website}</div>
                                <div className="saved ">
                                    <img onClick={() => Copied(items.website)} className="m-0.5 md:m-1 max-md:w-4" src="copy-alt.svg" width={18} alt="" />
                                </div>
                            </td>
                            <td className="flexed flexer  w-[20%]">
                                <div className="w-full flex">{items.username}</div>
                                <div className="saved">
                                    <img onClick={() => Copied(items.username)} className="m-0.5 md:m-1 max-md:w-4" src="copy-alt.svg" width={18} alt="" />
                                </div>
                            </td>
                            <td className="flexed flexer  w-[20%]">
                                <div className="w-full flex">{'*'.repeat(items.password.length)}</div>
                                <div className="saved">
                                    <img onClick={() => Copied(items.password)} className="m-0.5 md:m-1 max-md:w-4" src="copy-alt.svg " width={18} alt="" />
                                </div>
                            </td>
                            <td className="flex p-2 ">
                                <div onClick={() => Edit(items.ID)} className="saved">
                                    <img className="m-1 max-md:w-5" src="pen-square.svg" width={22} alt="" />
                                </div>
                                <div onClick={() => Delete(items.ID)} className="saved">
                                    <img className="m-1 max-md:w-5" src="trash.svg" width={22} alt="" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
}

export default Saved;
