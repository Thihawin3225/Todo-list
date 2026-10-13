<script setup>
import { useTodos } from "@/composables/useTodos";
const { activeCount, total } = useTodos();
</script>

<template>
  <div class="app">
    <header>
      <h1>📝 My Todos</h1>
      <nav>
        <RouterLink to="/todos">All</RouterLink>
        <RouterLink to="/todos/new" class="btn-new">+ New</RouterLink>
      </nav>
      <p class="stats">{{ activeCount }} active / {{ total }} total</p>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: system-ui, sans-serif;
  background: #f5f7fa;
  margin: 0;
}
.app {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
}
header {
  margin-bottom: 20px;
}
header h1 {
  margin: 0 0 10px;
}
nav {
  display: flex;
  gap: 12px;
  align-items: center;
}
nav a {
  text-decoration: none;
  color: #333;
  padding: 6px 12px;
  border-radius: 6px;
}
nav a.router-link-active {
  background: #e0e7ff;
  color: #3730a3;
  font-weight: 600;
}
.btn-new {
  background: #4f46e5;
  color: #fff !important;
}
.stats {
  color: #666;
  font-size: 14px;
  margin: 8px 0 0;
}
</style>
