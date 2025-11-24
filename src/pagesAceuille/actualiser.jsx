import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'

function Actualiser({nettoyer,error1,email1,code1,succes}) {
  const [error,setError]=useState("bien")
  const ref1=useRef();
  const ref2=useRef();
  const ref3=useRef();




  const valider=()=>{//on va d'abord valider le mot de passe
  console.log(code1,email1)
  const regex3=/^[A-Za-z0-9]{6,12}$/;

  if(ref2.current.value.trim()=="")
  {
  setError("champs requis")
  }else{
       if(!regex3.test(ref2.current.value))
       {
        setError("mot de passe invalide")
       }else 
       {
         setError("bien")
         envoyer()
       }
  }
  }






const envoyer=async()=>{ //on va envoyer la demande au serveur
 try {
      const resultat=await fetch("http://localhost:8000/actualiserMotdepasse",{method:"POST",body:JSON.stringify({code:code1,email:email1,nouveaupassword:ref2.current.value}),headers:{'Content-Type': 'application/json'}})
      
      const resultat1=await resultat.text()

      if(resultat1=="mot de passe mis a jour avec succes"){
      console.log("opération passée avec succes")

      succes()
      }else if(resultat1=="code expiré"||resultat1=="code invalide")
      {
       console.log("code expiré")
       error()
      }
 } catch (error) {
    console.log(error)
    error()
 }
}




  return (
    <div ref={ref1} className='w-full h-full bg-[#1f1f1f82] fixed top-0 left-0 flex justify-center items-center' onClick={(e)=>{if(e.target==ref1.current) {nettoyer()}}}>
      <motion.div initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{duration:1}} className='bg-white rounded-[15px] w-[320px] min-h-[320px] flex justify-center flex-wrap content-center gap-[20px]'>
        <span className='text-[25px] font-[700] italic text-center'>Mot de passe oublié</span>
        <div className='w-full  flex justify-center flex-wrap gap-[15px]'>
          <label htmlFor="pass" className='w-full font-[600]  text-center' >Saisir le nouveau mot de passe:</label>
          <input ref={ref2} type="password" name="pass" id="pass" placeholder='Mot de passe' className='border-[#504a4a] border-[1px] w-[70%] h-[40px] rounded-[12px] placeholder:text-center' />
          <div className='text-red-500 font-[600] w-full text-center'>{error!="bien"?error:""}</div>
          <input type="submit" onClick={()=>{valider()}}  value={"Envoi"} className='bg-blue-500 focus:border-none focus:outline-none rounded-[12px] text-white w-[120px] h-[40px] text-center mt-[40px] cursor-pointer font-[700] italic hover:bg-blue-300'/>
          <div ref={ref3} onClick={()=>{nettoyer()}} className='bg-red-500 font-[700] focus:border-none focus:outline-none text-white rounded-[12px] w-[120px] h-[40px] flex justify-center items-center mt-[40px] italic cursor-pointer hover:bg-red-300'>Annuler</div>
        </div>
         
      </motion.div>
    </div>
  )
}

export default Actualiser