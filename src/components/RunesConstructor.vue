<template>
  <section>
    {{ perks }}
    {{ tela }}
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "RunesConstructor",
  data() {
    return {
      perks: null,
    };
  },
  methods: {
    teste() {
      return axios.get(
        "http://ddragon.leagueoflegends.com/cdn/12.21.1/data/pt_BR/runesReforged.json"
      );
    },
  },
  computed: {
    tela() {
      console.log(window.screen.width);
      return window.screen.width;
    },
  },
  async mounted() {
    this.perks = await (
      await this.teste()
    ).data[0].slots[0].runes[0].shortDesc.replace(/<[^>]*>?/gm, "");
    console.log(this.perks[0].slots[0].runes[0].longDesc);
  },
};
</script>
<style scoped>
section {
  background-image: url("../assets/imgs/background2.png");
  min-height: 100vh;
  background-size: contain;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  padding-top: 25vh;
  padding-bottom: 15vh;
  width: 100%;
}
</style>
