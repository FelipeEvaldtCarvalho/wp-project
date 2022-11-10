<template>
  <div>
    <BannerHome />
    <ChampionsList />
  </div>
</template>

<script>
import BannerHome from "@/components/BannerHome.vue";
import ChampionsList from "@/components/ChampionsList.vue";

export default {
  name: "ChampionsView",
  components: { ChampionsList, BannerHome },
};
</script>
