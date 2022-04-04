<template>
  <TheHeader />
  <router-view :key="$route.path" />
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
export default {
  components: { TheHeader },
};
</script>
