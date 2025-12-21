import { useState } from "react";
import  TogglePanel from "./child"

export const Parent = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)


    return (
        <div className="min-h-screen min-w-full bg-black  ">

        </div>
    )



}