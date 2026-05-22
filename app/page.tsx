'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      
      {/* NAVBAR */}
      <nav style={{background:'#FFFAF6', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #FFE8D6'}}>
        <div style={{fontSize:'16px', fontWeight:800, color:'#0ABFBC'}}>👕 QRTEE</div>
        <Link href="/order" style={{background:'#1A1A1A', color:'white', padding:'8px 16px', borderRadius:'20px', fontSize:'12px', fontWeight:800, textDecoration:'none'}}>
          Créer mon tee-shirt →
        </Link>
      </nav>

      {/* HERO */}
      <div style={{background:'linear-gradient(160deg, #0ABFBC 0%, #0ABFBC 50%, #FFFAF6 50%)', padding:'32px 20px 24px', position:'relative'}}>
        <div style={{display:'flex', gap:'6px', marginBottom:'12px', flexWrap:'wrap'}}>
          <span style={{background:'#FF6B6B', color:'white', padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:600}}>NOUVEAU</span>
          <span style={{background:'#FFD93D', color:'#854F0B', padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:600}}>100% trop drôle</span>
          <span style={{background:'white', color:'#0ABFBC', padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:600, border:'1.5px solid #0ABFBC'}}>QR unique</span>
        </div>
        <h1 style={{fontSize:'32px', fontWeight:800, color:'white', lineHeight:1.15, marginBottom:'8px'}}>
          Ton tee-shirt parle<br/>à <span style={{background:'#FFD93D', color:'#2C2C2A', borderRadius:'6px', padding:'0 5px'}}>ta place.</span><br/>
          <span style={{color:'#FFD93D'}}>Enfin. 🤙</span>
        </h1>
        <div style={{fontSize:'13px', color:'#0ABFBC', background:'white', borderRadius:'12px', padding:'6px 14px', display:'inline-block', fontWeight:600, marginTop:'8px'}}>
          🤙 Scanne. Rigole. Recommande.
        </div>
      </div>

      {/* CONTENU */}
      <div style={{padding:'20px', flex:1}}>
        <div style={{display:'flex', justifyContent:'space-around', marginBottom:'20px'}}>
          {[['😂','Message'],['🎵','Playlist'],['💌','Secret']].map(([emoji, label]) => (
            <div key={label} style={{width:'70px', height:'70px', border:'2px solid #0ABFBC', borderRadius:'10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'4px'}}>
              <span style={{fontSize:'24px'}}>{emoji}</span>
              <p style={{fontSize:'10px', fontWeight:700, color:'#0ABFBC', margin:0}}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{marginBottom:'20px'}}>
          <div style={{fontSize:'12px', fontWeight:700, color:'#0ABFBC', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'10px'}}>Comment ça marche</div>
          {[['1','Tu crées ton compte en 30 sec','⚡'],['2','Tu mets ce que tu veux dessus','✏️'],['3','On imprime, on livre. C\'est tout.','📦']].map(([num, text, emoji]) => (
            <div key={num} style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px'}}>
              <div style={{width:'26px', height:'26px', borderRadius:'50%', background:'#FFD93D', color:'#854F0B', fontSize:'12px', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{num}</div>
              <span style={{fontSize:'13px', color:'#2C2C2A', fontWeight:500}}>{text}</span>
              <span style={{fontSize:'16px'}}>{emoji}</span>
            </div>
          ))}
        </div>

        <div style={{background:'#E6FAFA', borderRadius:'12px', padding:'12px', marginBottom:'20px'}}>
          <div style={{fontSize:'12px', color:'#0ABFBC', fontWeight:700, marginBottom:'6px'}}>🔥 Ce que les gens mettent sur leur QR :</div>
          <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
            {['😘 "Kiss me"','🎵 Ma playlist','💬 Message secret'].map(tag => (
              <span key={tag} style={{fontSize:'11px', background:'white', borderRadius:'8px', padding:'4px 8px', color:'#2C2C2A', fontWeight:500}}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* BOUTON PERMANENT EN BAS */}
      <div style={{background:'#1A1A1A', padding:'14px 20px', borderTop:'2px solid #FFD93D', position:'sticky', bottom:0}}>
        <Link href="/order" style={{display:'block', width:'100%', background:'#FF6B6B', color:'white', border:'none', padding:'15px', borderRadius:'14px', fontSize:'15px', fontWeight:800, textAlign:'center', textDecoration:'none'}}>
          Créer mon tee-shirt →
        </Link>
        <div style={{display:'flex', justifyContent:'space-around', marginTop:'8px'}}>
          {[['📦','Livré chez toi'],['🔗','QR permanent'],['✏️','Modifiable à vie']].map(([icon, text]) => (
            <div key={text} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'2px'}}>
              <span style={{fontSize:'14px'}}>{icon}</span>
              <span style={{fontSize:'10px', color:'#FFD93D', fontWeight:700, textAlign:'center'}}>{text}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}