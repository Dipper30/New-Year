<template>
  <div id="luckDialog">
    <Dialog class="l-dialog" :showButtons="false" @close="onCancel" @cancel="onCancel" @confirm="onConfirm">
      <div class="intro"> {{ $t('activity.luck.tip') }} </div>
      <div class="card-list">
        <luck-card
          @click="turnOver(i.id)"
          v-for="(i) of list"
          :ref="`card${i.id}`"
          :key="i.id"
          :luck="i"
          :selected="selected"  
        >
        </luck-card>
      </div>
      <Dialog class="card-content-dialog" :cancel="$t('activity.luck.getImg')" v-if="contentVisible" @confirm="closeContent" @close="closeContent" @cancel="getImg">
        <div class="card-title">
          {{ card[`title_${$i18n.locale}`] || '' }}
        </div>
        <div class="card-desc">
          {{ card[`desc_${$i18n.locale}`] || '' }}
        </div>
        <div class="img-tip">
          {{ $t('activity.luck.imgTip') }}
        </div>
      </Dialog>
      <!-- {{ $t('home.activity.tbd') }} -->
    </Dialog>
  </div>
</template>

<script>
import Dialog from './common/Dialog.vue'
import LuckCard from './activity/LuckCard.vue'
import { luck as luckConfig } from '../config'
import api from '../request'
import { downloadImg } from '../utils'

export default {
  components: {
    Dialog,
    LuckCard,
  },
  data () {
    return {
      list: [],
      clicked: false,
      lock: false,
      timer: null,
      participated: false,
      contentVisible: false,
      card: null,
      selected: 0,
    }
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    },
    onConfirm () {
      this.$emit('confirm')
    },
    closeContent () {
      this.card = null
      this.contentVisible = false
    },
    showContent (id) {
      if (id == 0) return
      this.list.forEach(item => {
        if (item.id == id) {
          this.card = item
          this.contentVisible = true
        } else return
      })
    },
    async participate (index) {
      const { participate: participateAPI } = api
      const p = {
        aid: 1,
        config: index.toString(),
      }
      await participateAPI(p)
    },
    turnOver (index = 0) {
      if (this.lock) return
      if (this.clicked) {
        this.showContent(index)
        return
      }

      if (this.participated) return
      this.participate(index)
      this.clicked = true
      this.lock = true
      if (index != 0) {
        this.$refs['card' + index].turnOver()
        this.selected = index
        this.downloadImg()
      }
      this.timer = setTimeout(() => {
        this.turnOverRest(index)
      }, 2000)
    },
    turnOverRest (index = 0) {
      for (let i = 1; i < 7; i++) {
        if (i != index) {
          this.$refs['card' + i].turnOver()
        }
        this.timer = null
        clearTimeout(this.timer)
      }
      this.lock = false
    },
    getImg () {
      // eslint-disable-next-line global-require
      const url = require('../assets/taro-1.jpg')
      downloadImg(url, '哀酱')
    },
  },
  async created () {
    const { checkParticipation } = api
    const res = await checkParticipation({ aid: 1 })
    const { data } = res
    
    if (data && data.length > 0) {
      for (let i of data) {
        if (i.aid === 1 && this.$store.getters.getUserID == i.uid) {
          this.participated = true
          this.selected = Number(i.config)
          this.clicked = true
          this.$nextTick(() => {
            this.turnOverRest()
          })
          break
        }
      }
    }
  },
  mounted () {
    this.list = luckConfig
  },
}
</script>

<style lang="scss">
#luckDialog {
  .d-dialog {
    width: 570px;
    height: 650px;
    .d-content {
      display: flex;
      flex-direction: column;
      .intro {
        padding: 20px 10px;
        text-align: left;
      }
    }
    .card-list {
      display: flex;
      flex-direction: row;
      width: 100%;
      /* height: 400px; */
      flex-wrap: wrap;
      .card {
        width: 100px;
        height: 100px;
        background: $green;
      }
    }
  }
  .card-content-dialog {
    
    .d-dialog {
      height: 400px;
      width: 400px;
    }
    .card-title {
      margin-bottom: 40px;
      font-size: 22px;
      font-weight: 500;
      letter-spacing: 20px;
    }

    .card-desc {
      text-align: left;
    }

    .img-tip {
      padding-top: 20px;
      color: rgba(255, 255, 255, 0.3);
      text-align: left;
      font-size: 13px;
    }
  }
  
}
</style>