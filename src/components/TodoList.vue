<template>
  <div class="hello">
    <h1>Todo List</h1>
    <div class="listElement">Первая большая задача</div>
    <div class="listElement">Вторая большая задача</div>
    <div class="listElement">Третья большая задача</div>
  </div>
</template>

<script>
export default {
  name: "TodoList",

  data() {
    return {
      listData: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.hello {
  background-color: aliceblue;
}
.listElement {
  background-color: rgb(179, 165, 47);
}
a {
  color: #42b983;
}
</style>
