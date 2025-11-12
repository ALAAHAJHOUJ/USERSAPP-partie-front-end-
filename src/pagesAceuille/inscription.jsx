import React, { useRef, useState } from 'react'
import Modal from './Modalinscription/modal';
import Succes from './ModalSucces/Succes';
import Loading from './Modalloading.jsx/Loading';
import { useNavigate } from 'react-router-dom';

function Inscription() {
  const [error,setError]=useState({});
  const ref1=useRef();
  const ref2=useRef();
  const ref3=useRef();
  const ref4=useRef();
  const ref5=useRef();
  const refImag=useRef();
  const [echec,setEchec]=useState(false);
  const [succes,setSucces]=useState(false);
  const [Loading1,setLoading]=useState(false);
  const [file,setFile]=useState();
  const [messageError,setmessageError]=useState("");
  const formatImage=useRef("");
  const naviguer=useNavigate();



  const valider=()=>{
  let valide1=true;
  const regex1 = /^([a-zA-Z]){4,}$/;
  const regex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regex3=/^[A-Za-z0-9]{6,12}$/;


  if(ref1.current.value.trim()=='')
    {setError((prev)=>{return {...prev,champs1:"Nom requis"}});valide1=false}
  else if(!regex1.test(ref1.current.value))
    {setError((prev)=>{return {...prev,champs1:"Syntaxe invalide"}});valide1=false}
  else 
    setError((prev)=>{return {...prev,champs1:undefined}})



  if(ref2.current.value.trim()=='')
    {setError((prev)=>{return {...prev,champs2:"Prénom requis"}});valide1=false;}
  else if(!regex1.test(ref2.current.value))
    {setError((prev)=>{return {...prev,champs2:"Syntaxe invalide"}});valide1=false;}
  else 
    setError((prev)=>{return {...prev,champs2:undefined}})




  if(ref3.current.value.trim()=='')
    {setError((prev)=>{return {...prev,champs3:"email requis"}});valide1=false;}
  else if(!regex2.test(ref3.current.value))
    {setError((prev)=>{return{...prev,champs3:"syntaxe invalide"}});valide1=false;}
  else 
    setError((prev)=>{return {...prev,champs3:undefined}})






  if(ref4.current.value.trim()=='')
    {setError((prev)=>{return {...prev,champs4:"mot de passe requis"}});valide1=false}
  else if(!regex3.test(ref4.current.value))
    {setError((prev)=>{return {...prev,champs4:"mot de passe invalide "}});valide1=false}
  else 
    setError((prev)=>{return {...prev,champs4:undefined}})




  if(ref5.current.value.trim()=='')
    {setError((prev)=>{return {...prev,champs5:"confirmation requise"}});valide1=false;}
  else if(ref4.current.value!=ref5.current.value)
    {setError((prev)=>{return {...prev,champs5:"confirmation non verifiée"}});valide1=false}
  else 
    setError((prev)=>{return {...prev,champs5:undefined}})


  if(refImag.current.files.length===0)
  {
   setError((prev)=>{return {...prev,champsImage:"veuillez choisir une image"}});valide1=false;
  }
  else if(formatImage.current!=="formatvalide"){
  setError((prev)=>{return {...prev,champsImage:"veuillez choisir une format png ou jpeg"}});valide1=false
  }
  else
  {
   setError((prev)=>{return {...prev,champsImage:undefined}})
  }


  return valide1;
  }




  const envoyer=()=>{
  setLoading(true)
  const formdata=new FormData();
  formdata.append('nom',ref1.current.value);
  formdata.append('prenom',ref2.current.value);
  formdata.append('email',ref3.current.value);
  formdata.append('password',ref4.current.value);
  formdata.append('image',refImag.current.files[0]);


  console.log(refImag.current)


  fetch('http://localhost:8000/inscription/',{method:"POST",body:formdata})
  .then((res)=>{console.log(res);return res.text();})
  .then((res)=>{console.log(res);

     if(res=="enregistrement avec succes")
       {setSucces(true);setEchec(false); console.log('succes')}
     else if(res=="l'email existe déja dans la base de données")
       {setEchec(true);setSucces(false);setmessageError("veuillez choisir autre email");console.log("error") }
     else 
       {setEchec(true);setmessageError("une erreur s'est produite");setSucces(false)};
     setLoading(false)})
     
  .catch((err)=>{console.log(err);setEchec(true);setLoading(false)})
  }





  const handleInscription=()=>{
    if(valider()==true)
    {
    console.log('envoi du formulaire');
    envoyer();
    }else 
    {
      console.log('non envoyé')
    }
  }



  const handleformatImage=(e)=>{

    
      const fichier=e.target.files[0] ;
      console.log(fichier)
      if(fichier.type==="image/jpeg"  || fichier.type==="image/png" ) 
      {
        formatImage.current="formatvalide";;
        console.log('valide')
      }
      else 
      {
        formatImage.current="formatnonvalide";
        console.log("non valide")
      } 


  }





  return (
    <div className='w-full flex flex-col justify-start items-center gap-[90px] ' >
      {Loading1==true?<Loading></Loading>:<></>}
      {echec==true?<Modal Onclick={()=>{setEchec(false)}} sujet={{message:messageError}}></Modal>:<></>}
      {succes==true?<Succes Onclick={()=>{setSucces(false)}}></Succes>:<></>}
      <div className=' w-fit h-[40px] text-[24px] text-[white]  font-[Inika] font-[700]' style={{textShadow:"2px 2px 5px rgba(255, 255, 255, 0.7)"}}>Inscription</div>

        <div className='w-[90%] min-w-[290px] min-[370px]:w-[354px] border-[white] border-[1px] shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)] box-border pt-[11px] rounded-[10px] bg-[rgba(255,255,255,0.45)] flex flex-wrap justify-center content-start gap-y-[20px] mb-9 pb-[40px]'>
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
             <div className=' h-[30px] font-[Inika] text-[14px] font-[700] '>Saisir le mot de passe  :</div>
             <input ref={ref4} type="password" placeholder='mot de passe' className='w-[267px] h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />
             {error.champs4?<span className='text-red-700 w-full text-center'>{error.champs4}</span>:<></>}
          </div>


          <div className='w-[100%] flex flex-wrap justify-center gap-y-[5px]'>
             <div className=' h-[30px] font-[Inika] text-[14px] font-[700] '>confirmer le mot de passe  :</div>
             <input ref={ref5} type="password" placeholder='mot de passe' className='w-[267px] h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />
             {error.champs5?<span className='text-red-700 w-full text-center'>{error.champs5}</span>:<></>}
          </div>



          <div className='w-[100%] flex flex-wrap justify-center gap-y-[5px]'>
             <div  className=' h-[30px] font-[Inika] text-[14px] font-[700] '>Image:</div>
             <div className=' w-full flex justify-center items-center flex-wrap '>
                <label htmlFor="imageUser" className='border inline-block rounded-[15px] p-[14px] bg-[#766f6f70] text-white cursor-pointer hover:bg-[#c8c8c874]'>Choisir une image</label>
                <input onChange={(e)=>{handleformatImage(e);}}  ref={refImag} type="file" id='imageUser' className='hidden' />
                {error.champsImage?<span className='text-red-700 w-full text-center'>{error.champsImage}</span>:<></>}
             </div>
             
          </div>


          <div className='box-border mt-[40px] w-[80%]  flex flex-wrap justify-center gap-[20px]'>
            <div className='rounded-[10px] text-white  w-[268px] h-[48px] bg-[rgba(255,255,255,0.41)] font-[Inika] font-[600] flex justify-center items-center cursor-pointer hover:bg-[#fafafaae]' onClick={handleInscription}>S'inscrire</div>
            <div className='rounded-[10px] text-white  w-[268px] h-[48px] bg-[rgba(255,255,255,0.41)] font-[Inika] font-[600] flex justify-center items-center cursor-pointer hover:bg-[#fafafaae]' onClick={()=>{naviguer('/')}}>Se connecter</div>
          </div>
        </div>
    </div>
  )
}

export default Inscription