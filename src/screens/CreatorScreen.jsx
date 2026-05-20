import { useState, useEffect } from 'react'
import { DRINKS } from '../drinks.js'
import { loadSession, clearSession, getTotals, getTotalCount, getWhoOrdered } from '../session.js'

export default function CreatorScreen({ initialSession, onClose }) {
  const [session, setSession] = useState(initialSession)
  const [activeTab, setActiveTab] = useState('table')

  // Poll for updates every second
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = loadSession()
      if (stored && stored.code === session.code) {
        setSession({ ...stored })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [session.code])

  function handleClose() {
    clearSession()
    onClose()
  }

  const totals = getTotals(session)
  const totalCount = getTotalCount(session)
  const orderedCount = Object.keys(session.orders || {}).length
  const memberCount = (session.members || []).length

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#1a0f00' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-5 py-3 border-b" style={{ background: '#1a0f00', borderColor: '#3d2500' }}>
        <span className="font-display text-3xl tracking-widest" style={{ color: '#f5a623' }}>
          Ta<span className="text-white">Bière</span>
        </span>
        <div className="text-xs mt-0.5" style={{ color: '#c9a87e' }}>
          {memberCount} membre{memberCount > 1 ? 's' : ''} · {orderedCount} commande{orderedCount > 1 ? 's' : ''}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 pt-4 pb-2">
        {[
          { id: 'table', label: '🪑 Ma table' },
          { id: 'summary', label: '🍺 Récap bar' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: activeTab === tab.id ? '#f5a623' : 'transparent',
              color: activeTab === tab.id ? '#1a0f00' : '#c9a87e',
              border: activeTab === tab.id ? '1px solid #f5a623' : '1px solid #4a3000',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 px-5 py-4 overflow-auto">

        {/* TABLE TAB */}
        {activeTab === 'table' && (
          <>
            {/* Code box */}
            <div className="rounded-xl p-5 mb-5 text-center" style={{ background: '#2d1a00', border: '1px solid #4a3000' }}>
              <p className="text-xs font-medium mb-1" style={{ color: '#c9a87e' }}>CODE DE LA TABLE</p>
              <div className="font-display text-7xl tracking-[12px] mb-1" style={{ color: '#f5a623' }}>
                {session.code}
              </div>
              <p className="text-xs" style={{ color: '#5c3800' }}>Partagez ce code avec vos amis</p>
            </div>

            {/* Members */}
            <div className="rounded-xl p-4 mb-5" style={{ background: '#2d1a00', border: '1px solid #4a3000' }}>
              <p className="text-xs font-medium mb-3" style={{ color: '#c9a87e' }}>MEMBRES ({memberCount})</p>
              {memberCount === 0 ? (
                <p className="text-sm" style={{ color: '#5c3800' }}>En attente d'invités...</p>
              ) : (
                <div className="space-y-2">
                  {(session.members || []).map(m => (
                    <div key={m} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{m}</span>
                      {session.orders?.[m]
                        ? <span className="text-xs px-2 py-1 rounded-full" style={{ background: '#0d2b18', color: '#27ae60', border: '1px solid #27ae60' }}>✓ Commandé</span>
                        : <span className="text-xs px-2 py-1 rounded-full" style={{ background: '#2d1a00', color: '#f5a623', border: '1px solid #4a3000' }}>⏳ En attente</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleClose}
              className="w-full py-4 rounded-xl text-base font-semibold transition-all active:scale-95"
              style={{ background: '#6b1a00', color: '#fff' }}
            >
              Fermer la table
            </button>
          </>
        )}

        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
          <>
            <div className="text-center mb-5">
              <h2 className="font-display text-3xl" style={{ color: '#f5a623' }}>Commande totale</h2>
              <p className="text-sm mt-1" style={{ color: '#c9a87e' }}>Montre cet écran au barman 🍺</p>
            </div>

            {Object.keys(totals).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">⏳</div>
                <p className="text-sm" style={{ color: '#c9a87e' }}>Aucune commande pour l'instant.</p>
              </div>
            ) : (
              <>
                {/* Big total */}
                <div className="rounded-xl p-5 text-center mb-5" style={{ background: '#f5a623' }}>
                  <div className="font-display text-8xl leading-none" style={{ color: '#1a0f00' }}>{totalCount}</div>
                  <div className="text-sm font-semibold mt-1" style={{ color: '#5c3800' }}>
                    VERRE{totalCount > 1 ? 'S' : ''} AU TOTAL
                  </div>
                </div>

                {/* Per drink */}
                <div className="space-y-2.5">
                  {Object.entries(totals).map(([id, qty]) => {
                    const drink = DRINKS.find(d => d.id === id)
                    const who = getWhoOrdered(session, id)
                    return (
                      <div
                        key={id}
                        className="flex items-center rounded-xl px-4 py-3"
                        style={{ background: '#2d1a00', border: '1px solid #4a3000' }}
                      >
                        <span className="text-3xl mr-4">{drink?.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold">{drink?.name}</div>
                          <div className="text-xs truncate" style={{ color: '#c9a87e' }}>{who.join(', ')}</div>
                        </div>
                        <span className="font-display text-4xl ml-3" style={{ color: '#f5a623' }}>{qty}</span>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
