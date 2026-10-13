import { ref, computed, watch } from "vue";

const STORAGE_KEY = "vue-todos";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

const todos = ref(load());

watch(
  todos,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true },
);

export function useTodos() {
  function addTodo({ title, description = "" }) {
    todos.value.push({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    });
  }

  function updateTodo(id, updates) {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) Object.assign(todo, updates);
  }

  function deleteTodo(id) {
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  function toggleTodo(id) {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  function getTodo(id) {
    return todos.value.find((t) => t.id === id);
  }

  function clearCompleted() {
    todos.value = todos.value.filter((t) => !t.completed);
  }

  const total = computed(() => todos.value.length);
  const activeCount = computed(
    () => todos.value.filter((t) => !t.completed).length,
  );
  const completedCount = computed(
    () => todos.value.filter((t) => t.completed).length,
  );

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getTodo,
    clearCompleted,
    total,
    activeCount,
    completedCount,
  };
}
