import React from 'react'

function User({confirmer,Modifier,cle,Nom,Prenom,Email,tel,image}) {

  const confirmer1= (idUser,nomUser)=>{
  console.log(`on va suprimer l'utilisateur d'id ${idUser} et de nom ${nomUser}` );
  confirmer(idUser);
  }
  

  return (
    <div className='w-[95%] border-white border-[2px] rounded-[15px] flex justify-center flex-wrap min-[900px]:flex-nowrap gap-[10px] box-border p-[10px]'>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] italic'>{cle}</div>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] italic'>{Nom}</div>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] italic'>{Prenom}</div>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] shrink-[1] italic break-words'><span className='w-full break-words text-center'>{Email}</span></div>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] italic'>{tel}</div>
      <div className=' h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex justify-center items-center font-[600] italic'>{image}</div>
      <div className=' min-h-[55px] min-[900px]:h-[100px] w-[100%] min-[900px]:w-[calc(100%/7)] flex flex-wrap justify-center items-center gap-[10px]'>
            <div className='border-[2px] border-white text-white font-[500] bg-blue-400 rounded-[10px] flex justify-center items-center px-[15px] py-[5px] hover:bg-blue-300 cursor-pointer w-[120px]' onClick={()=>{Modifier(cle)}}>Modifier</div>
            <div className='border-[2px] border-white text-white font-[500] bg-red-500 rounded-[10px] flex justify-center items-center px-[15px] py-[5px] hover:bg-red-300 cursor-pointer w-[120px]' onClick={()=>{confirmer1(cle,Nom)}}>Supprimer</div>
      </div>
    </div>
  )
}

export default User