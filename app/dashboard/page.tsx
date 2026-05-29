'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const STATUSES = [
  { key: 'pending', label: '⏳ En attente', color: '#FF6B00', bg: '#FFF3E0' },
  { key: 'production', label: '🏭 En production', color: '#0ABFBC', bg: '#E6FAFA' },
  { key: 'shipping', label: '📦 En livraison', color: '#8B5CF6', bg: '#F3E8FF' },
  { key: 'delivered', label: '✅ Livré', color: '#16A34A', bg: '#DCFCE7' },
]

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [link, setLink] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [sending, setSending] = useState(false)
  const [tab, setTab] = useState<'qr' | 'orders' | 'messages'>('qr')

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/signup'); return }
      
      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (profileData) { setProfile(profileData); setMessage(profileData.message || ''); setLink(profileData.link || '') }
      
      const { data: ordersData } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      setOrders(ordersData || [])

      const { data: messagesData } = await supabase.from('messages').select('*').eq('user_id', user.id).order('created_at', { ascending: true })
      setMessages(messagesData || [])

      if (ordersData && ordersData.length > 0) setSelectedOrder(ordersData[0].id)
    }
    getData()
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

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedOrder) return
    setSending(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('messages').insert({
      order_id: selectedOrder,
      user_id: user.id,
      content: newMessage.trim(),
      sender: 'client'
    }).select().single()
    if (data) setMessages(prev => [...prev, data])
    setNewMessage('')
    setSending(false)
  }

  const getStatusStyle = (status: string) => {
    const s = STATUSES.find(s => s.key === status) || STATUSES[0]
    return { background: s.bg, color: s.color }
  }

  const getStatusLabel = (status: string) => {
    return STATUSES.find(s => s.key === status)?.label || '⏳ En attente'
  }

  const getStatusIndex = (status: string) => {
    return STATUSES.findIndex(s => s.key === status)
  }

  if (!profile) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#FFFAF6', fontFamily:'sans-serif', fontSize:'16px', color:'#0ABFBC', fontWeight:700}}>
      Chargement... 🌀
    </div>
  )

  const qrUrl = `${window.location.origin}/u/${profile.id}`
  const orderMessages = messages.filter(m => m.order_id === selectedOrder)

  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', flexDirection:'column'}}>

      <nav style={{background:'#FFFAF6', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #FFE8D6'}}>
        <div style={{fontSize:'16px', fontWeight:800, color:'#0ABFBC'}}>👕 FunShirt</div>
        <button onClick={handleLogout} style={{background:'transparent', border:'1px solid #ccc', padding:'6px 12px', borderRadius:'20px', fontSize:'11px', cursor:'pointer', color:'#1A1A1A'}}>
          Déconnexion
        </button>
      </nav>

      <div style={{padding:'20px', maxWidth:'600px', margin:'0 auto', width:'100%'}}>

        {/* TABS */}
        <div style={{display:'flex', gap:'8px', marginBottom:'24px', background:'white', padding:'6px', borderRadius:'14px', border:'1px solid #FFE8D6'}}>
          {[
            {key:'qr', label:'🎛️ Mon QR code'},
            {key:'orders', label:'📦 Mes commandes'},
            {key:'messages', label:'💬 Messages'},
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as any)} style={{flex:1, padding:'8px', borderRadius:'10px', border:'none', background: tab === t.key ? '#FF6B6B' : 'transparent', color: tab === t.key ? 'white' : '#1A1A1A', fontSize:'12px', fontWeight: tab === t.key ? 700 : 400, cursor:'pointer', fontFamily:'sans-serif'}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB QR CODE */}
        {tab === 'qr' && (
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', textAlign:'center'}}>
              <div style={{fontSize:'12px', fontWeight:700, color:'#0ABFBC', marginBottom:'12px', textTransform:'uppercase', letterSpacing:'0.08em'}}>Ton QR Code</div>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl)}`} alt="QR Code" style={{borderRadius:'8px'}}/>
              <div style={{fontSize:'11px', color:'#1A1A1A', marginTop:'8px', wordBreak:'break-all'}}>{qrUrl}</div>
            </div>

            <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6'}}>
              <label style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', display:'block', marginBottom:'8px'}}>😂 Ton message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Écris ce que tu veux... un truc drôle, un secret 😜" rows={4}
                style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', resize:'none', boxSizing:'border-box', fontFamily:'sans-serif', color:'#1A1A1A'}}/>
            </div>

            <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6'}}>
              <label style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', display:'block', marginBottom:'8px'}}>🔗 Ton lien (Spotify, Instagram, YouTube...)</label>
              <input type="url" value={link} onChange={e => setLink(e.target.value)} placeholder="https://..."
                style={{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'14px', outline:'none', boxSizing:'border-box', color:'#1A1A1A'}}/>
            </div>

            <button onClick={handleSave} disabled={saving}
              style={{width:'100%', background: saved ? '#0ABFBC' : '#FF6B6B', color:'white', border:'none', padding:'15px', borderRadius:'14px', fontSize:'15px', fontWeight:800, cursor:'pointer'}}>
              {saved ? '✅ Sauvegardé !' : saving ? 'Sauvegarde...' : 'Publier mes modifications →'}
            </button>

            <a href="/order" style={{display:'block', textAlign:'center', background:'#0ABFBC', color:'white', padding:'14px', borderRadius:'14px', fontSize:'14px', fontWeight:700, textDecoration:'none'}}>
              👕 Commander un nouveau FunShirt →
            </a>
          </div>
        )}

        {/* TAB COMMANDES */}
        {tab === 'orders' && (
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            {orders.length === 0 ? (
              <div style={{textAlign:'center', padding:'40px', color:'#1A1A1A'}}>
                <div style={{fontSize:'40px', marginBottom:'12px'}}>📭</div>
                <div style={{fontSize:'15px', fontWeight:600, marginBottom:'8px'}}>Aucune commande pour l'instant</div>
                <a href="/order" style={{display:'inline-block', background:'#FF6B6B', color:'white', padding:'12px 24px', borderRadius:'12px', fontSize:'14px', fontWeight:700, textDecoration:'none', marginTop:'8px'}}>
                  Commander mon FunShirt →
                </a>
              </div>
            ) : orders.map(order => (
              <div key={order.id} style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
                  <div style={{background:'#FFD93D', color:'#854F0B', fontSize:'12px', fontWeight:800, padding:'4px 12px', borderRadius:'20px'}}>
                    {order.order_number || 'CMD'}
                  </div>
                  <div style={{...getStatusStyle(order.status), padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:700}}>
                    {getStatusLabel(order.status)}
                  </div>
                </div>

                {/* BARRE DE PROGRESSION */}
                <div style={{marginBottom:'16px'}}>
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
                    {STATUSES.map((s, i) => (
                      <div key={s.key} style={{display:'flex', flexDirection:'column', alignItems:'center', flex:1}}>
                        <div style={{
                          width:'28px', height:'28px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px',
                          background: i <= getStatusIndex(order.status) ? s.bg : '#F5F5F5',
                          border: i <= getStatusIndex(order.status) ? `2px solid ${s.color}` : '2px solid #ddd',
                          color: i <= getStatusIndex(order.status) ? s.color : '#ccc'
                        }}>
                          {i <= getStatusIndex(order.status) ? '✓' : '·'}
                        </div>
                        <div style={{fontSize:'9px', color: i <= getStatusIndex(order.status) ? '#1A1A1A' : '#ccc', marginTop:'4px', textAlign:'center'}}>{s.label.split(' ')[1]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{fontSize:'13px', color:'#1A1A1A', display:'flex', flexDirection:'column', gap:'4px'}}>
                  <div><span style={{color:'#888'}}>Taille : </span><strong>{order.size}</strong></div>
                  {order.custom_text && <div><span style={{color:'#888'}}>Texte : </span><strong>"{order.custom_text}"</strong></div>}
                  <div><span style={{color:'#888'}}>Commandé le : </span>{new Date(order.created_at).toLocaleDateString('fr-FR')}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB MESSAGES */}
        {tab === 'messages' && (
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>

            {orders.length === 0 ? (
              <div style={{textAlign:'center', padding:'40px', color:'#1A1A1A'}}>
                <div style={{fontSize:'40px', marginBottom:'12px'}}>💬</div>
                <div style={{fontSize:'15px', fontWeight:600}}>Tu n'as pas encore de commande</div>
              </div>
            ) : (
              <>
                {orders.length > 1 && (
                  <div>
                    <div style={{fontSize:'12px', color:'#888', marginBottom:'8px'}}>Commande concernée</div>
                    <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                      {orders.map(o => (
                        <button key={o.id} onClick={() => setSelectedOrder(o.id)} style={{
                          padding:'6px 14px', borderRadius:'20px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'2px solid',
                          background: selectedOrder === o.id ? '#FFD93D' : 'white',
                          borderColor: selectedOrder === o.id ? '#FFD93D' : '#FFE8D6',
                          color: selectedOrder === o.id ? '#854F0B' : '#1A1A1A'
                        }}>
                          {o.order_number || 'CMD'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{background:'white', borderRadius:'16px', border:'1px solid #FFE8D6', overflow:'hidden'}}>
                  <div style={{padding:'14px 16px', borderBottom:'1px solid #FFE8D6', background:'#FFFAF6', fontSize:'12px', fontWeight:700, color:'#1A1A1A'}}>
                    💬 Conversation avec FunShirt
                  </div>

                  <div style={{padding:'16px', minHeight:'200px', maxHeight:'340px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'10px'}}>
                    {orderMessages.length === 0 ? (
                      <div style={{textAlign:'center', color:'#ccc', fontSize:'13px', margin:'auto'}}>
                        Aucun message pour l'instant.<br/>Tu peux nous écrire ci-dessous 👇
                      </div>
                    ) : orderMessages.map(m => (
                      <div key={m.id} style={{display:'flex', justifyContent: m.sender === 'client' ? 'flex-end' : 'flex-start'}}>
                        <div style={{
                          maxWidth:'75%', padding:'10px 14px', borderRadius: m.sender === 'client' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                          background: m.sender === 'client' ? '#FF6B6B' : '#0ABFBC',
                          color:'white', fontSize:'13px', lineHeight:1.5
                        }}>
                          {m.content}
                          <div style={{fontSize:'10px', opacity:0.7, marginTop:'4px', textAlign:'right'}}>
                            {new Date(m.created_at).toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{padding:'12px 16px', borderTop:'1px solid #FFE8D6', display:'flex', gap:'8px'}}>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Écris ton message..."
                      style={{flex:1, padding:'10px 14px', borderRadius:'10px', border:'1.5px solid #FFE8D6', fontSize:'13px', outline:'none', color:'#1A1A1A', fontFamily:'sans-serif'}}
                    />
                    <button onClick={handleSendMessage} disabled={sending || !newMessage.trim()} style={{background:'#FF6B6B', color:'white', border:'none', padding:'10px 16px', borderRadius:'10px', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'sans-serif'}}>
                      {sending ? '...' : '→'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </main>
  )
}