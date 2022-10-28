<template>
  <footer>
    <p>
      <span class="yellow">WellPlayed</span> | desenvolvido por
      <a
        class="yellow"
        href="https://admirable-bunny-b62cbe.netlify.app/"
        target="_blank"
        >Felipe Carvalho</a
      >
    </p>
  </footer>
</template>
<script>
export default {
  name: "FooterBar",
};
</script>
<style scoped>
footer {
  height: 6rem;
  background-color: #1e1e1e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 2.5rem;
}
.yellow {
  color: #ffde59;
}
a {
  text-decoration: none;
  transition: 0.6s;
}
a:hover {
  color: #ffcc00;
}
</style>
