import { Kindergarten } from "./kindergarten";

export interface Child {
    id: string;
    name: string;
    birthDate: string,
    kindergardenId: number
  }

  export interface ChildResponse {
    id: string;
    name: string;
    birthDate: string,
    kindergarden: Kindergarten,
    kindergardenId: number
  }