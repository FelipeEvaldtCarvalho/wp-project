<template>
  <nav>
    <div class="container-logo">
      <router-link to="/" class="logo">WP</router-link>
      <button v-on:click="menuMobile = true">
        <ion-icon name="menu"></ion-icon>
      </button>
    </div>
    <div class="menu">
      <router-link to="/champions">CAMPEÕES</router-link>
      <router-link to="/about">RUNAS</router-link>
      <router-link to="/about">FEITIÇOS</router-link>
      <router-link to="/about">ITENS</router-link>
      <router-link to="/about">MAPA</router-link>
    </div>
    <div class="menu-mobile" v-if="menuMobile">
      <button v-on:click="menuMobile = false">
        <ion-icon name="close-circle"></ion-icon>
      </button>
      <div class="menu-mobile-links">
        <router-link v-on:click="menuMobile = false" to="/about"
          >CAMPEÕES</router-link
        >
        <router-link v-on:click="menuMobile = false" to="/about"
          >RUNAS</router-link
        >
        <router-link v-on:click="menuMobile = false" to="/about"
          >FEITIÇOS</router-link
        >
        <router-link v-on:click="menuMobile = false" to="/about"
          >ITENS</router-link
        >
        <router-link v-on:click="menuMobile = false" to="/about"
          >MAPA</router-link
        >
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      menuMobile: false,
    };
  },
};
</script>
<style scoped>
nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #1e1e1e;
  height: 6rem;
  align-items: center;
  padding: 0 2rem;
}
.logo {
  font-family: "Bungee Inline", cursive;
  color: #ffde59;
  text-decoration: none;
  font-size: 3rem;
}
.menu {
  display: flex;
  gap: 4rem;
}
.menu-mobile {
  display: none;
}
.menu a {
  color: #fff;
  text-decoration: none;
  display: inline-block;
  position: relative;
  padding-bottom: 10px;
  font-size: 1.2rem;
}

.menu a:after {
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

.menu a:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
button {
  display: none;
  align-self: end;
}
@media screen and (max-width: 840px) {
  .menu {
    display: none;
  }
  nav {
    flex-direction: column;
    justify-content: center;
  }
  .menu-mobile {
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    width: 100%;
    bottom: 0;
    background-color: #1e1e1e;
    padding: 1rem;
    z-index: 100;
  }
  .menu-mobile-links {
    display: flex;
    flex-direction: column;
    gap: 4.5rem;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .menu-mobile-links a {
    color: #fff;
    text-decoration: none;
    font-size: 2rem;
  }
  .container-logo {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  button {
    display: initial;
    font-size: 2.5rem;
    border: none;
    background: none;
    color: #fff;
    cursor: pointer;
  }
}
</style>
