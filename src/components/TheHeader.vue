<!-- Отображает только заголовок -->
<template>
  <div id="header">
    <router-link id="home" to="/">Todo List Vue</router-link>
  </div>
</template>

<style lang="css" scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  padding: 30px;
  background: #2c3e50;
  color: white;
  display: flex;
  justify-content: center;
  border-bottom: 5px solid #4e6c71;
}

#header a {
  font-size: 40px;
  text-decoration-color: red;
  display: inline-block;
  color: white;
  opacity: 0.7;
}

#header a:hover {
  opacity: 1;
}
</style>
