<script>
import BookCard from './BookCard.vue'

export default {
  components: {
    BookCard,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-fav'],
}
</script>

<template>
  <section class="catalogue" aria-labelledby="catalogue-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Votre sélection</p>
        <h2 id="catalogue-title">Les livres <span class="book-count">{{ books.length }}</span></h2>
      </div>
    </div>

    <p v-if="books.length === 0" class="empty-state">Aucun livre pour le moment. Ajoutez votre première lecture !</p>

    <div v-else class="book-grid">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
        @toggle-fav="$emit('toggle-fav', $event)"
      >
        <template #actions>
          <span class="card-note">Dans votre bibliothèque</span>
        </template>
      </BookCard>
    </div>
  </section>
</template>
