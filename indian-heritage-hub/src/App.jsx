import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import MonumentDetail from './pages/MonumentDetail.jsx'
import VirtualTours from './pages/VirtualTours.jsx'
import Culture from './pages/Culture.jsx'
import Discussions from './pages/Discussions.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/monument/:id" element={<MonumentDetail />} />
        <Route path="/tours" element={<VirtualTours />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
