<template>
  <div class="home">
    <ChampRotation />
  </div>
</template>

<script>
// @ is an alias to /src
import ChampRotation from "@/components/ChampRotation.vue";

export default {
  name: "HomeView",
  components: {
    ChampRotation,
  },
};
</script>
