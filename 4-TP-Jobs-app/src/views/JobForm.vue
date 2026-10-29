<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { createJob, getJob, updateJob } from '../services/jobs'

const route = useRoute()
const router = useRouter()
const isEditing = computed(() => Boolean(route.params.id))
const loading = ref(isEditing.value)
const saving = ref(false)
const error = ref('')
const form = reactive({
  title: '',
  company: '',
  location: '',
  type: 'Temps plein',
  salary: '',
  experience: '',
  description: '',
  requirements: '',
})

onMounted(async () => {
  if (!isEditing.value) return
  try {
    const job = await getJob(route.params.id)
    Object.assign(form, {
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      type: job.type || 'Temps plein',
      salary: job.salary ?? '',
      experience: job.experience ?? '',
      description: job.description || '',
      requirements: job.requirements || '',
    })
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

async function submitForm() {
  error.value = ''
  saving.value = true
  const payload = {
    ...form,
    salary: form.salary === '' ? null : Number(form.salary),
    experience: form.experience === '' ? null : Number(form.experience),
  }
  try {
    const job = isEditing.value
      ? await updateJob(route.params.id, payload)
      : await createJob({ ...payload, createdAt: new Date().toISOString() })
    await router.push({ name: 'job-details', params: { id: job.id } })
  } catch (err) {
    error.value = err.message
    saving.value = false
  }
}
</script>

<template>
  <section class="page-section">
    <div class="container form-container">
      <RouterLink class="back-link" to="/">← Retour aux offres</RouterLink>
      <div v-if="loading" class="state-card"><span class="spinner"></span><p>Chargement de l’offre...</p></div>
      <div v-else class="form-card">
        <div class="form-heading">
          <span class="eyebrow">{{ isEditing ? 'MODIFIER UNE OFFRE' : 'RECRUTEMENT' }}</span>
          <h1>{{ isEditing ? 'Modifier l’offre' : 'Publier une offre' }}</h1>
          <p>Partagez les détails du poste pour trouver la bonne personne.</p>
        </div>
        <div v-if="error" class="inline-error" role="alert">{{ error }}</div>
        <form @submit.prevent="submitForm">
          <div class="form-grid">
            <label class="field field-full">
              <span>Titre du poste <span class="required">*</span></span>
              <input v-model.trim="form.title" required maxlength="100" placeholder="Ex. Développeur frontend" />
            </label>
            <label class="field">
              <span>Entreprise <span class="required">*</span></span>
              <input v-model.trim="form.company" required maxlength="100" placeholder="Ex. Studio Atlas" />
            </label>
            <label class="field">
              <span>Ville / lieu <span class="required">*</span></span>
              <input v-model.trim="form.location" required maxlength="100" placeholder="Ex. Casablanca, Maroc" />
            </label>
            <label class="field">
              <span>Type de contrat <span class="required">*</span></span>
              <select v-model="form.type" required>
                <option>Temps plein</option><option>Temps partiel</option><option>Freelance</option><option>Stage</option><option>CDD</option><option>CDI</option>
              </select>
            </label>
            <label class="field">
              <span>Salaire mensuel (DH)</span>
              <input v-model="form.salary" type="number" min="0" step="500" placeholder="Ex. 12000" />
            </label>
            <label class="field">
              <span>Années d’expérience</span>
              <input v-model="form.experience" type="number" min="0" step="1" placeholder="Ex. 2" />
            </label>
            <label class="field field-full">
              <span>Description du poste <span class="required">*</span></span>
              <textarea v-model.trim="form.description" required maxlength="3000" rows="6" placeholder="Décrivez les missions et les responsabilités du poste..."></textarea>
            </label>
            <label class="field field-full">
              <span>Profil recherché</span>
              <textarea v-model.trim="form.requirements" maxlength="2000" rows="4" placeholder="Compétences, formation et qualités recherchées..."></textarea>
            </label>
          </div>
          <div class="form-actions">
            <RouterLink class="button button-quiet" to="/">Annuler</RouterLink>
            <button class="button button-primary" type="submit" :disabled="saving">
              {{ saving ? 'Enregistrement...' : isEditing ? 'Enregistrer les modifications' : 'Publier l’offre' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
