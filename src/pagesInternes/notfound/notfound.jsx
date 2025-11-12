import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


function Notfound() {
  const naviguer=useNavigate();


  const retour=()=>{
  naviguer(-1,{replace:true});
  }
  return (
    <div className='flex justify-center content-center gap-[30px] h-[100vh] w-full flex-wrap'>
      <div className="w-full text-center text-[30px] text-white font-[600] italic">Erreur 404 (page introuvable)</div>
      <div onClick={()=>{retour()}} className="w-fit p-[20px] text-white border-white border-[2px] rounded-[12px] bg-gray-500 hover:bg-gray-300 cursor-pointer"> Retour </div>
    </div>

  )
}

export default Notfound