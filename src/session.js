const KEY = 'tabiere_session'

export function genCode() {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export function saveSession(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Storage error:', e)
  }
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(KEY)
  } catch (e) {}
}

export function getTotals(session) {
  if (!session?.orders) return {}
  const totals = {}
  Object.values(session.orders).forEach(order => {
    Object.entries(order).forEach(([id, qty]) => {
      if (qty > 0) totals[id] = (totals[id] || 0) + qty
    })
  })
  return totals
}

export function getTotalCount(session) {
  return Object.values(getTotals(session)).reduce((a, b) => a + b, 0)
}

export function getWhoOrdered(session, drinkId) {
  if (!session?.orders) return []
  return Object.entries(session.orders)
    .filter(([, order]) => (order[drinkId] || 0) > 0)
    .map(([name, order]) => `${name} ×${order[drinkId]}`)
}
