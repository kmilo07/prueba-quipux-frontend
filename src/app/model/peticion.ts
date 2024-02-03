import { Cancion } from "./cancion";

export interface Peticion{
    nombre: string;
    descripcion: string;
    canciones: Cancion[]; 
}