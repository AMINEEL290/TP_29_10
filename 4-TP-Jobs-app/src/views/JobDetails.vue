<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { deleteJob, getJob } from '../services/jobs'

const route = useRoute()
const router = useRouter()
const job = ref(null)
const loading = ref(true)
const error = ref('')
const deleting = ref(false)

function formatSalary(salary) {
  return salary ? `${new Intl.NumberFormat('fr-FR').format(salary)} DH / mois` : 'Salaire à discuter'
}

async function removeJob() {
  if (!window.confirm(`Voulez-vous vraiment supprimer l’offre « ${job.value.title} » ?`)) return
  deleting.value = true
  error.value = ''
  try {
    await deleteJob(route.params.id)
    await router.push({ name: 'home' })
  } catch (err) {
    error.value = err.message
    deleting.value = false
  }
}

onMounted(async () => {
  try {
    job.value = await getJob(route.params.id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="page-section">
    <div class="container detail-container">
      <RouterLink class="back-link" to="/">← Retour aux offres</RouterLink>
      <div v-if="loading" class="state-card"><span class="spinner"></span><p>Chargement de l’offre...</p></div>
      <div v-else-if="error && !job" class="state-card state-error" role="alert"><h3>Offre introuvable</h3><p>{{ error }}</p></div>
      <template v-else-if="job">
        <div v-if="error" class="inline-error" role="alert">{{ error }}</div>
        <article class="detail-card">
          <div class="detail-heading">
            <div class="company-avatar avatar-0 detail-avatar">{{ (job.company || 'E').charAt(0).toUpperCase() }}</div>
            <div class="detail-title">
              <span class="job-type">{{ job.type || 'Temps plein' }}</span>
              <h1>{{ job.title }}</h1>
              <p>{{ job.company }} <span class="meta-separator">·</span> {{ job.location }}</p>
            </div>
            <div class="detail-actions">
              <RouterLink class="button button-outline" :to="{ name: 'job-edit', params: { id: job.id } }">Modifier</RouterLink>
              <button class="button button-danger" type="button" :disabled="deleting" @click="removeJob">{{ deleting ? 'Suppression...' : 'Supprimer' }}</button>
            </div>
          </div>
          <div class="detail-facts">
            <div><span class="fact-label">Salaire</span><strong>{{ formatSalary(job.salary) }}</strong></div>
            <div><span class="fact-label">Expérience</span><strong>{{ job.experience ? `${job.experience} an${job.experience > 1 ? 's' : ''}` : 'Non précisée' }}</strong></div>
            <div><span class="fact-label">Date de publication</span><strong>{{ new Date(job.createdAt).toLocaleDateString('fr-FR') }}</strong></div>
          </div>
          <div class="detail-body">
            <h2>À propos du poste</h2>
            <p class="detail-description">{{ job.description }}</p>
            <template v-if="job.requirements">
              <h2>Profil recherché</h2>
              <p class="detail-description">{{ job.requirements }}</p>
            </template>
          </div>
        </article>
      </template>
    </div>
  </section>
</template>
