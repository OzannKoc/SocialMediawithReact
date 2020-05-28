import React from 'react';
import defaultImg from "../Assets/defaultProfil.png";

const ProfilImageWithDefault=(props)=> {
    const{height,width,className,image,username,tempimage}=props;
    let imageSource = defaultImg;
    if(image){
        imageSource = "/images/profile/"+image;
    }
    return (
        
            <img src={tempimage ||imageSource} height={height} width={width} className={className} alt ={`${username} profil`} onError={(e)=>{e.target.src =defaultImg}} />
        
    )
}
export default ProfilImageWithDefault;
