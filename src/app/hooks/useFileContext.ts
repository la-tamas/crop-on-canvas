import { useContext } from 'react'
import FileContext from '../contexts/FileContext'

export default function useFileConext() {
    return useContext(FileContext)
}
