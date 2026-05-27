'use client'
import { useRef, useState } from 'react'

export default function Home() {
  const hiwRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState('M')
  const [position, setPosition] = useState('devant-haut')
  const [premium, setPremium] = useState(false)

  const posBtnStyle = (p: string) => ({
    background: position === p ? 'rgba(10,191,188,.12)' : 'rgba(255,255,255,.05)',
    border: position === p ? '1px solid rgba(10,191,188,.35)' : '1px solid rgba(255,255,255,.08)',
    color: position === p ? '#0ABFBC' : 'rgba(255,255,255,.35)',
    padding: '6px 4px', borderRadius: '7px', fontSize: '11px', cursor: 'pointer', fontFamily: 'sans-serif'
  })

  const sizeBtnStyle = (s: string) => ({
    flex: 1,
    background: size === s ? 'rgba(255,107,107,.12)' : 'rgba(255,255,255,.05)',
    border: size === s ? '1px solid #FF6B6B' : '1px solid rgba(255,255,255,.08)',
    color: size === s ? '#FF6B6B' : 'rgba(255,255,255,.4)',
    padding: '8px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: size === s ? 700 : 400
  })

  return (
    <main style={{fontFamily:'sans-serif', background:'#1A1A1A', minHeight:'100vh', color:'white', overflowX:'hidden'}}>

      {/* HERO */}
      <div style={{padding:'56px 24px 48px', textAlign:'center', position:'relative'}}>
        <div style={{position:'absolute', width:'500px', height:'500px', background:'radial-gradient(circle,rgba(10,191,188,.08) 0%,transparent 70%)', top:0, left:'50%', transform:'translateX(-50%)', pointerEvents:'none'}}/>
        <div style={{background:'rgba(10,191,188,.12)', border:'1px solid rgba(10,191,188,.3)', color:'#0ABFBC', fontSize:'11px', letterSpacing:'.1em', textTransform:'uppercase' as const, padding:'5px 16px', borderRadius:'20px', display:'inline-block', marginBottom:'28px'}}>Bientôt disponible</div>
        <h1 style={{fontSize:'clamp(42px,7vw,76px)', fontWeight:800, lineHeight:1.02, letterSpacing:'-2px', marginBottom:'16px'}}>
          On ne vend pas<br/>un tee-shirt.<br/><span style={{color:'#0ABFBC'}}>On vend du fun.</span>
        </h1>
        <p style={{color:'rgba(255,255,255,.4)', fontSize:'16px', maxWidth:'400px', margin:'0 auto 36px', lineHeight:1.65}}>
          Un QR code unique imprimé au dos. Une page perso que tu personnalises à vie.
        </p>
        <div style={{display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', marginBottom:'12px'}}>
          <a href="/order" style={{background:'#FF6B6B', color:'white', padding:'15px 30px', borderRadius:'13px', fontSize:'14px', fontWeight:500, cursor:'pointer', textDecoration:'none', display:'inline-block'}}>Commander — 24,99€ →</a>
<a href="/signup" style={{background:'#0ABFBC', color:'white', padding:'15px 30px', borderRadius:'13px', fontSize:'14px', fontWeight:500, cursor:'pointer', textDecoration:'none', display:'inline-block'}}>Créer mon compte →</a>
          <button onClick={() => hiwRef.current?.scrollIntoView({behavior:'smooth'})} style={{background:'transparent', color:'white', border:'1.5px solid rgba(255,255,255,.18)', padding:'15px 30px', borderRadius:'13px', fontSize:'14px', cursor:'pointer', fontFamily:'sans-serif'}}>Comment ça marche ?</button>
        </div>
        <div style={{color:'rgba(255,255,255,.2)', fontSize:'12px', marginTop:'12px'}}>🔒 Paiement sécurisé · Livraison 5-7 jours · Apple Pay</div>
      </div>

      {/* PRODUCT */}
      <div style={{maxWidth:'980px', margin:'0 auto', padding:'0 24px 70px', display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:'48px', alignItems:'start'}}>

        {/* PHOTO */}
        <div style={{background:'rgba(255,255,255,.03)', border:'1.5px dashed rgba(255,255,255,.12)', borderRadius:'24px', minHeight:'460px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'36px', marginBottom:'10px'}}>📸</div>
            <p style={{color:'rgba(255,255,255,.2)', fontSize:'13px', lineHeight:1.5}}>Photo produit<br/><strong style={{color:'rgba(255,255,255,.35)'}}>Emplacement réservé</strong></p>
            <span style={{display:'block', fontSize:'11px', color:'rgba(255,255,255,.12)', marginTop:'4px'}}>Photos fournisseur à venir</span>
          </div>
        </div>

        {/* CUSTOMIZER */}
        <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
          <div>
            <h2 style={{fontSize:'26px', fontWeight:800, lineHeight:1.15, marginBottom:'6px'}}>Configure<br/>ton FunShirt</h2>
            <p style={{color:'rgba(255,255,255,.35)', fontSize:'13px', lineHeight:1.55}}>Texte perso + QR code unique. Un tee-shirt que personne d'autre ne porte.</p>
          </div>

          {/* TAILLE */}
          <div>
            <div style={{fontSize:'11px', color:'rgba(255,255,255,.3)', textTransform:'uppercase' as const, letterSpacing:'.08em', marginBottom:'7px'}}>Taille</div>
            <div style={{display:'flex', gap:'8px'}}>
              {['S','M','L','XL'].map(s => (
                <button key={s} onClick={() => setSize(s)} style={sizeBtnStyle(s)}>{s}</button>
              ))}
            </div>
          </div>

          {/* TEXTE */}
          <div>
            <div style={{fontSize:'11px', color:'rgba(255,255,255,.3)', textTransform:'uppercase' as const, letterSpacing:'.08em', marginBottom:'7px'}}>Ton texte perso</div>
            <input type="text" placeholder="ex: Scanne si t'es courageux 😏" maxLength={28} style={{width:'100%', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', color:'white', padding:'10px 14px', borderRadius:'10px', fontSize:'13px', outline:'none', boxSizing:'border-box' as const}}/>
          </div>

          {/* POSITION */}
          <div>
            <div style={{fontSize:'11px', color:'rgba(255,255,255,.3)', textTransform:'uppercase' as const, letterSpacing:'.08em', marginBottom:'7px'}}>Position du texte</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
              {[
                {label:'Devant', prefix:'devant'},
                {label:'Dos', prefix:'dos'}
              ].map(({label, prefix}) => (
                <div key={prefix} style={{background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:'12px', padding:'12px'}}>
                  <div style={{fontSize:'10px', color:'rgba(255,255,255,.25)', textTransform:'uppercase' as const, letterSpacing:'.08em', marginBottom:'8px'}}>{label}</div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px'}}>
                    {['Haut','Bas','Gauche','Droite'].map(p => (
                      <button key={p} onClick={() => setPosition(`${prefix}-${p.toLowerCase()}`)} style={posBtnStyle(`${prefix}-${p.toLowerCase()}`)}>{p}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {position && <div style={{marginTop:'8px', fontSize:'11px', color:'rgba(10,191,188,.7)'}}>✓ Position : {position.replace('-', ' — ')}</div>}
          </div>

          {/* PREMIUM */}
          <div onClick={() => setPremium(!premium)} style={{background: premium ? 'rgba(255,215,0,.08)' : 'linear-gradient(135deg,rgba(255,215,0,.06),rgba(255,165,0,.04))', border: premium ? '1px solid rgba(255,215,0,.5)' : '1px solid rgba(255,215,0,.2)', borderRadius:'14px', padding:'14px 16px', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px', transition:'.15s'}}>
            <div style={{fontSize:'22px', flexShrink:0}}>✨</div>
            <div style={{flex:1}}>
              <h4 style={{fontSize:'14px', fontWeight:700, color:'#FFD700', marginBottom:'2px', fontFamily:'sans-serif'}}>Placement libre — Premium</h4>
              <p style={{fontSize:'11px', color:'rgba(255,255,255,.35)', lineHeight:1.4}}>Drag & drop ton texte exactement où tu veux + choix de la taille.</p>
            </div>
            <div style={{background:'rgba(255,215,0,.15)', color:'#FFD700', fontSize:'12px', fontWeight:500, padding:'4px 10px', borderRadius:'8px', whiteSpace:'nowrap' as const}}>
              {premium ? '✓ Ajouté' : '+2,99€'}
            </div>
          </div>

          <a href="/order" style={{width:'100%', background:'#FF6B6B', color:'white', padding:'15px', borderRadius:'13px', fontSize:'15px', fontWeight:700, cursor:'pointer', textAlign:'center', textDecoration:'none', display:'block', boxSizing:'border-box' as const}}>
            Commander — {premium ? '27,98€' : '24,99€'} →
          </a>
          <div style={{textAlign:'center', color:'rgba(255,255,255,.15)', fontSize:'11px'}}>🔒 Paiement sécurisé · Contenu modéré par nos équipes</div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div ref={hiwRef} style={{padding:'70px 24px', maxWidth:'980px', margin:'0 auto'}}>
        <h2 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:800, marginBottom:'8px', textAlign:'center'}}>Comment ça marche ?</h2>
        <p style={{color:'rgba(255,255,255,.3)', fontSize:'14px', textAlign:'center', marginBottom:'44px'}}>Simple, rapide, et unique à vie.</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'16px'}}>
          {[
            {n:'1', i:'👕', t:'Tu commandes', p:'Choisis ta taille, ton texte perso et sa position. Payé en 30 secondes.'},
            {n:'2', i:'✏️', t:'Tu personnalises', p:'Accède à ton dashboard et configure ta page QR : message, lien Spotify, Instagram…'},
            {n:'3', i:'📦', t:'Tu reçois', p:'Ton FunShirt arrive en 5-7 jours. QR code + texte imprimés. 100% unique.'},
            {n:'4', i:'🔥', t:'Tu crées la surprise', p:"Quelqu'un scanne ton QR. Ta page s'affiche. Tu peux la changer à vie."},
          ].map(s => (
            <div key={s.n} style={{background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)', borderRadius:'18px', padding:'24px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:'-8px', right:'12px', fontSize:'60px', fontWeight:800, color:'rgba(10,191,188,.06)'}}>{s.n}</div>
              <div style={{fontSize:'24px', marginBottom:'12px'}}>{s.i}</div>
              <h3 style={{fontSize:'15px', fontWeight:700, marginBottom:'6px'}}>{s.t}</h3>
              <p style={{fontSize:'12px', color:'rgba(255,255,255,.35)', lineHeight:1.55}}>{s.p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:'12px', maxWidth:'980px', margin:'0 auto', padding:'0 24px 70px'}}>
        {[
          {t:'100% unique', p:"Ton QR code n'appartient qu'à toi. Personne ne peut le dupliquer."},
          {t:'Modifiable à vie', p:'Change le contenu de ta page quand tu veux. Rien ne change sur le tee.'},
          {t:'Texte perso', p:"Ta phrase, à l'endroit exact que tu choisis sur le tee-shirt."},
          {t:'Viral', p:'Chaque scan en public = une interaction. Tu es ta propre pub.'},
        ].map(w => (
          <div key={w.t} style={{background:'rgba(10,191,188,.04)', border:'1px solid rgba(10,191,188,.1)', borderRadius:'14px', padding:'18px'}}>
            <h4 style={{color:'#0ABFBC', fontSize:'14px', fontWeight:700, marginBottom:'5px'}}>{w.t}</h4>
            <p style={{fontSize:'12px', color:'rgba(255,255,255,.35)', lineHeight:1.5}}>{w.p}</p>
          </div>
        ))}
      </div>

      {/* CTA FINAL */}
      <div style={{background:'rgba(10,191,188,.06)', border:'1px solid rgba(10,191,188,.12)', borderRadius:'24px', padding:'50px 28px', textAlign:'center', margin:'0 auto 60px', maxWidth:'900px'}}>
        <h2 style={{fontSize:'clamp(24px,4vw,40px)', fontWeight:800, marginBottom:'10px'}}>Prêt à créer la surprise ?</h2>
        <p style={{color:'rgba(255,255,255,.35)', marginBottom:'28px', fontSize:'14px'}}>Commander en 30 secondes. Livraison 5-7 jours. QR code permanent.</p>
        <a href="/order" style={{background:'#FF6B6B', color:'white', padding:'16px 36px', borderRadius:'13px', fontSize:'15px', fontWeight:700, cursor:'pointer', textDecoration:'none', display:'inline-block'}}>
          Commander mon FunShirt — 24,99€ →
        </a>
        <div style={{marginTop:'14px', color:'rgba(255,255,255,.15)', fontSize:'11px'}}>🔒 Paiement sécurisé · Apple Pay · Contenu modéré</div>
      </div>

      {/* FOOTER */}
      <div style={{display:'flex', gap:'20px', justifyContent:'center', padding:'20px', flexWrap:'wrap'}}>
        <a href="/mentions-legales" style={{color:'rgba(255,255,255,.18)', fontSize:'11px', textDecoration:'none'}}>Mentions légales</a>
        <a href="/cgv" style={{color:'rgba(255,255,255,.18)', fontSize:'11px', textDecoration:'none'}}>CGV</a>
        <a href="/confidentialite" style={{color:'rgba(255,255,255,.18)', fontSize:'11px', textDecoration:'none'}}>Confidentialité</a>
      </div>

    </main>
  )
}