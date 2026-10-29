<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getJobs } from '../services/jobs'

const jobs = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')

const filteredJobs = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('fr')
  if (!query) return jobs.value
  return jobs.value.filter((job) =>
    [job.title, job.company, job.location, job.type]
      .filter(Boolean)
      .some((value) => value.toLocaleLowerCase('fr').includes(query)),
  )
})

function formatSalary(salary) {
  return salary ? `${new Intl.NumberFormat('fr-FR').format(salary)} DH / mois` : 'Salaire à discuter'
}

onMounted(async () => {
  try {
    jobs.value = await getJobs()
  } catch (err) {
    error.value = `${err.message} Vérifiez que le serveur JSON est démarré (npm run server).`
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="hero">
    <div class="container hero-content">
      <span class="eyebrow"><span class="eyebrow-dot"></span> VOTRE CARRIÈRE, NOUVEAU DÉPART</span>
      <h1>Trouvez le travail<br />qui vous <span>correspond.</span></h1>
      <p>Les bonnes opportunités font les belles carrières. Découvrez votre prochain défi.</p>
      <div class="search-bar">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input v-model="search" type="search" placeholder="Poste, entreprise ou ville..." aria-label="Rechercher une offre" />
        <span class="search-hint">{{ filteredJobs.length }} offre{{ filteredJobs.length === 1 ? '' : 's' }}</span>
      </div>
      <div class="hero-note"><span>✦</span> De nouvelles opportunités vous attendent</div>
    </div>
    <div class="hero-decoration hero-decoration-one"></div>
    <div class="hero-decoration hero-decoration-two"></div>
  </section>

  <section class="container jobs-section">
    <div class="section-heading">
      <div>
        <span class="eyebrow">À DÉCOUVRIR</span>
        <h2>Offres d'emploi <span class="count-pill">{{ filteredJobs.length }}</span></h2>
        <p>Des opportunités sélectionnées pour faire avancer votre carrière.</p>
      </div>
      <RouterLink class="button button-primary" to="/jobs/new"><span aria-hidden="true">＋</span> Ajouter une offre</RouterLink>
    </div>

    <div v-if="loading" class="state-card">
      <span class="spinner"></span><p>Chargement des offres...</p>
    </div>
    <div v-else-if="error" class="state-card state-error" role="alert">
      <span class="state-icon">!</span><h3>Impossible de charger les offres</h3><p>{{ error }}</p>
    </div>
    <div v-else-if="filteredJobs.length" class="jobs-grid">
      <article v-for="(job, index) in filteredJobs" :key="job.id" class="job-card" :style="{ '--card-index': index }">
        <div class="job-card-top">
          <div class="company-avatar" :class="`avatar-${index % 5}`">{{ (job.company || 'E').charAt(0).toUpperCase() }}</div>
          <span class="job-type">{{ job.type || 'Temps plein' }}</span>
        </div>
        <h3><RouterLink :to="{ name: 'job-details', params: { id: job.id } }">{{ job.title }}</RouterLink></h3>
        <p class="company-name">{{ job.company }}</p>
        <div class="job-meta">
          <span><span aria-hidden="true">⌖</span> {{ job.location }}</span>
          <span><span aria-hidden="true">◷</span> {{ formatSalary(job.salary) }}</span>
        </div>
        <p class="job-description">{{ job.description }}</p>
        <div class="job-card-bottom">
          <span class="posted-date">Publié le {{ new Date(job.createdAt).toLocaleDateString('fr-FR') }}</span>
          <RouterLink class="card-link" :to="{ name: 'job-details', params: { id: job.id } }" :aria-label="`Voir l'offre ${job.title}`">Voir l'offre <span aria-hidden="true">→</span></RouterLink>
        </div>
      </article>
    </div>
    <div v-else class="state-card empty-state">
      <span class="state-icon">⌕</span>
      <h3>{{ search ? 'Aucun résultat' : 'Pas encore d’offres' }}</h3>
      <p>{{ search ? 'Essayez un autre mot-clé ou une autre ville.' : 'Soyez le premier à publier une opportunité.' }}</p>
      <RouterLink v-if="!search" class="button button-primary" to="/jobs/new">Publier une offre</RouterLink>
    </div>
  </section>
</template>
