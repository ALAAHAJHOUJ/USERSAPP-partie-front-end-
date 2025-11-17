import React, { useRef } from 'react'
import { IoIosAlert } from 'react-icons/io'

function Confirmer({idUser,Onclick,succes,erreur}) {
    const ref1=useRef();

    const confirmer=()=>{
    console.log(`l'id de l'utilisateur a supprimer est ${idUser}`);
    supprimer(idUser);
    }



  const supprimer=async(idUser)=>{
  try {
    const resultat=await fetch(`http://localhost:8000/supprimerUser`,{method:"POST",body:JSON.stringify({id:idUser}),headers:{'Content-Type': 'application/json'},credentials:"include"});
    
    const resultat1=await resultat.json();

    if(resultat1.message){
          if( resultat1.message!="opération avec succes")
          {
          console.log("une erreur est servenue")
          erreur()
          }else{
          console.log("opération passée avec succes")
          succes()
          }
    }


  } catch (error) {
    console.log(error)
    erreur()
  } finally{
    Onclick()
  }
  }

  return (
    <div ref={ref1} className='w-full h-full fixed top-0 left-0 bg-[#1f1f1f82] flex justify-center items-center' onClick={(e)=>{if(e.target==ref1.current) Onclick()}}>
        <div className='bg-white rounded-[15px] w-[300px] h-[300px] flex flex-wrap content-start gap-[20px] box-border pt-[30px]'>
            <div className='w-full  flex justify-center items-center'><IoIosAlert size={40}></IoIosAlert></div>
            <div className='w-full  text-center font-[700] italic text-[20px]'>Voulez Vous vraiment supprimer cet Utilisateur</div>
            <div className=' w-full flex flex-wrap gap-[20px] justify-center'>
                <div className=' w-[120px] h-[50px] bg-blue-400 rounded-[14px] text-white flex justify-center  items-center text-[15px] font-[700] italic hover:bg-blue-300 cursor-pointer' onClick={()=>{confirmer()}}>Confirmer</div>
                <div className=' w-[120px] h-[50px] bg-red-500 rounded-[14px] text-white flex justify-center  items-center text-[15px] font-[700] italic hover:bg-red-300 cursor-pointer' onClick={()=>{Onclick()}} >Annuler</div>
            </div>
        </div>
    </div>
  )
}

export default Confirmer