'use client'
import { useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Order() {
  const router = useRouter()
  const dragRef = useRef<HTMLDivElement>(null)
  const areaRef = useRef<HTMLDivElement>(null)

  const [size, setSize] = useState('M')
  const [firstname, setFirstname] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('France')
  const [loading, setLoading] = useState(false)
  const [customText, setCustomText] = useState('')
  const [textPosition, setTextPosition] = useState('devant-haut')
  const [isPremium, setIsPremium] = useState(false)
  const [premSize, setPremSize] = useState(14)
  const [dragging, setDragging] = useState(false)
  const [dragPos, setDragPos] = useState({x: 50, y: 50})
  const dragOffset = useRef({ox:0, oy:0})

  const totalPrice = isPremium ? '27,98€' : '24,99€'

  const posBtnStyle = (p: string) => ({
    background: textPosition === p ? 'rgba(10,191,188,.12)' : 'rgba(255,255,255,.05)',
    border: textPosition === p ? '1px solid rgba(10,191,188,.35)' : '1px solid rgba(255,255,255,.08)',
    color: textPosition === p ? '#0ABFBC' : 'rgba(255,255,255,.35)',
    padding: '6px 4px', borderRadius: '7px', fontSize: '11px', cursor: 'pointer', fontFamily: 'sans-serif'
  })

  const sizeBtnStyle = (s: string) => ({
    flex: 1, padding: '12px', borderRadius: '10px',
    border: size === s ? '2px solid #FF6B6B' : '1.5px solid #FFE8D6',
    background: size === s ? '#FFF0F0' : 'white',
    color: size === s ? '#FF6B6B' : '#1A1A1A',
    fontWeight: 800, fontSize: '14px', cursor: 'pointer'
  })

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true)
    const el = dragRef.current
    const area = areaRef.current
    if (!el || !area) return
    const r = el.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    dragOffset.current = { ox: clientX - r.left, oy: clientY - r.top }
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return
    const area = areaRef.current
    const el = dragRef.current
    if (!area || !el) return
    const ar = area.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    let x = clientX - ar.left - dragOffset.current.ox
    let y = clientY - ar.top - dragOffset.current.oy
    x = Math.max(0, Math.min(x, ar.width - el.offsetWidth))
    y = Math.max(0, Math.min(y, ar.height - el.offsetHeight))
    setDragPos({ x, y })
    e.preventDefault()
  }

  const handleOrder = async () => {
    if (!firstname || !name || !email || !address || !city || !zip) {
      alert('Remplis tous les champs !'); return
    }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/signup'); return }
    const fullAddress = `${address}, ${zip} ${city}, ${country}`
    const orderNumber = 'CMD-' + Date.now()
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id, size,
        name: `${firstname} ${name}`,
        email, address: fullAddress, orderNumber,
        customText, textPosition,
        isPremium,
        premiumX: dragPos.x,
        premiumY: dragPos.y,
        premiumTextSize: premSize
      })
    })
    const { url } = await res.json()
    window.location.href = url
  }

  const inputStyle = {
    width: '100%', padding: '12px', borderRadius: '10px',
    border: '1.5px solid #FFE8D6', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box' as const, color: '#1A1A1A'
  }

  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <nav style={{background:'#FFFAF6', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #FFE8D6'}}>
        <div style={{fontSize:'16px', fontWeight:800, color:'#0ABFBC'}}>👕 FunShirt</div>
      </nav>

      <div style={{padding:'20px', maxWidth:'500px', margin:'0 auto', width:'100%'}}>
        <h1 style={{fontSize:'22px', fontWeight:800, color:'#1A1A1A', marginBottom:'4px'}}>Commander mon FunShirt 👕</h1>
        <p style={{fontSize:'13px', color:'#1A1A1A', marginBottom:'24px'}}>Livraison 5-7 jours · QR code permanent · Modifiable à vie</p>

        {/* RECAP PRIX */}
        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontSize:'14px', fontWeight:800, color:'#1A1A1A'}}>👕 Tee-shirt FunShirt</div>
            <div style={{fontSize:'12px', color:'#1A1A1A', marginTop:'4px'}}>QR code unique imprimé au dos</div>
          </div>
          <div style={{fontSize:'20px', fontWeight:800, color:'#FF6B6B'}}>{totalPrice}</div>
        </div>

        {/* TAILLE */}
        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'16px'}}>
          <div style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>📏 Choisis ta taille</div>
          <div style={{display:'flex', gap:'10px'}}>
            {['S','M','L','XL'].map(s => (
              <button key={s} onClick={() => setSize(s)} style={sizeBtnStyle(s)}>{s}</button>
            ))}
          </div>
        </div>

        {/* TEXTE PERSO */}
        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'16px'}}>
          <div style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>✏️ Ton texte perso (optionnel)</div>
          <input
            type="text"
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            placeholder="ex: Scanne si t'es courageux 😏"
            maxLength={28}
            style={inputStyle}
          />
          <div style={{fontSize:'11px', color:'#aaa', textAlign:'right', marginTop:'4px'}}>{customText.length}/28</div>

          {customText && (
            <>
              <div style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', marginTop:'16px', marginBottom:'10px'}}>📍 Position du texte</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
                {[
                  {label:'Devant', prefix:'devant'},
                  {label:'Dos', prefix:'dos'}
                ].map(({label, prefix}) => (
                  <div key={prefix} style={{background:'#FFFAF6', border:'1px solid #FFE8D6', borderRadius:'12px', padding:'12px'}}>
                    <div style={{fontSize:'10px', color:'#aaa', textTransform:'uppercase' as const, letterSpacing:'.08em', marginBottom:'8px'}}>{label}</div>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px'}}>
                      {['Haut','Bas','Gauche','Droite'].map(p => (
                        <button key={p} onClick={() => setTextPosition(`${prefix}-${p.toLowerCase()}`)} style={posBtnStyle(`${prefix}-${p.toLowerCase()}`)}>{p}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'8px', fontSize:'11px', color:'#0ABFBC'}}>✓ Position : {textPosition.replace('-', ' — ')}</div>

              {/* PREMIUM */}
              <div
                onClick={() => setIsPremium(!isPremium)}
                style={{
                  marginTop:'14px',
                  background: isPremium ? 'rgba(255,215,0,.08)' : 'rgba(255,215,0,.03)',
                  border: isPremium ? '1.5px solid rgba(255,215,0,.5)' : '1.5px solid rgba(255,215,0,.25)',
                  borderRadius:'12px', padding:'12px 14px', cursor:'pointer',
                  display:'flex', alignItems:'center', gap:'10px'
                }}
              >
                <span style={{fontSize:'20px'}}>✨</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:'13px', fontWeight:700, color:'#B8860B'}}>Placement libre — Premium</div>
                  <div style={{fontSize:'11px', color:'#aaa', marginTop:'2px'}}>Drag & drop + choix de la taille du texte</div>
                </div>
                <div style={{background:'rgba(255,215,0,.15)', color:'#B8860B', fontSize:'12px', fontWeight:700, padding:'4px 10px', borderRadius:'8px'}}>
                  {isPremium ? '✓ Ajouté' : '+2,99€'}
                </div>
              </div>

              {/* DRAG & DROP ZONE */}
              {isPremium && (
                <div style={{marginTop:'14px', background:'#FFFAF6', border:'1px solid #FFE8D6', borderRadius:'12px', padding:'14px'}}>
                  <div style={{fontSize:'11px', color:'#aaa', marginBottom:'8px'}}>✋ Glisse ton texte sur le tee-shirt</div>
                  <div
                    ref={areaRef}
                    onMouseMove={handleDragMove}
                    onMouseUp={() => setDragging(false)}
                    onTouchMove={handleDragMove}
                    onTouchEnd={() => setDragging(false)}
                    style={{background:'#F0F0F0', border:'1.5px dashed #ddd', borderRadius:'10px', height:'150px', position:'relative', overflow:'hidden', cursor:'crosshair'}}
                  >
                    <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:.08, fontSize:'80px'}}>👕</div>
                    <div
                      ref={dragRef}
                      onMouseDown={handleDragStart}
                      onTouchStart={handleDragStart}
                      style={{
                        position:'absolute', left: dragPos.x, top: dragPos.y,
                        fontSize: premSize+'px', fontWeight:600, color:'#1A1A1A',
                        border:'1px dashed #0ABFBC', padding:'3px 6px', borderRadius:'4px',
                        background:'rgba(10,191,188,.08)', cursor:'grab', whiteSpace:'nowrap' as const,
                        userSelect:'none' as const
                      }}
                    >
                      {customText || 'Mon texte'}
                    </div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:'10px', marginTop:'10px'}}>
                    <span style={{fontSize:'11px', color:'#aaa', whiteSpace:'nowrap' as const}}>Taille du texte</span>
                    <input type="range" min={10} max={24} value={premSize} onChange={e => setPremSize(Number(e.target.value))} style={{flex:1}}/>
                    <span style={{fontSize:'11px', color:'#0ABFBC', minWidth:'28px'}}>{premSize}px</span>
                  </div>
                  <div style={{fontSize:'10px', color:'#bbb', textAlign:'center', marginTop:'6px'}}>Clique et glisse pour repositionner</div>
                </div>
              )}
            </>
          )}
        </div>

        {/* INFOS LIVRAISON */}
        <div style={{background:'white', borderRadius:'16px', padding:'20px', border:'1px solid #FFE8D6', marginBottom:'24px'}}>
          <div style={{fontSize:'12px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>📦 Infos de livraison</div>
          <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
            <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="Prénom" style={{...inputStyle, width:'50%'}}/>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nom" style={{...inputStyle, width:'50%'}}/>
          </div>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{...inputStyle, marginBottom:'10px'}}/>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Adresse (numéro et rue)" style={{...inputStyle, marginBottom:'10px'}}/>
          <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
            <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Code postal" style={{...inputStyle, width:'35%'}}/>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Ville" style={{...inputStyle, width:'65%'}}/>
          </div>
          <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="Pays" style={inputStyle}/>
        </div>

        <button onClick={handleOrder} disabled={loading} style={{width:'100%', background: loading ? '#ccc' : '#FF6B6B', color:'white', border:'none', padding:'15px', borderRadius:'14px', fontSize:'15px', fontWeight:800, cursor: loading ? 'not-allowed' : 'pointer'}}>
          {loading ? 'Redirection...' : `Payer ${totalPrice} →`}
        </button>
        <p style={{fontSize:'11px', color:'#1A1A1A', textAlign:'center', marginTop:'12px'}}>
          🔒 Paiement sécurisé par Stripe · Apple Pay accepté
        </p>
      </div>
    </main>
  )
}