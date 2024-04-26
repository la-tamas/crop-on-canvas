import { useCallback, useEffect, useRef } from 'react'
import { Application, Renderer } from 'pixi.js'

export default function useCanvas() {
    const app = useRef<Application<Renderer>>(new Application())

    const createCanvas = useCallback(async () => {
        await app.current.init({
            width: window.innerWidth,
            height: window.innerHeight,
            clearBeforeRender: true,
            resizeTo: window,
            eventMode: 'static',
            manageImports: true,
        })        
    }, [])

    useEffect(() => {
        createCanvas();
    }, [createCanvas])

    return {
        app: app.current,
    }
}