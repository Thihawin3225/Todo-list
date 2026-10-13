<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTodos } from "@/composables/useTodos";

const router = useRouter();
const { addTodo } = useTodos();

const title = ref("");
const description = ref("");
const error = ref("");

function submit() {
  if (!title.value.trim()) {
    error.value = "Title is required";
    return;
  }
  addTodo({ title: title.value, description: description.value });
  router.push("/todos");
}
</script>

<template>
  <form @submit.prevent="submit" class="form">
    <h2>Add Todo</h2>

    <label>
      Title *
      <input v-model="title" placeholder="What needs to be done?" />
    </label>
    <p v-if="error" class="error">{{ error }}</p>

    <label>
      Description
      <textarea v-model="description" rows="3"></textarea>
    </label>

    <div class="actions">
      <RouterLink to="/todos" class="cancel">Cancel</RouterLink>
      <button type="submit">Add</button>
    </div>
  </form>
</template>

<style scoped>
.form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
label {
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
}
input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-top: 4px;
  font-family: inherit;
}
.error {
  color: #c33;
  font-size: 13px;
  margin: -8px 0 8px;
}
.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
button {
  background: #4f46e5;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
.cancel {
  padding: 8px 12px;
  color: #666;
  text-decoration: none;
}
</style>
