<template>
  <div class="content">
    <h1>Todo List</h1>
    <div
      v-for="element in listData"
      :key="element.elementTitle"
      class="list-element"
    >
      <div class="list-element__name">{{ element.elementTitle }}</div>
      <div class="list-element__tasks">
        <label
          v-for="task in element.elementTasks.slice(0, 3)"
          :key="task.taskTitle"
          class="tasks-list__label"
        >
          <input
            type="checkbox"
            class="tasks-list__checkbox"
            v-if="task.taskCompleted"
            checked
            disabled
          />
          <span class="tasks-list__checkmark"></span>
          {{ task.taskTitle }}
        </label>

        <label v-if="element.elementTasks.length > 3" class="tasks-list__label"
          >...</label
        >
      </div>
      <div class="list-element__controls">
        <button
          class="list-element__controls_button"
          @click="$router.push(`/edit/change/${getElementIndex(element)}`)"
        >
          Редактировать
        </button>
        <button
          class="list-element__controls_button"
          @click="deleteElement(element)"
        >
          Удалить
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
  name: "TodoList",

  components: {
    ModalWindow,
  },

  CONFIRMATION_TEXT: "i understand",

  data() {
    return {
      listData: [],
      modalWindowConfirmationText: "",
    };
  },

  created() {
    this.listData = JSON.parse(localStorage.getItem("todo-list-data"));
  },

  computed: {
    modalWindowConfirmationCorrect() {
      return (
        this.modalWindowConfirmationText === this.$options.CONFIRMATION_TEXT
      );
    },
  },

  methods: {
    deleteElement(elementToRemove) {
      this.showModalWindow().then((result) => {
        if (result) {
          this.listData = this.listData.filter((t) => t !== elementToRemove);
          localStorage.setItem("todo-list-data", JSON.stringify(this.listData));
        }
      });
    },
    getElementIndex(element) {
      return this.listData.findIndex((i) => i == element);
    },
    async showModalWindow() {
      this.modalWindowConfirmationText = "";
      console.log("pressed");
      const popupResult = await this.$refs.modalWindowRef.openModal();

      if (!popupResult) {
        console.log("Modal cancelled");
        return false;
      }

      if (popupResult) {
        console.log("Modal confirmed");
        return true;
      }
    },
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

.list-element__name {
  color: white;
  opacity: 0.7;
  font-size: 18px;
  font-weight: bold;
}

.list-element__tasks {
  color: white;
  opacity: 0.6;
  margin-top: 11px;
  margin-bottom: 11px;
}

/*----------------------------- tasks-list -------------------------------------*/

/* The container */
.tasks-list__label {
  display: block;
  position: relative;
  padding-left: 40px;
  margin-bottom: 12px;
  font-size: 18px;
  cursor: text;
}

/* Checkbox */
.tasks-list__checkmark {
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
.tasks-list__label .tasks-list__checkmark:after {
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
</style>
