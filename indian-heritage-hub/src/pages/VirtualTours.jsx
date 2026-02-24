import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { monuments } from '../data/monuments.js'
import { getCurrentUser, roleLabel } from '../lib/auth.js'

const tourStepsBySite = {
  "taj-mahal": [
    { title: "Entrance Gate", text: "Notice the grand gateway framing the monument — a classic Mughal design." },
    { title: "Main Tomb", text: "Observe the symmetry, marble inlay work, and calligraphy on the arches." },
    { title: "Gardens", text: "The Charbagh garden layout represents paradise gardens in Persian tradition." }
  ],
  "qutub-minar": [
    { title: "Base View", text: "Look at the fluted red sandstone and the tapering structure." },
    { title: "Inscriptions", text: "Arabic inscriptions and decorative bands reflect Indo-Islamic craftsmanship." },
    { title: "Complex Highlights", text: "Explore nearby structures like Quwwat-ul-Islam Mosque and Iron Pillar." }
  ],
  "hampi": [
    { title: "Temple Street", text: "Hampi’s bazaar streets were once bustling with traders." },
    { title: "Vittala Temple", text: "Known for musical pillars and the iconic stone chariot." },
    { title: "Boulders & River", text: "Unique landscape — boulders and the Tungabhadra riverbanks." }
  ],
  "konark-sun-temple": [
    { title: "Stone Wheels", text: "The wheels can act as sundials. The carvings are extremely detailed." },
    { title: "Chariot Form", text: "The whole temple is designed as Surya’s chariot drawn by horses." },
    { title: "Sculptures", text: "Panels depict daily life, mythology, and artistic mastery of the era." }
  ]
}

export default function VirtualTours(){
  const [params, setParams] = useSearchParams()
  const initial = params.get("site") || monuments[0].id
  const [siteId, setSiteId] = useState(initial)
  const [step, setStep] = useState(0)

  const user = getCurrentUser()
  const site = useMemo(() => monuments.find(m => m.id === siteId) || monuments[0], [siteId])
  const steps = tourStepsBySite[siteId] || []

  const onChangeSite = (id) => {
    setSiteId(id)
    setStep(0)
    setParams({ site: id })
  }

  const canGuide = user && (user.role === "guide" || user.role === "admin")

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="row" style={{justifyContent:'space-between'}}>
          <div>
            <h2 style={{margin:'0 0 6px 0'}}>Virtual Tours</h2>
            <p className="muted small" style={{margin:0}}>
              Interactive guided tour steps (hotspot-like). {user ? `Logged in as ${roleLabel(user.role)}.` : "Login for role-based features."}
            </p>
          </div>
          <div style={{minWidth:280}}>
            <label className="small muted">Choose site</label>
            <select value={siteId} onChange={(e)=>onChangeSite(e.target.value)}>
              {monuments.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <img src={site.cover} alt={site.name} style={{width:'100%', height:320, objectFit:'cover', display:'block'}} />
        <div style={{padding:16}}>
          <div className="row" style={{justifyContent:'space-between'}}>
            <div>
              <h3 style={{margin:'0 0 4px 0'}}>{site.name} Tour</h3>
              <p className="muted small" style={{margin:0}}>{site.city}, {site.state}</p>
            </div>
            <div className="row">
              <button className="btnGhost" onClick={()=>setStep(s => Math.max(0, s-1))} disabled={step===0}>Prev</button>
              <button className="btnGhost" onClick={()=>setStep(s => Math.min(steps.length-1, s+1))} disabled={step>=steps.length-1}>Next</button>
            </div>
          </div>

          <div className="sep" />
          {steps.length ? (
            <>
              <div className="row" style={{justifyContent:'space-between'}}>
                <span className="tag">Step {step+1} / {steps.length}</span>
                <span className="tag">Hotspot</span>
              </div>
              <h3 style={{marginBottom:6}}>{steps[step].title}</h3>
              <p className="small" style={{lineHeight:1.6}}>{steps[step].text}</p>

              {canGuide && (
                <div style={{marginTop:12}} className="card">
                  <h3 style={{marginTop:0}}>Tour Guide Notes</h3>
                  <p className="muted small" style={{marginTop:0}}>
                    This section appears for <b>Tour Guide/Admin</b> roles. In a real app, guides could add narration,
                    answer questions live, and attach references.
                  </p>
                  <textarea placeholder="Add extra insights / narration (demo-only)" />
                  <div className="row" style={{justifyContent:'flex-end', marginTop:10}}>
                    <button className="btnGhost" onClick={()=>alert("Saved (demo). Connect backend for real saving.")}>Save note</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="muted">No steps configured for this site.</p>
          )}
        </div>
      </div>
    </div>
  )
}
