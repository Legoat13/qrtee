export default function Home() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#1A1A1A', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px', textAlign:'center'}}>
      
      <div style={{fontSize:'64px', marginBottom:'24px'}}>👕</div>
      
      <h1 style={{fontSize:'32px', fontWeight:800, color:'white', marginBottom:'12px'}}>
        QRTEE
      </h1>
      
      <p style={{fontSize:'16px', color:'white', marginBottom:'32px', maxWidth:'400px', lineHeight:1.6}}>
        Quelque chose d'unique arrive bientôt.<br/>
        Le tee-shirt qui te ressemble vraiment.
      </p>

      <div style={{background:'#0ABFBC', color:'white', padding:'12px 24px', borderRadius:'20px', fontSize:'14px', fontWeight:700}}>
        🚀 Bientôt disponible
      </div>

    </main>
  )
}