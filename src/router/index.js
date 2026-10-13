import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/todos" },
  {
    path: "/todos",
    name: "todos",
    component: () => import("@/views/TodoList.vue"),
  },
  {
    path: "/todos/new",
    name: "todo-new",
    component: () => import("@/views/AddTodo.vue"),
  },
  {
    path: "/todos/:id",
    name: "todo-detail",
    component: () => import("@/views/TodoDetail.vue"),
    props: true,
  },
  { path: "/:pathMatch(.*)*", component: () => import("@/views/NotFound.vue") },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
