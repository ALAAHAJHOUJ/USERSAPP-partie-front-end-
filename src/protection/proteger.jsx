import React, { createContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../App'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";




export const context3=createContext(null);

function Proteger({children}) {
        const token = Cookies.get("token");
        const data = token ? jwtDecode(token) : null;
        const naviguer=useNavigate();
        const [loading,setLoading]=useState(true);
        const [state,setState]=useState(1)

        const checkerLogin=async()=>{  //fonction qui verifie si l'utilisateur est connecté

        const resultat=await fetch('https://backendusersapp.vercel.app/',{credentials:"include"});



        const login1=await resultat.json();

        if(login1.message=="non authentifié" || login1.message=="probleme dans le token")  //l'utilisateur n'est pas authentifié
                {
                
                naviguer("/",{replace:true});   
                setLoading(false); 
        
                }

                //sinon l'utilisateur est connecté et peut acceder a la ressourse protegée
        else       
                {


                        
                setLoading(false);
                //ici onva recuperer le token a partir des cookies pour recuperer la valeur du nom d'utilisateur


                }
        }





        useEffect(()=>{
        
        checkerLogin();


        },[])



       if(loading==true) return <div className='w-full  text-center text-[30px] text-white font-[600]'>Loading...</div>
 
       if(data==null) return <></>
       return <context3.Provider value={{donnes:data,rendu:()=>{setState(state+1)}}}>{children}</context3.Provider>
}

export default Proteger


