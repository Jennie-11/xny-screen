<template>
  <div class="fx-ct-ct ps-rl">
    <div class="wrap"></div>

    <div
      class="progress wd-100bai"
      :class="(deviceStatus != 30) & (status == 2) ? 'ff0Active' : ''"
    >
      <div class="progress-bar__outer wd-100bai"></div>
      <div class="progress-bar__inner wd-100bai bg-at" ref="bar__inner"></div>
      <div class="progress-bg"></div>

      <div class="scales ps-as zx-2 fx-se-ct">
        <div class="scale wd-4 ht-14 bg-1f1" v-for="i in 7" :key="i"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "max", "status", "deviceStatus"],
  mounted() {
    let Num = -100 + (this.value / this.max) * 100;
    if (Num >= 0) {
      Num = 0;
    }
    this.$nextTick(() => {
      this.$refs.bar__inner.style.transform = `translateX( ${Num}% ) `;
    });
  },
};
</script>

<style lang="scss" scoped>
.progress {
  height: 12px;
  margin-left: -4px;
  overflow: hidden;
  position: relative;
  .progress-bar__inner {
    height: 12px;
    background: linear-gradient(
      90deg,
      rgba(0, 222, 255, 0.1) 0%,
      rgba(0, 222, 255, 1) 100%
    ) !important;
    border-radius: 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    transform: translateX(-100%);
    transition: all 2s ease-in-out;
  }

  .progress-bar__outer {
    height: 12px;
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  .scales {
    top: 50%;
    transform: translateY(-50%);
    left: 6px;
    width: calc(100% - 10px);
  }
}
.ff0Active {
  .bg-at {
    background: linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.1) 0%,
      rgba(255, 0, 0, 1) 100%
    ) !important;
  }
}
</style>
