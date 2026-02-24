import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../lib/auth.js'

export default function Login(){
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    setErr("")
    const res = login(email.trim(), password)
    if(!res.ok){
      setErr(res.message)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="grid" style={{gap:16, maxWidth:520}}>
      <div className="card">
        <h2 style={{marginTop:0}}>Login</h2>
        <p className="muted small" style={{marginTop:0}}>Use demo credentials from README.</p>
        <div className="sep" />
        <form onSubmit={onSubmit} className="grid" style={{gap:12}}>
          <div>
            <label className="small muted">Email</label>
            <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="admin@demo.com" />
          </div>
          <div>
            <label className="small muted">Password</label>
            <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="admin123" />
          </div>
          {err && <div className="card" style={{background:'rgba(255,0,0,0.10)'}}>{err}</div>}
          <button className="btn" type="submit">Login</button>
          <p className="muted small" style={{margin:0}}>
            No account? <Link to="/register" className="pill">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
