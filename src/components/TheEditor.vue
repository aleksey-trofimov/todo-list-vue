<template>
  <div id="content">
    <h1 v-if="this.editAction === 'new'">Создание нового элемента</h1>
    <h1 v-if="this.editAction === 'change'">Редактирование элемента</h1>
    <br />
    <div id="element-title-input">
      Заголовок элемента: <input v-model="this.currentElement.elementTitle" />
    </div>

    <p />
  </div>
</template>

<script>
export default {
  name: "TheEditor",

  data() {
    return {
      editAction: "",
      listData: [],
      currentElement: null,
      elementTitle: "",
    };
  },

  created() {
    this.editAction = this.$route.params.action;
    // Забираем из local storage массив с записями
    this.listData = JSON.parse(localStorage.getItem("todo-list-data"));

    // При
    if (this.$route.params.action === "change" && this.$route.params.id) {
      console.log("good");
      this.currentElement = this.listData[this.$route.params.id];
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
