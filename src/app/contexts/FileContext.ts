import { Dispatch, SetStateAction, createContext } from 'react'

type FileContextType = {
    file: File | null
    setFile: Dispatch<SetStateAction<File | null>>
}

export default createContext({} as FileContextType)
