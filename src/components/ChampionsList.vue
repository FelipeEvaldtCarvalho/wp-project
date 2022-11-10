<template>
  <section>
    <div class="page-title">
      <h2>ESCOLHA SEU</h2>
      <h1>CAMPEÃO</h1>
    </div>
    <SearchChampions
      :functionLists="lists"
      v-on:atualList="teste"
      v-on:clear="setInicialChampionsToShow"
      v-on:changeChampionsList="changeChampionsToShow"
      :listOnShow="championsToShow"
    />
    <div class="champions-container">
      <div
        class="champion-card"
        v-for="champion in championsToShow"
        v-bind:key="champion.id"
      >
        <router-link :to="`/champion/${champion.id}`" class="logo">
          <img
            :src="`https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${champion.id}_0.jpg`"
            alt=""
          />
          <span class="champion-name">
            <h3>{{ champion.name }}</h3>
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import "vue-select/dist/vue-select.css";
import SearchChampions from "./SearchChampions.vue";
export default {
  name: "ChampionsList",
  components: { SearchChampions },
  data() {
    return {
      arrLists: [],
      lists: {
        all: {
          label: "Todos",
          id: "all",
          data: [],
        },
        marksmen: {
          label: "Atiradores",
          id: "marksmen",
          data: [],
        },
        assassins: {
          label: "Assassinos",
          id: "assassins",
          data: [],
        },
        supports: {
          label: "Suportes",
          id: "supports",
          data: [],
        },
        mages: {
          label: "Magos",
          id: "mages",
          data: [],
        },
        fighters: {
          label: "Lutadores",
          id: "fighters",
          data: [],
        },
        tanks: {
          label: "Tanques",
          id: "tanks",
          data: [],
        },
      },
      championsData: {},
      championsToShow: [],
    };
  },
  methods: {
    getChampionsData() {
      let ChampionsData = axios.get(
        "http://ddragon.leagueoflegends.com/cdn/12.20.1/data/pt_BR/champion.json"
      );
      return ChampionsData;
    },
    arrayChampionsData() {
      let arr = [];
      for (let key in this.championsData) {
        if (Object.prototype.hasOwnProperty.call(this.championsData, key)) {
          arr.push(this.championsData[key]);
        }
      }
      this.lists.all.data = arr;
    },
    arrayChampionsList() {
      let arr = [];
      for (let key in this.lists) {
        if (Object.prototype.hasOwnProperty.call(this.lists, key)) {
          arr.push(this.lists[key]);
        }
      }
      this.arrLists = arr;
    },
    correctionInChampionId() {
      this.lists.all.data.map((element) => {
        if (element.id == "Fiddlesticks") {
          element.id = "FiddleSticks";
        }
      });
    },
    setFunctionsLists() {
      this.lists.all.data.map((element) => {
        switch (element.tags[0]) {
          case "Tank":
            this.lists.tanks.data.push(element);
            break;
          case "Support":
            this.lists.supports.data.push(element);
            break;
          case "Mage":
            this.lists.mages.data.push(element);
            break;
          case "Assassin":
            this.lists.assassins.data.push(element);
            break;
          case "Marksman":
            this.lists.marksmen.data.push(element);
            break;
          case "Fighter":
            this.lists.fighters.data.push(element);
            break;
          default:
            return;
        }
      });
    },
    setInicialChampionsToShow() {
      this.championsToShow = this.lists.all.data;
    },
    changeChampionsToShow(list) {
      this.championsToShow = list.data;
    },
    checkSelectedList(listData) {
      if (listData == this.championsToShow) {
        return true;
      }
      return false;
    },
    setChampionsToShowBySelect(e) {
      this.championsToShow = e ? [e] : this.lists.all.data;
    },
    setChampionsByFunctionToShowBySelect(e) {
      this.changeChampionsToShow(e);
      console.log(e);
    },
    teste(champ) {
      this.championsToShow = champ;
    },
  },
  async created() {
    this.championsData = await this.getChampionsData();
    this.championsData = this.championsData.data.data;
    this.arrayChampionsData();
    this.correctionInChampionId();
    this.setFunctionsLists();
    this.setInicialChampionsToShow();
    this.arrayChampionsList();
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
  padding-top: 28vh;
  padding-bottom: 15vh;
  width: 100%;
}
.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.page-title h1 {
  font-size: 5rem;
}
.search-container {
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  border: 3px #adadad solid;
  height: 3rem;
  position: relative;
}
.search-icon {
  position: absolute;
  font-size: 1.3rem;
  left: 7px;
  bottom: 0;
  top: 0;
  margin: auto 0;
}
.search {
  position: relative;
  width: 200px;
  height: 100%;
}
.functions-list-mobile {
  display: none;
}
.functions-list {
  display: flex;
  height: 100%;
  width: calc(100% - 200px);
  justify-content: flex-end;
  align-items: center;
  gap: 5%;
  padding-right: 5%;
  border-left: #adadad 3px solid;
}
.champions-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
}
.champion-card {
  display: block;
  flex: 1 1 18%;
  max-width: 18%;
  height: 30vw;
  cursor: pointer;
  overflow: hidden;
}
.champion-card img {
  display: block;
  width: 100%;
  height: calc(100% - 4rem);
  object-fit: cover;
  -webkit-transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;
  z-index: 2;
}
.champion-card:hover img {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.champion-name {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  background-color: #2d2d2d;
  color: #fff;
  height: 4rem;
  transition: 0.5s;
  z-index: 10;
}
.champion-card:hover .champion-name {
  background-color: #545454;
}
@media screen and (max-width: 930px) {
  section {
    padding: 2rem;
    padding-top: 25vh;
  }
}
@media screen and (max-width: 890px) {
  .champion-card {
    flex: 1 1 22%;
    max-width: 22%;
    height: 38vw;
  }
  .champion-name h3 {
    font-size: 1rem;
    color: #fff;
  }
}
@media screen and (max-width: 580px) {
  .champion-card {
    flex: 1 1 47%;
    max-width: 47%;
    height: 70vw;
  }
  .champion-name h3 {
    font-size: 1rem;
    color: #fff;
  }
  .page-title h1 {
    font-size: 4rem;
  }
  .page-title h2 {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 415px) {
  section {
    padding: 1.5rem;
    padding-top: 20vh;
  }
  .champions-container {
    gap: 10px;
  }
  .champion-card {
    flex: 1 1 47%;
    max-width: 47%;
    height: 70vw;
  }
  .champion-name h3 {
    font-size: 1rem;
    color: #fff;
  }
  .page-title h1 {
    font-size: 3rem;
  }
  .page-title h2 {
    font-size: 1.3rem;
  }
  .champion-name h3 {
    font-size: 0.8rem;
    color: #fff;
  }
  .champion-name {
    padding-left: 1rem;
    height: 3rem;
  }
}
</style>
