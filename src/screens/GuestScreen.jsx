import { useState } from 'react'
import { DRINKS } from '../drinks.js'
import { loadSession, saveSession } from '../session.js'

export default function GuestScreen({ session: initialSession, myName }) {
  const [myOrder, setMyOrder] = useState({})
  const [orderSent, setOrderSent] = useState(false)
  const [session, setSession] = useState(initialSession)

  function toggleDrink(id) {
    setMyOrder(prev => {
      const cur = prev[id] || 0
      // Cycle: 0 → 1 → 2 → 3 → 0
      return { ...prev, [id]: cur < 3 ? cur + 1 : 0 }
    })
  }

  function sendOrder() {
    const items = Object.entries(myOrder).filter(([, qty]) => qty > 0)
    if (items.length === 0) return

    const stored = loadSession()
    if (stored) {
      stored.orders = stored.orders || {}
      stored.orders[myName] = myOrder
      saveSession(stored)
      setSession(stored)
    }
    setOrderSent(true)
  }

  const myOrderItems = Object.entries(myOrder).filter(([, qty]) => qty > 0)
  const totalGlasses = myOrderItems.reduce((a, [, v]) => a + v, 0)

  if (orderSent) return (
    <div className="flex flex-col min-h-screen" style={{ background: '#1a0f00' }}>
      <div className="sticky top-0 z-10 px-5 py-4 border-b" style={{ background: '#1a0f00', borderColor: '#3d2500' }}>
        <span className="font-display text-3xl tracking-widest" style={{ color: '#f5a623' }}>
          Ta<span className="text-white">Bière</span>
        </span>
      </div>

      <div className="flex-1 px-5 py-8 flex flex-col items-center">
        <div className="text-6xl mb-5 mt-8">🎉</div>
        <h2 className="font-display text-4xl text-center mb-3" style={{ color: '#27ae60' }}>Commande envoyée !</h2>
        <p className="text-center text-sm mb-8" style={{ color: '#c9a87e' }}>
          Ton acheteur a bien reçu ta commande.<br />Plus qu'à attendre ! 🍺
        </p>

        {/* Recap */}
        <div className="w-full rounded-xl p-4 mb-6" style={{ background: '#2d1a00', border: '1px solid #4a3000' }}>
          <p className="text-xs font-medium mb-3" style={{ color: '#c9a87e' }}>TA COMMANDE</p>
          {myOrderItems.map(([id, qty]) => {
            const drink = DRINKS.find(d => d.id === id)
            return (
              <div key={id} className="flex justify-between items-center py-2">
                <span className="text-sm">{drink?.emoji} {drink?.name}</span>
                <span className="font-semibold text-sm" style={{ color: '#f5a623' }}>×{qty}</span>
              </div>
            )
          })}
        </div>

        {/* Members status */}
        <div className="w-full rounded-xl p-4" style={{ background: '#2d1a00', border: '1px solid #4a3000' }}>
          <p className="text-xs font-medium mb-3" style={{ color: '#c9a87e' }}>STATUT DE LA TABLE</p>
          {(session?.members || []).map(m => (
            <div key={m} className="flex justify-between items-center py-2">
              <span className="text-sm">{m}</span>
              {session?.orders?.[m]
                ? <span className="text-xs" style={{ color: '#27ae60' }}>✓ Commandé</span>
                : <span className="text-xs" style={{ color: '#f5a623' }}>⏳ En attente</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#1a0f00' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-5 py-3 border-b" style={{ background: '#1a0f00', borderColor: '#3d2500' }}>
        <span className="font-display text-3xl tracking-widest" style={{ color: '#f5a623' }}>
          Ta<span className="text-white">Bière</span>
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#27ae60' }}></span>
          <span className="text-xs" style={{ color: '#c9a87e' }}>Table #{session?.code} — {myName}</span>
        </div>
      </div>

      {/* Drink grid */}
      <div className="flex-1 px-5 py-5 overflow-auto">
        <h2 className="font-display text-2xl mb-1" style={{ color: '#c9a87e' }}>Qu'est-ce que tu bois ?</h2>
        <p className="text-xs mb-4" style={{ color: '#5c3800' }}>Tap = +1 verre, jusqu'à ×3. Retap ×3 pour remettre à 0.</p>

        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {DRINKS.map(d => {
            const qty = myOrder[d.id] || 0
            return (
              <button
                key={d.id}
                onClick={() => toggleDrink(d.id)}
                className="relative rounded-xl py-3 px-2 text-center transition-all active:scale-95"
                style={{
                  background: qty > 0 ? '#3d2500' : '#2d1a00',
                  border: qty > 0 ? '2px solid #f5a623' : '2px solid #4a3000',
                }}
              >
                {qty > 0 && (
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: '#f5a623', color: '#1a0f00' }}
                  >
                    {qty}
                  </div>
                )}
                <div className="text-3xl mb-1.5">{d.emoji}</div>
                <div className="text-xs leading-tight" style={{ color: '#c9a87e' }}>{d.name}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Cart bar */}
      <div className="sticky bottom-0 px-5 py-3 border-t" style={{ background: '#1a0f00', borderColor: '#3d2500' }}>
        {myOrderItems.length > 0 && (
          <div className="rounded-xl px-4 py-3 mb-3" style={{ background: '#2d1a00' }}>
            {myOrderItems.map(([id, qty]) => {
              const drink = DRINKS.find(d => d.id === id)
              return (
                <div key={id} className="flex justify-between items-center py-1">
                  <span className="text-sm" style={{ color: '#c9a87e' }}>{drink?.emoji} {drink?.name}</span>
                  <span className="text-sm font-semibold" style={{ color: '#f5a623' }}>×{qty}</span>
                </div>
              )
            })}
          </div>
        )}
        <button
          onClick={sendOrder}
          className="w-full py-4 rounded-xl text-base font-semibold transition-all active:scale-95"
          style={{
            background: myOrderItems.length > 0 ? '#f5a623' : '#3d2500',
            color: myOrderItems.length > 0 ? '#1a0f00' : '#5c3800',
          }}
        >
          {myOrderItems.length === 0
            ? 'Sélectionne ta boisson'
            : `✓ Envoyer ma commande (${totalGlasses} verre${totalGlasses > 1 ? 's' : ''})`}
        </button>
      </div>
    </div>
  )
}
