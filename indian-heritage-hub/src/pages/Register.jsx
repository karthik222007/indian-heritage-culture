import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register, roleLabel } from '../lib/auth.js'

const roles = ["enthusiast","creator","guide"]

export default function Register(){
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("enthusiast")
  const [msg, setMsg] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    const res = register({name, email: email.trim(), password, role})
    if(!res.ok){
      setMsg(res.message)
      return
    }
    setMsg(res.message)
    navigate('/dashboard')
  }

  return (
    <div className="grid" style={{gap:16, maxWidth:520}}>
      <div className="card">
        <h2 style={{marginTop:0}}>Register</h2>
        <p className="muted small" style={{marginTop:0}}>
          Mock register (localStorage). Pick your role to see role-based dashboard.
        </p>
        <div className="sep" />
        <form onSubmit={onSubmit} className="grid" style={{gap:12}}>
          <div>
            <label className="small muted">Name</label>
            <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label className="small muted">Email</label>
            <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label className="small muted">Password</label>
            <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Create password" />
          </div>
          <div>
            <label className="small muted">Role</label>
            <select value={role} onChange={(e)=>setRole(e.target.value)}>
              {roles.map(r => <option key={r} value={r}>{roleLabel(r)}</option>)}
            </select>
          </div>
          {msg && <div className="card" style={{background:'rgba(110,231,255,0.08)'}}>{msg}</div>}
          <button className="btn" type="submit">Create account</button>
          <p className="muted small" style={{margin:0}}>
            Already have an account? <Link to="/login" className="pill">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
