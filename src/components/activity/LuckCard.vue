<template>
  <div :class="className">
    <div class="luck-card">
      <div class="card-face" v-show="showFace">
        <div class="title" :class="{ 'en': locale == 'en' }">
          {{ cardTitle }}
        </div>
      </div>
      <div class="card-back"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    luck: {
      type: Object,
      default: null,
    },
    selected: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      turned: 'covered',
      showFace: false,
    }
  },
  computed: {
    locale () {
      return this.$i18n.locale
    },
    className () {
      return 'luck-card-container ' + this.turned + (this.selected == this.luck.id ? ' highlight' : '')
    },
    cardTitle () {
      return this.luck[`title_${this.locale}`] || ''
    },
    highlight () {
      return this.selected == this.luck.id
    },
  },
  methods: {
    turnOver () {
      this.showFace = true
      this.$nextTick(() => {
        this.turned = 'turned'

      })
      
    },
  },
  mounted () {

  },
}
</script>

<style lang="scss" scoped>
.luck-card-container {
  width: 110px;
  height: 200px;
  box-shadow: 0px 0px 10px 5px rgba(2, 184, 42, 0.15), inset 0px 0px 10px 5px rgba(2, 184, 42, 0.1);
  margin: 0 20px 40px;
  perspective: 800px;
  border-radius: 10px;
  cursor: pointer;
  &.highlight {
    box-shadow: 1px 6px 15px 8px rgba(184, 70, 2, 0.6);
  }
  &.turned {
    .luck-card {
      transition: 2s;
      transform: rotateY(180deg);
      .card-face {
        transition: 0s;
        transform: rotateY(180deg);
      }
      .card-back {
        transition: 2s;
        transform: rotateY(180deg);
      }
    }
  }
  &.covered {
    .luck-card {
      .card-back {
        z-index: 1;
        &::after {
          /* content: ''; */
          background: url('../../assets/taro.jpg') no-repeat;
          background-size: contain;
          width: 110px;
          height: 210px;
          position: absolute;
          opacity: 0.6;
          z-index: -1;
          top: 4px;
          right: -8px;
        }
      }
      .card-face {
        transform: rotateY(180deg);
      }
    }
    .luck-card:hover {
      transition: 0.5s;
      transform: rotateY(30deg);
    }
  } 
  .luck-card {
    width: 112px;
    height: 200px;
    border-radius: 10px;
    position: relative;
    transition: 0.3s;

    z-index: 1;
    .card-back {
      width: 110px;
      height: 210px;
      background: #333;
      background: url('../../assets/taro.jpg') no-repeat;
      background-size: contain;
      z-index: 2;
      position: absolute;
      backface-visibility: hidden;
      transition: 0.2s;
      /* transform: rotateY(0deg); */
    }
    .card-face {
      width: 110px;
      height: 200px;
      /* backface-visibility: hidden; */
      background: url('../../assets/taro-1.jpg') no-repeat;
      background-size: cover;
      z-index: 0;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border-radius: 10px;
      .title {
        width: 30px;
        line-height: 30px;
        font-size: 28px;
        word-break: break-all;
        margin: 0 auto;
        text-align: center;
        z-index: 2;
        border-radius: 10px;
        color: orange;
        padding: 10px 5px;
        position: relative;
        background: rgba(0, 0, 0, 0.7);
        opacity: 0.9;
        .en {
          font-size: 18px;
          width: 20px;
        }
        ::before {
          content: ' ';
          position: absolute;
          background: #111;
          opacity: 1;
          z-index: 10;
          width: 110px;
          height: 200px;
          top: 0;
          left: 0;
        }
      }
      
    }
  /* animation-name: swing;
  animation-duration: 2s;
  animation-iteration-count: infinite; */
  
  /* &::after {
    content: '';
    background: #111;
    width: 130px;
    height: 190px;
    position: absolute;
    /* opacity: 0.6; */
    /* z-index: -2; */
    /* top: 4px; */
    /* right: -8px; */
  /* } */
  }
}

@keyframes swing {
  25% {
    top: -4px;
  }
  50% {
    top: -4px;
    right: -2px;
  }
  75% {
    top: 0;
    right: -2px;
  }
  100% {
    right: 0;
  }
}

</style>