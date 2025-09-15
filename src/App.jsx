import React from 'react'
import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { FiDownload , FiCopy , FiX } from 'react-icons/fi'
import { BsQrCode } from 'react-icons/bs'

function App(){
  const [inputText , setInputText] = useState("");
  const [copied , setCopied] = useState(false);

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if(!canvas) return;
    // tell the brower that first it turns the image to png and then
    // to octet so that we can download the image
    const pngUrl = canvas.toDataURL("image/png").replace("image/png , image/uctet-stream")
    

    // modification tip later add file save name box
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qr-code.png";
    link.click();
  }

  const handleCopy =  async () => {
    // async function because inside this we will use try and catch block
    try{
      await navigator.clipboard.writeText(inputText);
      setCopied(true);

      // after 3 sec the variable becomes false again
      setTimeout(function(){
        setCopied(false);
      } , 3000)
    }catch(err){
      console.log("Copy Failed" , err);
    }

  }

  const handleClear = () => {
    setInputText("");
  }

  

  return (
    <>
      <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-400 to-indigo-400'>
        <div className='w-full max-w-md p-8 bg-white rounded-3xl shadow-lg shadow-black/40 hover:shadow-2xl flex flex-col items-center hover:scale-105 transition-all ease-in-out duration-400'>

        <div className='flex flex-col items-center mb-6'>
          <div className='w-18 h-18 flex items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-indigo-400 mb-2'>
            <BsQrCode className='w-10 h-10 text-white'/>

          </div>
          <h1 className='text-xl font-semibold text-gray-800 mb-1'>QR Code Generator</h1>

          <p className='text-gray-500 text-sm'>Enter Text or URL to create a QR Code</p>

        </div>
        <textarea
          value={inputText} 
          onChange={(e) =>{
            setInputText(e.target.value)
          }}
          placeholder='Type text or URL..'
          className='w-full mb-5 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none
          text-gray-700 placeholder-gray-400 shadow-sm transition duration-400'
          >

          </textarea>

        </div>

      </div>
    </>
  )
}

export default App;
