<template>
  <section>
    <div class="banner">
      <div class="lines">
        <h1 class="banner-title">WellPlayed</h1>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "BannerHome",
};
</script>
<style scoped>
section {
  display: flex;
  justify-content: center;
  height: 25vh;
  background-image: url("../assets/imgs/bannerbg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 35%;
  height: 30vh;
  width: 90%;
  background-image: url("../assets/imgs/banner.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.lines {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% + 60px);
  width: calc(100% - 60px);
  border: 3px #ffde59 solid;
}
.banner-title {
  font-family: "Bungee Inline", cursive;
  color: #ffde59;
  text-decoration: none;
  font-size: 6rem;
}
@media screen and (max-width: 920px) {
  .banner-title {
    font-size: 4rem;
  }
}
@media screen and (max-width: 650px) {
  .banner-title {
    font-size: 2rem;
  }
}
@media screen and (max-width: 410px) {
  .banner-title {
    font-size: 1.5rem;
  }
}
</style>
