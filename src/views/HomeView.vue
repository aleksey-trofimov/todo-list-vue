<template>
  <div class="header">
    <img alt="Vue logo" src="../assets/logo.png" />

    <!-- to="{ name: 'editRecord', params: { newRecord: true } }" -->

    <router-link :to="{ name: 'edit', params: { newRecord: true } }">
      Новая запись
    </router-link>

    <TodoList />
  </div>
  <!-- <router-link to="/edit"> Новая запись </router-link> -->
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/TodoList.vue";

export default {
  name: "HomeView",
  components: {
    TodoList,
  },
};
</script>

<style scoped>
.buttonAdd {
  display: block;
  background-color: rgb(134, 178, 230);
}
</style>
