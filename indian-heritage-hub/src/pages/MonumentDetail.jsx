import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { monuments } from '../data/monuments.js'

export default function MonumentDetail(){
  const { id } = useParams()
  const m = monuments.find(x => x.id === id)

  if(!m){
    return (
      <div className="card">
        <h2>Monument not found</h2>
        <Link className="btn" to="/explore">Back to Explore</Link>
      </div>
    )
  }

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <img src={m.cover} alt={m.name} style={{width:'100%', height:320, objectFit:'cover', display:'block'}} />
        <div style={{padding:16}}>
          <div className="row" style={{justifyContent:'space-between'}}>
            <div>
              <h2 style={{margin:'0 0 4px 0'}}>{m.name}</h2>
              <p className="muted small" style={{margin:0}}>{m.city}, {m.state} • {m.period} • {m.type}</p>
            </div>
            <Link className="btn" to={`/tours?site=${m.id}`}>Start virtual tour</Link>
          </div>

          <div className="sep" />
          <h3>About</h3>
          <ul className="small" style={{marginTop:6}}>
            {m.details.map((d, i) => <li key={i} style={{marginBottom:6}}>{d}</li>)}
          </ul>

          <h3>Fun Facts</h3>
          <div className="row" style={{gap:8, flexWrap:'wrap'}}>
            {m.funFacts.map((f, i) => <span key={i} className="tag">{f}</span>)}
          </div>

          <div className="sep" />
          <div className="row">
            <Link className="btnGhost" to="/explore">← Back</Link>
            <a className="btnGhost" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.name + ", " + m.city)}`} target="_blank" rel="noreferrer">
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
