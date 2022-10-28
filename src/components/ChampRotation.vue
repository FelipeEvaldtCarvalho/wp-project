<template>
  <section>
    <h1 class="page-title">ROTAÇÃO DE CAMPEÕES GRÁTIS</h1>
    <div class="container">
      <div class="atual-champ-container">
        <div class="atual-champ-text">
          <h1 class="champ-name">{{ selectedChampion.name }}</h1>
          <h2>{{ selectedChampion.title }}</h2>
          <div class="champ-function">
            <h2>{{ selectedChampionTag }}</h2>
            <span class="function-icon">
              <img :src="selectedChampionTagImg" />
            </span>
          </div>
          <p class="champ-lore">{{ selectedChampion.blurb }}</p>
          <div class="btn-container">
            <router-link class="btn" to="/about">Saiba mais</router-link>
          </div>
        </div>
        <div class="atual-champ-img" id="atual-champ-img">
          <div class="atual-champ-img-frame"></div>
        </div>
      </div>
      <div class="champs-select">
        <div
          class="img-container"
          v-for="champ in freeChampionsData"
          v-bind:key="champ.id"
          :class="{ active: checkSelectedChamp(champ.id) }"
        >
          <img
            :src="`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champ.id}_0.jpg`"
            alt=""
            v-on:click="changeSelectedChamp(champ)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import championFunction from "@/services/championFunction";
import championFunctionImg from "@/services/championFunctionImg";
export default {
  name: "ChampRotation",
  data() {
    return {
      freeChampionIds: "",
      championsData: "",
      freeChampionsData: [],
      selectedChampion: {},
      selectedChampionTag: "",
      selectedChampionTagImg: "",
    };
  },
  methods: {
    getFreeChampionIds() {
      let freeChampionIds = axios.get(
        `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-d8e64ad9-27be-43d5-b919-159cd212ff58`
      );
      return freeChampionIds;
    },
    getChampionsData() {
      let ChampionsData = axios.get(
        "http://ddragon.leagueoflegends.com/cdn/12.20.1/data/pt_BR/champion.json"
      );
      return ChampionsData;
    },
    setFreeChampionsData() {
      let allChampionsData = this.championsData.data.data;
      this.freeChampionIds.data.freeChampionIds.forEach((freeChampionId) => {
        for (let champion in allChampionsData) {
          if (allChampionsData[champion].key == freeChampionId) {
            this.freeChampionsData.push(allChampionsData[champion]);
          }
        }
      });
    },
    setInicialSelectedChampion() {
      this.correctionInChampionId();
      this.selectedChampion = this.freeChampionsData[0];
      let img = document.getElementById("atual-champ-img");
      img.style.backgroundImage = `url(
        "http://ddragon.leagueoflegends.com/cdn/img/champion/centered/${this.selectedChampion.id}_0.jpg"
        )`;
      this.selectedChampionTag = championFunction(
        this.selectedChampion.tags[0]
      );
      this.selectedChampionTagImg = championFunctionImg(
        this.selectedChampionTag
      );
    },
    setSelectedChampionImage() {
      let img = document.getElementById("atual-champ-img");
      img.style.backgroundImage = `url(
        "http://ddragon.leagueoflegends.com/cdn/img/champion/centered/${this.selectedChampion.id}_0.jpg"
        )`;
    },
    checkSelectedChamp(championId) {
      if (championId == this.selectedChampion.id) {
        return true;
      }
      return false;
    },
    changeSelectedChamp(champion) {
      if (this.checkSelectedChamp(champion.id)) {
        return;
      }
      this.selectedChampion = champion;
      this.setSelectedChampionImage();
      this.selectedChampionTag = championFunction(
        this.selectedChampion.tags[0]
      );
      this.selectedChampionTagImg = championFunctionImg(
        this.selectedChampionTag
      );
    },
    correctionInChampionId() {
      this.freeChampionsData.map((element) => {
        if (element.id == "Fiddlesticks") {
          element.id = "FiddleSticks";
        }
      });
    },
  },
  async created() {
    this.freeChampionIds = await this.getFreeChampionIds();
    this.championsData = await this.getChampionsData();
    this.setFreeChampionsData();
    this.setInicialSelectedChampion();
  },
};
</script>
<style scoped>
section {
  background-image: url("../assets/imgs/background2.png");
  background-size: contain;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  padding-top: 28vh;
  padding-bottom: 15vh;
  width: 100%;
}
.page-title {
  align-self: center;
  padding-bottom: 5rem;
  font-size: 3.5rem;
  text-align: center;
}
.container {
  display: flex;
  width: 100%;
}
.atual-champ-container {
  display: flex;
  width: 70%;
}
.atual-champ-text {
  display: flexbox;
  flex-direction: column;
  width: 50%;
  padding: 0 2rem;
}
.champ-name {
  display: inline-block;
  font-size: 3rem;
  border-bottom: #ffde59 10px solid;
}
.atual-champ-img {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 30vw;
  height: 30vw;
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  box-shadow: 0px 0px 0px 6px #ffde59 inset;
  transition: 0.4s;
  border-radius: 50%;
}
.atual-champ-img-frame {
  position: relative;
  width: calc(100% - 15px);
  height: calc(100% - 15px);
  border-radius: 50%;
  border: #ffde59 dotted 5px;
}
.champs-select {
  display: inline-flex;
  width: 30%;
  height: fit-content;
  flex-wrap: wrap;
  gap: 3%;
  justify-content: end;
}
.img-container {
  width: 20%;
  min-width: 65px;
  height: fit-content;
}
.img-container img {
  width: 100%;
  height: auto;
  border-radius: 50%;
  outline: 4px solid #adadad;
  outline-offset: -4px;
  transition: 0.4s;
  cursor: pointer;
}
.img-container img:hover {
  -webkit-box-shadow: 0px 0px 13px 5px #a6a6a6;
  -moz-box-shadow: 0px 0px 13px 5px #a6a6a6;
  box-shadow: 0px 0px 13px 5px #a6a6a6;
}
.active img {
  outline: 4px solid #ffde59;
}
.champ-function {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.champ-function img {
  height: 2.2rem;
}
.function-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  background-color: #fff;
  border-radius: 50%;
}
.champ-lore {
  margin-top: 2rem;
}
.btn {
  color: #000;
  text-decoration: none;
  background-color: #ffde59;
  font-size: 1.2rem;
  padding: 5px 40px;
  border-radius: 8px;
}
.btn-container {
  margin-top: 2rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 1115px) {
  .champ-name {
    font-size: 2.5rem;
  }
}

