import React, { useRef } from 'react'
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { TbFaceIdError } from 'react-icons/tb';

function Succes({Onclick}) {
const ref1=useRef();
  return (
                  <div ref={ref1} className='w-full h-full bg-[#1f1f1f82] fixed top-0 left-0 flex justify-center items-center  ' onClick={(e)=>{if(e.target==ref1.current) {Onclick()}}}>
                     <div className='w-[300px] h-[300px] rounded-[15px] bg-white flex justify-center items-center flex-wrap box-border pt-[30px] content-start gap-[20px]'>
                       <div className='w-full h-[70px] flex justify-center items-center'><IoCheckmarkDoneCircle color='green' size={40} /></div>
                       <span className='font-[700] italic text-[20px]'>Inscription avec succes</span>
                       <div onClick={()=>{Onclick()}} className='border w-[130px] h-[60px] bg-blue-400 rounded-[14px] text-white flex justify-center  items-center text-[20px] font-[700] italic hover:bg-blue-300 cursor-pointer'>Ok</div>
                     </div>
                  </div>
  )
}

export default Succes