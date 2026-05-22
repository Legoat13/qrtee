'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Order() {
  const router = useRouter()
  const [size, setSize] = useState('M')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('France')
  const [loading, setLoading] = useState(false)

  const sizes = ['S', 'M', 'L', 'XL']

  const handleOrder = async () => {
    if (!name || !address || !city || !zip) { alert('Remplis tous les champs !'); return }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/signup'); return }
    const fullAddress = `${address}, ${zip} ${city}, ${country}`
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, size, name, address: fullAddress })
    })
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', flexDirection:'column'}}>

      <nav style={{background:'#FFFAF6', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #FFE8D6'}}>
        <div style={{fontSize:'16px', fontWeight:800, color:'#0ABFBC'}}>👕 QRTEE</div>
      </nav>

      <div style={{padding:'20px', maxWidth:'500px', margin:'0 auto', width:'100%'}}>

        <h1 style={{fontSize:'22px', fontWeight:800, color:'#1A1A1A', marginBottom:'4px'}}>
          Commander mon tee-shirt 👕
        </h1>
        <p style={{fontSize:'13px', color:'#888', marginBottom:'24px'}}>
          Livraison 5-7 jours · QR code permanent · Modifiable à vie
        </p>

        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:'14px', fontWeight:800, color:'#1A1A1A'}}>👕 Tee-shirt QRTEE</div>
            <div style={{fontSize:'12px', color:'#888', marginTop:'4px'}}>QR code unique imprimé au dos</div>
          </div>
          <div style={{fontSize:'20px', fontWeight:800, color:'#FF6B6B'}}>24,99€</div>
        </div>

        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'16px'}}>
          <div style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>📏 Choisis ta taille</div>
          <div style={{display:'flex', gap:'10px'}}>
            {sizes.map(s => (
              <button key={s} onClick={() => setSize(s)} style={{flex:1, padding:'12px', borderRadius:'10px', border: size === s ? '2px solid #FF6B6B' : '1.5px solid #FFE8D6', background: size === s ? '#FFF0F0' : 'white', color: size === s ? '#FF6B6B' : '#888', fontWeight:800, fontSize:'14px', cursor:'pointer'}}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'24px'}}>
          <div style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>📦 Infos de livraison</div>
          
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nom complet" style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box', marginBottom:'10px', color:'#1A1A1A'}} />
          
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Adresse (numéro et rue)" style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box', marginBottom:'10px', color:'#1A1A1A'}} />
          
          <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
            <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Code postal" style={{width:'35%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box', color:'#1A1A1A'}} />
            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Ville" style={{width:'65%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box', color:'#1A1A1A'}} />
          </div>

          <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="Pays" style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box', color:'#1A1A1A'}} />
        </div>

        <button onClick={handleOrder} disabled={loading} style={{width:'100%', background: loading ? '#ccc' : '#FF6B6B', color:'white', border:'none', padding:'15px', borderRadius:'14px', fontSize:'15px', fontWeight:800, cursor: loading ? 'not-allowed' : 'pointer'}}>
          {loading ? 'Redirection...' : 'Payer 24,99€ →'}
        </button>

        <p style={{fontSize:'11px', color:'#888', textAlign:'center', marginTop:'12px'}}>
          🔒 Paiement sécurisé par Stripe · Apple Pay accepté
        </p>

      </div>
    </main>
  )
}