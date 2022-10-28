<template>
  <section>
    <div class="page-title">
      <h2>ESCOLHA SEU</h2>
      <h1>CAMPEÃO</h1>
    </div>
    <div class="search-container">
      <div class="search">
        <ion-icon class="search-icon" name="search"></ion-icon>
        <vSelect
          :deselectFromDropdown="true"
          :options="lists.all.data"
          label="name"
          placeholder="Pesquisar"
          @option:deselected="setInicialChampionsToShow"
          @update:modelValue="setChampionsToShowBySelect($event)"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              Campeão <em>{{ search }}</em> não encontrado.
            </template>
          </template>
        </vSelect>
      </div>
      <div class="functions-list">
        <p
          v-for="list in lists"
          v-bind:key="list.id"
          v-on:click="changeChampionsToShow(list)"
          :class="{
            active: checkSelectedList(list.data),
            inactive: !checkSelectedList(list.data),
          }"
        >
          {{ list.label }}
        </p>
      </div>
    </div>
    <div class="champions-container">
      <div
        class="champion-card"
        v-for="champion in championsToShow"
        v-bind:key="champion.id"
      >
        <img
          :src="`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champion.id}_0.jpg`"
          alt=""
        />
        <span class="champion-name">
          <h3>{{ champion.name }}</h3>
        </span>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  name: "ChampionsList",
  components: { vSelect },
  data() {
    return {
      valueteste: "",
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
  },
  async created() {
    this.championsData = await this.getChampionsData();
    this.championsData = this.championsData.data.data;
    this.arrayChampionsData();
    this.correctionInChampionId();
    this.setFunctionsLists();
    this.setInicialChampionsToShow();
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
.inactive {
  display: inline-flex;
  height: 100%;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
}
.inactive:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 4px;
  bottom: 0;
  left: 0;
  background-color: #ffde59;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.active {
  display: inline-flex;
  height: 100%;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  border-bottom: 4px solid #ffde59;
  border-top: 4px solid transparent;
}
.inactive:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
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
}
.champion-card img {
  display: block;
  width: 100%;
  height: calc(100% - 4rem);
  object-fit: cover;
}
.champion-name {
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  background-color: #2d2d2d;
  color: #fff;
  height: 4rem;
}
.search >>> .vs__dropdown-toggle {
  border: none;
  height: 100%;
}
.search >>> .v-select {
  height: 100%;
}
.search >>> .vs__dropdown-option--highlight {
  color: #2d2d2d;
  background-color: #ffde59;
}
.search >>> .vs__open-indicator {
  fill: #2d2d2d;
}
.search >>> input {
  padding-left: 2rem;
}
.search >>> .vs__selected {
  padding-left: 2rem;
}
.search >>> input::placeholder {
  color: #adadad;
}
@media screen and (max-width: 1185px) {
  .functions-list {
    gap: 2%;
    padding-right: 2%;
  }
}
@media screen and (max-width: 930px) {
  section {
    padding: 2rem;
    padding-top: 25vh;
  }
}
@media screen and (max-width: 890px) {
}
</style>
