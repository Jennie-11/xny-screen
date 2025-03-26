<template>
  <div class="strip-cast wd-100bai ps-rl ft-16 fx-cl fx-wp">
    <div
      class="process-title mg-bt-16 pd-12 ht-44 fx-un-ct ft-20"
      v-if="processList.deviceName"
    >
      <div class="wd-20 ht-20 bd-40A-1 fx-ct-ct mg-rt-16">
        <div class="icon-in wd-8 ht-8 bg-66D"></div>
      </div>
      {{ processList.deviceName }}
    </div>
    <div class="wd-100bai fx-fl fx-ct-ct" v-if="processList.length == 0">
      <img src="@/assets/icons/no-data.png" alt="" class="mg-rt-24" />
      <span class="ff-ysb ft-18"> 暂无数据</span>
    </div>

    <template v-for="item2 in processList" v-else>
      <template>
        <div
          class="pipeData"
          v-for="item3 in item2.pipeData"
          :key="item3.id"
          :class="
            activeClass(
              item3.produceStatus,

              processList.produceStatus
            )
          "
        >
          <div class="ht-62 mg-bt-24" v-if="!item3.id"></div>
          <div v-else class="process-item pd-lf-4 pd-rt-12 bg-at fx-sp-ct">
            <div class="fx-un-ct">
              <div
                class="icon mg-rt-8 wd-48 ht-48"
                :style="
                  $bgPsFun(
                    item3.position.split(',')[0],
                    item3.position.split(',')[1]
                  )
                "
              ></div>
              <div class="">
                <div class="mg-bt-4">{{ item3.monitorName }}</div>
                <div class="cr-eff ft-14">
                  [{{ item3.standardValueStr }}
                  {{ item3.monitorUnitStr == "%" ? "%" : "" }}]
                </div>
              </div>
            </div>
            <div class="ff-tx fx-fe-fe">
              <div class="ft-22 mg-rt-8 lh-22 ft-at">
                {{
                  processList.produceStatus == 30 || item3.produceStatus == 30
                    ? "-"
                    : item3.monitorValue * 1
                }}
              </div>
              <div class="ft-14 lh-14 monitorUnitStr">
                {{ item3.monitorUnitStr }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: ["title", "url", "processList"],
  data() {
    return {};
  },

  mounted() {},
  computed: {},
  methods: {
    activeClass(produceStatus, status) {
      if (status == 30) return;
      return this.$activeClass(produceStatus, -1, 2);
    },
  },
};
</script>

<style lang="scss" scoped>
@function bg-lg() {
  @return linear-gradient(
    90deg,
    rgba(96, 143, 191, 0.2) 0%,
    rgba(47, 119, 191, 0.06) 100%
  );
}
.strip-cast {
  padding: 27px 24px;
  display: flex;
  align-content: space-between;
  // padding-bottom: 50px;
  justify-content: center;
  // max-height: 400px;
  flex: 1;
  // max-height: 100%;
}
.processList {
  align-content: space-between;
}
.process-title {
  background: bg-lg();
  border-top: 1px solid rgba(122, 163, 204, 0.5);
}
.pipeData {
  width: calc(50% - 8px);
  // height: 25%;
  // min-height: 25%;
  // margin-bottom: 24px;
}
.process-item {
  background: bg-lg();
  // height: calc(100% - 24px);
  height: 62px;
  margin-bottom: 24px;
  // height: 5.741vh;
}
.icon-in {
  box-shadow: 0px 0px 8px 1px rgba(0, 145, 248, 1),
    0px 0px 4px 0px rgba(33, 121, 195, 0.88);
}
.icon {
  background: url(~@/assets/view/xnyHome/xnyHome.png) no-repeat;
  background-size: $bgSize;
}
.monitorUnitStr {
  opacity: 0.8;
}
.strip-cast {
  // height: calc(100% - 4vh);
}
</style>
