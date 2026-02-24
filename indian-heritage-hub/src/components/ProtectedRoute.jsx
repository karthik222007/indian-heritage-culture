import React from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../lib/auth.js'

export default function ProtectedRoute({ children, roles }){
  const user = getCurrentUser()
  if(!user) return <Navigate to="/login" replace />
  if(Array.isArray(roles) && roles.length > 0 && !roles.includes(user.role)){
    return <Navigate to="/dashboard" replace />
  }
  return children
}
