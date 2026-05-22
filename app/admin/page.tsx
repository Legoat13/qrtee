'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ADMIN_PASSWORD = 'qrtee-admin-2024'

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuth(true)
    } else {
      setError('Mot de passe incorrect')
    }
  }

  useEffect(() => {
    if (!auth) return
    const getOrders = async () => {
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
      setOrders(data || [])
      setLoading(false)
    }
    getOrders()
  }, [auth])

  if (!auth) return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
      <div style={{background:'white', borderRadius:'20px', padding:'32px', width:'100%', maxWidth:'360px', border:'1px solid #FFE8D6', textAlign:'center'}}>
        <div style={{fontSize:'32px', marginBottom:'12px'}}>🔐</div>
        <h1 style={{fontSize:'20px', fontWeight:800, color:'#1A1A1A', marginBottom:'20px'}}>Espace Admin</h1>
        {error && <div style={{background:'#FFEAEA', color:'#FF4444', padding:'8px', borderRadius:'8px', fontSize:'12px', marginBottom:'12px'}}>{error}</div>}
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="Mot de passe admin"
          style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box', marginBottom:'12px', color:'#1A1A1A'}}
        />
        <button onClick={handleLogin} style={{width:'100%', background:'#1A1A1A', color:'white', border:'none', padding:'13px', borderRadius:'12px', fontSize:'14px', fontWeight:800, cursor:'pointer'}}>
          Connexion →
        </button>
      </div>
    </main>
  )

  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', padding:'20px'}}>

      <div style={{maxWidth:'800px', margin:'0 auto'}}>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px'}}>
          <div>
            <h1 style={{fontSize:'22px', fontWeight:800, color:'#1A1A1A', marginBottom:'4px'}}>Dashboard Admin 📦</h1>
            <p style={{fontSize:'13px', color:'#888'}}>{orders.length} commande{orders.length > 1 ? 's' : ''} au total</p>
          </div>
          <div style={{background:'#E6FAFA', padding:'8px 16px', borderRadius:'20px', fontSize:'12px', color:'#0ABFBC', fontWeight:700}}>
            🟢 Connecté
          </div>
        </div>

        {loading ? (
          <div style={{textAlign:'center', color:'#0ABFBC', fontWeight:700, padding:'40px'}}>Chargement... 🌀</div>
        ) : orders.length === 0 ? (
          <div style={{textAlign:'center', padding:'60px', color:'#888'}}>
            <div style={{fontSize:'48px', marginBottom:'12px'}}>📭</div>
            <div style={{fontSize:'16px', fontWeight:600}}>Aucune commande pour l'instant</div>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {orders.map((order, i) => (
              <div key={order.id} style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'#FFD93D', color:'#854F0B', fontSize:'14px', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center'}}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{fontSize:'15px', fontWeight:800, color:'#1A1A1A'}}>{order.name}</div>
                      <div style={{fontSize:'11px', color:'#888'}}>{new Date(order.created_at).toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'})}</div>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                    <div style={{background:'#E6FAFA', color:'#0ABFBC', padding:'4px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:700}}>
                      Taille {order.size}
                    </div>
                    <div style={{background: order.status === 'pending' ? '#FFF3E0' : '#E6FAFA', color: order.status === 'pending' ? '#FF6B00' : '#0ABFBC', padding:'4px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:700}}>
                      {order.status === 'pending' ? '⏳ En attente' : '✅ Traité'}
                    </div>
                  </div>
                </div>
                <div style={{background:'#F7F7F7', borderRadius:'10px', padding:'12px', fontSize:'13px', color:'#555', lineHeight:1.6}}>
                  📦 {order.address}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}