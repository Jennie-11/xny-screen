<template>
  <div
    class="wd-100bai pd-24 fx-fl"
    :class="processItemClass(0, item.produceStatus)"
  >
    <div :class="processItemClass(1)">
      <div
        :class="processItemClass(2, item2.produceStatus)"
        v-for="item2 in item.basicVoList[0].pipeData"
        :key="item2.id"
      >
        <!-- :class="$activeClass(item2.produceStatus, -1, 2)" -->
        <div
          :class="processItemClass(3)"
          :style="
            $bgPsFun(item2.position.split(',')[0], item2.position.split(',')[1])
          "
        ></div>
        <div :class="processItemClass(4)">
          <div :class="processItemClass(5)">
            <div :class="processItemClass(6)">
              {{ item2.monitorName }}
            </div>

            <div :class="processItemClass(7)">
              <div :class="processItemClass(8)">
                <span :class="processItemClass(9)">{{
                  item.produceStatus == 30 || item2.produceStatus == 30
                    ? "-"
                    : item2.monitorValue * 1
                }}</span>
                <span class="cr-wt-8 ft-14">{{ item2.monitorUnitStr }}</span>
              </div>

              <div
                class="dfmMinimumValue ft-14 cr-eff"
                :class="processItemClass(11)"
              >
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
          <div class="fx-ct-ct ps-rl wd-100bai" v-if="item.machineType == 4">
            <div class="wrap"></div>
            <ProgressBox
              class="wd-100bai"
              :value="item2.monitorValue"
              :max="item2.dfmMaximumValue"
              :deviceStatus="item.produceStatus"
              :status="item2.produceStatus"
            ></ProgressBox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBox from "@/views/xnyHome/components/ProgressBox.vue";
export default {
  name: "ProessItem",
  props: ["item", "slotTrue", "classNameList"],
  components: { ProgressBox },

  mounted() {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    processItemClass(done, produceStatus) {
      if (!this.classNameList.list) return;
      let className = this.classNameList.list.find((item2, index) => {
        return index == done;
      });
      if (produceStatus && produceStatus == 30) {
        return;
      }
      let activeClass = "";
      if (done == 0) {
        activeClass = this.$activeHalfClass(produceStatus);
      }
      if (produceStatus && produceStatus == 2) {
        return className + " " + "ff0Active";
      }

      return className + activeClass;
    },
  },
};
</script>

<style lang="scss" scoped>
$bgurl: url(~@/assets/view/xnyHome/xnyHome.png) no-repeat;
$bgLinear: linear-gradient(
  270deg,
  rgba(96, 143, 191, 0.2) 0%,
  rgba(96, 143, 191, 0) 100%
);
.bg {
  background: $bgurl;

  background-size: $bgSize;
}
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
.texturing-Item {
  background: linear-gradient(
    90deg,
    rgba(96, 143, 191, 0.2) 0%,
    rgba(96, 143, 191, 0.06) 100%
  );
}
.texturingmonitorName {
  position: relative;
  padding-bottom: 8px;
  &::after {
    content: "";
    // display: block;
    transform: skew(-15deg);
    left: 0;
    bottom: 0;
    position: absolute;
    width: 136px;
    height: 16px;
    background: $bgLinear;
  }
  .texturing-Item {
    background: linear-gradient(
      90deg,
      rgba(96, 143, 191, 0.2) 0%,
      rgba(96, 143, 191, 0.06) 100%
    );
  }
}
.anneal-monitorName {
  margin-left: -6px;
}
</style>