@media screen and (max-width: 900px) {
  section {
    padding: 1.5rem;
    width: 100%;
  }
  .atual-champ-container {
    flex-direction: column-reverse;
    width: 80%;
    align-items: center;
    justify-content: flex-end;
  }
  .atual-champ-img {
    width: 60vw;
    max-width: 500px;
    max-height: 500px;
    height: 60vw;
  }
  .atual-champ-text {
    width: 100%;
    padding: 1rem 0;
  }
  .champs-select {
    width: 20%;
    margin-left: 1rem;
  }
  .img-container {
    width: 100%;
    max-width: 65px;
    min-width: 45px;
  }
  .img-container img {
    outline: 3px solid #7a7a7a;
    outline-offset: -3px;
  }
  .active img {
    outline: 3px solid #ffde59;
  }
  .champ-name {
    display: inline-block;
    font-size: 2.2rem;
    border-bottom: #ffde59 10px solid;
  }
  h2 {
    font-size: 1.5rem;
  }
  .champ-function {
    gap: 0.7rem;
  }
  .champ-function img {
    height: 2rem;
  }
  .function-icon {
    height: 2.8rem;
    width: 2.8rem;
  }
  .btn {
    text-align: center;
  }
  .page-title {
    margin-top: 18vh;
    font-size: 2.5rem;
  }
  @media screen and (max-width: 437px) {
    .page-title {
      font-size: 2rem;
    }
    .champ-name {
      font-size: 1.8rem;
    }
  }
}
</style>
