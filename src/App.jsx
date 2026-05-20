import { useState } from 'react'

const DRINKS = [
  { id: 'biere',      name: 'Bière',      emoji: '🍺' },
  { id: 'blanche',    name: 'Blanche',    emoji: '🍻' },
  { id: 'kriek',      name: 'Kriek',      emoji: '🍒' },
  { id: 'coca',       name: 'Coca',       emoji: '🥤' },
  { id: 'eau',        name: 'Eau plate',  emoji: '💧' },
  { id: 'petillante', name: 'Eau pét.',   emoji: '🫧' },
  { id: 'limonade',   name: 'Limonade',   emoji: '🍋' },
  { id: 'panache',    name: 'Panaché',    emoji: '🥂' },
  { id: 'tango',      name: 'Tango',      emoji: '🍊' },
  { id: 'vin',        name: 'Vin',        emoji: '🍷' },
  { id: 'maes',       name: 'Maes',       emoji: '🍺' },
  { id: 'eau_r',      name: 'B. Rosée',   emoji: '🌸' },
]

export default function App() {
  const [order, setOrder] = useState({})

  const total = Object.values(order).reduce((a, b) => a + b, 0)
  const ordered = Object.entries(order).filter(([, q]) => q > 0)

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

  function reset() {
    setOrder({})
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#1a0f00', minHeight: '100vh', maxWidth: 420, margin: '0 auto', color: '#fff' }}>

      {/* Header */}
      <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #3d2500', position: 'sticky', top: 0, background: '#1a0f00', zIndex: 10 }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, letterSpacing: 2, color: '#f5a623' }}>
          Ta<span style={{ color: '#fff' }}>Bière</span>
        </div>
      </div>

      <div style={{ padding: '16px 20px' }}>

        {/* Drink grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
          {DRINKS.map(d => {
            const qty = order[d.id] || 0
            return (
              <div
                key={d.id}
                style={{
                  background: qty > 0 ? '#3d2500' : '#2d1a00',
                  border: qty > 0 ? '2px solid #f5a623' : '2px solid #4a3000',
                  borderRadius: 12,
                  padding: '10px 6px',
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                {qty > 0 && (
                  <div style={{
                    position: 'absolute', top: -8, right: -8,
                    background: '#f5a623', color: '#1a0f00',
                    borderRadius: '50%', width: 22, height: 22,
                    fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{qty}</div>
                )}
                <div style={{ fontSize: 30, marginBottom: 4 }}>{d.emoji}</div>
                <div style={{ fontSize: 11, color: '#c9a87e', marginBottom: 8, lineHeight: 1.2 }}>{d.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <button
                    onClick={() => dec(d.id)}
                    style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: qty > 0 ? '#f5a623' : '#4a3000',
                      color: qty > 0 ? '#1a0f00' : '#888',
                      border: 'none', cursor: qty > 0 ? 'pointer' : 'default',
                      fontSize: 16, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >−</button>
                  <button
                    onClick={() => inc(d.id)}
                    style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: '#f5a623', color: '#1a0f00',
                      border: 'none', cursor: 'pointer',
                      fontSize: 16, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >+</button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recap */}
        {ordered.length > 0 && (
          <div style={{ background: '#2d1a00', border: '1px solid #4a3000', borderRadius: 14, padding: '16px 18px', marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 20, color: '#c9a87e', letterSpacing: 1 }}>COMMANDE</span>
              <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: '#f5a623', letterSpacing: 2 }}>
                {total} verre{total > 1 ? 's' : ''}
              </span>
            </div>
            {ordered.map(([id, qty]) => {
              const drink = DRINKS.find(d => d.id === id)
              return (
                <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderTop: '1px solid #3d2500' }}>
                  <span style={{ fontSize: 15 }}>{drink.emoji} {drink.name}</span>
                  <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 24, color: '#f5a623' }}>×{qty}</span>
                </div>
              )
            })}
          </div>
        )}

        {ordered.length > 0 && (
          <button
            onClick={reset}
            style={{
              width: '100%', padding: '13px', borderRadius: 12,
              background: 'transparent', color: '#c9a87e',
              border: '1px solid #4a3000', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            }}
          >
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  )
}
