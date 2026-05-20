import { useState } from 'react'
import HomeScreen from './screens/HomeScreen.jsx'
import JoinScreen from './screens/JoinScreen.jsx'
import GuestScreen from './screens/GuestScreen.jsx'
import CreatorScreen from './screens/CreatorScreen.jsx'
import { genCode, saveSession } from './session.js'

export default function App() {
  const [screen, setScreen] = useState('home') // home | join | guest | creator
  const [session, setSession] = useState(null)
  const [myName, setMyName] = useState('')

  function handleCreateTable() {
    const code = genCode()
    const s = { code, createdAt: Date.now(), members: [], orders: {} }
    saveSession(s)
    setSession(s)
    setScreen('creator')
  }

  function handleJoined(session, name) {
    setSession(session)
    setMyName(name)
    setScreen('guest')
  }

  function handleClose() {
    setSession(null)
    setMyName('')
    setScreen('home')
  }

  if (screen === 'home') return (
    <HomeScreen
      onCreateTable={handleCreateTable}
      onJoinTable={() => setScreen('join')}
    />
  )

  if (screen === 'join') return (
    <JoinScreen
      onBack={() => setScreen('home')}
      onJoined={handleJoined}
    />
  )

  if (screen === 'guest') return (
    <GuestScreen
      session={session}
      myName={myName}
    />
  )

  if (screen === 'creator') return (
    <CreatorScreen
      initialSession={session}
      onClose={handleClose}
    />
  )

  return null
}
