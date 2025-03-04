<template>
  <div>
    <transition name="fade">
      <div class="confirm" v-show="showConfirm">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <div class="title">
              <span class="title-text">
                <span>{{ title }}</span>
              </span>
              <!-- <i class="el-icon-close"></i> -->
              <span class="close" @click="judgeClose"></span>
            </div>
            <div class="content">
              <div
                class="content-wrapper"
                v-for="(item, index) in content"
                :key="index"
                v-html="item"
              ></div>
            </div>
            <div class="operate-box" @click.stop>
              <div
                class="operate-btn operation-cancel"
                :style="{ width: cancelWidth + 'px' }"
                v-show="cancelShow"
                @click="cancel"
              >
                {{ cancelBtnText }}
              </div>
              <div
                class="operate-btn blue-btn"
                :style="{ width: confirmWidth + 'px' }"
                v-show="confirmShow"
                @click="confirm"
              >
                {{ confirmBtnText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirm: false,
      content: ["这是文件内容"],
      title: "确认",
      confirmBtnText: "确定",
      cancelBtnText: "取消",
      confirmShow: true,
      cancelShow: true,
      // 仅关闭弹窗，不执行事件
      isOnlyClose: false,
      cancelWidth: 64,
      confirmWidth: 64,
    };
  },
  methods: {
    show(func) {
      this.showConfirm = true;
      typeof func === "function" && func.call(this, this);
      return new Promise((resolve, reject) => {
        this.reject = reject;
        this.resolve = resolve;
      });
    },
    cancel() {
      this.reject("cancel");
      this.hide();
    },
    // 判断关闭
    judgeClose() {
      this.isOnlyClose ? this.onlyClose() : this.cancel();
    },
    onlyClose() {
      this.hide();
    },
    confirm() {
      this.resolve("confirm");
      this.hide();
    },
    hide() {
      this.showConfirm = false;
      document.body.removeChild(this.$el);
      this.$destroy();
    },
  },
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.confirm {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.5);

  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;

    .confirm-content {
      width: 480px;
      // min-height: 174px;
      border-radius: 8px;
      background-color: #fff;
      position: relative;
      padding: 24px;
      background-color: rgba(0, 18, 24, 0.8);
      border: 1px solid #008fb3;
      .title {
        position: relative;
        // line-height: 22px;
        text-align: left;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        .title-text {
          right: 0;
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 18px;
          color: #fff;
          vertical-align: middle;
        }
        .close {
          position: relative;
          // top: 50%;
          // transform: translateY(-50%);
          right: 0;
          width: 16px;
          height: 16px;
        }

        .close::before,
        .close::after {
          position: absolute;
          content: " ";
          background-color: #fff;
          right: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 14px;
          cursor: pointer;
        }

        .close::before {
          transform: rotate(45deg);
        }

        .close::after {
          transform: rotate(-45deg);
        }
      }
      .content {
        // padding: 0 24px;
        font-size: 14px;
        line-height: 22px;
        margin-top: 16px;
        max-height: 578px;
        overflow-y: scroll;
        color: #fff;

        .content-wrapper {
          margin-bottom: 8px;
          font-size: 16px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .operate-box {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 14px;
        margin-top: 24px;
        border-radius: 8px;
        justify-content: flex-end;

        .operate-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 32px;
          height: 32px;
          min-width: 64px;
          border-radius: 3px;
          padding: 10px 0;
          color: #000;
          cursor: pointer;
          &:not(:first-child) {
            margin-left: 16px;
          }
          &.confirm {
            border-right: 1px solid rgba(0, 0, 0, 0.3);
          }
        }

        .operation-cancel {
          border: 1px solid #00deff;
          color: #00deff;
          // margin-right: 24px;
        }
      }
    }
  }
  .warn-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    // background-image: url("~@/assets/icons/query-icon.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
