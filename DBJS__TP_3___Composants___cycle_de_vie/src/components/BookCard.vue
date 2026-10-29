<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
      validator(book) {
        return Boolean(book) && typeof book.title === 'string' && book.title.trim().length > 0
      },
    },
  },
  emits: ['toggle-fav'],
}
</script>

<template>
  <article class="book-card">
    <div class="book-cover" aria-hidden="true">
      <span class="cover-mark">L</span>
      <span class="cover-lines"></span>
    </div>

    <div class="book-info">
      <p class="book-author">{{ book.author }}</p>
      <h3>{{ book.title }}</h3>
      <p v-if="book.year" class="book-year">{{ book.year }}</p>
      <div class="book-card-footer">
        <button
          class="favorite-button"
          :class="{ 'is-favorite': book.isFav }"
          type="button"
          :aria-pressed="book.isFav"
          @click="$emit('toggle-fav', book.id)"
        >
          <span aria-hidden="true">{{ book.isFav ? '★' : '☆' }}</span>
          {{ book.isFav ? 'Favori' : 'Ajouter aux favoris' }}
        </button>
        <span v-if="book.isFav" class="favorite-badge">Coup de cœur</span>
        <slot name="actions"></slot>
      </div>
    </div>
  </article>
</template>
