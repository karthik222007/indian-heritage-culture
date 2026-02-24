import React, { useEffect, useMemo, useState } from 'react'
import { getCurrentUser, roleLabel } from '../lib/auth.js'
import { monuments } from '../data/monuments.js'

const LS_DISCUSS = "ihh_discussions"

function loadThreads(){
  try{
    const data = JSON.parse(localStorage.getItem(LS_DISCUSS))
    return Array.isArray(data) ? data : []
  }catch{
    return []
  }
}
function saveThreads(threads){
  localStorage.setItem(LS_DISCUSS, JSON.stringify(threads))
}

export default function Discussions(){
  const user = getCurrentUser()
  const [threads, setThreads] = useState(() => loadThreads())
  const [siteId, setSiteId] = useState(monuments[0].id)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => { saveThreads(threads) }, [threads])

  const siteName = useMemo(() => monuments.find(m => m.id === siteId)?.name || "Site", [siteId])

  const canReplyAsGuide = user && (user.role === "guide" || user.role === "admin")

  const createThread = () => {
    if(!user) return alert("Please login to post.")
    if(!title.trim() || !body.trim()) return alert("Please enter title and message.")
    const t = {
      id: String(Date.now()),
      siteId,
      siteName,
      title: title.trim(),
      body: body.trim(),
      author: user.name || user.email,
      role: roleLabel(user.role),
      createdAt: new Date().toISOString(),
      replies: []
    }
    setThreads(prev => [t, ...prev])
    setTitle(""); setBody("")
  }

  const reply = (threadId) => {
    if(!user) return alert("Please login to reply.")
    const text = prompt("Enter your reply:")
    if(!text || !text.trim()) return
    setThreads(prev => prev.map(t => {
      if(t.id !== threadId) return t
      return {
        ...t,
        replies: [
          ...t.replies,
          {
            id: String(Date.now()),
            text: text.trim(),
            author: user.name || user.email,
            role: roleLabel(user.role),
            isGuide: canReplyAsGuide,
            createdAt: new Date().toISOString()
          }
        ]
      }
    }))
  }

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <h2 style={{margin:'0 0 6px 0'}}>Cultural Discussions</h2>
        <p className="muted small" style={{margin:0}}>
          Ask questions about monuments & culture. Tour Guides/Admin can answer with insights.
        </p>
        <div className="sep" />
        <div className="grid grid2">
          <div>
            <label className="small muted">Related site</label>
            <select value={siteId} onChange={(e)=>setSiteId(e.target.value)}>
              {monuments.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label className="small muted">Title</label>
            <input className="input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder={`Question about ${siteName}...`} />
          </div>
        </div>
        <div style={{marginTop:12}}>
          <label className="small muted">Message</label>
          <textarea value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Write your question or discussion topic..." />
        </div>
        <div className="row" style={{justifyContent:'flex-end', marginTop:12}}>
          <button className="btn" onClick={createThread}>Post</button>
        </div>
      </div>

      <div className="grid" style={{gap:14}}>
        {threads.length === 0 ? (
          <div className="card">
            <p className="muted" style={{margin:0}}>No discussions yet. Create the first post!</p>
          </div>
        ) : threads.map(t => (
          <div className="card" key={t.id}>
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>
                <h3 style={{margin:'0 0 4px 0'}}>{t.title}</h3>
                <p className="muted small" style={{margin:0}}>
                  {t.siteName} • Posted by {t.author} ({t.role})
                </p>
              </div>
              <span className="tag">{new Date(t.createdAt).toLocaleString()}</span>
            </div>
            <div className="sep" />
            <p className="small" style={{lineHeight:1.6}}>{t.body}</p>
            <div className="row" style={{justifyContent:'space-between'}}>
              <span className="muted small">{t.replies.length} replies</span>
              <button className="btnGhost" onClick={()=>reply(t.id)}>Reply</button>
            </div>

            {t.replies.length > 0 && (
              <div style={{marginTop:12}} className="grid" >
                {t.replies.map(r => (
                  <div className="card" key={r.id} style={{background:'rgba(0,0,0,0.18)'}}>
                    <div className="row" style={{justifyContent:'space-between'}}>
                      <div className="row" style={{gap:8}}>
                        <span className="tag">{r.role}{r.isGuide ? " • Verified Guide" : ""}</span>
                        <span className="muted small">{r.author}</span>
                      </div>
                      <span className="muted small">{new Date(r.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="small" style={{marginBottom:0, lineHeight:1.6}}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
