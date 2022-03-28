<template>
  <TheMenu />
  <TodoList />
</template>

<script>
// @ is an alias to /src
import TheMenu from "@/components/TheMenu.vue";
import TodoList from "@/components/TodoList.vue";

export default {
  name: "HomeView",
  components: {
    TheMenu,
    TodoList,
  },
};
</script>
