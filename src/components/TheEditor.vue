<template>
  <div class="content">
    <h1 v-if="this.editAction === 'new'">Создание новой заметки</h1>
    <h1 v-if="this.editAction === 'change'">Редактирование заметки</h1>
    <div class="list-element">
      <div class="list-element__title">
        Заголовок заметки:
        <input
          v-model="this.currentElement.elementTitle"
          @keydown.enter="updateElement()"
          @input="addHistoryRecord()"
          class="list-element__title_input"
          placeholder="Укажите заголовок"
        />
      </div>

      <div class="list-element__task_title">Задачи:</div>

      <div
        class="tasks-list__container"
        v-for="task in this.currentElement.elementTasks"
        :key="getTaskIndex(task)"
      >
        <!-- ------------------- Отрисовка чекбокса ----------------------------- -->
        <label class="tasks-list__label">
          <input
            type="checkbox"
            class="tasks-list__checkbox"
            v-model="task.taskCompleted"
            @change="addHistoryRecord()"
          />
          <span class="tasks-list__checkmark"></span>
        </label>
        <!-- ------------------------------------------------------------------- -->
        <input
          v-model="task.taskTitle"
          @input="addHistoryRecord()"
          @keydown.enter="updateElement()"
          class="tasks-list__task_input"
          placeholder="Укажите название"
        />
        <button class="tasks-list__button_delete" @click="deleteTask(task)">
          X
        </button>
      </div>

      <button class="list-element__button_addtask" @click="addTask()">+</button>

      <button
        class="list-element__button_cancelchanges"
        @click="cancelChanges()"
        v-if="this.editAction === 'change'"
        :disabled="this.elementHistoryPointer == 0"
      >
        Отменить изменения
      </button>

      <div class="list-element__controls">
        <button class="list-element__controls_button" @click="updateElement()">
          Сохранить
        </button>
        <button
          data-tooltip="Отменить"
          class="list-element__controls_button"
          v-if="this.editAction === 'change'"
          @click="showPreviousChange()"
          :disabled="this.elementHistoryPointer == 0"
        >
          &lt;=
        </button>

        <button
          class="list-element__controls_button"
          v-if="this.editAction === 'change'"
          @click="showNextChange()"
          :disabled="
            this.elementHistoryPointer >= this.elementHistoryData.length - 1
          "
        >
          =&gt;
        </button>
        <button
          class="list-element__controls_button"
          v-if="this.editAction === 'change'"
          @click="deleteCurrentElement()"
        >
          Удалить заметку
        </button>
      </div>
    </div>
    <p />
  </div>

  <!-- Модальное окно  -->
  <modal-window ref="modalWindowRef">
    <template #modalHeader>Удалить заметку?</template>

    <!-- Функции описаны в компоненте модального окна -->
    <template #modalButton="{ confirmOk, closeCancel }">
      <button class="modal-footer__button" @click="confirmOk">
        Подтвердить
      </button>
      <button class="modal-footer__button" @click="closeCancel">
        Отменить
      </button>
    </template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow.vue";
