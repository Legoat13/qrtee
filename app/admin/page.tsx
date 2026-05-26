'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ADMIN_PASSWORD = 'qrtee-admin-2024'
const SITE_URL = 'https://qrtee-five.vercel.app'

const STATUSES = [
  { key: 'pending', label: '⏳ En attente', color: '#FF6B00', bg: '#FFF3E0' },
  { key: 'production', label: '🏭 Production', color: '#0ABFBC', bg: '#E6FAFA' },
  { key: 'shipping', label: '📦 Livraison', color: '#8B5CF6', bg: '#F3E8FF' },
  { key: 'delivered', label: '✅ Livré', color: '#16A34A', bg: '#DCFCE7' },
]

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [view, setView] = useState<'client' | 'fournisseur'>('client')
  const [updating, setUpdating] = useState<string | null>(null)

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) setAuth(true)
    else setError('Mot de passe incorrect')
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

  const updateStatus = async (orderId: string, status: string) => {
    setUpdating(orderId + status)
    const res = await fetch('/api/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status })
    })
    if (res.ok) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    }
    setUpdating(null)
  }

  const getStatusStyle = (status: string) => {
    const s = STATUSES.find(s => s.key === status) || STATUSES[0]
    return { background: s.bg, color: s.color }
  }

  const getStatusLabel = (status: string) => {
    return STATUSES.find(s => s.key === status)?.label || '⏳ En attente'
  }

  const printAll = () => {
    const html = `
      <html>
      <head>
        <title>QRTEE — ${view === 'client' ? 'Fiches Clients' : 'Bon Fournisseur'}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; color: #1A1A1A; padding: 30px; }
          h1 { font-size: 20px; margin-bottom: 4px; }
          .subtitle { font-size: 12px; color: #555; margin-bottom: 30px; }
          .fiche { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 24px; page-break-inside: avoid; }
          .fiche-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #eee; }
          .order-num { background: #FFD93D; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 800; }
          .date { font-size: 12px; color: #555; }
          .content { display: flex; gap: 20px; align-items: flex-start; }
          .product-box { width: 160px; min-width: 160px; border: 2px dashed #ddd; border-radius: 8px; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9f9f9; }
          .qr-img { width: 80px; height: 80px; }
          .photo-placeholder { font-size: 11px; color: #999; margin-bottom: 12px; text-align: center; }
          .qr-label { font-size: 9px; color: #999; margin-top: 6px; }
          .details { flex: 1; }
          .detail-row { display: flex; margin-bottom: 10px; font-size: 13px; }
          .detail-label { width: 120px; color: #555; font-weight: 600; }
          .detail-value { font-weight: 700; }
          .taille { font-size: 24px; font-weight: 800; color: #FF6B6B; }
          @media print { body { padding: 15px; } }
        </style>
      </head>
      <body>
        <h1>👕 QRTEE — ${view === 'client' ? 'Fiches Clients' : 'Bon de Commande Fournisseur'}</h1>
        <p class="subtitle">Généré le ${new Date().toLocaleDateString('fr-FR', {day:'2-digit', month:'long', year:'numeric'})} · ${orders.length} commande${orders.length > 1 ? 's' : ''}</p>
        ${orders.map(o => `
          <div class="fiche">
            <div class="fiche-header">
              <span class="order-num">${o.order_number || 'N/A'}</span>
              <span class="date">${new Date(o.created_at).toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric'})}</span>
            </div>
            <div class="content">
              <div class="product-box">
                <p class="photo-placeholder">📷 Photo<br/>à venir</p>
                <img class="qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(`${SITE_URL}/u/${o.user_id}`)}" />
                <p class="qr-label">QR code unique</p>
              </div>
              <div class="details">
                ${view === 'client' ? `
                  <div class="detail-row"><span class="detail-label">Nom complet</span><span class="detail-value">${o.name || '-'}</span></div>
                  <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${o.email || '-'}</span></div>
                  <div class="detail-row"><span class="detail-label">Adresse</span><span class="detail-value">${o.address || '-'}</span></div>
                  <div class="detail-row"><span class="detail-label">Taille</span><span class="detail-value taille">${o.size}</span></div>
                  <div class="detail-row"><span class="detail-label">Statut</span><span class="detail-value">${getStatusLabel(o.status)}</span></div>
                  <div class="detail-row"><span class="detail-label">QR code URL</span><span class="detail-value" style="font-size:11px;">${SITE_URL}/u/${o.user_id}</span></div>
                ` : `
                  <div class="detail-row"><span class="detail-label">N° commande</span><span class="detail-value">${o.order_number || 'N/A'}</span></div>
                  <div class="detail-row"><span class="detail-label">Client</span><span class="detail-value">${o.name || '-'}</span></div>
                  <div class="detail-row"><span class="detail-label">Taille</span><span class="detail-value taille">${o.size}</span></div>
                  <div class="detail-row"><span class="detail-label">Type produit</span><span class="detail-value">Tee-shirt (à définir)</span></div>
                  <div class="detail-row"><span class="detail-label">Couleur</span><span class="detail-value">À définir</span></div>
                  <div class="detail-row"><span class="detail-label">QR code URL</span><span class="detail-value" style="font-size:11px;">${SITE_URL}/u/${o.user_id}</span></div>
                  <div class="detail-row"><span class="detail-label">Instructions</span><span class="detail-value" style="font-size:11px;">Imprimer le QR code au dos du tee-shirt. Chaque QR code est unique.</span></div>
                `}
              </div>
            </div>
          </div>
        `).join('')}
      </body>
      </html>
    `
    const w = window.open('', '_blank')
    w?.document.write(html)
    w?.document.close()
    setTimeout(() => w?.print(), 500)
  }

  if (!auth) return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
      <div style={{background:'white', borderRadius:'20px', padding:'32px', width:'100%', maxWidth:'360px', border:'1px solid #FFE8D6', textAlign:'center'}}>
        <div style={{fontSize:'32px', marginBottom:'12px'}}>🔐</div>
        <h1 style={{fontSize:'20px', fontWeight:800, color:'#1A1A1A', marginBottom:'20px'}}>Espace Admin</h1>
        {error && <div style={{background:'#FFEAEA', color:'#FF4444', padding:'8px', borderRadius:'8px', fontSize:'12px', marginBottom:'12px'}}>{error}</div>}
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="Mot de passe admin" style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box', marginBottom:'12px', color:'#1A1A1A'}} />
        <button onClick={handleLogin} style={{width:'100%', background:'#1A1A1A', color:'white', border:'none', padding:'13px', borderRadius:'12px', fontSize:'14px', fontWeight:800, cursor:'pointer'}}>Connexion →</button>
      </div>
    </main>
  )

  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', padding:'20px'}}>
      <div style={{maxWidth:'860px', margin:'0 auto'}}>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px', flexWrap:'wrap', gap:'12px'}}>
          <div>
            <h1 style={{fontSize:'22px', fontWeight:800, color:'#1A1A1A', marginBottom:'4px'}}>Dashboard Admin 📦</h1>
            <p style={{fontSize:'13px', color:'#1A1A1A'}}>{orders.length} commande{orders.length > 1 ? 's' : ''} au total</p>
          </div>
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
            <button onClick={() => setView('client')} style={{background: view === 'client' ? '#0ABFBC' : 'white', color: view === 'client' ? 'white' : '#0ABFBC', border:'2px solid #0ABFBC', padding:'8px 16px', borderRadius:'20px', fontSize:'12px', fontWeight:700, cursor:'pointer'}}>
              📋 Fiches clients
            </button>
            <button onClick={() => setView('fournisseur')} style={{background: view === 'fournisseur' ? '#FF6B6B' : 'white', color: view === 'fournisseur' ? 'white' : '#FF6B6B', border:'2px solid #FF6B6B', padding:'8px 16px', borderRadius:'20px', fontSize:'12px', fontWeight:700, cursor:'pointer'}}>
              🏭 Bon fournisseur
            </button>
            <button onClick={printAll} style={{background:'#1A1A1A', color:'white', border:'none', padding:'8px 16px', borderRadius:'20px', fontSize:'12px', fontWeight:700, cursor:'pointer'}}>
              📥 Télécharger tout en PDF
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{textAlign:'center', color:'#0ABFBC', fontWeight:700, padding:'40px'}}>Chargement... 🌀</div>
        ) : orders.length === 0 ? (
          <div style={{textAlign:'center', padding:'60px', color:'#1A1A1A'}}>
            <div style={{fontSize:'48px', marginBottom:'12px'}}>📭</div>
            <div style={{fontSize:'16px', fontWeight:600}}>Aucune commande pour l'instant</div>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {orders.map((order, i) => (
              <div key={order.id} style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6'}}>

                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', paddingBottom:'12px', borderBottom:'1px solid #FFE8D6', flexWrap:'wrap', gap:'8px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <div style={{background:'#FFD93D', color:'#854F0B', fontSize:'12px', fontWeight:800, padding:'4px 12px', borderRadius:'20px'}}>
                      {order.order_number || `CMD-${i+1}`}
                    </div>
                    <div style={{fontSize:'11px', color:'#1A1A1A'}}>{new Date(order.created_at).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <div style={{...getStatusStyle(order.status), padding:'4px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:700}}>
                    {getStatusLabel(order.status)}
                  </div>
                </div>

                {/* BOUTONS STATUT */}
                <div style={{display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'16px', paddingBottom:'16px', borderBottom:'1px solid #FFE8D6'}}>
                  {STATUSES.map(s => (
                    <button
                      key={s.key}
                      onClick={() => updateStatus(order.id, s.key)}
                      disabled={order.status === s.key || updating === order.id + s.key}
                      style={{
                        padding:'6px 12px',
                        borderRadius:'20px',
                        fontSize:'11px',
                        fontWeight:700,
                        cursor: order.status === s.key ? 'default' : 'pointer',
                        border: order.status === s.key ? `2px solid ${s.color}` : '1.5px solid #FFE8D6',
                        background: order.status === s.key ? s.bg : 'white',
                        color: order.status === s.key ? s.color : '#1A1A1A',
                        opacity: updating === order.id + s.key ? 0.6 : 1
                      }}
                    >
                      {updating === order.id + s.key ? '...' : s.label}
                    </button>
                  ))}
                </div>

                <div style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
                  <div style={{width:'120px', minWidth:'120px', border:'2px dashed #ddd', borderRadius:'8px', height:'150px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#f9f9f9'}}>
                    <div style={{fontSize:'10px', color:'#ccc', marginBottom:'8px', textAlign:'center'}}>📷 Photo<br/>à venir</div>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent(`${SITE_URL}/u/${order.user_id}`)}`} style={{width:'70px', height:'70px'}} />
                    <div style={{fontSize:'9px', color:'#555', marginTop:'4px'}}>QR unique</div>
                  </div>

                  <div style={{flex:1, display:'flex', flexDirection:'column', gap:'6px', fontSize:'13px', color:'#1A1A1A'}}>
                    {view === 'client' ? (
                      <>
                        <div><span style={{color:'#1A1A1A'}}>👤 Nom : </span><strong>{order.name || '-'}</strong></div>
                        <div><span style={{color:'#1A1A1A'}}>✉️ Email : </span>{order.email || '-'}</div>
                        <div><span style={{color:'#1A1A1A'}}>📦 Adresse : </span>{order.address || '-'}</div>
                        <div><span style={{color:'#1A1A1A'}}>📏 Taille : </span><strong style={{fontSize:'18px', color:'#FF6B6B'}}>{order.size}</strong></div>
                        <div style={{fontSize:'11px', color:'#555'}}>🔗 {SITE_URL}/u/{order.user_id}</div>
                      </>
                    ) : (
                      <>
                        <div><span style={{color:'#1A1A1A'}}>👤 Client : </span><strong>{order.name || '-'}</strong></div>
                        <div><span style={{color:'#1A1A1A'}}>📏 Taille : </span><strong style={{fontSize:'22px', color:'#FF6B6B'}}>{order.size}</strong></div>
                        <div><span style={{color:'#1A1A1A'}}>👕 Produit : </span>Tee-shirt (à définir)</div>
                        <div><span style={{color:'#1A1A1A'}}>🎨 Couleur : </span>À définir</div>
                        <div style={{fontSize:'11px', color:'#555'}}>🔗 QR : {SITE_URL}/u/{order.user_id}</div>
                        <div style={{fontSize:'11px', color:'#FF6B6B', fontWeight:600, marginTop:'4px'}}>⚠️ QR code unique — ne pas dupliquer</div>
                      </>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}