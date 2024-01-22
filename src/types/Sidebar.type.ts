import { ReactNode } from "react"


export type TRoute = {
    path: string,
    element: ReactNode
}

export type TSideBar = {
    key: string,
    label: ReactNode,
    children?: TSideBar[]
}



export type TUserPath = {
    name: string;
    path?: string ;
    element?: ReactNode;
    children?: TUserPath[]
}
