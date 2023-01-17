<template>
  <div>
    <BannerHome />
    <SummonerSpell />
  </div>
</template>

<script>
import BannerHome from "@/components/BannerHome.vue";
import SummonerSpell from "@/components/SummonerSpell.vue";
export default {
  name: "SummonerSpellView",
  components: {
    SummonerSpell,
    BannerHome,
  },
};
</script>
