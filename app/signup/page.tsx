'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    const id = data.user?.id
    if (id) {
      await supabase.from('profiles').insert({ id, username: email.split('@')[0] })
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      
      <nav style={{background:'#FFFAF6', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #FFE8D6'}}>
        <div style={{fontSize:'16px', fontWeight:800, color:'#0ABFBC'}}>👕 FunShirt</div>
      </nav>

      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px'}}>
        <div style={{background:'white', borderRadius:'20px', padding:'32px 24px', width:'100%', maxWidth:'400px', border:'1px solid #FFE8D6'}}>
          
          <h1 style={{fontSize:'24px', fontWeight:800, color:'#1A1A1A', marginBottom:'8px', textAlign:'center'}}>
            Crée ton tee-shirt 👕
          </h1>
          <p style={{fontSize:'13px', color:'#1A1A1A', textAlign:'center', marginBottom:'24px'}}>
            30 secondes et c'est parti 🚀
          </p>

          {error && (
            <div style={{background:'#FFEAEA', color:'#FF4444', padding:'10px', borderRadius:'10px', fontSize:'12px', marginBottom:'16px', textAlign:'center'}}>
              {error}
            </div>
          )}

          <div style={{marginBottom:'16px'}}>
            <label style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', display:'block', marginBottom:'6px'}}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ton@email.com"
              style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box'}}
            />
          </div>

          <div style={{marginBottom:'24px'}}>
            <label style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', display:'block', marginBottom:'6px'}}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="minimum 6 caractères"
              style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box'}}
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            style={{width:'100%', background: loading ? '#ccc' : '#FF6B6B', color:'white', border:'none', padding:'15px', borderRadius:'14px', fontSize:'15px', fontWeight:800, cursor: loading ? 'not-allowed' : 'pointer'}}
          >
            {loading ? 'Création...' : 'Créer mon compte →'}
          </button>

          <p style={{fontSize:'11px', color:'#1A1A1A', textAlign:'center', marginTop:'16px'}}>
            En créant un compte tu acceptes nos conditions d'utilisation
          </p>
        </div>
      </div>

    </main>
  )
}