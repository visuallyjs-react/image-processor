import { useEffect, useMemo, useRef } from 'react'
import { SurfaceComponent } from '@visuallyjs/browser-ui-react'
import { createProcessor } from './processor'
import { nativeView } from './view-options'
import './style.css'
export default function App() {
    const root = useRef(null), surfaceRef = useRef(null)
    const processor = useMemo(() => createProcessor(), [])
    const view = useMemo(() => nativeView(processor.viewOptions), [processor])
    useEffect(() => processor.attach(surfaceRef.current.getSurface(), root.current, import.meta.env.BASE_URL), [processor])
    return <div ref={root}><main className="image-processor">
      <aside className="palette-panel">
        <h1>Image Processor</h1>
        <p>Drag a node onto the canvas.</p>
        <div id="palette" aria-label="Node palette"></div>
      </aside>
      <section className="workspace" aria-label="Image processing graph">
        <div id="canvas"><SurfaceComponent ref={surfaceRef} renderOptions={processor.renderOptions} modelOptions={processor.modelOptions} viewOptions={view}/></div>
        <div id="controls" className="vjs-controls"></div>
        <div id="miniview" className="vjs-miniview"></div>
        <div className="canvas-help">Drop images here · Connect matching ports · Select a node to edit</div>
        <div id="status" role="status" aria-live="polite">Loading example…</div>
      </section>
      <aside className="inspector-panel">
        <h2>Properties</h2>
        <div id="inspector"></div>
        <p className="inspector-help">Connected values override local settings. Disconnect an input to use its local value again.</p>
      </aside>
</main></div>
}
