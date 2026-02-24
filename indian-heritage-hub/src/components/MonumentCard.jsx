import React from 'react'
import { Link } from 'react-router-dom'

export default function MonumentCard({ m }){
  return (
    <div className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <h3 style={{margin:0}}>{m.name}</h3>
        <span className="tag">{m.type}</span>
      </div>
      <p className="muted small" style={{marginTop:6}}>{m.city}, {m.state} • {m.period}</p>
      <div style={{borderRadius:14, overflow:'hidden', border:'1px solid rgba(255,255,255,0.10)', margin:'10px 0'}}>
        <img src={m.cover} alt={m.name} style={{width:'100%', height:170, objectFit:'cover', display:'block'}} />
      </div>
      <p className="small">{m.short}</p>
      <div className="row">
        <Link className="btnGhost" to={`/monument/${m.id}`}>Read more</Link>
        <Link className="btn" to={`/tours?site=${m.id}`}>Start tour</Link>
      </div>
    </div>
  )
}
