# TaBière 🍺

Commander au bar sans se tromper, en groupe.

## Workflow

1. **Le Créateur** lance l'app → crée une table → obtient un code à 4 chiffres
2. **Les Invités** rejoignent via le code → choisissent leurs boissons (tap pour +1, jusqu'à ×3)
3. **L'Acheteur** (le créateur) → onglet "Récap bar" → montre l'écran au barman

## Stack

- **React 18** + Vite
- **Tailwind CSS v4**
- `localStorage` pour la synchro entre onglets (même appareil)

## Installation

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173 dans plusieurs onglets pour simuler plusieurs utilisateurs.

## Pour aller en production

Remplacer le polling `localStorage` par un vrai temps réel :

- **Supabase Realtime** (gratuit, recommandé) : `supabase.channel('table-XXX').on(...)`
- **Ably** ou **Pusher** : WebSocket managé
- **Socket.io** avec un petit serveur Node

Chaque invité reçoit le lien `https://votreapp.com/join?code=1234` au lieu de taper le code manuellement.
