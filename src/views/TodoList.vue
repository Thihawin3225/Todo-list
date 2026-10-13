<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodos } from "@/composables/useTodos";

const route = useRoute();
const router = useRouter();
const {
  todos,
  toggleTodo,
  deleteTodo,
  activeCount,
  completedCount,
  clearCompleted,
} = useTodos();

// URL query `?filter=active|completed` (default: all)
const filter = computed(() => route.query.filter || "all");

const filteredTodos = computed(() => {
  if (filter.value === "active") return todos.value.filter((t) => !t.completed);
  if (filter.value === "completed")
    return todos.value.filter((t) => t.completed);
  return todos.value;
});

function setFilter(value) {
  router.replace({ query: value === "all" ? {} : { filter: value } });
}
</script>

<template>
  <div>
    <!-- Filter buttons -->
    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="setFilter('all')">
        All ({{ todos.length }})
      </button>
      <button
        :class="{ active: filter === 'active' }"
        @click="setFilter('active')"
      >
        Active ({{ activeCount }})
      </button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="setFilter('completed')"
      >
        Completed ({{ completedCount }})
      </button>
    </div>

    <!-- Empty state -->
    <p v-if="todos.length === 0" class="empty">
      No todos yet. <RouterLink to="/todos/new">Add one</RouterLink> 👈
    </p>

    <p v-else-if="filteredTodos.length === 0" class="empty">
      No {{ filter }} todos.
    </p>

    <!-- List -->
    <ul v-else class="todo-list">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="{ done: todo.completed }"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />

        <RouterLink
          :to="{ name: 'todo-detail', params: { id: todo.id } }"
          class="title"
        >
          {{ todo.title }}
        </RouterLink>

        <button class="del" @click="deleteTodo(todo.id)" title="Delete">
          ✕
        </button>
      </li>
    </ul>

    <!-- Clear completed -->
    <button v-if="completedCount > 0" class="clear-btn" @click="clearCompleted">
      Clear completed ({{ completedCount }})
    </button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.filters button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}
.filters button.active {
  background: #4f46e5;
  color: #fff;
  border-color: #4f46e5;
}
.empty {
  color: #888;
  text-align: center;
  padding: 30px 0;
}
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.todo-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
}
.todo-list li.done .title {
  text-decoration: line-through;
  color: #999;
}
.title {
  flex: 1;
  text-decoration: none;
  color: #222;
}
.title:hover {
  color: #4f46e5;
}
.del {
  border: none;
  background: transparent;
  color: #c33;
  cursor: pointer;
  font-size: 16px;
}
.clear-btn {
  margin-top: 12px;
  padding: 6px 12px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  color: #c33;
}
</style>
