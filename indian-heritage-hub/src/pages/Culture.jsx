import React, { useState } from 'react'
import { cultureTopics } from '../data/culture.js'

export default function Culture(){
  const [topicId, setTopicId] = useState(cultureTopics[0].id)
  const topic = cultureTopics.find(t => t.id === topicId) || cultureTopics[0]

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="row" style={{justifyContent:'space-between'}}>
          <div>
            <h2 style={{margin:'0 0 6px 0'}}>Indian Culture</h2>
            <p className="muted small" style={{margin:0}}>Learn about festivals, dance forms, and food culture.</p>
          </div>
          <div style={{minWidth:280}}>
            <label className="small muted">Choose topic</label>
            <select value={topicId} onChange={(e)=>setTopicId(e.target.value)}>
              {cultureTopics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{marginTop:0}}>{topic.title}</h3>
        <p className="muted small" style={{marginTop:0}}>{topic.subtitle}</p>
        <div className="sep" />
        <div className="grid grid2">
          {topic.items.map((it, idx) => (
            <div className="card" key={idx}>
              <div className="row" style={{justifyContent:'space-between'}}>
                <h3 style={{margin:0}}>{it.name}</h3>
                <span className="tag">Culture</span>
              </div>
              <p className="small" style={{lineHeight:1.6}}>{it.info}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
