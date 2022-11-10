<template>
  <div>
    <BannerHome />
    <ChampRotation />
  </div>
</template>

<script>
// @ is an alias to /src
import BannerHome from "@/components/BannerHome.vue";
import ChampRotation from "@/components/ChampRotation.vue";

export default {
  name: "HomeView",
  components: {
    ChampRotation,
    BannerHome,
  },
};
</script>
