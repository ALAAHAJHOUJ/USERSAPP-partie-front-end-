import React from 'react'

function Confirmer({Onclick,confirme1}) {
  return (
    <div className='w-full h-full fixed top-0 right-0 flex justify-center items-center bg-[#1f1f1f82] '>
      <div className='bg-white w-[300px] h-[300px] rounded-[13px] flex flex-wrap justify-center content-between box-border pt-8'>
        <div className='italic w-full font-[700] text-[20px] text-center'>veuillez confirmer votre demande</div>

        <div className=' flex gap-[20px] justify-center h-[100px] w-full'>
           <button onClick={()=>{Onclick()}} className='bg-red-500 w-[90px] h-[50px] rounded-[13px] text-white font-[600] hover:bg-red-300'>Annuler</button>
           <button onClick={()=>{confirme1()}} className='bg-blue-500 w-[90px] h-[50px] rounded-[13px] text-white font-[600] hover:bg-blue-300'>confirmer</button>
        </div>
      </div>
    </div>
  )
}

export default Confirmer