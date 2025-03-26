<template>
  <div class="exit-box fx-fe-ct ft-20 fx-fl ht-52 lh-20">
    <div class="time">{{ time }}</div>
    <div class="line wd-1 ht-15 bg-fff mg-12 op-50"></div>
    <div class="date">{{ date }}</div>
    <div class="line wd-1 ht-16 bg-fff mg-12 op-50"></div>

    <div class="week">{{ week }}</div>
    <span
      class="fullbutton"
      :class="isFull ? 'exitfullbutton' : ''"
      @click="fullScreen"
    ></span>
    <img
      v-if="isNeedExit"
      class="ic-24 mg-lt-24 cs-pt"
      src="@/assets/icons/close_1.png"
      @click="logoutHandle"
    />
  </div>
</template>
<script>
export default {
  name: "ExitBox",
  props: {
    isNeedExit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isFull: false,
    time: null,
    date: null,
    week: null,
  }),
  mounted() {
    this.newTimer = setInterval(this.getNowTime, 1000);
    window.addEventListener("resize", (event) => {
      event.preventDefault();
      this.isFull =
        Math.abs(
          window.screen.height - window.document.documentElement.clientHeight
        ) <= 17;
    });
    window.addEventListener("keydown", (event) => {
      // console.log(event, 'event.key == "F11"');
      if (event.key == "F11") {
        //
        event.preventDefault();
        this.fullScreen();
      }
    });
  },
  methods: {
    fullScreen() {
      // 退出全屏后要执行的动作

      if (!this.isFull) {
        this.requestFullScreen();
      } else {
        this.ExitFullscreen();
      }
      this.isFull = !this.isFull;
      // 为了兼容要写两套
    },
    requestFullScreen() {
      let de = document.body;
      console.log(de.requestFullscreen, "de.requestFullscreen");
      if (de.requestFullscreen) {
        de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
      }
    },
    ExitFullscreen() {
      let de = document;
      // console.log(de.exitFullscreen, "de.exitFullscreen");

      if (de.exitFullscreen) {
        de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
      }
    },
    getNowTime() {
      const now = new Date();
      this.date = now.toLocaleDateString();
      this.time = now.toLocaleString().split(" ")[1];
      this.week = now.toLocaleDateString(undefined, { weekday: "long" });
    },
    logoutHandle() {
      // let textName = "logout"
      this.$textShow({
        title: this.$t("tip.label"),
        content: ["是否退出登录"],
      }).then(async () => {
        this.$store.dispatch("FedLogOut").then(() => {
          this.$message({
            message: this.$t("login.logout"),
            type: "info",
            duration: 1500,
          });
          this.$router.push("/login");
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.date,
.time,
.week {
  font-family: "TenXun";

  // color: #030b1a;
}
.time {
  min-width: 82px;
  text-align: right;
}
.fullbutton {
  margin-top: 2px;
  // border: none;
  margin-left: 24px;
  cursor: pointer;
  // margin-right: 24px;
  // line-height: 20px;
  width: 24px;
  height: 24px;
  // margin-top: 2px;
  background: url(~@/assets/icons/full.png) no-repeat;
  background-size: contain;
  position: relative;
  z-index: 2;
}
.exitfullbutton {
  background: url(~@/assets/icons/full.png) no-repeat;
  background-size: contain;
}
</style>
