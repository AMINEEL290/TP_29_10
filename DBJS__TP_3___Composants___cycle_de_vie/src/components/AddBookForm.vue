<script>
export default {
  emits: ['add-book'],
  data() {
    return {
      title: '',
      author: '',
      year: '',
    }
  },
  mounted() {
    this.$refs.titreInput.focus()
  },
  methods: {
    submitForm() {
      const title = this.title.trim()
      const author = this.author.trim()

      if (!title || !author) {
        return
      }

      this.$emit('add-book', {
        title,
        author,
        year: this.year ? Number(this.year) : null,
      })

      this.title = ''
      this.author = ''
      this.year = ''
      this.$refs.titreInput.focus()
    },
  },
}
</script>

<template>
  <form class="book-form" @submit.prevent="submitForm">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Une nouvelle lecture</p>
        <h2>Ajouter un livre</h2>
      </div>
    </div>

    <div class="form-fields">
      <label>
        Titre
        <input
          ref="titreInput"
          v-model="title"
          name="title"
          placeholder="Ex. Le Petit Prince"
          required
        />
      </label>
      <label>
        Auteur
        <input v-model="author" name="author" placeholder="Ex. Antoine de Saint-Exupéry" required />
      </label>
      <label class="year-field">
        Année
        <input v-model="year" name="year" type="number" min="0" placeholder="1943" />
      </label>
      <button class="primary-button" type="submit">Ajouter le livre</button>
    </div>
  </form>
</template>
