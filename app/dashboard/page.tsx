'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [message, setMessage] = useState('')
  const [link, setLink] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/signup'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) { setProfile(data); setMessage(data.message || ''); setLink(data.link || '') }
    }
    getProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await supabase.from('profiles').update({ message, link }).eq('id', profile.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!profile) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#FFFAF6', fontFamily:'sans-serif', fontSize:'16px', color:'#0ABFBC', fontWeight:700}}>
      Chargement... 🌀
    </div>
  )

  const qrUrl = `${window.location.origin}/u/${profile.id}`

  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', flexDirection:'column'}}>

      <nav style={{background:'#FFFAF6', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #FFE8D6'}}>
        <div style={{fontSize:'16px', fontWeight:800, color:'#0ABFBC'}}>👕 FunShirt</div>
        <button onClick={handleLogout} style={{background:'transparent', border:'1px solid #ccc', padding:'6px 12px', borderRadius:'20px', fontSize:'11px', cursor:'pointer', color:'#1A1A1A'}}>
          Déconnexion
        </button>
      </nav>

      <div style={{padding:'20px', maxWidth:'500px', margin:'0 auto', width:'100%'}}>
        
        <h1 style={{fontSize:'22px', fontWeight:800, color:'#1A1A1A', marginBottom:'4px'}}>
          Ton dashboard 🎛️
        </h1>
        <p style={{fontSize:'13px', color:'#1A1A1A', marginBottom:'24px'}}>
          Modifie ton contenu, il change instantanément sur ton QR code.
        </p>

        {/* QR CODE */}
        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'20px', textAlign:'center'}}>
          <div style={{fontSize:'12px', fontWeight:700, color:'#0ABFBC', marginBottom:'12px', textTransform:'uppercase', letterSpacing:'0.08em'}}>
            Ton QR Code
          </div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl)}`}
            alt="QR Code"
            style={{borderRadius:'8px'}}
          />
          <div style={{fontSize:'11px', color:'#1A1A1A', marginTop:'8px', wordBreak:'break-all'}}>
            {qrUrl}
          </div>
        </div>

        {/* MESSAGE */}
        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'16px'}}>
          <label style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', display:'block', marginBottom:'8px'}}>
            😂 Ton message
          </label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Écris ce que tu veux... un truc drôle, un secret, une déclaration 😜"
            rows={4}
            style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', resize:'none', boxSizing:'border-box', fontFamily:'sans-serif', color:'#1A1A1A'}}
          />
        </div>

        {/* LIEN */}
        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'24px'}}>
          <label style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', display:'block', marginBottom:'8px'}}>
            🔗 Ton lien (Spotify, Instagram, YouTube...)
          </label>
          <input
            type="url"
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder="https://..."
            style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box', color:'#1A1A1A'}}
          />
        </div>

        {/* BOUTON SAVE */}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{width:'100%', background: saved ? '#0ABFBC' : '#FF6B6B', color:'white', border:'none', padding:'15px', borderRadius:'14px', fontSize:'15px', fontWeight:800, cursor:'pointer'}}
        >
          {saved ? '✅ Sauvegardé !' : saving ? 'Sauvegarde...' : 'Publier mes modifications →'}
        </button>

        {/* COMMANDER UN NOUVEAU */}
        <a href="/order" style={{display:'block', textAlign:'center', marginTop:'12px', background:'#0ABFBC', color:'white', padding:'14px', borderRadius:'14px', fontSize:'14px', fontWeight:700, textDecoration:'none'}}>
          👕 Commander un nouveau FunShirt →
        </a>

        <p style={{fontSize:'11px', color:'#1A1A1A', textAlign:'center', marginTop:'16px'}}>
          Ton QR code est unique et permanent. Tu peux modifier ta page à vie.
        </p>

      </div>
    </main>
  )
}