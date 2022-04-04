<template>
  <div v-if="showModal" class="modal" @click.self="closeModal">
    <div class="modal__window">
      <div class="modal__close-button" @click="closeModal">&#10006;</div>

      <div class="modal__header"><slot name="modalHeader"></slot></div>

      <div class="modal__buttons">
        <slot
          name="modalButton"
          :confirmOk="confirmModal"
          :closeCancel="closeModal"
        ></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  // Фактически эту переменную можно было не объявлять. Она напоминает ,что далее в коде она используется
  // для хранения функций для промиса
  modalController: null,

  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      // Создаем свой промис, чтобы возвращать его для работы асинхронной функции, которая будет вызывать
      // модальное окно
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });

      // Создаем свою переменную в $options и записываем в неё функции промиса для вызова их из других
      // функций компонента
      this.$options.modalController = { resolve, reject };
      this.showModal = true;

      return popupPromise;
    },

    confirmModal() {
      console.log("Модальное окно закрыто с подтверждением");
      this.$options.modalController.resolve(true);
      this.showModal = false;
    },

    closeModal() {
      console.log("Модальное окно закрыто по отмене");
      this.$options.modalController.resolve(false);
      this.showModal = false;
    },

    // Закрытие модального окна по нажатию Escape
    handleKeydown(e) {
      if (this.showModal && e.key === "Escape") {
        this.closeModal();
      }
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
}
.modal__window {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  width: 370px;
  height: 170px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal__close-button {
  border-radius: 30%;
  color: rgb(208, 226, 203);
  background: #5a7086;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.modal__header {
  color: rgb(59, 71, 71);
  display: flex;
  font-size: 26px;
  position: static;
  margin-top: 35px;
  align-items: center;
  justify-content: center;
}

.modal__buttons {
  position: absolute;
  top: 130px;
  right: 32px;
}
.modal-footer__button {
  background-color: #5a7086;
  color: #fff;
  border: none;
  text-align: center;
  padding: 8px;
  margin-right: 10px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 8px;
  min-width: 150px;
  display: inline-block;
  cursor: pointer;
}

.modal-footer__button:hover {
  background-color: rgb(211, 206, 206);
  color: #111;
}
</style>
