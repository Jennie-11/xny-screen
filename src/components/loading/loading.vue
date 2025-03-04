<template>
  <div class="laodingBox" @click.stop v-show="show">
    <div class="gLoading">
      <div class="gradient-circle"></div>
      <!-- <img class="gLoading_icon" :src="loadingImg" /> -->
      <p class="tips">loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingBox",
  data() {
    return {
      show: false,
      loadingImg: require("./images/loading-blue.png"),
    };
  },
};
</script>

<style scoped>
.gradient-circle {
  /* position: ; */
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(0, 222, 255, 0) 0%,
    rgba(0, 222, 255, 0.9) 100%
  );
  position: relative;
  animation: turn 1.5s linear infinite;
}

.gradient-circle::after {
  content: "";
  position: absolute;
  top: 5px; /* 调整边框宽度 */
  left: 5px; /* 调整边框宽度 */
  width: calc(100% - 10px); /* 调整边框宽度 */
  height: calc(100% - 10px); /* 调整边框宽度 */
  background: black; /* 背景色 */
  border-radius: 50%;
  z-index: 1;
}
.laodingBox {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10002;
  top: 0;
  left: 0;
}
.gLoading {
  top: 50%;
  left: 50%;
  width: 112px;
  padding: 16px 16px 14px 16px;
  /* height: 112px; */
  z-index: 1000;
  display: flex;
  border-radius: 6px;
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translate(-50%, -50%);
  /* background: rgba(0, 0, 0, 0); */
  /* box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15); */
  font-size: 16px;
  box-sizing: border-box;
}

.tips {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 400;
  color: #00deff;
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
