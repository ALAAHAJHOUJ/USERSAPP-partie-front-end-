import React, { useContext, useEffect, useRef, useState } from 'react'
import { RiAdminFill } from 'react-icons/ri'
import Loading from '../../pagesAceuille/Modalloading.jsx/Loading';
import ErrorProfile from './Error.jsx/ErrorProfile';
import SuccesProfile from './Succes/SuccesProfile';
import ModifierProfile from './Modifier/Modifier';
import { useNavigate } from 'react-router-dom';
import { context1, useAuth } from '../../App';
import { context3 } from '../../protection/proteger';
import Confirmer from './confirmer/confirmer';




function Profile() {
  const [error,setErrorsupp]=useState(false);
  const [Loading1,setLoading]=useState(false);
  const [succes,setSucces]=useState(false);
  const [modifier,setModifier]=useState(false);
  const naviguer=useNavigate();
  const context2=useAuth(context1);
  const contextDoones=useContext(context3);
  const [src, setSrc] = useState("");
  const [changerImage,setChanger]=useState(true)
  const [confirme,setConfirme]=useState(false)


  const handledeconnexion=()=>{
    fetch("http://localhost:8000/Logout/",{credentials:"include"})
    .then((res)=>{return res.text()})
    .then((res)=>{console.log(res);naviguer("/");/*apres la deconnexion on doit rediriger l'utilisateur vers la page de login*/ })
    .catch((err)=>{console.log(err);})
  }




  const recupererImage=()=>{

    fetch(`http://localhost:8000/recupererImage/image${contextDoones.donnes.id}.png`,{credentials:"include"})
    .then((res)=>{  
                    console.log(res.headers.get("content-type"))
                    if(res.headers.get("content-type").includes("text")) throw new Error('erreur');
                    return res.blob();})
    .then((res)=>{setSrc(URL.createObjectURL(res))})
    .catch((err)=>{console.log(err)})
  }



  

  const supprimerProfile=async()=>{
  setLoading(true);
   try {
        const resultat=await fetch("http://localhost:8000/supprimerProfile",{credentials:"include"});

        const reponse=await resultat.text();

    if(reponse!="opértaion passée avec succes")
    {
          console.log("une erreur est servenue");
          setErrorsupp(true)
    }
    else 
    {
          console.log("suppression avec succes")
          setSucces(true)
          naviguer("/");  //on doit rediriger l'utilisateur vers la page de Login 
    }

   } catch (error) {
          console.log(error);
          setErrorsupp(true)
   }
   finally{
          setLoading(false)
          setConfirme(false)
   }
  }


  

  useEffect(()=>{
    if(changerImage==true)
    {
      recupererImage();
      setChanger(false);
    }
  },)


  return (
    <>
    {confirme==true?<Confirmer confirme1={()=>{supprimerProfile()}} Onclick={()=>{setConfirme(false)}}></Confirmer>:<></>}
    {Loading1==true?<Loading ></Loading>:<></>}
    {error==true?<ErrorProfile Onclick={()=>{setErrorsupp(false)}}></ErrorProfile>:<></>}
    {succes==true?<SuccesProfile Onclick={()=>{setSucces(false)}}></SuccesProfile>:<></>}
    {modifier==true?<ModifierProfile changerImage1={()=>{setChanger(true)}} Loading1={()=>{setLoading(true)}} Onclick3={()=>{setErrorsupp(true);setLoading(false);setModifier(false);context2.cacherModal()}} Onclick2={()=>{setSucces(true);setLoading(false);setModifier(false);context2.cacherModal();contextDoones.rendu()}}   Onclick={()=>{setModifier(false);context2.cacherModal()}}></ModifierProfile>:<></>}
    <div className=' w-full min-h-[100vh]  flex content-start justify-center flex-wrap gap-[50px] pt-12  '>
       <div className=' w-[90%] flex justify-center items-center mb-[100px]'>
         {src==""?
         <div className=' w-[120px]  aspect-square rounded-[50%] border-white border-[3px] flex justify-center items-center shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)]'>chargement...</div> :
         <img src={src} className=' w-[120px]  aspect-square rounded-[50%] border-white border-[3px] flex justify-center items-center shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)]'></img>
         }

       </div>



       <div className=' w-[80%] min-h-[300px] flex flex-wrap justify-center gap-[100px]' style={{textShadow:"2px 2px 5px rgba(255, 255, 255, 0.7)"}}>
         <div className=' flex flex-wrap gap-[25px] w-full justify-center'>
          <span className=' text-[25px] font-[600] family1 text-white'>Bienvenu</span>
          <div className=' w-full text-center text-[30px] font-[600] text-white uppercase' style={{textShadow:"2px 2px 5px rgba(255, 255, 255, 0.7)"}}>{contextDoones.donnes.nom} {contextDoones.donnes.prenom}</div>
         </div>

         <div className='  w-[250px] flex flex-col gap-[20px] items-center mb-[100px]'>
            <span className='w-fit  text-center text-white underline hover:no-underline cursor-pointer text-[15px] ' onClick={()=>{setModifier(true);context2.afficherModal()}}>Modifier profile</span>
            <span className='w-fit  text-center text-white underline hover:no-underline cursor-pointer text-[15px] ' onClick={()=>{setConfirme(true)}}>Supprimer profile</span>
            <span className='w-fit  text-center text-white underline hover:no-underline cursor-pointer text-[15px] ' onClick={()=>{naviguer('/Listeusers')}}>Liste Utilisateurs</span>
            <span className='w-fit  text-center text-white underline hover:no-underline cursor-pointer text-[15px] ' onClick={()=>{naviguer('/ajouterutilisateur')}}>Creer Utilisateur</span>
            <span className='w-fit  text-center text-white underline hover:no-underline cursor-pointer text-[15px] ' onClick={()=>{handledeconnexion()}}>Se Déconnecter</span>
         </div>
       </div>
    </div>
    </>

  )
}

export default Profile