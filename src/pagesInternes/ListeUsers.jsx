import React, { useContext, useEffect, useRef, useState } from 'react'
import User from './Utilisateur/User'
import { TbFaceIdError } from 'react-icons/tb';
import Modal1 from './Utilisateur/modalError/modal1';
import Confirmer from './Utilisateur/modalConfirm/Confirme';
import Loadingcomp from './Utilisateur/Loading/Loading';
import Succes from './Utilisateur/Succes/Succes';
import { Circles } from 'react-loader-spinner';
import Modalmodifier from './Utilisateur/ModalModifier/Modalmodifier';
import { context1 } from '../App';
import { useNavigate } from 'react-router-dom';




function Listeusers() {
  //etats
  const [data,setData]=useState([]);
  const [Loading,setLoading]=useState(true);
  const [errorSupp,setErrorsupp]=useState(false);
  const [Confirme,setconfirmer]=useState(false);
  const [succes,setSucces]=useState(false);
  const [modifier,setModifier]=useState(false);
  const erreurRec=useRef("rien");
  const naviguer=useNavigate();
  const idUser1=useRef();

  //recuperer le context
  const context2=useContext(context1)

  const envoyer=()=>{

      fetch("http://localhost:8000/getUsers/",{credentials:"include"})
      .then((res)=>{return res.json()})
      .then((res)=>{console.log(res); setData(res);setLoading(false);erreurRec.current="bien"})
      .catch((err)=>{console.log("une erreur est servenue");setLoading(false);erreurRec.current="erreur"})
  }





  //methodes
  const recupererDonnes=()=>{

        if(erreurRec.current=="erreur")  //si une erreur est servenue lors du fetching des données
        {
          return <div className='w-full text-center text-white text-[16px]'>Une erreur s'est produite</div>;
        }


        else {  //sinon (tous est bon)

          const Liste=data.map((ele,key)=>{
              const modifierUser=(idUser)=>{
                 setModifier(true)
              }
              return <User key={key} succes={()=>{setSucces(true)}} confirmer={(idUser)=>{idUser1.current=idUser;setconfirmer(true);}} Modifier={modifierUser} cle={ele.id_user} Nom={ele.nom} Prenom={ele.prenom} Email={ele.email} tel={ele.telephone}></User>
            })

            if(Liste.length)
            return Liste;
            else 
            return <div className='w-full text-[17px] text-white italic text-center font-[600]'> Aucun Utilisateur</div>
        }
  }







  useEffect(()=>{
  envoyer();
  },[])





  //contenu
  return (
    <div className='w-full flex flex-col justify-start gap-[90px] items-center '>
       <div className='w-fit h-[40px] text-[24px] text-[white] text-center font-[Inika] font-[700]' style={{textShadow:"2px 2px 5px rgba(255, 255, 255, 0.7)"}}>Liste Utilisateurs</div>
       
       
       <div className='border-[2px] box-border border-white w-[80%]  flex flex-wrap justify-center  rounded-[15px] bg-[rgba(255,255,255,0.45)] shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)]'>
         <div className='relative justify-center w-[100%] min-[900px]:w-[calc(100%/7)] h-[50px] min-[900px]:h-[100px] flex  items-center box-border pl-[10px] text-[18px] text-white font-[600] italic before:content-[""] before:block before:bg-white before:w-[100px] before:h-[2px] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] min-[900px]:before:hidden'>#ID</div>
         <div className='relative justify-center w-[100%] min-[900px]:w-[calc(100%/7)]  h-[50px] min-[900px]:h-[100px]  flex  items-center box-border pl-[10px] text-[18px] text-white font-[600] italic before:content-[""] before:bg-white before:w-[100px] before:h-[2px] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] min-[900px]:before:hidden'>Nom</div>
         <div className='relative justify-center w-[100%] min-[900px]:w-[calc(100%/7)]  h-[50px] min-[900px]:h-[100px]  flex  items-center box-border pl-[10px] text-[18px] text-white font-[600] italic before:content-[""] before:bg-white before:w-[100px] before:h-[2px] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] min-[900px]:before:hidden'>Prénom</div>
         <div className='relative justify-center w-[100%] min-[900px]:w-[calc(100%/7)]  h-[50px] min-[900px]:h-[100px]  flex  items-center box-border pl-[10px]  text-[18px] text-white font-[600] italic before:content-[""] before:bg-white before:w-[100px] before:h-[2px] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] min-[900px]:before:hidden '>Email</div>
         <div className='relative justify-center w-[100%] min-[900px]:w-[calc(100%/7)]  h-[50px] min-[900px]:h-[100px]  flex  items-center box-border pl-[10px]  text-[18px] text-white font-[600] italic before:content-[""] before:bg-white before:w-[100px] before:h-[2px] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] min-[900px]:before:hidden'>Numéro tel</div>
         <div className='relative justify-center w-[100%] min-[900px]:w-[calc(100%/7)]  h-[50px] min-[900px]:h-[100px]  flex  items-center box-border pl-[10px]  text-[18px] text-white font-[600] italic before:content-[""] before:bg-white before:w-[100px] before:h-[2px] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] min-[900px]:before:hidden'>Photo</div>
         <div className='relative justify-center w-[100%] min-[900px]:w-[calc(100%/7)]  h-[50px] min-[900px]:h-[100px]  flex  items-center box-border pl-[10px]  text-[18px] text-white font-[600] italic '>Opérations</div>
       </div>
       <div className=' w-[80%]  min-h-[100px] border-[2px] border-white bg-[rgba(255,255,255,0.45)] shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)] rounded-[15px] flex flex-wrap justify-center content-center gap-[10px] pt-[10px] pb-[10px] mb-[20px]'>
         {
          Loading==true?<Circles
                        height="60"
                        width="60"
                        color="white"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        />:recupererDonnes()
         }
       </div>

       <div className='w-[100%] h-[100px] mb-[50px] flex justify-center flex-wrap content-center gap-[30px]' >
          <span onClick={()=>{naviguer("/ajouterutilisateur")}} className='border-white border-[2px] inline-block px-[20px] cursor-pointer hover:shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)] bg-[#ffffff84] py-[10px] font-[600] text-white rounded-[15px] w-[180px] '>Ajouter Utilisateur</span>
          <div className='w-full flex justify-center items-center'><span onClick={()=>{naviguer("/profile")}} className='border-white border-[2px] inline-block px-[20px] cursor-pointer hover:shadow-[0_0_27.9px_10px_rgba(255,255,255,0.25)] bg-[#ffffff84] py-[10px] font-[600] text-white rounded-[15px] w-[180px] text-center '>Profile</span></div>
       </div>
       {errorSupp==true?<Modal1 Onclick={()=>{setErrorsupp(false)}}></Modal1>:<></>}
       {Confirme==true?<Confirmer idUser={idUser1.current}   Onclick={()=>{setconfirmer(false)}} succes={()=>{setSucces(true);setErrorsupp(false)}} erreur={()=>{setErrorsupp(true);setSucces(false)}}></Confirmer>:<></>}
       {succes==true?<Succes Onclick={()=>{setSucces(false);window.location.reload();}}></Succes>:<></>}
       {modifier==true?<Modalmodifier succes1={()=>{setSucces(true);setModifier(false);context2.cacherModal()}} erreur1={()=>{setErrorsupp(true);setModifier(false);context2.cacherModal()}} idUser1={idUser1.current}  annule={()=>{setModifier(false);context2.cacherModal()}} ></Modalmodifier>:<></>}
    </div>
  )
}

export default Listeusers