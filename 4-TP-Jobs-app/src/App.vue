<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="container header-content">
        <RouterLink class="brand" to="/" aria-label="JobBoard, accueil">
          <span class="brand-icon">J</span>
          <span>job<span class="brand-accent">board</span></span>
        </RouterLink>
        <nav class="main-nav" aria-label="Navigation principale">
          <RouterLink to="/">Offres d'emploi</RouterLink>
          <RouterLink class="nav-cta" to="/jobs/new">＋ Publier une offre</RouterLink>
        </nav>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
    <footer class="site-footer">
      <div class="container footer-content">
        <RouterLink class="brand footer-brand" to="/">
          <span class="brand-icon">J</span><span>job<span class="brand-accent">board</span></span>
        </RouterLink>
        <span>Le prochain chapitre de votre carrière commence ici.</span>
      </div>
    </footer>
  </div>
</template>
