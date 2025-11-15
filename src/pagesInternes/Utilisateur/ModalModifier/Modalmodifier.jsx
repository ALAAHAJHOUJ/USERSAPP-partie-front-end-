import React, { useRef, useState } from 'react'
import './Modal.css'
import Loadingcomp from '../Loading/Loading';
import Erreurmodifier from './erreur';
import Succes from './Succes';



function Modalmodifier({confirme,annule}) {
    const ref1=useRef();
    const ref2=useRef();
    const ref3=useRef();
    const champsTel=useRef();
    const champsImage=useRef();
    const [error,setError]=useState({});
    const envoi=useRef(true);
    const [loading,setLoading]=useState(false);
    const [erreur,setErreur]=useState(false);
    const [succes,setSucces]=useState(false);


    const valider=()=>{
          const regex1 = /^([a-zA-Z]){5,}$/;
          const regex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const regex3=/^[A-Za-z0-9]{6,12}$/;
          const regexTel=/^(\+212|0)(\d){9}$/;

              if(ref1.current.value.trim()!='')
              {
                if(!regex1.test(ref1.current.value))
                {setError((prev)=>{return {...prev,champs1:"Syntaxe invalide"}});envoi.current=false}
                else 
                setError((prev)=>{return {...prev,champs1:undefined}})
              }
              else 
              {
                setErreur((prev)=>{return {...prev,champs1:undefined}})
              }




              if(ref2.current.value.trim()!='')
              {
              if(!regex1.test(ref2.current.value))
                {setError((prev)=>{return {...prev,champs2:"Syntaxe invalide"}});envoi.current=false;}
              else 
                setError((prev)=>{return {...prev,champs2:undefined}})
              }
              else 
              {
                setError((prev)=>{return {...prev,champs2:undefined}})
              }



             
              if(ref3.current.value.trim()!='')
              {
              if(!regex2.test(ref3.current.value))
                {setError((prev)=>{return{...prev,champs3:"syntaxe invalide"}});envoi.current=false;}
              else 
                setError((prev)=>{return {...prev,champs3:undefined}})
              }
              else 
              {
              setError((prev)=>{return {...prev,champs3:undefined}})
              }



                  if(champsTel.current.value.trim()!=''){
                  if(!regexTel.test(champsTel.current.value))
                    {setError((prev)=>{return {...prev,champsTel:"numéro invalide"}});envoi.current=false;}
                  else 
                    setError((prev)=>{return {...prev,champsTel:undefined}})
                                      
                  }
                  else 
                  {
                  setError((prev)=>{return {...prev,champsTel:undefined}})
                  }



    return envoi.current;

    }




    const envoyer=()=>{
    envoi.current=true;
    if(valider()==true)
    {
    console.log("envoi avec succes");
    }
    else 
    {
    console.log("echec de l'envoi")
    }
    }


  return (
    <div className='fixed w-full h-full top-0 left-0 flex justify-center items-start sup bg-[#1f1f1f82] overflow-y-auto '>
      {loading==true?<Loadingcomp></Loadingcomp>:
      succes==true?<Succes></Succes>:
      erreur==true?<Erreurmodifier></Erreurmodifier>:
      <div  className='rounded-[15px] shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)] bg-white w-[90%] min-[600px]:w-[400px] pt-[20px] pb-[20px] flex content-start  justify-center gap-[20px] flex-wrap'>
        <span className='font-[700] italic text-[20px]'>Modifier Utilisateur</span>
           <div className='w-full flex flex-wrap justify-center gap-[10px]'>
            <div className='w-[80%] h-[100px]  flex justify-center flex-wrap'>
              <label htmlFor='nom' className=' font-[600] italic w-[100%] text-center'>Nom:</label>
              <input ref={ref1}  type="text" id='nom' placeholder='Nom' className='w-full h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border border-black border-[2px]  ' />
              {error.champs1?<span className='text-red-700 '>{error.champs1}</span>:<></>}
            </div>

            <div className='w-[80%] h-[100px]  flex justify-center flex-wrap'>
              <label htmlFor='nom' className=' font-[600] italic w-[100%] text-center'>Prénom:</label>
              <input  ref={ref2} type="text" id='nom' placeholder='Nom' className='w-full h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border border-black border-[2px]  ' />
              {error.champs2?<span className='text-red-700'>{error.champs2}</span>:<></>}
            </div>


            <div className='w-[80%] h-[100px]  flex justify-center flex-wrap'>
              <label htmlFor='nom' className=' font-[600] italic w-[100%] text-center'>email:</label>
              <input ref={ref3}   type="text" id='nom' placeholder='Nom' className='w-full h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border border-black border-[2px]  ' />
              {error.champs3?<span className='text-red-700'>{error.champs3}</span>:<></>}
            </div>


            <div className='w-[80%] h-[100px]  flex justify-center flex-wrap'>
              <label htmlFor='nom' className=' font-[600] italic w-[100%] text-center'>Téléphone:</label>
              <input ref={champsTel}   type="text" id='nom' placeholder='Nom' className='w-full h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border border-black border-[2px]  ' />
              {error.champsTel?<span className='text-red-700'>{error.champsTel}</span>:<></>}
            </div>


             <div className=' w-full h-[100px] flex justify-center items-center flex-wrap'>
                <label htmlFor="imageUser" className='border inline-block rounded-[15px] p-[14px] bg-[#766f6f70] text-white cursor-pointer hover:bg-[#c8c8c874]'>Choisir une image</label>
                <input ref={champsImage}  type="file" id='imageUser' className='hidden' />

             </div>


            <div className='w-[80%] flex justify-center flex-wrap pt-[20px] gap-[20px]'>
              <div className=' text-white text-[17px] bg-blue-500 rounded-[15px] w-[100px] flex justify-center items-center h-[50px] hover:bg-blue-300 font-[600] italic cursor-pointer' onClick={envoyer}>Confirmer</div>
              <div className=' text-white text-[17px] bg-red-500 rounded-[15px] w-[100px] flex justify-center items-center h-[50px] hover:bg-red-300 font-[600] italic cursor-pointer' onClick={()=>{annule()}}>Anuuler</div>
            </div>
        </div>

      </div>}

    </div>
  )
}

export default Modalmodifier