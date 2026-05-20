import { useState } from 'react'
import { loadSession } from '../session.js'

export default function JoinScreen({ onBack, onJoined }) {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  function handleJoin() {
    const trimmedName = name.trim()
    if (!trimmedName) { setError('Entre ton prénom'); return }
    if (code.length !== 4) { setError('Le code doit avoir 4 chiffres'); return }

    const stored = loadSession()
    if (!stored || stored.code !== code) {
      setError('Code invalide ou table introuvable.')
      return
    }

    if (!stored.members.includes(trimmedName)) {
      stored.members = [...stored.members, trimmedName]
      // Save back
      try { localStorage.setItem('tabiere_session', JSON.stringify(stored)) } catch(e){}
    }

    onJoined(stored, trimmedName)
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#1a0f00' }}>
      <div className="sticky top-0 z-10 px-5 py-4 border-b" style={{ background: '#1a0f00', borderColor: '#3d2500' }}>
        <span className="font-display text-3xl tracking-widest" style={{ color: '#f5a623' }}>
          Kestu<span className="text-white">Prends ?</span>
        </span>
      </div>

      <div className="flex-1 px-5 py-6">
        <button onClick={onBack} className="flex items-center gap-2 mb-6 text-sm" style={{ color: '#c9a87e', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Retour
        </button>

        <h2 className="font-display text-3xl mb-6" style={{ color: '#f5a623' }}>Rejoindre une table</h2>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#c9a87e' }}>Ton prénom</label>
            <input
              className="w-full px-4 py-3 rounded-xl text-base text-white outline-none transition-all"
              style={{ background: '#2d1a00', border: '1px solid #4a3000', fontFamily: 'DM Sans' }}
              placeholder="ex: Marie"
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              onFocus={e => e.target.style.borderColor = '#f5a623'}
              onBlur={e => e.target.style.borderColor = '#4a3000'}
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#c9a87e' }}>Code à 4 chiffres</label>
            <input
              className="w-full px-4 py-5 rounded-xl text-center outline-none transition-all font-display text-5xl tracking-widest text-white"
              style={{ background: '#2d1a00', border: '1px solid #4a3000' }}
              placeholder="1234"
              maxLength={4}
              inputMode="numeric"
              value={code}
              onChange={e => { setCode(e.target.value.replace(/\D/g, '')); setError('') }}
              onFocus={e => e.target.style.borderColor = '#f5a623'}
              onBlur={e => e.target.style.borderColor = '#4a3000'}
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl text-sm" style={{ background: '#3d0a00', color: '#ff6b6b', border: '1px solid #6b1a00' }}>
              {error}
            </div>
          )}

          <button
            onClick={handleJoin}
            className="w-full py-4 rounded-xl text-base font-semibold transition-all active:scale-95"
            style={{ background: '#f5a623', color: '#1a0f00' }}
          >
            Rejoindre →
          </button>
        </div>
      </div>
    </div>
  )
}
