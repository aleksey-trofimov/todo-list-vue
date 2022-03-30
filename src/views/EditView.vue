<template>
  <TheMenu />
  <TheEditor />
</template>

<script>
// @ is an alias to /src
import TheMenu from "@/components/TheMenu.vue";
import TheEditor from "@/components/TheEditor.vue";

export default {
  name: "EditView",
  components: {
    TheMenu,
    TheEditor,
  },
};
</script>
