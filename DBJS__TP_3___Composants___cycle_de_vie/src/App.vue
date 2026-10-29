<script>
import AddBookForm from './components/AddBookForm.vue'
import BookList from './components/BookList.vue'

export default {
  components: {
    AddBookForm,
    BookList,
  },
  data() {
    return {
      loading: true,
      books: [],
      initialBooks: [
        {
          id: 1,
          title: 'L’Étranger',
          author: 'Albert Camus',
          year: 1942,
          isFav: true,
        },
        {
          id: 2,
          title: 'Le Petit Prince',
          author: 'Antoine de Saint-Exupéry',
          year: 1943,
          isFav: false,
        },
        {
          id: 3,
          title: 'La Boîte à merveilles',
          author: 'Ahmed Sefrioui',
          year: 1954,
          isFav: false,
        },
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      this.books = this.initialBooks
      this.loading = false
    }, 600)
  },
  methods: {
    addBook(bookDetails) {
      this.books.push({
        ...bookDetails,
        id: Date.now(),
        isFav: false,
      })
    },
    toggleFavorite(bookId) {
      const book = this.books.find((item) => item.id === bookId)
      if (book) {
        book.isFav = !book.isFav
      }
    },
  },
}
</script>

<template>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">Bibliothèque personnelle</p>
      <h1>Catalogue de livres</h1>
      <p class="intro">Retrouvez vos lectures et gardez vos coups de cœur à portée de main.</p>
    </header>

    <p v-show="loading" class="loading" role="status">Chargement des livres…</p>

    <div v-show="!loading">
      <AddBookForm @add-book="addBook" />
      <BookList :books="books" @toggle-fav="toggleFavorite" />
    </div>
  </main>
</template>
