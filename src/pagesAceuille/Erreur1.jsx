import React, { useRef } from 'react'
import { motion } from 'framer-motion';
function Erreur1({click}) {
    const ref1=useRef();
  return (
    <div ref={ref1} className="w-full h-full bg-[#1f1f1f82] fixed top-0 left-0 flex justify-center items-center" onClick={(e)=>{if(e.target==ref1.current) {click()}}}>
        <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className='rounded-[12px] bg-white w-[300px] h-[300px] flex justify-center flex-wrap content-center gap-[20px]'>
            <span className=' text-[25px] italic font-[600] '>Veuillez Réssayer</span>
            <div className=' w-full flex justify-center'>
                <div onClick={()=>{click()}} className='rounded-[12px] w-[120px] h-[50px] flex justify-center items-center bg-blue-500 text-white font-[600] cursor-pointer hover:bg-blue-300'>Réessayer</div>
            </div>
        </motion.div>
    </div>
  )
}

export default Erreur1