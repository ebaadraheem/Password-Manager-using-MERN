import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Saved from './components/Saved';
import Navbar from './components/navbar';
import Input from './components/Input';
import Footer from './components/Footer';
import { UserContext } from './Usercontext';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const [data, setdata] = useState(null);

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await fetch("http://localhost:3000/");
       
        const data = await response.json();
        setdata(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };  
    
    fetchData();
  },[setdata]);

  const Disabled = useRef(true);
  
  const [persistID, setpersistID] = useState(null)
  const [temp, settemp] = useState({});

  useEffect(() => {
    toast("Message: Your data's security is our priority. With MongoDB integration, your information in our password manager is protected, ensuring maximum privacy and security.");
  }, []);

  return (
    <div className='min-h-screen bg-cyan-500'>
      <UserContext.Provider value={{ data, setdata, temp, settemp, Disabled,persistID,setpersistID }}>
        <Navbar />
        <Input />
        <Saved />
        <Footer />
        <ToastContainer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
