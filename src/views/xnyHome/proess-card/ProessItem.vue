<template>
  <div class="wd-100bai pd-24" :class="processItemClass(item.machineType, 0)">
    <div :class="processItemClass(item.machineType, 1)">
      <div
        :class="processItemClass(item.machineType, 2, item2.produceStatus)"
        v-for="item2 in item.basicVoList[0].pipeData"
        :key="item2.id"
      >
        <!-- :class="$activeClass(item2.produceStatus, -1, 2)" -->
        <div
          :class="processItemClass(item.machineType, 3)"
          :style="
            $bgPsFun(item2.position.split(',')[0], item2.position.split(',')[1])
          "
        ></div>
        <div :class="processItemClass(item.machineType, 4)">
          <div :class="processItemClass(item.machineType, 5)">
            <div :class="processItemClass(item.machineType, 6)">
              {{ item2.monitorName }}
            </div>

            <div :class="processItemClass(item.machineType, 7)">
              <div :class="processItemClass(item.machineType, 8)">
                <span :class="processItemClass(item.machineType, 9)">{{
                  item2.monitorValue * 1
                }}</span>
                <span class="cr-wt-8 ft-14">{{ item2.monitorUnitStr }}</span>
              </div>

              <div class="dfmMinimumValue ft-14 cr-eff">
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
              :status="item2.produceStatus"
            ></ProgressBox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBox from "@/views/xnyHome/proess-card/ProgressBox.vue";
export default {
  name: "ProessItem",
  props: ["item", "slotTrue"],
  components: { ProgressBox },

  mounted() {},
  data() {
    return {
      classNameList: [
        {
          type: 4,
          list: [
            " mg-tp-14",
            "",
            "fx-un-ct mg-bt-38 ps-rl",
            "bg wd-126 ht-66 mg-rt-24",
            "fx-fl",
            "fx-sp-un anneal-monitorName",
            "mg-bt-8 ft-20 cr-wt-8",
            "fx-sp-ct pd-lf-24 ",
            "ff-tx ps-as ps-tp--10 ps-lt-0 wd-126 fx-ct-fe",
            "ft-24 ft-at mg-rt-4 lh-24",
            "monitorUnitStr ft-14 lh-14",
            "dfmMinimumValue ft-14 cr-eff",
          ],
        },
        {
          type: 3,
          list: [
            "",
            "fx-sp-ct fx-wp",
            "fx-sp-fs mg-bt-22 wd-50bai",
            "bg wd-48 ht-48 mg-rt-12",
            "fx-fl",
            "",
            "ft-20 cr-wt-8",
            "",
            "monitorValue ff-tx",
            "ft-22 ft-at mg-rt-8",
            "monitorUnitStr ft-14",
            "dfmMinimumValue ft-14 cr-eff",
          ],
        },
        {
          type: 2,
          list: [
            "",
            "",
            "fx-un-ct mg-bt-22",
            "bg wd-80 ht-80 mg-rt-24",
            "fx-fl",
            "",
            "mg-bt-8 ft-20 cr-wt-8 texturingmonitorName pd-lf-24",
            "fx-sp-ct bg-at pd-lf-20 pd-rt-16 pd-4 texturing-Item ht-vh40 at-bg",
            "monitorValue ff-tx",
            "ft-22 lh-24 ft-at mg-rt-8",
            "monitorUnitStr ft-14",
            "dfmMinimumValue ft-14 cr-eff",
          ],
        },
      ],
    };
  },
  computed: {},
  methods: {
    processItemClass(type, done, produceStatus) {
      let item = this.classNameList.find((item) => {
        return item.type == type;
      });

      let className = item.list.find((item2, index) => {
        return index == done;
      });
      if (produceStatus && produceStatus == 2) {
        return className + " " + "ff0Active";
      }

      return className;
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
