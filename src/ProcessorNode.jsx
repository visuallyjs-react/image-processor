import { catalog } from './catalog'
export default function ProcessorNode({ obj }) {
    const data = obj.data, op = catalog[obj.type]
    return <div className={`processor-node ${op.id.split('.')[0]}`} data-node-id={obj.id} data-node-type={op.id}>
        <header><span>{data.label}</span><button className="delete-node" title="Delete node" aria-label="Delete node">×</button></header>
        <div className="ports">{[true, false].map(input => <div key={String(input)}>{(input ? op.inputs : op.outputs).map(p => <div key={p.id} className={`port-row ${input ? 'input' : 'output'}`}><span className="port" data-vjs-port={`${input ? 'in' : 'out'}:${p.id}`} data-vjs-port-type={input ? 'target' : 'source'} data-vjs-target={input ? 'true' : undefined} data-vjs-source={input ? undefined : 'true'} data-vjs-scope={p.type} title={`${p.label} (${p.type})`}/><span>{p.label}</span></div>)}</div>)}</div>
        {['basic.source', 'basic.display'].includes(op.id) ? <><canvas width="200" height="160" aria-label="Image preview"/><footer>{op.id === 'basic.source' ? <button className="upload-image" title="Upload image">Upload image</button> : <a className="download-image" aria-disabled="true" title="Download image">Download PNG</a>}<span className="dimensions"/></footer></> : <div className="value-preview"/>}
        <div className="node-error" role="status"/>
    </div>
}
