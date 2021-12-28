<template>
  <div id="luckDialog">
    <Dialog @cancel="onCancel" @confirm="onConfirm">
      {{ $t('home.activity.tbd') }}
    </Dialog>
  </div>
</template>

<script>
import Dialog from './common/Dialog.vue'

export default {
  components: {
    Dialog,
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    },
    onConfirm () {
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="scss" scoped>

</style>