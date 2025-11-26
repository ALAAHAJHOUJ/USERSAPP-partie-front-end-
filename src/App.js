
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Inscription from "./pagesAceuille/inscription";
import Login from "./pagesAceuille/Login";
import CrreerUser from "./pagesInternes/CrreerUser";
import Listeusers from "./pagesInternes/ListeUsers";
import './pagesInternes/Utilisateur/ModalModifier/Modal.css'
import Profile from "./pagesInternes/Profile/Profile";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import Notfound from "./pagesInternes/notfound/notfound";
import Proteger from "./protection/proteger";



export const context1=createContext(null);


const router=createBrowserRouter([
    
   {
    path:"/",   //page de connexion
    element:<Login></Login>
   },
  {
    path:"/inscription",   //page d'inscription
    element:<Inscription></Inscription>
  },
   {
    path:"/profile",  //page de profile) --protégée
    element:<Proteger><Profile></Profile></Proteger>
   },
    {
    path:"/ListeUsers",  //page de liste d'utilisateurs --protégée
    element:<Proteger><Listeusers></Listeusers></Proteger>
   },
    {
    path:"/ajouterUtilisateur",  // page d'ajout d'un utilisateur --protégée
    element:<Proteger><CrreerUser></CrreerUser></Proteger>
   },
   {
    path:"*",
    element:<Notfound></Notfound> //route n'existe pas 
   }
])







function App() {
  const [cacher,setCacher]=useState(true);


  const cacherModal=()=>{
  setCacher(true)
  }

  const afficherModal=()=>{
   setCacher(false)
  }
  console.log('render')

  return (
    <context1.Provider value={{cacherModal,afficherModal}}>
      <div className={cacher==true?"pt-[60px]  w-full min-h-[100vh] overflow-visible bg-[linear-gradient(180deg,_#5E6EDA_12.02%,_#323B74_100%)] box-border":"pt-[60px]  w-full h-[100vh] overflow-hidden bg-[linear-gradient(180deg,_#5E6EDA_12.02%,_#323B74_100%)] box-border"}>
            <RouterProvider router={router}></RouterProvider>
      </div>
    </context1.Provider>

  );
}

export default App;







//custom hook pour le context global
export const useAuth=()=>{ 
const context=useContext(context1);
if(context==undefined) throw new Error('ce composant doit etre utilisée dans le context provider')

return context;
}