<template>
  <div id="content">
    <h1>Todo List</h1>
    <div id="list-element">
      <div id="list-element-name">Первая большая задача</div>
      <div id="list-element-tasks">
        <label id="tasks-list-label">
          <input type="checkbox" id="tasks-list-checkbox" checked disabled />
          <span class="tasks-list-checkmark"></span>
          Первый подпункт
        </label>

        <label class="container">
          <input type="radio" id="tasks-list-checkbox" unchecked disabled />
          <span id="tasks-list-checkmark"></span>
          Второй подпункт
        </label>

        <label id="tasks-list-label">
          <input type="checkbox" id="tasks-list-checkbox" checked disabled />
          <span id="tasks-list-checkmark"></span>
          Третий подпункт
        </label>
      </div>
      <div id="list-element-controls">Редактировать Удалить</div>
    </div>

    <div id="list-element">
      <div id="list-element-name">Вторая большая задача</div>
      <div id="list-element-tasks">
        <label id="tasks-list-label">
          <input type="checkbox" id="tasks-list-checkbox" unchecked disabled />
          <span id="tasks-list-checkmark"></span>
          Первый подпункт
        </label>

        <label id="tasks-list-label">
          <input type="checkbox" id="tasks-list-checkbox" unchecked disabled />
          <span id="tasks-list-checkmark"></span>
          Второй подпункт
        </label>

        <label id="tasks-list-label">
          <input type="checkbox" id="tasks-list-checkbox" checked disabled />
          <span id="tasks-list-checkmark"></span>
          Третий подпункт
        </label>
      </div>
      <div id="list-element-controls">Редактировать Удалить</div>
    </div>

    <p />
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

#list-element-controls {
  color: white;
  opacity: 0.7;
}

#tasks-list-label {
  list-style-type: none;
  margin-left: 15px;
  padding: 0px;
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#tasks-list-checkbox {
  background-color: red;
  color: green;
}

/* Hide the browser's default radio button */
#tasks-list-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.tasks-list-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #bcc5cf;
  border-radius: 30%;
}
</style>
