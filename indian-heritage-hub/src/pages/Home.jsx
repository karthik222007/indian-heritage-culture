import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="grid" style={{gap:16}}>
      <div className="hero">
        <h1 className="heroTitle">Learn Indian culture & explore monuments—like a guided museum tour.</h1>
        <p className="muted" style={{maxWidth:800, marginTop:0}}>
          Discover famous historical places, take interactive virtual tours, and join cultural discussions.
          Role-based features support Admin, Cultural Enthusiast, Content Creator, and Tour Guide workflows.
        </p>
        <div className="row">
          <Link className="btn" to="/explore">Explore monuments</Link>
          <Link className="btnGhost" to="/tours">Try a virtual tour</Link>
          <span className="kbd">Tip: Use demo logins from README</span>
        </div>
      </div>

      <div className="grid grid3">
        <div className="card">
          <h3>🏛 Explore</h3>
          <p className="muted small">Browse monuments with filters by state, type, and period.</p>
        </div>
        <div className="card">
          <h3>🗺 Virtual Tours</h3>
          <p className="muted small">Interactive steps, hotspots, and guide-style narration.</p>
        </div>
        <div className="card">
          <h3>💬 Discussions</h3>
          <p className="muted small">Ask questions and share insights (guides can reply).</p>
        </div>
      </div>
    </div>
  )
}
