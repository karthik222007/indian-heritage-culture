import React, { useMemo, useState } from 'react'
import MonumentCard from '../components/MonumentCard.jsx'
import { monuments } from '../data/monuments.js'

export default function Explore(){
  const [stateFilter, setStateFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [search, setSearch] = useState("")

  const states = useMemo(() => Array.from(new Set(monuments.map(m => m.state))).sort(), [])
  const types = useMemo(() => Array.from(new Set(monuments.map(m => m.type))).sort(), [])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return monuments.filter(m => {
      const okState = !stateFilter || m.state === stateFilter
      const okType = !typeFilter || m.type === typeFilter
      const okSearch = !s || [m.name, m.city, m.state, m.period, m.type].join(" ").toLowerCase().includes(s)
      return okState && okType && okSearch
    })
  }, [stateFilter, typeFilter, search])

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="row" style={{justifyContent:'space-between'}}>
          <div>
            <h2 style={{margin:'0 0 6px 0'}}>Explore Monuments</h2>
            <p className="muted small" style={{margin:0}}>Filter by state/type and open a monument for details.</p>
          </div>
        </div>
        <div className="sep" />
        <div className="grid grid3">
          <div>
            <label className="small muted">Search</label>
            <input className="input" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Taj Mahal, Delhi, Mughal..." />
          </div>
          <div>
            <label className="small muted">State</label>
            <select value={stateFilter} onChange={(e)=>setStateFilter(e.target.value)}>
              <option value="">All</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="small muted">Type</label>
            <select value={typeFilter} onChange={(e)=>setTypeFilter(e.target.value)}>
              <option value="">All</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid2">
        {filtered.map(m => <MonumentCard key={m.id} m={m} />)}
      </div>
    </div>
  )
}
