<template>
  <nav>
    <div class="search">
      <ion-icon class="search-icon" name="search"></ion-icon>
      <input
        id="search-input"
        type="text"
        placeholder="Pesquisar"
        v-model="inputValue"
        @focusin="inputOptionsOpen = true"
        @blur="inputBlur"
        @input="$emit('atualList', this.options)"
        autocomplete="off"
      />
      <div class="right-icons">
        <ion-icon
          v-if="inputValue"
          @click="
            inputValue = '';
            $emit('clear');
          "
          name="close"
        ></ion-icon>
        <div
          :class="{
            rotate: inputOptionsOpen,
          }"
        >
          <ion-icon
            name="caret-down-outline"
            @click="inputOptionsOpenAndFocus"
          ></ion-icon>
        </div>
      </div>
      <div v-if="inputOptionsOpen" class="options">
        <div v-for="champion in options" v-bind:key="champion.id">
          <p
            @click="selectChampion(champion)"
            :class="{ selected: checkSelectedOption(champion.name) }"
          >
            {{ champion.name }}
          </p>
        </div>
        <div v-if="!options.length" class="no-options">
          <p
            @click="
              inputValue = '';
              $emit('clear');
            "
          >
            {{ `Campeão ${this.inputValue} não encontrado!` }}
          </p>
        </div>
      </div>
    </div>

    <div class="functions-list">
      <p
        v-for="list in functionLists"
        v-bind:key="list.id"
        v-on:click="
          $emit('changeChampionsList', list);
          inputValue = '';
        "
        :class="{
          active: checkSelectedList(list.data),
          inactive: !checkSelectedList(list.data),
        }"
      >
        {{ list.label }}
      </p>
    </div>
    <div class="functions-list-mobile">
      <div
        class="functions-placeholder"
        id="functions-options"
        @click="functionOptionsOpen = true"
        @blur="functionsBlur"
      >
        <a>{{ functionsPlaceholder }}</a>
      </div>
      <div class="right-icons">
        <a
          href="#"
          id="functionsOpenBtn"
          @click.prevent="functionOptionsOpen = !functionOptionsOpen"
          @blur="functionsBlur"
          :class="{
            rotate: functionOptionsOpen,
          }"
        >
          <ion-icon name="caret-down-outline"></ion-icon>
        </a>
      </div>
      <div v-if="functionOptionsOpen" class="functions-options">
        <p
          v-for="list in functionLists"
          v-bind:key="list.id"
          v-on:click="
            $emit('changeChampionsList', list);
            inputValue = '';
            functionOptionsOpen = false;
          "
          :class="{
            selected: checkSelectedList(list.data),
          }"
        >
          {{ list.label }}
        </p>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "SearchChampions",
  props: {
    functionLists: Object,
    listOnShow: Object,
  },
  methods: {
    inputBlur() {
      setTimeout(() => (this.inputOptionsOpen = false), 150);
    },
    functionsBlur() {
      setTimeout(() => (this.functionOptionsOpen = false), 150);
    },
    inputOptionsOpenAndFocus() {
      if (!this.inputOptionsOpen) {
        document.getElementById("search-input").focus();
        return (this.inputOptionsOpen = true);
      }
      return (this.inputOptionsOpen = false);
    },
    functionsOptionsOpenAndFocus() {
      if (!this.functionOptionsOpen) {
        this.functionOptionsOpen = true;
        document
          .getElementById("functionsOpenBtn")
          .focus({ focusVisible: true });
        return;
      }
      return (this.functionOptionsOpen = false);
    },
    checkSelectedOption(option) {
      if (option == this.inputValue) {
        return true;
      }
      return false;
    },
    checkSelectedList(listData) {
      if (listData == this.listOnShow) {
        return true;
      }
      return false;
    },
    setInicialOptions() {
      this.inicialOptions = this.functionLists.all;
    },
    selectChampion(champion) {
      if (this.inputValue == champion.name) {
        this.inputValue = "";
        this.$emit("atualList", this.options);
        return (this.inputOptionsOpen = false);
      }
      this.$emit("selectChamp", champion);
      this.inputValue = champion.name;
      this.$emit("atualList", this.options);
      return (this.inputOptionsOpen = false);
    },
  },
  data() {
    return {
      inicialOptions: { data: [] },
      inputValue: "",
      inputOptionsOpen: false,
      functionOptionsOpen: false,
    };
  },
  computed: {
    options() {
      if (!this.inputValue) {
        return this.functionLists.all.data;
      }
      let search = this.inputValue.toLowerCase();

      let opt = [];
      this.functionLists.all.data.map((element) => {
        let teste = element.name.toLowerCase().match(search);
        if (teste) {
          opt.push(element);
        }
      });
      return opt;
    },
    functionsPlaceholder() {
      let placeholder;
      for (let list of Object.keys(this.functionLists)) {
        if (this.functionLists[list].data == this.listOnShow) {
          placeholder = this.functionLists[list].label;
        }
      }
      if (!placeholder) {
        return (placeholder = "Funções");
      }
      return placeholder;
    },
  },
  created() {
    this.setInicialOptions();
  },
};
</script>
<style scoped>
nav {
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  border: 3px #adadad solid;
  height: 3rem;
  position: relative;
  z-index: 20;
}
.search {
  position: relative;
  width: 200px;
  height: 100%;
}
.search-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  margin-left: 0.8rem;
  font-size: 1.3rem;
}
.right-icons {
  display: flex;
  height: 100%;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}
.right-icons ion-icon {
  cursor: pointer;
}
.search input {
  width: 100%;
  height: 100%;
  padding-left: 2.3rem;
  border: none;
}
.search input:focus {
  outline: none;
}
.functions-list {
  display: flex;
  height: 100%;
  font-weight: 700;
  width: calc(100% - 200px);
  justify-content: flex-end;
  align-items: center;
  gap: 5%;
  padding-right: 5%;
  border-left: #adadad 3px solid;
}
.functions-list-mobile {
  display: none;
}
.options {
  background-color: #fff;
  max-height: 375px;
  overflow: auto;
}
.options p {
  padding: 1rem;
}
.options p:hover {
  background-color: #ffde59;
}
.selected {
  background-color: #ffde59;
}
.no-options p:hover {
  background-color: #fff;
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
@media screen and (max-width: 1185px) {
  .functions-list {
    gap: 2%;
    padding-right: 2%;
  }
}
@media screen and (max-width: 890px) {
  .functions-list {
    display: none;
  }
  .functions-list-mobile {
    display: initial;
    width: 50%;
    height: 100%;
  }
  .functions-list-mobile p {
    padding: 1rem;
  }
  .functions-placeholder {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    padding: 1rem;
  }
  .functions-placeholder a {
    color: #757575;
    font-size: 0.85rem;
    font-style: none;
  }
  #functionsOpenBtn {
    font-style: none;
    text-decoration: none;
    color: inherit;
  }
  .functions-options {
    background-color: #fff;
  }
  .functions-options p:hover {
    background-color: #ffde59;
  }
  .search {
    width: 50%;
    border-right: #adadad 3px solid;
  }
  .rotate {
    position: relative;
    transform: rotate(180deg);
    top: -3px;
    color: inherit;
  }
}
@media screen and (max-width: 415px) {
  .search-icon {
    display: none;
  }
  .search input {
    padding-left: 1rem;
  }
}
</style>
