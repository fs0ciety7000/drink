export default function HomeScreen({ onCreateTable, onJoinTable }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#1a0f00' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-5 py-4 border-b" style={{ background: '#1a0f00', borderColor: '#3d2500' }}>
        <span className="font-display text-3xl tracking-widest" style={{ color: '#f5a623' }}>
          Kestu<span className="text-white">Prends ?</span>
        </span>
      </div>

      {/* Hero */}
      <div className="flex-1 px-5 py-8 flex flex-col justify-between">
        <div className="text-center py-10">
          <div className="text-7xl mb-5">🍺</div>
          <h1 className="font-display text-5xl tracking-wide mb-4" style={{ color: '#f5a623' }}>
            Commander<br />sans se tromper
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#c9a87e' }}>
            Créez une table virtuelle, invitez vos amis,<br />
            commandez en groupe. Zéro erreur, zéro oubli.
          </p>
        </div>

        {/* Steps */}
        <div className="rounded-xl p-5 mb-8" style={{ background: '#2d1a00', border: '1px solid #4a3000' }}>
          {[
            { num: '1', icon: '🎯', label: 'Créez une table, partagez le code' },
            { num: '2', icon: '📱', label: 'Chacun choisit sa boisson' },
            { num: '3', icon: '🍻', label: "L'acheteur montre le récap au barman" },
          ].map(step => (
            <div key={step.num} className="flex items-center gap-4 py-3">
              <span className="text-2xl w-8 text-center">{step.icon}</span>
              <span className="text-sm" style={{ color: '#c9a87e' }}>{step.label}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3 pb-8">
          <button
            onClick={onCreateTable}
            className="w-full py-4 rounded-xl text-base font-semibold transition-all active:scale-95"
            style={{ background: '#f5a623', color: '#1a0f00' }}
          >
            🎯 Créer une table
          </button>
          <button
            onClick={onJoinTable}
            className="w-full py-4 rounded-xl text-base font-semibold transition-all active:scale-95"
            style={{ background: 'transparent', color: '#f5a623', border: '2px solid #f5a623' }}
          >
            🔗 Rejoindre une table
          </button>
        </div>
      </div>
    </div>
  )
}
