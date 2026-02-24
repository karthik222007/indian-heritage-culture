const LS_USER = "ihh_user"

const demoUsers = [
  { email: "admin@demo.com", password: "admin123", role: "admin", name: "Admin" },
  { email: "user@demo.com", password: "user123", role: "enthusiast", name: "Cultural Enthusiast" },
  { email: "creator@demo.com", password: "creator123", role: "creator", name: "Content Creator" },
  { email: "guide@demo.com", password: "guide123", role: "guide", name: "Tour Guide" }
]

export function getCurrentUser(){
  try{
    return JSON.parse(localStorage.getItem(LS_USER))
  }catch{
    return null
  }
}

export function logout(){
  localStorage.removeItem(LS_USER)
}

export function login(email, password){
  const found = demoUsers.find(u => u.email === email && u.password === password)
  if(!found) return { ok:false, message:"Invalid email or password (use demo credentials in README)." }
  const user = { email: found.email, role: found.role, name: found.name }
  localStorage.setItem(LS_USER, JSON.stringify(user))
  return { ok:true, user }
}

export function register({name, email, password, role}){
  // Mock register: store single registered user (overwrites). For real project, connect backend.
  if(!email || !password || !role) return { ok:false, message:"Please fill all fields." }
  const user = { name: name || "User", email, role }
  localStorage.setItem(LS_USER, JSON.stringify(user))
  return { ok:true, user, message:"Registered (mock). You are now logged in." }
}

export function roleLabel(role){
  switch(role){
    case "admin": return "Admin"
    case "creator": return "Content Creator"
    case "guide": return "Tour Guide"
    case "enthusiast": return "Cultural Enthusiast"
    default: return role || "User"
  }
}
