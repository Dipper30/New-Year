<template>
  <div id="board">
    <Wish v-for="(item) of greetings" :key="item.id" :wish="item" @resetGreeting="resetGreeting" @removeGreeting="removeGreeting" />
  </div>
</template>

<script>
import Wish from './Wish.vue'
import api from '../request'
import { mapActions } from 'vuex'

export default {
  components: {
    Wish,
  },
  data () {
    return {
      greetings: [],
      count: 0,
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
    ...mapActions(['fetchMessages']),
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
      if (code == 304) return
      this.greetings = data
    },
    resetGreeting (newGreeting) {
      for (let i = 0; i < this.greetings.length; i++) {
        if (this.greetings[i].id == newGreeting.id) {
          this.greetings.splice(i, 1, newGreeting)
          break
        }
      }
    },
    removeGreeting (id = 0) {
      for (let i = 0; i < this.greetings.length; i++) {
        if (this.greetings[i].id == id) {
          this.greetings.splice(i, 1)
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
    setInterval(() => {
      this.fetchGreetings()
      if (this.count++ == 5) {
        this.count = 0
        this.fetchMessages() 
      }
    }, 15000)
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
  min-height: 530px;
  min-width: 900px;
  box-sizing: border-box;
  position: relative;
  color: $text-color;
}
</style>