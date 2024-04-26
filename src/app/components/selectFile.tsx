"use client"

import { ChangeEventHandler, MouseEventHandler, useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
import useFileConext from '../hooks/useFileContext'


export default function SelectFile() {
    const inputRef = useRef<HTMLInputElement>(null)
    const { setFile } = useFileConext()

    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
        inputRef.current?.click()
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0] || null

        setFile(null)
        setFile(file)
    }

    return (
        <div className="absolute left-4 top-4 rounded-xl bg-teal-700">
            <button
                className="flex items-center justify-center text-2xl text-teal-50"
                onClick={handleClick}
            >
                <span style={{ fontSize: 40 }}>
                    <FaPlus style={{ fontSize: 40 }} className="pt-1 pb-2 px-5 text-2xl" />
                </span>
            </button>
            <input
                ref={inputRef}
                onChange={handleChange}
                type="file"
                accept="image/*"
                hidden
            />
        </div>
    )
}