export default function Landing() {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', textTransform: 'uppercase' }}>
      <h1 style={{ color: '#00E676' }}>CARE AUTO PRO</h1>
      <p style={{ fontSize: '14px', marginBottom: '30px' }}>GESTIONE INTELLIGENTE FLOTTA E MANUTENZIONE</p>
      
      <a href="/dashboard" style={{ padding: '20px 40px', backgroundColor: '#00E676', color: '#000', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>
        ACCEDI ALLA PWA
      </a>
      
      <div style={{ marginTop: '40px', fontSize: '10px', color: '#444' }}>
        DOMINI REGISTRATI: REGISTER.IT | POWERED BY ROMATAXIHUB
      </div>
    </div>
  );
}
