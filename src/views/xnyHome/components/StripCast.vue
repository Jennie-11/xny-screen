<template>
  <div class="strip-cast wd-100bai pd-24 ps-rl ft-16 fx-sp-un pd-tp-32">
    <div
      class="wd-345"
      v-for="item in processList"
      :key="item.id"
      :class="$activeHalfClass(item.produceStatus)"
    >
      <div
        class="process-title mg-bt-16 pd-12 ht-44 fx-un-ct ft-20"
        v-if="item.deviceName"
      >
        <div class="wd-20 ht-20 bd-40A-1 fx-ct-ct mg-rt-16">
          <div class="icon-in wd-8 ht-8 bg-66D"></div>
        </div>
        {{ item.deviceName }}
      </div>
      <div
        v-for="item2 in item.pipeData"
        :key="item2.id"
        :class="activeClass(item2.produceStatus, item.produceStatus)"
      >
        <div class="process-item pd-lf-4 pd-rt-12 bg-at mg-bt-8 fx-sp-ct">
          <div class="fx-un-ct">
            <div
              class="icon mg-rt-8 wd-48 ht-48"
              :style="
                $bgPsFun(
                  item2.position.split(',')[0],
                  item2.position.split(',')[1]
                )
              "
            ></div>
            <div class="">
              <div class="mg-bt-4">{{ item2.monitorName }}</div>
              <div class="cr-eff ft-14">
                [{{
                  item2.dfmMaximumValue * 1 == -99999 || !item2.dfmMaximumValue
                    ? item2.dfmMinimumValue
                    : item2.dfmMinimumValue * 1 +
                      "-" +
                      item2.dfmMaximumValue * 1
                }}
                {{ item2.monitorUnitStr }}]
              </div>
            </div>
          </div>
          <div class="ff-tx fx-fe-fe">
            <div class="ft-22 mg-rt-8 lh-22 ft-at">
              {{
                item.produceStatus == 30 || item2.produceStatus == 30
                  ? "-"
                  : item2.monitorValue * 1
              }}
            </div>
            <div class="ft-14 lh-14 monitorUnitStr">
              {{ item2.monitorUnitStr }}
            </div>
          </div>
        </div>
      </div>
    </div>
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
  padding-top: 2.4vh;
  height: 100%;
}
.process-title {
  background: bg-lg();
  border-top: 1px solid rgba(122, 163, 204, 0.5);
}
.process-item {
  background: bg-lg();
  height: 5.741vh;
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
</style>