export default {
  name: "TheEditor",

  components: {
    ModalWindow,
  },

  data() {
    return {
      editAction: "", // new или change
      listData: [],
      elementHistoryData: [],
      elementHistoryPointer: 0,
      currentElement: null,
      beforeEditElement: null,

      taskTemplate: {
        taskTitle: "",
        taskCompleted: false,
      },
    };
  },
  methods: {
    /* Добавить новый элемент в список, а также сохранить изменения в имеющемся. */
    updateElement() {
      if (this.editAction === "change") {
        const elementId = this.$route.params.id;
        this.listData[elementId] = this.currentElement;
      }
      if (this.editAction === "new") {
        this.listData.push(this.currentElement);
      }

      localStorage.setItem("todo-list-data", JSON.stringify(this.listData));

      /* Принудительно перейти на главную страницу */
      this.$router.push("/");
    },
    getTaskIndex(task) {
      return this.currentElement.elementTasks.findIndex((i) => i == task);
    },
    addTask() {
      const newTask = this.copyObject(this.taskTemplate);
      this.currentElement.elementTasks.push(newTask);
      this.addHistoryRecord();
    },
    deleteTask(taskToDelete) {
      this.currentElement.elementTasks =
        this.currentElement.elementTasks.filter((t) => t !== taskToDelete);
    },
    cancelChanges() {
      this.currentElement = this.copyObject(this.beforeEditElement);
      this.elementHistoryData = [];
      this.elementHistoryData.push(this.copyObject(this.currentElement));
      this.elementHistoryPointer = 0;
    },

    /* Такой вот метод копирования объекта по значению, а не по ссылке :) */
    copyObject(objectToCopy) {
      return JSON.parse(JSON.stringify(objectToCopy));
    },

    deleteCurrentElement() {
      this.showModalWindow().then((result) => {
        if (result) {
          this.listData = this.listData.filter(
            (t) => t !== this.currentElement
          );
          localStorage.setItem("todo-list-data", JSON.stringify(this.listData));
          this.$router.push("/");
        }
      });
    },
    // ------------------- История ------------------------------------------------------- //
    showPreviousChange() {
      if (this.elementHistoryPointer > 0) {
        this.elementHistoryPointer--;
      }
      this.currentElement = this.copyObject(
        this.elementHistoryData[this.elementHistoryPointer]
      );
    },

    showNextChange() {
      if (this.elementHistoryPointer < this.elementHistoryData.length - 1) {
        this.elementHistoryPointer++;
        this.currentElement = this.copyObject(
          this.elementHistoryData[this.elementHistoryPointer]
        );
      }
    },

    addHistoryRecord() {
      let historyLength = this.elementHistoryData.length;

      /* Обработка ситуации, когда откатились назад по истории и продолжили редактировать*/
      if (historyLength > this.elementHistoryPointer + 1) {
        this.elementHistoryData = this.elementHistoryData.slice(
          0,
          this.elementHistoryPointer + 1
        );
      }
      /* ------------------------------------------------------------------------------- */

      this.elementHistoryData.push(this.copyObject(this.currentElement));

      this.elementHistoryPointer++;
    },

    // --------------------------------------------------------------------------------------- //
    async showModalWindow() {
      this.modalWindowConfirmationText = "";
      const popupResult = await this.$refs.modalWindowRef.openModal();

      if (!popupResult) {
        return false;
      }
      if (popupResult) {
        return true;
      }
    },
  },

  created() {
    this.editAction = this.$route.params.action;
    this.listData = JSON.parse(localStorage.getItem("todo-list-data")) ?? [];

    if (this.editAction === "change" && this.$route.params.id) {
      this.currentElement = this.listData[this.$route.params.id];
      this.elementHistoryData.push(this.copyObject(this.currentElement));
      //Сохраняем состояние перед редактированием
      this.beforeEditElement = this.copyObject(this.currentElement);
    }

    if (this.editAction === "new") {
      this.currentElement = {
        elementTitle: "",
        elementTasks: [this.copyObject(this.taskTemplate)],
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
  opacity: 0.8;
  font-size: 26px;
}

.list-element__content {
  color: #eee;
  opacity: 0.7;
  font-size: 26px;
  margin-top: 20px;
}

.list-element__title_input {
  color: #111;
  opacity: 0.8;
  font-size: 18px;
  display: block;
  margin-top: 5px;
  width: 90%;
  max-width: 523px;
}

.list-element__content_textarea {
  color: #111;
  opacity: 0.7;
  font-size: 18px;
  display: block;
  margin-top: 5px;
  width: 93%;
  height: 120px;
  resize: none;
}

.list-element__task_title {
  color: #eee;
  opacity: 0.7;
  font-size: 26px;
  margin-top: 20px;
}

.tasks-list__task_input {
  color: #111;
  opacity: 0.7;
  font-size: 18px;
  display: inline-block;
  margin-top: 0px;
  margin-left: 35px;
  width: 100%;
}

.list-element__controls {
  margin-top: 20px;
  display: inline-block;
}

.tasks-list__button_delete {
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

.list-element__button_addtask {
  color: white;
  opacity: 0.7;
  border: none;
  background-color: #5a7086;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 15px;
  margin-right: 4px;
  margin-left: 44px;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
}

.list-element__button_addtask:hover {
  background-color: #eee;
  color: #111;
}

.list-element__button_cancelchanges {
  color: white;
  opacity: 0.7;
  border: none;
  background-color: #5a7086;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 15px;
  margin-right: 4px;
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
}

.list-element__button_cancelchanges:hover {
  background-color: #eee;
  color: #111;
}

.list-element__button_cancelchanges:disabled {
  background-color: rgb(165, 162, 162);
  color: white;
}

/*----------------------------- tasks-list -------------------------------------*/

.tasks-list__container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 97%;
}

/* Checkbox container */
.tasks-list__label {
  display: block;
  position: relative;
  padding-right: 10px;
  margin-bottom: 33px;
  margin-top: 6px;
  font-size: 18px;
  cursor: pointer;
}

/* Checkbox */
.tasks-list__checkmark {
  position: absolute;
  opacity: 0.8;
  top: 0;
  left: 0;
  margin-left: 3px;
  margin-top: 1px;
  height: 26px;
  width: 26px;
  background-color: #eee;
}

/* Checkmark/indicator */
.tasks-list__label .tasks-list__checkmark:after {
  left: 6px;
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
