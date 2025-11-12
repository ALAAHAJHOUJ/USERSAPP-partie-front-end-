import React from 'react'
import { Triangle } from 'react-loader-spinner'

function ModalLoading() {
  return (
            <div className='w-full h-full fixed top-0 left-0 bg-[#1f1f1f82] flex justify-center items-center' >
                <div className='bg-white rounded-[15px] w-[300px] h-[300px] flex items-center'>
                   <div className="w-full flex justify-center">
                                     <Triangle
                                        visible={true}
                                        height="100"
                                        width="100"
                                        color="#4fa94d"
                                        ariaLabel="triangle-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        />
                   </div>
    
                </div>
            </div>
  )
}

export default ModalLoading