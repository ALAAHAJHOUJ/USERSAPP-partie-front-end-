import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';



function User({confirmer,Modifier,cle,Nom,Prenom,Email,tel,succes}) {
  const [src,setSrc]=useState("")

  const confirmer1= (idUser,nomUser)=>{
  console.log(`on va suprimer l'utilisateur d'id ${idUser} et de nom ${nomUser}` );
  confirmer(idUser);
  }


  const tester=()=>{
    succes()
  }

  const recupererImage=async()=>{
    try {
    const resultat=await fetch(`http://localhost:8000/recupererImageUser/${cle}`,{credentials:"include"})

    console.log(resultat.headers.get("content-type"))
    if(resultat.headers.get("content-type").includes("text")) throw new Error('erreur');


    const resultat1=await resultat.blob();
    setSrc(URL.createObjectURL(resultat1))

    
    } catch (error) {
      console.log(error);
    }
  }




  useEffect(()=>{
   recupererImage()
  },[])
  

  return (
    <div className='w-[95%] border-white border-[2px] rounded-[15px] flex justify-center items-center flex-wrap min-[900px]:flex-nowrap gap-[10px] box-border p-[10px]'>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] italic'>{cle}</div>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] italic'>{Nom}</div>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] italic'>{Prenom}</div>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex  justify-center items-center font-[600] shrink-[1] italic'><span className='w-full text-center break-words border-[1px] border-[#ffffff00]'>{Email}</span></div>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] italic'>{tel}</div>
      <div className=' rounded-[10px] overflow-hidden aspect-square w-[100px] min-[900px]:w-[calc(100%/7-30px)] relative flex justify-center items-center font-[600] italic border'>
      {src==""?<motion.div animate={{opacity:[0,1,0]}} transition={{ duration:2.5, repeat: Infinity }} className='w-full inset-0 absolute bg-gray-500 h-full'></motion.div>:<img src={src} alt="image" className='w-full h-full object-fill' />}
      
      </div>
      <div className=' min-h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex flex-wrap justify-center items-center gap-[10px]'>
            <div className='border-[2px] border-white text-white font-[500] bg-blue-400 rounded-[10px] flex justify-center items-center px-[15px] py-[5px] hover:bg-blue-300 cursor-pointer w-[120px]' onClick={()=>{Modifier(cle)}}>Modifier</div>
            <div className='border-[2px] border-white text-white font-[500] bg-red-500 rounded-[10px] flex justify-center items-center px-[15px] py-[5px] hover:bg-red-300 cursor-pointer w-[120px]' onClick={()=>{confirmer(cle)}}>Supprimer</div>
      </div>
    </div>
  )
}

export default User