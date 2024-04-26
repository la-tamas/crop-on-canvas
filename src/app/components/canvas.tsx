"use client"

import { WheelEvent, useCallback, useEffect, useRef } from 'react'
import { Assets, Graphics, Sprite, AlphaFilter } from 'pixi.js'
import { FaDownload } from 'react-icons/fa'
import useCanvas from '../hooks/useCanvas'
import useFileConext from '../hooks/useFileContext'

const CONTAINER_ID = 'canvas-container'
const TARGET = 'target-window'
const RECT_OFFSET = 200;
const RECT_SIZE = 300;

export default function Canvas() {
    const isDragging = useRef<boolean>(false)
    
    const { file } = useFileConext()
    const { app } = useCanvas()

    const handleMouseDown = useCallback((e: MouseEvent) => {
        const child = app.stage.getChildByName(TARGET)
        if (child &&
            e.clientX >= child.x &&
            e.clientX <= child.x + child.width &&
            e.clientY >= child.y &&
            e.clientY <= child.y + child.height
        ) {
            isDragging.current = true
        }
    }, [app.stage])

    const handleMouseUp = useCallback((_: MouseEvent) => {
        isDragging.current = false
    }, [])
  
    const handleMouseOut = useCallback((_: MouseEvent) => {
        isDragging.current = false
    }, [])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging.current) {
            const child = app.stage.getChildByName(TARGET)

            if (child) {
                child.x = e.clientX - RECT_OFFSET
                child.y = e.clientY - RECT_OFFSET
            }
        }
    }, [app.stage])

    const handleScroll = useCallback((e: WheelEvent) => {
        const child = app.stage.getChildByName(TARGET)
        if (child) {
            const grow = Math.ceil(RECT_SIZE * 10 / 100);

            if (e.deltaY >= 0) {
                const newHeight = child.height - grow;
                const newWidth = child.width - grow;
                if (newHeight > grow && newWidth > grow) {
                    child.width = newWidth
                    child.height = newHeight
                }
            } else {
                const newHeight = child.height + grow;
                const newWidth = child.width + grow;
                if (newHeight < app.canvas.height && newWidth < app.canvas.width) {
                    child.width = newWidth
                    child.height = newHeight
                }
            }
        }
    }, [app])

    const handleDownload = useCallback(() => {
        app.render()
        app.renderer.extract.download(app.stage)
    }, [app])

    useEffect(() => {
        function loadImage() {
            const parentNode = document.getElementById(CONTAINER_ID)

            if (file && parentNode) {
                app.renderer.clear()
                app.stage.removeChildren()
                const reader = new FileReader()

                parentNode.appendChild(app.canvas)

                reader.onloadend = async () => {
                    if (reader.result) {
                        app.stage.removeAllListeners()
                        const img = new Image()
                        img.src = reader.result.toString();
                        const image = await Assets.load(reader.result)
                        const background = new Sprite(image)
                        background.height = app.renderer.height
                        background.width = app.renderer.width

                        const frame = new Graphics({
                            label: TARGET,
                            blendMode: 'difference',
                        })
                        .rect(0, 0, RECT_SIZE, RECT_SIZE)
                        .stroke(0x000000)
                        .setStrokeStyle(0x000000)
                        .fill(background)
                        .setFillStyle(background)
                        frame.x = RECT_OFFSET
                        frame.y = RECT_OFFSET
                        frame.filters = [new AlphaFilter({ alpha: 0.5 })]

                        background.mask = frame
                        background.filters = [new AlphaFilter({ alpha: 1 })]

                        app.stage.addChild(frame)
                        app.stage.addChild(background)
                    }
                }

                reader.readAsDataURL(file);

                app.canvas.addEventListener('mousedown', handleMouseDown)
                app.canvas.addEventListener('mouseup', handleMouseUp)
                app.canvas.addEventListener('mouseout', handleMouseOut)
                app.canvas.addEventListener('mousemove', handleMouseMove)
                app.canvas.addEventListener('wheel', handleScroll as unknown as EventListener)
            }
        }

        loadImage()

        return () => {
            if (file) {
                app.canvas.removeEventListener('mousedown', handleMouseDown)
                app.canvas.removeEventListener('mouseup', handleMouseUp)
                app.canvas.removeEventListener('mouseout', handleMouseOut)
                app.canvas.removeEventListener('mousemove', handleMouseMove)
                app.canvas.removeEventListener('wheel', handleScroll as unknown as EventListener)

                app.canvas.remove()
            }
        }
    }, [file, app, handleMouseDown, handleMouseMove, handleMouseOut, handleMouseUp, handleScroll])

    return (
        <div>
            {file ? (
                <button onClick={handleDownload} className="absolute top-4 right-4 rounded-xl bg-teal-700 text-2xl text-teal-50">
                    <span style={{ fontSize: 40 }}>
                        <FaDownload style={{ fontSize: 40 }} className="pt-1 pb-2 px-5 text-2xl" />
                    </span>
                </button>
            ) : (
                <div className="min-h-screen text-center text-3xl text-teal-900 p-24 space-y-2">
                    <p className="my-2">
                        Add images with the {'"'}Plus{'"'} button
                    </p>
                    <p className="my-2">
                        Scroll to modify the cropped image size
                    </p>
                    <p className="my-2">
                        Select/move to the desired parts
                    </p>
                    <p className="my-2">
                       Download the content of the box
                    </p> 
                </div>
            )}
            <div id={CONTAINER_ID}></div>
        </div>
    )
}
