const now = new Date()
const rawTimeStamp = now.toLocaleString('en-AU', {hour: '2-digit', minute:'2-digit', second:'2-digit'})

export const timestamp = `[${rawTimeStamp}]:`