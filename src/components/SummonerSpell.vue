<template>
  <section>
    <div>
      <div v-for="spell in spells" v-bind:key="spell.id">
        <img
          :src="`http://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${spell.image.full}`"
          alt=""
        />
        <p>{{ spell.name }}</p>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "SummonerSpell",
  data() {
    return {
      spells: null,
    };
  },
  methods: {
    getSpellsData() {
      return axios.get(
        "http://ddragon.leagueoflegends.com/cdn/12.21.1/data/pt_BR/summoner.json"
      );
    },
  },
  async mounted() {
    this.spells = await this.getSpellsData();
    this.spells = this.spells.data.data;

    console.log(this.spells);
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
