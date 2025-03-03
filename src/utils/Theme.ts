import { useEffect, useState } from "react";

export function ApplyDarkMode():void{
    if (typeof window === "undefined")
        return;
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme)
        document.documentElement.classList.toggle("dark",savedTheme === "dark");
    else{
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if(prefersDark){
            document.documentElement.classList.toggle("dark");
            localStorage.setItem("theme", "dark")
        }
    }
}




