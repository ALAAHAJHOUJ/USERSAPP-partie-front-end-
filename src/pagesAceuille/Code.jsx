import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
function Code({Onclick1}) {
  const ref1=useRef();
  const ref2=useRef()
  const [error,setError]=useState("bien")


  const valider=(e)=>{
  
  }

  const envoyer=()=>{
    
  }


  return (
        <div  ref={ref1} className='w-full h-full bg-[#1f1f1f82] fixed top-0 left-0 flex justify-center items-center' onClick={(e)=>{if(e.target==ref1.current) {Onclick1()}}}>
          <motion.div  initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{duration:1}} className='bg-white rounded-[15px] w-[320px] min-h-[320px] flex justify-center flex-wrap content-center gap-[20px]'>
            <span className='text-[25px] font-[700] italic text-center'>Mot de passe oublié</span>
            <div className='w-full  flex justify-center flex-wrap gap-[15px]'>
              <label htmlFor="email" className='w-full font-[600]  text-center' >Saisir le code:</label>
              <input ref={ref2} type="text" name="email" id="email" placeholder='Votre code' className='border-[#504a4a] border-[1px] w-[70%] h-[40px] rounded-[12px] placeholder:text-center' />
              <div className='text-red-500 font-[600] w-full text-center'>{error!="bien"?error:""}</div>
              <input type="submit" onClick={(e)=>{valider(e)}} value={"Envoi"} className='bg-blue-500 focus:border-none focus:outline-none rounded-[12px] text-white w-[120px] h-[40px] text-center mt-[40px] cursor-pointer font-[700] italic hover:bg-blue-300'/>
              <div onClick={()=>{Onclick1()}} className='bg-red-500 font-[700] focus:border-none focus:outline-none text-white rounded-[12px] w-[120px] h-[40px] flex justify-center items-center mt-[40px] italic cursor-pointer hover:bg-red-300'>Annuler</div>
            </div>
             
          </motion.div>
        </div>
  )
}

export default Code