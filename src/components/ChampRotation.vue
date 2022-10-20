<template>
  {{ freeChampionIds }}
  {{ championsData }}
</template>
<script>
import axios from "axios";
export default {
  name: "ChampRotation",
  data() {
    return {
      freeChampionIds: [],
      championsData: {},
      freeChampionsNames: null,
    };
  },
  methods: {
    async getFreeChampionIds() {
      await axios
        .get(
          "https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-3a08e5a8-6f0d-43f6-9902-cc66dc3e07cc"
        )
        .then((response) => {
          this.freeChampionIds = response.data.freeChampionIds;
          console.log("getFreeChampionIds");
        });
    },
    async getChampionsData() {
      await axios
        .get(
          "http://ddragon.leagueoflegends.com/cdn/12.20.1/data/pt_BR/champion.json"
        )
        .then((response) => {
          this.championsData = response.data.data;
          console.log("getChampionsData");
        });
    },
    setFreeChampionsNames() {},
  },
  created() {
    console.log("antes de tudo");
    this.getFreeChampionIds();
    console.log("na meiota");
    this.getChampionsData();
    console.log("FINALERA");
  },
  //beforeMount() {
  //console.log("BEFORE", this.freeChampionIds);
  //},
};
</script>
