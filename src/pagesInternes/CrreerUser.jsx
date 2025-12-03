import React, { useRef, useState } from 'react'
import ModalError from './CrreerUser/modalerror/modalerror';
import Modalsucces from './CrreerUser/modalSucces/modalSucces';
import ModalLoading from './CrreerUser/modalLoading/modalloading';
import { useNavigate } from 'react-router-dom';


function CrreerUser() {
  const [error,setError]=useState({});
  const ref1=useRef();
  const ref2=useRef();
  const ref3=useRef();
  const champsTel=useRef();
  const champsImage=useRef();
  const [Error1,setError1]=useState(false);
  const [Succes,setSucces]=useState(false);
  const [Loading,setLoading]=useState(false);
  const envoi=useRef(true);
  const naviguer=useNavigate();

  const handleSignUp=()=>{
  const regex1 = /^([a-zA-Z]){5,}$/;
  const regex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regex3=/^[A-Za-z0-9]{6,12}$/;
  const regexTel=/^(\+212|0)(\d){9}$/;


  if(ref1.current.value.trim()=='')
    {setError((prev)=>{return {...prev,champs1:"Nom requis"}});envoi.current=false}
  else if(!regex1.test(ref1.current.value))
    {setError((prev)=>{return {...prev,champs1:"Syntaxe invalide"}});envoi.current=false}
  else 
    setError((prev)=>{return {...prev,champs1:undefined}})



  if(ref2.current.value.trim()=='')
    {setError((prev)=>{return {...prev,champs2:"Prénom requis"}});envoi.current=false}
  else if(!regex1.test(ref2.current.value))
    {setError((prev)=>{return {...prev,champs2:"Syntaxe invalide"}});envoi.current=false}
  else 
    setError((prev)=>{return {...prev,champs2:undefined}})




  if(ref3.current.value.trim()=='')
    {setError((prev)=>{return {...prev,champs3:"email requis"}});envoi.current=false}
  else if(!regex2.test(ref3.current.value))
    {setError((prev)=>{return{...prev,champs3:"syntaxe invalide"}});envoi.current=false;}
  else 
    setError((prev)=>{return {...prev,champs3:undefined}})




  if(champsImage.current.files.length===0)
    {setError((prev)=>{return {...prev,champsImage:"veuillez choisir une image "}});envoi.current=false}
  else 
    setError((prev)=>{return {...prev,champsImage:undefined}})




  if(champsTel.current.value.trim()=="")
    {setError((prev)=>{return {...prev,champsTel:"téléphone requis"}});envoi.current=false}
  else if(!regexTel.test(champsTel.current.value))
    {setError((prev)=>{return {...prev,champsTel:"numéro invalide"}});envoi.current=false}
  else 
    setError((prev)=>{return {...prev,champsTel:undefined}})

  

  return envoi.current;
                      
  }



  const envoyer=()=>{
    envoi.current=true;
    if(handleSignUp()==true)
    {
      console.log("envoi avec succes");
      envoyerInfos()
    }
    else 
    {
      console.log("echec de l'envoi")
    }

  }




  const envoyerInfos=async()=>{
   const data1=new FormData();

   data1.append("nom",ref1.current.value)
   data1.append("prenom",ref2.current.value)
   data1.append("email",ref3.current.value)
   data1.append("telephone",champsTel.current.value)
   data1.append("image",champsImage.current.files[0])
   try {
    const resultat=await fetch("http://localhost:8000/AjouterUser",{credentials:"include",body:data1,method:"POST"})
    
    const resultat1=await resultat.text()

    if(resultat1!="succes")
    {
      console.log("une erreur est servenue");
      setError1(true)
    }
    else 
    {
      console.log("opération passée avec succes")
      setSucces(true)
    }

    } catch (error) {
      console.log(error);
      setError1(true)
    }
  
  }




  return (
    <div className='w-full flex flex-col justify-start items-center gap-[90px] '>
      <div className=' w-fit h-[40px] text-[24px] text-[white] text-center font-[Inika] font-[700]' style={{textShadow:"2px 2px 5px rgba(255, 255, 255, 0.7)"}}>Ajouter Utilisateur</div>

        <div className='w-[90%] min-w-[290px] min-[360px]:w-[354px] border-[white] border-[1px] shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)] box-border pt-[11px] rounded-[10px] bg-[rgba(255,255,255,0.45)] flex flex-wrap justify-center content-start gap-y-[20px] mb-9 pb-[40px]'>
          <div className='w-[100%] flex flex-wrap justify-center gap-y-[5px]'>
             <div className=' h-[30px] font-[Inika] text-[14px] font-[700] '>Saisir le nom :</div>
             <input ref={ref1}  type="text" placeholder='Nom' className='w-[267px] h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />
             {error.champs1?<span className='text-red-700 w-full text-center'>{error.champs1}</span>:<></>}
          </div>

          <div className='w-[100%] flex flex-wrap justify-center gap-y-[5px]'>
             <div className=' h-[30px] font-[Inika] text-[14px] font-[700] '>Saisir le prénom :</div>
             <input ref={ref2} type="text" placeholder='Prénom' className='w-[267px] h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />
             {error.champs2?<span className='text-red-700 w-full text-center'>{error.champs2}</span>:<></>}
          </div>


          
          <div className='w-[100%] flex flex-wrap justify-center gap-y-[5px]'>
             <div className=' h-[30px] font-[Inika] text-[14px] font-[700] '>Saisir l'adresse email :</div>
             <input ref={ref3}  type="email" placeholder='email' className='w-[267px] h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />
             {error.champs3?<span className='text-red-700 w-full text-center'>{error.champs3}</span>:<></>}
          </div>



           <div className='w-[100%] flex flex-wrap justify-center gap-y-[5px]'>
             <div className=' h-[30px] font-[Inika] text-[14px] font-[700] '>saisir le numéro de téléphone :</div>
             <input ref={champsTel}   type="tel" placeholder='numéro de téléphone' className='w-[267px] h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />
             {error.champsTel?<span className='w-full text-center text-red-700'>{error.champsTel}</span>:<></>}
          </div>




          <div className='w-[100%] flex flex-wrap justify-center gap-y-[5px]'>
             <div  className=' h-[30px] font-[Inika] text-[14px] font-[700] '>Image de l'utilisateur:</div>
             <div className=' w-full h-[100px] flex justify-center items-center flex-wrap'>
                <label htmlFor="imageUser" className='border inline-block rounded-[15px] p-[14px] bg-[#766f6f70] text-white cursor-pointer hover:bg-[#c8c8c874]'>Choisir une image</label>
                <input ref={champsImage} type="file" id='imageUser' className='hidden' />
                {error.champsImage?<span className='text-red-700 w-full text-center'>{error.champsImage}</span>:<></>}
             </div>
             
          </div>


          <div className='box-border mt-[40px] w-[80%]  flex flex-wrap justify-center gap-[20px]'>
            <div className='rounded-[10px] text-white  w-[268px] h-[48px] bg-[rgba(255,255,255,0.41)] font-[Inika] font-[600] flex justify-center items-center cursor-pointer hover:bg-[#fafafaae]' onClick={envoyer}>ajouter</div>
            <div className='rounded-[10px] text-white  w-[268px] h-[48px] bg-[rgba(255,255,255,0.41)] font-[Inika] font-[600] flex justify-center items-center cursor-pointer hover:bg-[#fafafaae]' onClick={()=>{naviguer('/Listeusers')}}>Liste Utilisateurs</div>
          </div>
        </div>
        {Error1?<ModalError Onclick={()=>{setError1(false)}}></ModalError>:<></>}
        {Succes?<Modalsucces Onclick={()=>{setSucces(false)}}></Modalsucces>:<></>}
        {Loading?<ModalLoading></ModalLoading>:<></>}
    </div>
  )
}

export default CrreerUser