<template>
  <div class="message-list">
    <div class="msg" v-for="item of list" :key="item.id">
      <div class="title">
        <span class="light"> {{ getTitle(item) }} </span> 
        &nbsp;&nbsp; <span> {{ getTime(item.uploadedAt) }} </span>
        &nbsp;&nbsp;&nbsp;
        <Tag v-if="item.to == 0" > {{ $t('message.system') }} </Tag>
        <Tag v-else :hl="true" > {{ $t('message.private') }} </Tag>
        <!-- <span v-if="item.to == 0" class="tag"> {{ $t('message.system') }} </span> -->
        <!-- <span v-else class="private tag"> {{ $t('message.private') }} </span> -->
      </div>
        
      <div class="content">
        <span v-if="$i18n.locale == 'en'">
          {{ item.content_en }}
        </span>
        <span v-if="$i18n.locale == 'zh_cn'">
          {{ item.content_zh_cn }}
        </span>
        <span v-if="$i18n.locale == 'ja'">
          {{ item.content_ja }}
        </span>
      </div>
      
    </div>
  </div>
</template>

<script>
import api from '../../request'
import { formatTS } from '../../utils'
import Tag from '../common/Tag.vue'

export default {
  components: {
    Tag,
  },
  data () {
    return {
      list: [],
    }
  },
  computed: {
  },
  methods: {
    async fetchMessages () {
      const { getMessages } = api
      const res = await getMessages()
      const { data } = res
      if (data) this.list = data.messages
    },
    getTitle (item) {
      const locale = this.$i18n.locale
      const t = `title_${locale}`
      return item[t]
    },
    getTime (ts) {
      return formatTS(ts, 'YYYY-MM-DD hh:mm')
    },
  },
  mounted () {
    this.fetchMessages()
  },
}
</script>

<style lang="scss" scoped>
.message-list {
  padding: 20px 40px;
  height: 90%;
  width: 100%;
  box-sizing: border-box;
  overflow: scroll;
  color: rgba(229, 229, 229, 0.3);
  .msg {
    text-align: left;
    margin-bottom: 30px;
    .title {
      line-height: 28px;
      
      padding-bottom: 5px;
      .light {
        color: rgba(229, 229, 229, 0.7);
      }
      .private {
        color: $green;
      }
    }
  }
}
</style>