<template>
  <div class="proess-card ps-rl">
    <img :src="imgurl" class="bg-img" alt="" />
    <div class="conent ps-as ps-tp-0 fx-cl fx-un-ct mg-tp-20">
      <div class="title ff-ysb cr-eff ft-24">{{ processName }}</div>
      <slot name="cardConent"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["processName", "imgurl"],
};
</script>

<style lang="scss" scoped>
.proess-card {
  height: 100%;
}
.bg-img {
  width: 100%;
  height: 100%;
}
.conent {
  width: 100%;
  height: 100%;
}
</style>
