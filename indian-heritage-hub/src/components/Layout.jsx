import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout, roleLabel } from '../lib/auth.js'

export default function Layout({ children }){
  const navigate = useNavigate()
  const user = getCurrentUser()

  const onLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div>
      <div className="nav">
        <div className="navInner container">
          <div className="brand" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
            <span style={{fontSize:20}}>🇮🇳</span>
            <span>Indian Heritage Hub</span>
            <span className="badge">FSAD-PS05</span>
          </div>

          <div className="navLinks">
            <NavLink to="/" className={({isActive}) => "pill " + (isActive ? "pillActive" : "")}>Home</NavLink>
            <NavLink to="/explore" className={({isActive}) => "pill " + (isActive ? "pillActive" : "")}>Explore</NavLink>
            <NavLink to="/tours" className={({isActive}) => "pill " + (isActive ? "pillActive" : "")}>Virtual Tours</NavLink>
            <NavLink to="/culture" className={({isActive}) => "pill " + (isActive ? "pillActive" : "")}>Culture</NavLink>
            <NavLink to="/discussions" className={({isActive}) => "pill " + (isActive ? "pillActive" : "")}>Discussions</NavLink>
          </div>

          <div className="row" style={{marginLeft:'auto'}}>
            {user ? (
              <>
                <span className="tag">{roleLabel(user.role)}</span>
                <button className="btnGhost" onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button className="btn" onClick={onLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="btnGhost" onClick={() => navigate('/login')}>Login</button>
                <button className="btn" onClick={() => navigate('/register')}>Register</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {children}
        <div className="footer">
          Built for FSAD-PS05 • Explore India’s culture, heritage, historical places & monuments
        </div>
      </div>
    </div>
  )
}
