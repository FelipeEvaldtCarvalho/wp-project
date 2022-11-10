<template>
  <NavBar />
  <router-view />
  <FooterBar />
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";
export default {
  components: { NavBar, FooterBar },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Bungee+Inline&family=Open+Sans:wght@300;400;500;600;700;800&display=swap");
* {
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
