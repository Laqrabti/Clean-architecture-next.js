// app/components/SourceLogo.tsx
"use client";

export default function SourceLogo() {
  return (
    <div 
      id="source-logo" // ← THIS ID is crucial!
      className="logo-source"
      style={{
        width: '60px',
        height: '60px',
        backgroundColor: 'blue',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}
    >
      LOGO
    </div>
  );
}