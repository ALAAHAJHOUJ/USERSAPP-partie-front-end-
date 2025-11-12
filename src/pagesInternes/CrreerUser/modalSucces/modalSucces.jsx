import React, { useRef } from 'react'
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

function Modalsucces({Onclick}) {
  const ref1=useRef();
  return (
                <div ref={ref1} className='w-full h-full fixed top-0 left-0 bg-[#1f1f1f82] flex justify-center items-center' onClick={(e)=>{if(e.target==ref1.current) Onclick()}} >
                    <div className='bg-white rounded-[15px] w-[300px] h-[300px] flex flex-wrap content-start gap-[20px] box-border pt-[30px]'>
                      <div className='w-full flex justify-center'>
                         <IoCheckmarkDoneCircle color='green' size={40} />
                      </div>
    
                      <div className='w-full h-[70px] flex justify-center items-center'>
                        <span className='font-[700] text-[20px] italic '>Ajout avec succes</span>
                      </div>
                       
                      <div className='w-full flex justify-center '>
                          <span className=' rounded-[15px] px-[30px] py-[10px] bg-blue-500 text-white text-[20px] font-[700px] hover:bg-blue-300 cursor-pointer' onClick={()=>{Onclick()}}>OK</span>
                      </div> 
                    </div>
                </div>
  )
}

export default Modalsucces