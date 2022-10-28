<template>
  <div id="input-select-container">
    <ion-icon class="search-icon" name="search"></ion-icon>
    <input
      id="input-select"
      v-model="value"
      type="text"
      v-on:blur="closeOptions"
      v-on:focus="showOptions = true"
    />
    <ion-icon
      class="select-icon"
      name="caret-down"
      v-on:click="
        showOptions = !showOptions;
        setFocusInput();
      "
    ></ion-icon>
    <div class="options-container" v-if="showOptions">
      <p
        class="option"
        v-for="option in options"
        v-bind:key="option"
        v-on:click="setValue(option.id)"
      >
        {{ option.id }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "InputSelect",
  data() {
    return {
      showOptions: false,
      value: "",
    };
  },
  props: {
    options: Object,
  },
  methods: {
    setFocusInput() {
      const input = document.getElementById("input-select");
      input.focus();
    },
    setValue(str) {
      console.log(str);
      this.value = str;
    },
    closeOptions() {
      setTimeout(() => {
        this.showOptions = false;
      }, 100);
    },
  },
};
</script>
<style scoped>
#input-select-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}
input {
  height: 100%;
  width: 100%;
  border: none;
  padding-left: 2.3rem;
  padding-right: 1.2rem;
}
.search-icon {
  position: absolute;
  left: 0.8rem;
  font-size: 1.4rem;
}
.select-icon {
  position: absolute;
  right: 2px;
}
.options-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 3rem;
  width: 100%;
  max-height: 350px;
  overflow-y: scroll;
  background-color: #fff;
}
.option {
  padding: 0.5rem;
}
.option:hover {
  background-color: #ffde59;
}
</style>
