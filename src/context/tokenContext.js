import { useState } from "react";

const { createContext } = require("react");

export let tokenContext = createContext();



 
export default function TokencontextProvider (props){

    let [token,setToken] = useState(null)

    return <tokenContext.Provider value={{token,setToken}}>
        {props.children}
    </tokenContext.Provider>
}