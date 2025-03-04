<template>
  <div class="account-box pd-lf-112 fx-fl bd-rd-8">
    <div class="login-title cr-eff ft-32 ff-ysb lh-40 tx-ct">账号密码登录</div>

    <el-form :model="loginForm" :rules="rules" ref="ruleForm" class="mg-tp-58">
      <el-form-item prop="username" class="mg-bt-48">
        <el-input
          :placeholder="$t('login.placeUsername')"
          autocomplete="new-password"
          v-model="loginForm.username"
          @keyup.enter.native="loginHandle"
          :autofocus="true"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :placeholder="$t('login.placePassword')"
          autocomplete="new-password"
          v-model="loginForm.password"
          :show-password="isShowPassWord"
          @keyup.enter.native="loginHandle"
        >
          <i
            slot="suffix"
            class="el-input__icon custom-icon ht-28 mg-rt-10 cs-pt"
            :class="isShowPassWord ? 'isHide' : 'isShow'"
            @click="isShowPassWord = !isShowPassWord"
          ></i>
        </el-input>
      </el-form-item>
    </el-form>
    <div
      class="blue-btn fx-ct-ct ft-24 cr-br-10 bg-eff bd-49b-1 bd-rd-8 ht-64 mg-tp-72 cs-pt"
      @click="loginHandle"
    >
      登录
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountBox",
  data() {
    return {
      isShowPassWord: true,
      loginForm: {
        username: "T999999",
        password: "!a123456",
        tenantId: "000000",
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$t("login.placeUsername"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("login.placePassword"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    loginHandle() {
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) return;
        this.$store
          .dispatch("LoginByUsername", { ...this.loginForm })
          .then(() => {
            this.$message({
              message: this.$t("login.success"),
              type: "success",
              duration: 1500,
            });
            this.$router.push("/xnyHome");
          });
      });
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
::v-deep .el-input {
  .el-input__inner {
    color: $main-color;
    height: 60px;
    padding-left: 24px;
    font-size: 20px;
    &::placeholder {
      font-size: 20px;
      color: #008fb3;
    }
  }
  .el-input__suffix {
    right: 4px !important;
    font-size: 24px;
    right: 12px;
  }
}
::v-deep .el-icon-view {
  display: none !important;
}

::v-deep .custom-icon {
  width: 28px !important;
  &.isHide {
    background: url("~@/assets/common/unview.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  &.isShow {
    background: url("~@/assets/common/view.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.account-box {
  padding: 32px 60px 60px 60px;
  width: 100%;
  height: 100%;
  background: url(~@/assets/login/account-box.png) no-repeat;
  background-size: contain;
  .login-title {
    letter-spacing: 8px;
  }
}
</style>
