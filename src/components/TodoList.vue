<template>
  <div id="content">
    <h1>Todo List</h1>
    <div
      v-for="element in listData"
      :key="element.elementTitle"
      id="list-element"
    >
      <div id="list-element-name">{{ element.elementTitle }}</div>
      <div id="list-element-tasks">
        <label
          v-for="task in element.elementTasks.slice(0, 3)"
          :key="task.taskTitle"
          class="tasks-list-label"
        >
          <input
            type="checkbox"
            id="tasks-list-checkbox"
            v-if="task.taskCompleted"
            checked
            disabled
          />
          <span class="tasks-list-checkmark"></span>
          {{ task.taskTitle }}
        </label>

        <label v-if="element.elementTasks.length > 3" class="tasks-list-label"
          >...</label
        >
      </div>
      <div id="list-element-controls">
        <button
          id="list-element-controls-button"
          @click="$router.push('/edit/1')"
        >
          Редактировать
        </button>
        <button
          id="list-element-controls-button"
          @click="deleteElement(element)"
        >
          Удалить
        </button>
      </div>
    </div>

    <p />
  </div>
</template>

<script>
export default {
  name: "TodoList",

  data() {
    return {
      listData: [
        {
          elementTitle: "Заголовок первого элемента",
          elementTasks: [
            {
              taskTitle: "Заголовок первой задачи",
              taskCompleted: true,
            },
            {
              taskTitle: "Заголовок второй задачи",
              taskCompleted: false,
            },
            {
              taskTitle: "Заголовок третьей задачи",
              taskCompleted: false,
            },
            {
              taskTitle: "Заголовок четвертой задачи",
              taskCompleted: false,
            },
          ],
        },
        {
          elementTitle: "Заголовок второго элемента",
          elementTasks: [
            {
              taskTitle: "Заголовок первой задачи",
              taskCompleted: true,
            },
            {
              taskTitle: "Заголовок второй задачи",
              taskCompleted: false,
            },
            {
              taskTitle: "Заголовок третьей задачи",
              taskCompleted: false,
            },
          ],
        },
      ],
    };
  },

  methods: {
    deleteElement(elementToRemove) {
      this.listData = this.listData.filter((t) => t !== elementToRemove);
    },
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

#list-element-name {
  color: white;
  opacity: 0.7;
  font-size: 18px;
  font-weight: bold;
}

#list-element-tasks {
  color: white;
  opacity: 0.6;
  margin-top: 11px;
  margin-bottom: 11px;
}

/*----------------------------- tasks-list -------------------------------------*/

/* The container */
.tasks-list-label {
  display: block;
  position: relative;
  padding-left: 40px;
  margin-bottom: 12px;
  font-size: 18px;
  cursor: text;
}

/* Checkbox */
.tasks-list-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 16px;
  margin-top: 2px;
  height: 15px;
  width: 15px;
  background-color: azure;
}

/* Checkmark/indicator */
.tasks-list-label .tasks-list-checkmark:after {
  left: 2px;
  top: 0px;
  width: 8px;
  height: 8px;
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

/*----------------------------- list-element-controls -------------------------------------*/

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
</style>
