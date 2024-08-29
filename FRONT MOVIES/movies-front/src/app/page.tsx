"use client"; // Agrega esta línea al inicio del archivo
import Image from "next/image";
import { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";
import { Movie } from "@/types/movie";
import BtnComponent from "@/components/btnComponent";
import Modal from "@/components/modal";
import Header from "@/components/header";
import BtnSelect from "@/components/btnSelect";
import Link from "next/link";
// Define una interfaz para el tipo de datos de película (opcional pero recomendado en TypeScript)

//alerta para la creacio de peliculas


export default function Home() {

 
 
 
  return (
    <div className=" h-auto">
      <Header></Header>

      <div className="flex w-screen mt-6 items-center justify-center ">
        <BtnComponent name="Vote">
          <img
            className="mr-2"
            src="https://cdn-icons-png.flaticon.com/128/17276/17276760.png"
            alt=""
            width={"25"}
          />
        </BtnComponent>

        <Link href="/new">
          <BtnComponent name="New">
            <img
              className="mr-2"
              src="https://cdn-icons-png.flaticon.com/128/4885/4885419.png"
              alt=""
              width={"25"}
            />
          </BtnComponent>
        </Link>

      <Link href={"/update"}>
          <BtnComponent name="Update">
            <img
              className="mr-2"
              src="https://cdn-icons-png.flaticon.com/128/25/25465.png"
              alt=""
              width={"25"}
            />
          </BtnComponent>
      </Link>

        <Link href="/delete">
          <BtnComponent name="Delete">
            <img
              className="mr-2"
              src="https://cdn-icons-png.flaticon.com/128/7838/7838444.png"
              alt=""
              width={"25"}
            />
          </BtnComponent>
        </Link>
      </div>
  

 

      <MovieCard></MovieCard>
    </div>
  );
}

