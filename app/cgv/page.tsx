export default function MentionsLegales() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', padding:'40px 20px'}}>
      <div style={{maxWidth:'700px', margin:'0 auto'}}>
        
        <h1 style={{fontSize:'28px', fontWeight:800, color:'#1A1A1A', marginBottom:'8px'}}>Mentions légales</h1>
        <p style={{fontSize:'13px', color:'#555', marginBottom:'40px'}}>Dernière mise à jour : mai 2026</p>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>Éditeur du site</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Nom : <strong>Arthur Duyrat-Petry</strong><br/>
            Adresse : <strong>15 rue du docteur combalat</strong><br/>
            Email : <strong>duyratpetryarthur@gmail.com</strong><br/>
            Téléphone : <strong>0699215352</strong>
          </p>
        </section>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>Hébergement</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Le site est hébergé par :<br/>
            <strong>Vercel Inc.</strong><br/>
            440 N Barranca Ave #4133, Covina, CA 91723, USA<br/>
            <a href="https://vercel.com" style={{color:'#0ABFBC'}}>vercel.com</a>
          </p>
        </section>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>Propriété intellectuelle</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            L'ensemble du contenu de ce site (textes, images, logo, QR codes) est la propriété exclusive de FunShirt. 
            Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>Contact</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Pour toute question, vous pouvez nous contacter à l'adresse suivante : <strong>duyratpetryarthur@gmail.com</strong>
          </p>
        </section>

        <a href="/" style={{display:'inline-block', marginTop:'20px', color:'#0ABFBC', fontSize:'14px', fontWeight:700, textDecoration:'none'}}>
          ← Retour à l'accueil
        </a>

      </div>
    </main>
  )
}