'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useParams } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PublicPage() {
  const { id } = useParams()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', id).single()
      setProfile(data)
      setLoading(false)
    }
    getProfile()
  }, [id])

  if (loading) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#FFFAF6', fontFamily:'sans-serif', fontSize:'16px', color:'#0ABFBC', fontWeight:700}}>
      Chargement... 🌀
    </div>
  )

  if (!profile) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#FFFAF6', fontFamily:'sans-serif', textAlign:'center', padding:'20px'}}>
      <div>
        <div style={{fontSize:'48px', marginBottom:'16px'}}>🤔</div>
        <div style={{fontSize:'18px', fontWeight:800, color:'#1A1A1A'}}>Page introuvable</div>
        <div style={{fontSize:'13px', color:'#888', marginTop:'8px'}}>Ce QR code ne semble pas exister.</div>
      </div>
    </div>
  )

  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px'}}>
      <div style={{background:'white', borderRadius:'24px', padding:'32px 24px', width:'100%', maxWidth:'400px', border:'1px solid #FFE8D6', textAlign:'center'}}>
        <div style={{width:'70px', height:'70px', borderRadius:'50%', background:'#0ABFBC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', margin:'0 auto 16px'}}>
          👕
        </div>
        <div style={{fontSize:'13px', color:'#0ABFBC', fontWeight:700, marginBottom:'16px', textTransform:'uppercase', letterSpacing:'0.08em'}}>
          {profile.username}
        </div>
        {profile.message && (
          <div style={{background:'#F7F7F7', borderRadius:'16px', padding:'20px', marginBottom:'20px', fontSize:'16px', color:'#1A1A1A', lineHeight:1.6, fontWeight:500}}>
            {profile.message}
          </div>
        )}
        {profile.link && (
          <a href={profile.link} target="_blank" rel="noopener noreferrer" style={{display:'block', background:'#FF6B6B', color:'white', padding:'14px', borderRadius:'14px', fontSize:'14px', fontWeight:800, textDecoration:'none', marginBottom:'16px'}}>
            🔗 Voir le lien
          </a>
        )}
        {!profile.message && !profile.link && (
          <div style={{fontSize:'14px', color:'#888', marginBottom:'16px'}}>
            Cette page est vide pour instant... 🤫
          </div>
        )}
        <div style={{fontSize:'11px', color:'#ccc', marginTop:'8px'}}>
          Fait avec 👕 FunShirt
        </div>
      </div>
    </main>
  )
}