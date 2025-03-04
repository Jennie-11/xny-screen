<template>
  <div class="ps-rl zx-1 cr-wt-10">
    <img class="head-bg" src="@/assets/common/head.png" />
    <div class="head-content fx-sp-fs fx-sk wd-fl ps-as zx-1 ps-tp-0">
      <Options v-if="isNeedOption" class="mg-lt-24" />
      <div class="head-title tx-ct fx-fl ft-40 ff-ysb ft-ls-4 fw-40">
        {{ title }}
      </div>
      <Exit v-if="isNeedOption" class="date-exit mg-rt-24" v-bind="$attrs" />
    </div>
  </div>
</template>
<script>
import Exit from "./Exit.vue";
import Options from "./Options.vue";
export default {
  name: "HeaderBox",

  props: {
    isNeedOption: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Exit,
    Options,
  },
  data() {
    return {
      title: "新能源应用材料事业部",
    };
  },
};
</script>
<style lang="scss" scoped>
.head-bg {
  // position: absolute;
  width: 100%;
  object-fit: contain;
}
.head-content {
  .head-title {
    line-height: 76px;
  }
}
</style>
