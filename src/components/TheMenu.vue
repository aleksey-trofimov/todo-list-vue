<template>
  <div class="menu">
    <router-link id="" to="/edit/new">Новая заметка</router-link>
    <router-link id="" to="/tech">Техническое задание</router-link>
  </div>
</template>

<style lang="css" scoped>
.menu {
  margin: auto;
  max-width: 630px;
  position: static;
  padding-top: 7px;
  padding-bottom: 7px;
  background: #3f5369;
  color: white;
  display: flex;
  justify-content: flex-start;
  border-bottom: 5px solid #8f9fa1;
}

.menu a {
  font-size: 23px;
  padding-left: 5%;
  display: inline-block;
  color: white;
  opacity: 0.7;
}

.menu a:hover {
  opacity: 1;
}

.menu a.active-link-class {
  text-decoration-color: red;
}
</style>
