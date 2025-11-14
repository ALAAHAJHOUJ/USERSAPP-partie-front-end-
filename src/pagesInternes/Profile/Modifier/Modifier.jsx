import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion';


function ModifierProfile({Onclick,Onclick2,Onclick3,Loading1,changerImage1}) {
  const ref1=useRef();
  const ref2=useRef();
  const ref3=useRef();
  const ref4=useRef();
  const ref5=useRef();
  const [error,setError]=useState({});
  const formatImage=useRef("");

  const Modifier=()=>{
  let valide1=true;
  const regex1 = /^([a-zA-Z]){4,}$/;
  const regex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regex3=/^[A-Za-z0-9]{6,16}$/;

  if(ref1.current.value.trim()=='')  //verifier nom
    {setError((prev)=>{return {...prev,champs1:"Nom requis"}});valide1=false}
  else if(!regex1.test(ref1.current.value))
    {setError((prev)=>{return {...prev,champs1:"Syntaxe invalide"}});valide1=false}
  else 
    setError((prev)=>{return {...prev,champs1:undefined}})





  if(ref2.current.value.trim()=='')  //verifier prenom
    {setError((prev)=>{return {...prev,champs2:"Prénom requis"}});valide1=false;}
  else if(!regex1.test(ref2.current.value))
    {setError((prev)=>{return {...prev,champs2:"Syntaxe invalide"}});valide1=false;}
  else 
    setError((prev)=>{return {...prev,champs2:undefined}})




  if(ref3.current.value.trim()=='')   //verifier email
    {setError((prev)=>{return {...prev,champs3:"email requis"}});valide1=false;}
  else if(!regex2.test(ref3.current.value))
    {setError((prev)=>{return{...prev,champs3:"syntaxe invalide"}});valide1=false;}
  else 
    setError((prev)=>{return {...prev,champs3:undefined}})




  if(ref4.current.value.trim()=='')  //verifier mot de passe
    {setError((prev)=>{return {...prev,champs4:"mot de passe requis"}});valide1=false}
  else if(!regex3.test(ref4.current.value))
    {setError((prev)=>{return {...prev,champs4:"mot de passe invalide "}});valide1=false}
  else 
    setError((prev)=>{return {...prev,champs4:undefined}})






  if(ref5.current.files.length===0)  //verifier Image 
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




  const handleformatImage=(e)=>{  //verifier la format de l'image (PNG ou JPEG)
      const fichier=e.target.files[0] ;
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




  const modifierInos=async()=>{
    Loading1();
    try {
     const  a=await fetch("http://localhost:8000/ModifierProfile/",{credentials:"include",body:JSON.stringify({nom:ref1.current.value+"",prenom:ref2.current.value+"",email:ref3.current.value+"",password:ref4.current.value+""}),method:"POST",headers:{'Content-Type': 'application/json'}});
     const resultat=await a.text();
     if(resultat=="opération passée avec succes")
     {
     console.log("modification informations avec succes")
     }else 
     {
      console.log('une erreur est servenue1')
     }
     const image=await envoyerImage();
    } catch (error) {
      console.log(error)
      Onclick3()
    }
  }






  const envoyerImage=async()=>{

   changerImage1()
   try {
        const donnes=new FormData();
        donnes.append("image",ref5.current.files[0]);

        const resultat1=await fetch('http://localhost:8000/modifierImage/',{method:"POST",body:donnes,credentials:"include"})
        console.log(resultat1)
        const resultat=await resultat1.text()

        console.log("Image envoyée avec succes")

        Onclick2();
        
   } catch (error) {
        console.log(error);
        Onclick3()
   }
  }




  const envoyer=()=>{
    if(Modifier()==true)
    {
    console.log("envoi avec succes")
    modifierInos();
    }else{
    console.log("echec de l'envoi")
    }
  }

  return (
    <div className='fixed top-0 left-0 bg-[#1f1f1f82]  flex justify-center flex-wrap content-start sup h-full w-full overflow-auto'>
        <motion.div initial={{opacity:0,y:-40}} animate={{opacity:1,y:0}} transition={{duration:1}} className='bg-white w-[90%] min-[500px]:w-[400px] box-border pt-[20px] min-h-[700px]  rounded-[15px] flex justify-center flex-wrap  gap-[30px] my-[30px]  '>
            <span className='italic font-[700] text-[20px]'>Modifier Profile</span>
            <div className=' w-[100%] flex flex-wrap gap-[20px] justify-center '>
                            <div className='w-[80%] flex flex-wrap justify-center gap-y-[5px]'>
                                <div className=' h-[30px] font-[Inika] text-[14px] font-[700] w-full text-center '>Saisir le nom :</div>
                                <input ref={ref1}  type="text" placeholder='Nom' className='w-[267px] h-[42px] border-[2px] border-black rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />    
                                {error.champs1?<span className='text-red-700 w-full text-center'>{error.champs1}</span>:<></>}
                            </div>

                            <div className='w-[80%] flex flex-wrap justify-center gap-y-[5px]'>
                                <div className=' h-[30px] font-[Inika] text-[14px] font-[700] w-full text-center '>Saisir le prénom :</div>
                                <input ref={ref2}  type="text" placeholder='Nom' className='w-[267px] h-[42px] border-[2px] border-black rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />    
                                {error.champs2?<span className='text-red-700 w-full text-center'>{error.champs2}</span>:<></>}
                            </div>

                            <div className='w-[80%] flex flex-wrap justify-center gap-y-[5px]'>
                                <div className=' h-[30px] font-[Inika] text-[14px] font-[700] w-full text-center '>Saisir l'email :</div>
                                <input ref={ref3}  type="email" placeholder='Nom' className='w-[267px] h-[42px] border-[2px] border-black rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />    
                                 {error.champs3?<span className='text-red-700 w-full text-center'>{error.champs3}</span>:<></>}
                            </div>

                            <div className='w-[80%] flex flex-wrap justify-center gap-y-[5px]'>
                                <div className=' h-[30px] font-[Inika] text-[14px] font-[700] w-full text-center '>Saisir le mot de passe :</div>
                                <input ref={ref4}  type="password" placeholder='Nom' className='w-[267px] h-[42px] border-[2px] border-black rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />    
                                 {error.champs4?<span className='text-red-700 w-full text-center'>{error.champs4}</span>:<></>}
                            </div>


                            <div className='w-[80%] flex flex-wrap justify-center gap-y-[5px]'>
                                <div  className=' h-[30px] font-[Inika] text-[14px] font-[700] '>choisir une image:</div>
                                <div className=' w-full h-[100px] flex justify-center items-center flex-wrap'>
                                    <label htmlFor="imageUser" className='border inline-block rounded-[15px] p-[14px] bg-[#766f6f70] text-white cursor-pointer hover:bg-[#c8c8c874]'>Choisir une image</label>
                                    <input ref={ref5} type="file" id='imageUser' className='hidden' onChange={handleformatImage} />
                                     {error.champsImage?<span className='text-red-700 w-full text-center'>{error.champsImage}</span>:<></>}
                                </div>
             
                            </div>

                               <div className=' w-full  flex flex-wrap gap-[20px] justify-center  mb-[10px]'>
                                    <div className=' w-[120px] h-[50px] bg-blue-400 rounded-[14px] text-white flex justify-center  items-center text-[15px] font-[700] italic hover:bg-blue-300 cursor-pointer' onClick={envoyer}>Confirmer</div>
                                    <div  className=' w-[120px] h-[50px] bg-red-500 rounded-[14px] text-white flex justify-center  items-center text-[15px] font-[700] italic hover:bg-red-300 cursor-pointer' onClick={()=>{Onclick()}}  >Annuler</div>
                               </div>
            </div>
        </motion.div>
    </div>
  )
}

export default ModifierProfile