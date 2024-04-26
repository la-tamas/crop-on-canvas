import { useState, type ReactNode } from 'react'
import FileContext from '../contexts/FileContext'

type FileContextProviderProps = Readonly<{
    children: ReactNode;
  }>

export default function FileContextProvider({ children }: FileContextProviderProps) {
    const [file, setFile] = useState<File | null>(null);

    return (
        <FileContext.Provider value={{
            file,
            setFile,
        }}>
            {children}
        </FileContext.Provider>
    )
}