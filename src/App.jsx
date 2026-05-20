import { useState } from 'react'

const PRESETS = [
  { id: 'biere',     name: 'Bière',     emoji: '🍺' },
  { id: 'blanche',   name: 'Blanche',   emoji: '🍻' },
  { id: 'blanche_r', name: 'B. Rosée',  emoji: '🌸' },
  { id: 'coca',      name: 'Coca',      emoji: '🥤' },
  { id: 'eau',       name: 'Eau plate', emoji: '💧' },
  { id: 'petil',     name: 'Eau pét.',  emoji: '🫧' },
  { id: 'kriek',     name: 'Kriek',     emoji: '🍒' },
  { id: 'limonade',  name: 'Limonade',  emoji: '🍋' },
  { id: 'maes',      name: 'Maes',      emoji: '🍺' },
  { id: 'panache',   name: 'Panaché',   emoji: '🥂' },
  { id: 'tango',     name: 'Tango',     emoji: '🍊' },
  { id: 'vin',       name: 'Vin',       emoji: '🍷' },
]

export default function App() {
  const [page, setPage] = useState('order') // 'order' | 'recap'
  const [drinks, setDrinks] = useState(PRESETS)
  const [order, setOrder] = useState({})
  const [customInput, setCustomInput] = useState('')

  const total = Object.values(order).reduce((a, b) => a + b, 0)
  const orderedItems = drinks.filter(d => (order[d.id] || 0) > 0)

  function inc(id) {
    setOrder(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  function dec(id) {
    setOrder(prev => {
      const next = (prev[id] || 0) - 1
      if (next <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: next }
    })
  }

  function addCustom() {
    const name = customInput.trim()
    if (!name) return
    const id = 'custom_' + Date.now()
    setDrinks(prev => [...prev, { id, name, emoji: '🍹' }])
    setOrder(prev => ({ ...prev, [id]: 1 }))
    setCustomInput('')
  }

  function reset() {
    setOrder({})
  }

  // ── STYLES ──
  const s = {
    app: { fontFamily: "'DM Sans', sans-serif", background: '#131313', minHeight: '100dvh', maxWidth: 430, margin: '0 auto', display: 'flex', flexDirection: 'column', color: '#fff' },
    header: { padding: '14px 18px 10px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#131313', zIndex: 10 },
    logo: { fontFamily: "'Bebas Neue', cursive", fontSize: 26, letterSpacing: 2, color: '#f5a623' },
    recapBtn: { fontFamily: "'Bebas Neue', cursive", fontSize: 13, letterSpacing: 1, padding: '6px 12px', borderRadius: 8, background: total > 0 ? '#f5a623' : '#1c1c1c', color: total > 0 ? '#1a0f00' : '#555', border: 'none', cursor: 'pointer', transition: 'all .2s' },
    screen: { flex: 1, overflowY: 'auto', padding: 14 },
    sectionLabel: { fontSize: 11, fontWeight: 600, letterSpacing: '.8px', color: '#555', marginBottom: 10, textTransform: 'uppercase' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9, marginBottom: 20 },
  }

  if (page === 'recap') return (
    <div style={s.app}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.logo}>Kestu<span style={{ color: '#fff' }}>Prends ?</span></div>
        <button onClick={() => setPage('order')} style={{ ...s.recapBtn, background: '#1c1c1c', color: '#aaa' }}>
          ← Boissons
        </button>
      </div>

      <div style={{ ...s.screen, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {orderedItems.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '80px 0' }}>
            <div style={{ fontSize: 56 }}>🍺</div>
            <p style={{ color: '#555', fontSize: 14, textAlign: 'center' }}>Aucune boisson sélectionnée.<br />Retournez choisir vos verres.</p>
          </div>
        ) : (
          <>
            {/* Total hero */}
            <div style={{ background: '#f5a623', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#5c3800', letterSpacing: .5, textTransform: 'uppercase', marginBottom: 2 }}>Total à commander</div>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 72, color: '#1a0f00', lineHeight: 1, letterSpacing: 2 }}>{total}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#5c3800' }}>verre{total > 1 ? 's' : ''}</div>
              </div>
              <div style={{ fontSize: 52 }}>🍻</div>
            </div>

            {/* List */}
            <div style={{ background: '#1c1c1c', borderRadius: 14, overflow: 'hidden', border: '1px solid #242424' }}>
              {orderedItems.map((d, i) => (
                <div key={d.id} style={{ display: 'flex', alignItems: 'center', padding: '13px 16px', borderBottom: i < orderedItems.length - 1 ? '1px solid #222' : 'none', gap: 12 }}>
                  <div style={{ fontSize: 26, width: 32, textAlign: 'center', flexShrink: 0 }}>{d.emoji}</div>
                  <div style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{d.name}</div>
                  <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: '#f5a623', lineHeight: 1 }}>×{order[d.id]}</div>
                </div>
              ))}
            </div>

            <button onClick={reset} style={{ width: '100%', padding: 13, borderRadius: 12, background: 'transparent', color: '#555', border: '1px solid #2a2a2a', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
              Réinitialiser la commande
            </button>
          </>
        )}
      </div>
    </div>
  )

  return (
    <div style={s.app}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.logo}>Kestu<span style={{ color: '#fff' }}>Prends ?</span></div>
        <button onClick={() => setPage('recap')} style={s.recapBtn}>
          {total > 0 ? `${total} verre${total > 1 ? 's' : ''} →` : 'Récap →'}
        </button>
      </div>

      <div style={s.screen}>
        <div style={s.sectionLabel}>Choisissez vos boissons</div>

        {/* Grid */}
        <div style={s.grid}>
          {drinks.map(d => {
            const qty = order[d.id] || 0
            return (
              <div key={d.id} style={{ background: qty > 0 ? '#201800' : '#1c1c1c', border: `1.5px solid ${qty > 0 ? '#f5a623' : '#2a2a2a'}`, borderRadius: 14, padding: '10px 6px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', transition: 'all .15s' }}>
                {qty > 0 && (
                  <div style={{ position: 'absolute', top: -7, right: -7, background: '#f5a623', color: '#1a0f00', borderRadius: '50%', width: 20, height: 20, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{qty}</div>
                )}
                <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 5 }}>{d.emoji}</div>
                <div style={{ fontSize: 11, color: qty > 0 ? '#f5a623' : '#999', textAlign: 'center', lineHeight: 1.25, marginBottom: 8, minHeight: 26, display: 'flex', alignItems: 'center' }}>{d.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <button onClick={() => dec(d.id)} style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', cursor: qty > 0 ? 'pointer' : 'default', fontSize: 17, fontWeight: 700, background: qty > 0 ? '#f5a623' : '#2a2a2a', color: qty > 0 ? '#1a0f00' : '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>−</button>
                  <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20, color: '#f5a623', minWidth: 16, textAlign: 'center' }}>{qty || ''}</div>
                  <button onClick={() => inc(d.id)} style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: 17, fontWeight: 700, background: '#f5a623', color: '#1a0f00', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>+</button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Custom drink */}
        <div style={s.sectionLabel}>Ajouter un verre personnalisé</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          <input
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustom()}
            placeholder="ex: Leffe brune, Jus de pomme…"
            maxLength={32}
            style={{ flex: 1, background: '#1c1c1c', border: '1.5px solid #2a2a2a', borderRadius: 10, color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: '10px 14px', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#f5a623'}
            onBlur={e => e.target.style.borderColor = '#2a2a2a'}
          />
          <button onClick={addCustom} style={{ background: '#f5a623', color: '#1a0f00', border: 'none', borderRadius: 10, padding: '10px 16px', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}
