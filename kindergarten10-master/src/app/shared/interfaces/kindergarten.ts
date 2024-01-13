// kindergarten.ts
export interface Kindergarten {
    id: number;
    name: string;
    address: string;
    betreiber: string;
    typ: Typ,
    photoFilePath: string;
  }

  export enum Typ {
      privat = 1,
      oeffentlich = 2,
  }