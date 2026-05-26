export default function Home() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#1A1A1A', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px', textAlign:'center'}}>
      
      <div style={{fontSize:'64px', marginBottom:'24px'}}>👕</div>
      
      <h1 style={{fontSize:'32px', fontWeight:800, color:'white', marginBottom:'12px'}}>
        QRTEE
      </h1>
      
      <p style={{fontSize:'16px', color:'#888', marginBottom:'32px', maxWidth:'400px', lineHeight:1.6}}>
        Quelque chose d'unique arrive bientôt.<br/>
        Le tee-shirt qui te ressemble vraiment.
      </p>

      <div style={{background:'#0ABFBC', color:'white', padding:'12px 24px', borderRadius:'20px', fontSize:'14px', fontWeight:700, marginBottom:'60px'}}>
        🚀 Bientôt disponible
      </div>

      <footer style={{position:'absolute', bottom:'20px', display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'center'}}>
        <a href="/mentions-legales" style={{color:'#555', fontSize:'12px', textDecoration:'none'}}>Mentions légales</a>
        <a href="/cgv" style={{color:'#555', fontSize:'12px', textDecoration:'none'}}>CGV</a>
        <a href="/confidentialite" style={{color:'#555', fontSize:'12px', textDecoration:'none'}}>Confidentialité</a>
      </footer>

    </main>
  )
}