<template>
  <router-view/>
</template>

<script>
export default {
  mounted () {
    const locale = localStorage.getItem('locale')
    if (locale) this.$i18n.locale = locale
    this.$store.dispatch('actUser')
    this.$store.dispatch('fetchMessages')
  },
}
</script>

<style lang="scss">
#app {
  font-family: "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
