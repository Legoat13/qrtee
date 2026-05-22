'use client'
import Link from 'next/link'

export default function Success() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px'}}>
      
      <div style={{background:'white', borderRadius:'24px', padding:'32px 24px', width:'100%', maxWidth:'400px', border:'1px solid #FFE8D6', textAlign:'center'}}>
        
        <div style={{fontSize:'64px', marginBottom:'16px'}}>🎉</div>
        
        <h1 style={{fontSize:'24px', fontWeight:800, color:'#1A1A1A', marginBottom:'8px'}}>
          Commande confirmée !
        </h1>
        
        <p style={{fontSize:'13px', color:'#888', marginBottom:'24px', lineHeight:1.6}}>
          Ton tee-shirt QRTEE est en cours de préparation. Tu recevras un email de confirmation avec le suivi de ta commande.
        </p>

        <div style={{background:'#E6FAFA', borderRadius:'12px', padding:'16px', marginBottom:'24px'}}>
          <div style={{fontSize:'12px', color:'#0ABFBC', fontWeight:700, marginBottom:'8px'}}>
            📦 Livraison estimée
          </div>
          <div style={{fontSize:'14px', color:'#1A1A1A', fontWeight:600}}>
            5 à 7 jours ouvrés
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
          <Link href="/dashboard" style={{display:'block', background:'#FF6B6B', color:'white', padding:'14px', borderRadius:'14px', fontSize:'14px', fontWeight:800, textDecoration:'none'}}>
            Personnaliser mon QR code →
          </Link>
          <Link href="/" style={{display:'block', background:'white', color:'#888', padding:'14px', borderRadius:'14px', fontSize:'14px', fontWeight:600, textDecoration:'none', border:'1px solid #FFE8D6'}}>
            Retour à l'accueil
          </Link>
        </div>

      </div>
    </main>
  )
}