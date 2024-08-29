import React from 'react';

interface BtnComponentProps {
  name: string;
  children?: React.ReactNode; // Permite pasar children opcionalmente
}

export default function BtnComponent({ name, children }: BtnComponentProps) {
  return (
    <div>
      <button  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center m-6 w-50">
        {children}
        <span>{name}</span>
      </button>
    </div>
  );
}