"use client"

import Canvas from '@/app/components/canvas'
import FileContextProvider from './providers/FileContextProvider'
import SelectFile from './components/selectFile';

export default function Home() {
  return (
    <FileContextProvider>
      <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
        <SelectFile />
        <Canvas />      
      </main>
    </FileContextProvider>
  );
}
