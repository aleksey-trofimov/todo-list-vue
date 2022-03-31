<template>
  <div id="content">
    <h1 v-if="this.editAction === 'new'">Создание нового элемента</h1>
    <h1 v-if="this.editAction === 'change'">Редактирование элемента</h1>
    <div id="list-element">
      <div v-if="this.editAction === 'change'" id="element-title">
        Заголовок элемента:
        <input
          v-model="this.currentElement.elementTitle"
          id="element-title-input"
        />
      </div>

      <div id="element-tasks-title">Задачи:</div>

      <div
        v-for="task in this.currentElement.elementTasks"
        :key="getTaskIndex(task)"
      >
        <!-- ------------------- Отрисовка чекбокса ----------------------------- -->
        <label class="tasks-list-label">
          <input
            type="checkbox"
            id="tasks-list-checkbox"
            v-model="task.taskCompleted"
          />
          <span class="tasks-list-checkmark"></span>
        </label>
        <!-- ------------------------------------------------------------------- -->
        <input v-model="task.taskTitle" id="element-task-input" />
      </div>

      <div id="list-element-controls">
        <button
          id="list-element-controls-button"
          @click="updateElement(this.$route.params.id)"
        >
          Сохранить
        </button>
      </div>
    </div>
    <p />
  </div>
</template>

<script>
export default {
  name: "TheEditor",

  data() {
    return {
      editAction: "", // new или change
      listData: [],
      currentElement: null,
      elementTitle: "",
    };
  },
  methods: {
    updateElement(elementId) {
      this.listData[elementId] = this.currentElement;
      localStorage.setItem("todo-list-data", JSON.stringify(this.listData));
      this.$router.push("/");
    },
    getTaskIndex(task) {
      return this.listData[this.$route.params.id].elementTasks.findIndex(
        (i) => i == task
      );
    },
  },

  created() {
    this.editAction = this.$route.params.action;
    // Забираем из local storage массив с записями
    this.listData = JSON.parse(localStorage.getItem("todo-list-data"));

    if (this.editAction === "change" && this.$route.params.id) {
      this.currentElement = this.listData[this.$route.params.id];
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#list-element {
  padding: 13px;
  margin-bottom: 10px;
  background-color: #3f5369;
  border-radius: 15px;
}

#element-title {
  color: #eee;
  opacity: 0.7;
  font-size: 26px;
}
#element-title-input {
  color: #111;
  opacity: 0.7;
  font-size: 18px;
  display: block;
  margin-top: 5px;
}

#element-tasks-title {
  color: #eee;
  opacity: 0.7;
  font-size: 26px;
  margin-top: 20px;
}

#element-task-input {
  color: #111;
  opacity: 0.7;
  font-size: 18px;
  display: block;
  margin-top: 5px;
  margin-left: 35px;
}

#list-element-controls {
  margin-top: 20px;
}

#list-element-controls-button {
  color: white;
  opacity: 0.7;
  border: none;
  background-color: #5a7086;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 15px;
  margin-left: 15px;
  font-size: 18px;
  cursor: pointer;
  display: inline-block;
  border-radius: 10px;
}

#list-element-controls-button:hover {
  background-color: #eee;
  color: #111;
}

/*----------------------------- tasks-list -------------------------------------*/

/* The container */
.tasks-list-label {
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 12px;
  font-size: 18px;
  cursor: pointer;
}

/* Checkbox */
.tasks-list-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 3px;
  margin-top: 2px;
  height: 23px;
  width: 23px;
  background-color: azure;
}

/* Checkmark/indicator */
.tasks-list-label .tasks-list-checkmark:after {
  left: 4px;
  top: 0px;
  width: 12px;
  height: 12px;
  border: solid red;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* Hide the browser's default checkbox */
.tasks-list-label input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

/* Create the checkmark/indicator (hidden when not checked) */
.tasks-list-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.tasks-list-label input:checked ~ .tasks-list-checkmark:after {
  display: block;
}
/* -------------------------------------------------------------------------- */
</style>
