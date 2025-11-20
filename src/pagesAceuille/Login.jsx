import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import Motdepasse from "./Motdepasse";
import Erreur1 from './Erreur1'
import { useAuth } from "../App";
import Code from "./Code";

function Login() {
   const [error,setError]=useState(false);
   const [email,setEmail]=useState(false);
   const [code,setCode]=useState(false)
   const ref1=useRef();
   const ref2=useRef();
   const naviguer=useNavigate();
   const {message,setMessage}=useState("");
   const auth=useAuth();


   console.log(auth);

   const Envoyer=()=>{  //envoyer une demande de connexion
   fetch("http://localhost:8000/Login/",{method:"POST",credentials: 'include',body:JSON.stringify({nom:ref1.current.value+"",password:ref2.current.value+""}),headers: {'Content-Type': 'application/json'}})
   .then((res)=>{return res.text()})
   .then((res)=>{console.log(res);if(res=="utilisateur n'existe pas" || res=="une erreur est servenue")/*une erreur dans le login*/  {console.log("erreur de login ");setError(true);}else /*opération passée avec succes*/  {setError(false);naviguer("/profile")}})
   .catch((err)=>{console.log(err);setError(true)})
   }




   const handleLogin=(e)=>{
      e.preventDefault();
      let envoi=true;
      if(ref1.current.value.trim()=='')
        { setError((prev)=>{return {...prev,champs1:"Nom requis"}});envoi=false}
      else 
        {setError((prev)=>{return {...prev,champs1:undefined}})}

      if(ref2.current.value.trim()=='')
        { setError((prev)=>{return  {...prev,champs2:"mot de passe requis"}});envoi=false}
      else 
        { setError((prev)=>{return {...prev,champs2:undefined}})}
      if(envoi==true)
         Envoyer();

   }



  
        const checkerLogin=async()=> {  //fonction qui verifie si l'utilisateur est connecté

        try {
        const resultat=await fetch('http://localhost:8000/',{credentials: 'include'});

        const login1=await resultat.json();

        console.log(login1.message)
        if(login1.message=="authentifié")  //l'utilisateur est authentifié on doit le rediriger vers le profile (la page de login ne doit pas etre affichée)
                {naviguer("/profile",{replace:true}); }
        } catch (error) {
          
          console.log(error)
        }

        
        }



  //effets secondaires

  useEffect(()=>{

  checkerLogin();

  },[])



  return (
    <div className='w-full  flex flex-col justify-start items-center gap-[90px]  '>
       {code==true?<Code Onclick1={()=>{setCode(false)}}></Code>:<></>}
       {email==true?<Motdepasse Onclick1={()=>{setEmail(false)}} ></Motdepasse>:<></>}
       {error==true?<Erreur1 message={message} click={()=>{setError(false)}}></Erreur1>:<></>}
       <div className='w-[100px] h-[40px] text-[24px] text-[white] text-center font-[Inika] font-[700]' style={{textShadow:"2px 2px 5px rgba(255, 255, 255, 0.7)"}}>LOGIN</div>

       <div className='w-[90%] min-w-[290px] min-[360px]:w-[354px]  border-[white] border-[1px] shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)] box-border pt-[11px] mb-[30px] rounded-[10px] bg-[rgba(255,255,255,0.45)] flex flex-wrap justify-center content-start gap-y-[20px] py-[30px]'>
          <div className='w-[100%] flex flex-wrap justify-center gap-y-[5px]'>
             <div className=' h-[30px] font-[Inika] text-[14px] font-[700] '>Saisir le nom :</div>
             <input ref={ref1} type="text" placeholder='Nom' className='w-[267px] h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px] box-border  ' />
             {error.champs1?<span className="text-red-700 inline-block w-full mt-3 text-center">{error.champs1}</span>:<></>}
          </div>

          <div className='w-[100%] flex flex-wrap justify-center gap-y-[5px]'>
             <div className=' h-[30px] font-[Inika] text-[14px] font-[700] '>Saisir le mot de passe :</div>
             <input ref={ref2} type="password" placeholder='mot de passe' className='w-[267px] h-[42px] rounded-[10px] placeholder:text-center placeholder:text-[16px]' />
             {error.champs2?<span className="text-red-700 inline-block w-full mt-3 text-center">{error.champs2}</span>:<></>}
          </div>
          <div className="w-full flex gap-[10px] items-center box-content pl-[40px]">
             <input type="checkbox" name="souvenir" id="souvenir" className=" h-[16px] w-[16px] " />
             <label htmlFor="souvenir" className=" text-white font-[600]">Se souvenir de moi</label>
          </div>

          <div className='box-border mt-[40px] w-[80%]  flex flex-wrap justify-center gap-[20px]'>
            <input type="submit" value={"Se connecter"} className='rounded-[10px] text-white  w-[268px] h-[48px] bg-[rgba(255,255,255,0.41)] font-[Inika] font-[600] flex justify-center items-center cursor-pointer hover:bg-[#fafafaae]' onClick={handleLogin}/>
            <div className='rounded-[10px] text-white  w-[268px] h-[48px] bg-[rgba(255,255,255,0.41)] font-[Inika] font-[600] flex justify-center items-center cursor-pointer hover:bg-[#fafafaae]' onClick={()=>{naviguer("/inscription")}}>S'inscrire</div>
             <div className='rounded-[10px] text-white  w-[268px] h-[48px] bg-[rgba(255,255,255,0.41)] font-[Inika] font-[600] flex justify-center items-center cursor-pointer hover:bg-[#fafafaae]' onClick={()=>{setEmail(true)}}>Mot de passe oublié</div>
          </div>
       </div>


    </div>
  )
}

export default Login