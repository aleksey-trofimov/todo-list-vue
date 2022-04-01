<template>
  <div class="content">
    <h1 v-if="this.editAction === 'new'">Создание нового элемента</h1>
    <h1 v-if="this.editAction === 'change'">Редактирование элемента</h1>
    <div class="list-element">
      <div class="list-element__title">
        Заголовок элемента:
        <input
          v-model="this.currentElement.elementTitle"
          class="list-element__title_input"
          @keydown.enter="updateElement()"
        />
      </div>

      <div class="list-element__task_title">Задачи:</div>

      <div
        v-for="task in this.currentElement.elementTasks"
        :key="getTaskIndex(task)"
      >
        <!-- ------------------- Отрисовка чекбокса ----------------------------- -->
        <label class="tasks-list__label">
          <input
            type="checkbox"
            class="tasks-list__checkbox"
            v-model="task.taskCompleted"
            @keydown.enter="updateElement()"
          />
          <span class="tasks-list__checkmark"></span>
        </label>
        <!-- ------------------------------------------------------------------- -->
        <input
          v-model="task.taskTitle"
          @keydown.enter="updateElement()"
          class="list-element__task_input"
        />
        <button class="list-element__button_delete" @click="deleteTask(task)">
          X
        </button>
      </div>

      <div class="list-element__controls">
        <button class="list-element__controls_button" @click="updateElement()">
          Сохранить
        </button>

        <button class="list-element__controls_button" @click="addTask()">
          Добавить задачу
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
    };
  },
  methods: {
    updateElement() {
      if (this.editAction === "change") {
        const elementId = this.$route.params.id;
        this.listData[elementId] = this.currentElement;
        localStorage.setItem("todo-list-data", JSON.stringify(this.listData));
        this.$router.push("/");
      }
      if (this.editAction === "new") {
        this.listData.push(this.currentElement);
        localStorage.setItem("todo-list-data", JSON.stringify(this.listData));
        this.$router.push("/");
      }
    },
    getTaskIndex(task) {
      //return this.listData[this.$route.params.id].elementTasks.findIndex( (i) => i == task );
      return this.currentElement.elementTasks.findIndex((i) => i == task);
    },
    addTask() {
      const newTask = {
        taskTitle: "Дефолтный заголовок",
        taskCompleted: false,
      };
      this.currentElement.elementTasks.push(newTask);
    },
    deleteTask(taskToDelete) {
      this.currentElement.elementTasks =
        this.currentElement.elementTasks.filter((t) => t !== taskToDelete);
    },
  },

  created() {
    this.editAction = this.$route.params.action;
    this.listData = JSON.parse(localStorage.getItem("todo-list-data"));

    if (this.editAction === "change") {
      // Забираем из local storage массив с записями

      if (this.editAction === "change" && this.$route.params.id) {
        this.currentElement = this.listData[this.$route.params.id];
      }
    }

    if (this.editAction === "new") {
      this.currentElement = {
        elementTitle: "Дефолтное название",
        elementTasks: [
          {
            taskTitle: "Дефолтный заголовок",
            taskCompleted: false,
          },
        ],
      };
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-element {
  padding: 13px;
  margin-bottom: 10px;
  background-color: #3f5369;
  border-radius: 15px;
}

.list-element__title {
  color: #eee;
  opacity: 0.7;
  font-size: 26px;
}
.list-element__title_input {
  color: #111;
  opacity: 0.7;
  font-size: 18px;
  display: block;
  margin-top: 5px;
}

.list-element__task_title {
  color: #eee;
  opacity: 0.7;
  font-size: 26px;
  margin-top: 20px;
}

.list-element__task_input {
  color: #111;
  opacity: 0.7;
  font-size: 18px;
  display: inline-block;
  margin-top: 0px;
  margin-left: 35px;
}

.list-element__controls {
  margin-top: 20px;
  display: inline-block;
}

.list-element__button_delete {
  color: white;
  opacity: 0.7;
  border: none;
  background-color: #5a7086;
  padding-left: 8px;
  padding-right: 8px;
  margin-left: 8px;
  font-size: 18px;
  cursor: pointer;
  display: inline-block;
  border-radius: 10px;
}

.list-element__button_delete:hover {
  background-color: #eee;
  color: #111;
}

/*----------------------------- tasks-list -------------------------------------*/

/* The container */
.tasks-list__label {
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 12px;
  font-size: 18px;
  cursor: pointer;
}

/* Checkbox */
.tasks-list__checkmark {
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
.tasks-list__label .tasks-list__checkmark:after {
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
.tasks-list__label input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

/* Create the checkmark/indicator (hidden when not checked) */
.tasks-list__checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.tasks-list__label input:checked ~ .tasks-list__checkmark:after {
  display: block;
}
/* -------------------------------------------------------------------------- */
</style>
