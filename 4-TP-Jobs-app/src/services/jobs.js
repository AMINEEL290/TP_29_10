const API_URL = 'http://localhost:3000/jobs'

async function request(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`Erreur serveur (${response.status}). Veuillez réessayer.`)
  }
  if (response.status === 204) return null
  return response.json()
}

export function getJobs() {
  return request(API_URL)
}

export function getJob(id) {
  return request(`${API_URL}/${encodeURIComponent(id)}`)
}

export function createJob(job) {
  return request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  })
}

export function updateJob(id, job) {
  return request(`${API_URL}/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  })
}

export function deleteJob(id) {
  return request(`${API_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
