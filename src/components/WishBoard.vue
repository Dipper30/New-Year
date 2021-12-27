<template>
  <div id="board">
    <Wish v-for="(item) of greetings" :key="item.id" :wish="item" @resetGreeting="resetGreeting" />
  </div>
</template>

<script>
import Wish from './Wish.vue'
import api from '../request'

export default {
  components: {
    Wish,
  },
  data () {
    return {
      greetings: [],
    }
  },
  watch: {
    greetings: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.$emit('changeCount', newValue)
      },
    },
  },
  methods: {
    async fetchGreetings () {
      const { getGreetings } = api
      const { code, data } = await getGreetings()
      if (!code || code != 200) {
        this.$message({
          message: this.$t('home.requestError'),
          type: 'error',
        })
        return
      }
      this.greetings = data
    },
    resetGreeting (newGreeting) {
      console.log('reset', newGreeting)
      for (let i = 0; i < this.greetings.length; i++) {
        if (this.greetings[i].id == newGreeting.id) {
          this.greetings.splice(i, 1, newGreeting)
          break
        }
      }
    },
    pushNewGreeting (newGreeting) {
      this.greetings.unshift(newGreeting)
    },
  },
  mounted () {
    this.fetchGreetings()
  },
}
</script>

<style lang="scss" scoped>
#board {
  width: 74vw;
  height: 66vh;
  background: #1F1F1F;
  box-shadow: 4px 4px 6px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin: 0 auto;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 20px;
  min-height: 560px;
  min-width: 900px;
  box-sizing: border-box;
  position: relative;
  color: $text-color;
}
</style>