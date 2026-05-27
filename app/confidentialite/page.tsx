export default function Confidentialite() {
  return (
    <main style={{fontFamily:'sans-serif', background:'#FFFAF6', minHeight:'100vh', padding:'40px 20px'}}>
      <div style={{maxWidth:'700px', margin:'0 auto'}}>
        
        <h1 style={{fontSize:'28px', fontWeight:800, color:'#1A1A1A', marginBottom:'8px'}}>Politique de confidentialité</h1>
        <p style={{fontSize:'13px', color:'#555', marginBottom:'40px'}}>Dernière mise à jour : mai 2026</p>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>1. Données collectées</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Lors de votre commande, nous collectons les données suivantes :<br/>
            • Nom et prénom<br/>
            • Adresse email<br/>
            • Adresse postale de livraison<br/>
            • Données de paiement (traitées directement par Stripe, non stockées par FunShirt)
          </p>
        </section>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>2. Utilisation des données</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Vos données sont utilisées uniquement pour :<br/>
            • Traiter et expédier votre commande<br/>
            • Vous informer du suivi de votre commande<br/>
            • Gérer votre espace client et votre QR code personnel
          </p>
        </section>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>3. Conservation des données</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Vos données sont conservées pendant la durée nécessaire à l'exécution de votre commande 
            et au maximum 3 ans après votre dernier achat, conformément à la législation française.
          </p>
        </section>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>4. Partage des données</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Vos données ne sont jamais vendues à des tiers. Elles peuvent être transmises à nos prestataires 
            uniquement dans le cadre de l'exécution de votre commande (transporteur, fournisseur).
          </p>
        </section>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>5. Vos droits (RGPD)</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Conformément au RGPD, vous disposez des droits suivants :<br/>
            • Droit d'accès à vos données<br/>
            • Droit de rectification<br/>
            • Droit à l'effacement ("droit à l'oubli")<br/>
            • Droit à la portabilité<br/><br/>
            Pour exercer ces droits, contactez-nous à : <strong>[duyratpetryarthur@gmail.com]</strong>
          </p>
        </section>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>6. Cookies</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement 
            (authentification, session). Aucun cookie publicitaire ou de tracking n'est utilisé.
          </p>
        </section>

        <section style={{marginBottom:'32px'}}>
          <h2 style={{fontSize:'18px', fontWeight:700, color:'#1A1A1A', marginBottom:'12px'}}>7. Contact</h2>
          <p style={{fontSize:'14px', color:'#1A1A1A', lineHeight:1.8}}>
            Pour toute question relative à vos données personnelles : <strong>duyratpetryarthur@gmail.com</strong>
          </p>
        </section>

        <a href="/" style={{display:'inline-block', marginTop:'20px', color:'#0ABFBC', fontSize:'14px', fontWeight:700, textDecoration:'none'}}>
          ← Retour à l'accueil
        </a>

      </div>
    </main>
  )
}