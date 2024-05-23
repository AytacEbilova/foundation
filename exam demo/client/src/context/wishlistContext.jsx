

import { useState } from "react";
import { createContext } from "react";


export const FavContext=createContext(null);

const FavProvider=({children})=>{
    let localFav=JSON.parse(localStorage.getItem("fav"));
    if(!localFav){
        localStorage.setItem("fav",JSON.stringify([]))
    }
    const [fav,setFav]=useState(localFav || []);
    return (
        <FavContext.Provider value={{fav,setFav}}>
            {children}
        </FavContext.Provider>
    )
}

export default FavProvider