<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useTodos } from "@/composables/useTodos";

const props = defineProps({ id: String });
const router = useRouter();
const { getTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();

const todo = ref(getTodo(props.id));
const editing = ref(false);
const editTitle = ref("");

watch(
  () => props.id,
  (id) => {
    todo.value = getTodo(id);
    editing.value = false;
  },
);

function startEdit() {
  editing.value = true;
  editTitle.value = todo.value.title;
}

function saveEdit() {
  if (editTitle.value.trim()) {
    updateTodo(props.id, { title: editTitle.value.trim() });
  }
  editing.value = false;
}

function remove() {
  if (confirm("Delete this todo?")) {
    deleteTodo(props.id);
    router.push("/todos");
  }
}

const createdLabel = computed(() =>
  todo.value ? new Date(todo.value.createdAt).toLocaleString() : "",
);
</script>

<template>
  <div v-if="todo" class="detail">
    <RouterLink to="/todos" class="back">← Back</RouterLink>

    <h2>
      <input
        v-if="editing"
        v-model="editTitle"
        @keyup.enter="saveEdit"
        @blur="saveEdit"
        class="edit-input"
      />
      <span v-else :class="{ done: todo.completed }" @dblclick="startEdit">
        {{ todo.title }}
      </span>
    </h2>

    <p class="meta">Created: {{ createdLabel }}</p>
    <p v-if="todo.description" class="desc">{{ todo.description }}</p>

    <div class="actions">
      <button @click="toggleTodo(props.id)">
        Mark as {{ todo.completed ? "Active" : "Completed" }}
      </button>
      <button v-if="!editing" @click="startEdit">Edit</button>
      <button class="danger" @click="remove">Delete</button>
    </div>
  </div>

  <div v-else>
    <p>Todo not found.</p>
    <RouterLink to="/todos">← Back to list</RouterLink>
  </div>
</template>

<style scoped>
.detail {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
.back {
  color: #4f46e5;
  text-decoration: none;
}
h2 {
  margin: 12px 0;
}
h2 .done {
  text-decoration: line-through;
  color: #999;
}
.edit-input {
  width: 100%;
  padding: 6px;
  font-size: 20px;
  font-weight: 600;
}
.meta {
  color: #888;
  font-size: 13px;
}
.desc {
  line-height: 1.5;
}
.actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.actions button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}
.actions .danger {
  color: #c33;
  border-color: #f3c3c3;
}
</style>
