<template>
  <section>
    <div class="image-container">
      <img
        :src="`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${$route.params.champId}_0.jpg`"
        alt=""
      />
    </div>
    <div class="info-container">
      <img class="img-bg" :src="champTagImg" />
      <div class="name-container">
        <h1>{{ champ.name.toUpperCase() }}</h1>
        <h2>{{ champ.title }}</h2>
      </div>
      <div class="function-container">
        <h1>{{ champTag }}</h1>
        <img :src="champTagImg" />
      </div>
      <div class="lore-container">
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ champ.lore }}</p>
      </div>
      <div class="skill-container">
        <h1>Habilidades</h1>
        <div class="skill-selector">
          <div
            class="img-div"
            :class="{
              active: checkSelectedSkill(champ.passive.name),
              inactive: !checkSelectedSkill(champ.passive.name),
            }"
          >
            <img
              :src="`http://ddragon.leagueoflegends.com/cdn/12.21.1/img/passive/${champ.passive.image.full}`"
              @click="setSelectedSkillPassive"
            />
          </div>
          <div
            class="img-div"
            :class="{
              active: checkSelectedSkill(spell.name),
              inactive: !checkSelectedSkill(spell.name),
            }"
            v-for="spell in champ.spells"
            v-bind:key="spell.id"
          >
            <img
              :src="`http://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/${spell.id}.png`"
              @click="setNewSelectedSkill(spell)"
            />
          </div>
        </div>
        <div class="skill-info">
          <h1>{{ selectedSkill.skillName }}</h1>
          <h2>{{ selectedSkill.button }}</h2>
          <p>{{ selectedSkill.skillDescription.replace(/<[^>]*>?/gm, "") }}</p>
        </div>
      </div>
    </div>
    <div class="skin-container">
      <img
        :src="`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${$route.params.champId}_${atualSkin}.jpg`"
        alt=""
      />
      <div class="skin-selector">
        <h1>Skins</h1>
        <div class="all-skins">
          <div
            v-for="skin in champ.skins"
            v-bind:key="skin.num"
            class="skin"
            @click="atualSkin = skin.num"
            :class="{
              skinActive: skin.num == atualSkin,
            }"
          >
            <div class="skin-btn">
              <img
                :src="`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${$route.params.champId}_${skin.num}.jpg`"
              />
            </div>
            <div class="skin-name">
              <h2>{{ skin.name == "default" ? champ.name : skin.name }}</h2>
            </div>
          </div>
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
  name: "ChampionView",
  data() {
    return {
      champ: null,
      champTag: null,
      champTagImg: null,
      selectedSkill: {
        button: null,
        skillName: null,
        skillDescription: null,
      },
      atualSkin: 0,
    };
  },
  methods: {
    getChampionData() {
      const champion = axios.get(
        `http://ddragon.leagueoflegends.com/cdn/12.21.1/data/pt_BR/champion/${this.$route.params.champId}.json`
      );
      return champion;
    },
    setChampionData() {
      const champName = Object.keys(this.champ.data.data)[0];
      this.champ = this.champ.data.data[champName];
      console.log(this.champ);
    },
    setSelectedSkillPassive() {
      this.selectedSkill.button = "Passiva";
      this.selectedSkill.skillName = this.champ.passive.name;
      this.selectedSkill.skillDescription = this.champ.passive.description;
    },
    setNewSelectedSkill(skill) {
      console.log(skill);
      this.selectedSkill.button = skill.id.replace(this.champ.id, "");
      this.selectedSkill.skillName = skill.name;
      this.selectedSkill.skillDescription = skill.description;
    },
    checkSelectedSkill(skillName) {
      if (skillName == this.selectedSkill.skillName) {
        return true;
      }
      return false;
    },
  },
  async created() {
    this.champ = await this.getChampionData();
    this.setChampionData();
    this.champTag = championFunction(this.champ.tags[0]);
    this.champTagImg = championFunctionImg(this.champTag);
    this.setSelectedSkillPassive();
  },
};
</script>
<style scoped>
section {
  background-image: url("../assets/imgs/background2.png");
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.image-container {
  width: 100%;
  height: 70vh;
  position: relative;
  display: flex;
  background-color: #1e1e1e;
}
.image-container img {
  height: 100%;
  width: 80%;
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
}
.info-container {
  position: relative;
  color: #fff;
  width: 100%;
  background-color: #1e1e1e;
  min-height: 50vh;
  -webkit-box-shadow: 0px 0px 11px 17px #1e1e1e;
  box-shadow: 0px 0px 11px 17px #1e1e1e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5rem;
}
.name-container {
  position: relative;
  display: flexbox;
  text-align: center;
  top: -5rem;
}
.name-container h1 {
  font-size: 5rem;
  padding: 0 4rem;
  border-bottom: #ffde59 solid 4px;
}
.name-container h2 {
  font-size: 2rem;
  font-weight: 400;
}
.function-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.function-container h1 {
  font-size: 2rem;
}
.function-container img {
  height: 3rem;
  width: 3rem;
}
.lore-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 8%;
  font-size: 1.3rem;
  margin-top: 4rem;
}
.skill-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 4rem;
}
.skill-container h1 {
  font-size: 2rem;
}
.skill-selector {
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  position: relative;
}
.skill-selector::after {
  position: absolute;
  bottom: -0.5em;
  content: "";
  width: calc(100% - 64px);
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  height: 0;
  border-bottom: 2px solid #7a7a7a;
  transition: 0.8s;
}
.img-div {
  position: relative;
  cursor: pointer;
  transition: 0.8s;
}

.img-div::after {
  position: absolute;
  bottom: -47px;
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #7a7a7a;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  transition: 0.8s;
}
.inactive:hover img {
  position: relative;
  top: -3px;
  transition: 0.8s;
}
.active img {
  position: relative;
  border: #ffde59 2px solid;
  transition: 0.8s;
}
.active {
  position: relative;
  top: -9px;
  transition: 0.8s;
}
.active::after {
  position: absolute;
  bottom: -54px;
  content: "";
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ffde59;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  z-index: 2;
  transition: 0.8s;
}
.active::before {
  position: absolute;
  bottom: -45px;
  content: "";
  width: 2px;
  height: 32px;
  background-color: #ffde59;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  transition: 0.8s;
}
.skill-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 8%;
  margin-top: 4rem;
  gap: 2rem;
  text-align: center;
}
.img-bg {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 80vh;
  z-index: 0;
  opacity: 0.05;
}
.skin-container {
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
}
.skin-container img {
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.skin-selector {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem;
  gap: 3rem;
  width: 40%;
  height: 100%;
  background-color: hsla(0, 0%, 12%, 0.655);
  text-align: center;
}
.skin-selector h1 {
  color: #fff;
  font-size: 2.5rem;
}
.all-skins {
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.all-skins::-webkit-scrollbar {
  display: none;
}
.skin-btn {
  height: 100px;
  width: 30%;
}
.skin-name {
  width: 70%;
  padding: 1rem;
}
.skin-btn img {
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
.skin {
  display: flex;
  align-items: center;
  width: 100%;
  color: #fff;
  cursor: pointer;
}
.skin:hover {
  color: #ffde59;
  background-color: #1e1e1ead;
}
.skinActive {
  color: #ffde59;
  background-color: #1e1e1ead;
}
</style>
