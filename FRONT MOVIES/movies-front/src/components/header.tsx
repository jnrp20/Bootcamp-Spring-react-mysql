import { headers } from 'next/headers';
import React from 'react'



interface HeaderProps {
  
  children?: React.ReactNode; // Permite pasar children opcionalmente
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="h-auto
    pb-8">
    
      <h1 className="flex justify-center text-5xl pt-7 text-white font-sans font-bold">
        BOOTCAMP 
      </h1>
      <h2 className="flex justify-center text-3xl mt-2 text-white font-sans">
        Spring Boot - Next JS - MySQL
      </h2>
      <h2 className="flex justify-center text-3xl mt-2 text-white font-sans">

      </h2>
  {children}
      
    </div>
  )
}
