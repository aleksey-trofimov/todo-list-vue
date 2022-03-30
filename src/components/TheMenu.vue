<template>
  <div id="menu">
    <router-link id="" to="/edit/new">Новая запись</router-link>
    <router-link id="" to="/tech">Тех. задание</router-link>
    <router-link id="" to="/about">О приложении</router-link>
  </div>
</template>

<style lang="css" scoped>
#menu {
  position: fixed;
  top: 112px;
  left: 0;
  right: 0;
  margin-top: 0;
  padding: 7px;
  background: #3f5369;
  color: white;
  display: flex;
  justify-content: flex-start;
  border-bottom: 5px solid #8f9fa1;
}

#menu a {
  font-size: 23px;
  padding-left: 5%;
  display: inline-block;
  color: white;
  opacity: 0.7;
}

#menu a:hover {
  opacity: 1;
}

#menu a.active-link-class {
  text-decoration-color: red;
}
</style>
