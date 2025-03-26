<template>
  <div class="pd-tp-16 cr-wt-10 mg-24">
    <div class="strip-cast wd-100bai ht-vh593">
      <ProessCard class="ht-100bai" processName="铸轧工序" :imgurl="stripCast">
        <template v-slot:cardConent>
          <StripCast :processList="stripCastList" />
        </template>
      </ProessCard>
      <div class="wd-100bai fx-sp-un ht-vh305">
        <ProessCard
          class="wd-450 mg-tp-24 ht-100bai"
          :processName="comeCheck.processName"
          :imgurl="proessCard"
        >
          <template v-slot:cardConent>
            <div
              class="bg ht-146 mg-rt-8 wd-320 fx-sp-ct fx-cl pd-bt-19 mg-tp-45"
              :style="$bgPsFun(-1292, -833)"
            >
              <div class="ff-tx ft-36">0</div>
              <div class="ff-ysb ft-40 cr-ff0">NG</div>
            </div>
          </template>
        </ProessCard>
        <template v-if="proessCardList.length > 0">
          <ProessCard
            class="wd-450 mg-tp-24 ht-100bai"
            v-for="item in proessCardList"
            :key="item.id"
            :processName="item.processName + '工序'"
            :imgurl="proessCard"
            :class="$activeHalfClass(item.produceStatus)"
          >
            <template v-slot:cardConent>
              <ProessItem
                :item="item"
                :classNameList="classNameListchoose(item.machineType)"
              />
            </template>
          </ProessCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ProessCard from "../components/ProessCard.vue";
import StripCast from "../components/StripCast.vue";
import ProessItem from "../components/ProessItem.vue";

export default {
  name: "fhcLine1",
  props: {
    lineId: {
      type: Number,
      default: 1,
    },
    dataList: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ProessCard,
    StripCast,
    ProessItem,
  },
  data() {
    return {
      firstRequest: false,
      stripCast: require("@/assets/view/xnyHome/strip-cast.png"),
      proessCard: require("@/assets/view/xnyHome/proess-card.png"),
      stripCastList: [
        {
          id: "melting",
          deviceName: "熔炼炉",
          machineType: "1",
          pipeData: [
            {
              monitorName: "铝锭投入量",

              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "kg",
              position: "-52, -283",
              status: 1,
            },
            {
              monitorName: "精炼剂加入量",

              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "g",
              position: "-52, -354",
            },
            {
              monitorName: "转子转速",

              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "g",
              position: "-52, -424",
            },
            {
              monitorName: "氩气流量 ",

              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "g",
              position: "-52, -494",
            },
            {
              monitorName: "晶粒细化剂加入量",

              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "g",
              position: "-52, -564",
            },
          ],
        },
        {
          id: "launder2",
          deviceName: "2#流槽",
          pipeData: [
            {
              monitorName: "温度",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "℃",
              position: "-422, -283",
            },
            {
              monitorName: "液面高度",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "mm",
              position: "-422, -354",
              status: 2,
            },
          ],
        },
        {
          id: "launder1",
          deviceName: "1#流槽",
          pipeData: [
            {
              monitorName: "温度",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "℃",
              position: "-422, -283",
            },
            {
              monitorName: "液面高度",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "mm",
              position: "-422, -354",
            },
          ],
        },
        {
          id: "rolling",
          deviceName: "轧机",
          pipeData: [
            {
              monitorName: "铸轧速度",

              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "m/min",
              position: "-1161, -283",
            },
            {
              monitorName: "左轧制力",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "KN",
              position: "-1161, -354",
            },
            {
              monitorName: "右轧制力",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "KN",
              position: "-1161, -424",
            },
            {
              monitorName: "冷却水出水温度",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "℃",
              position: "-1161, -494",
            },
            {
              monitorName: "冷却水流量",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "L/min",
              position: "-1161, -564",
            },
            {
              monitorName: "冷却水压力",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "MPa",
              position: "-1161, -634",
            },
          ],
        },
        {
          id: "detection",
          deviceName: "检测",
          pipeData: [
            {
              monitorName: "总厚",
              dfmMinimumValue: "0",
              monitorValue: "0",
              monitorUnitStr: "mm",
              position: "-1531, -283",
            },
          ],
        },
      ],
      comeCheck: {
        id: "comeCheck",
        processName: "来料检验",
      },
      proessCardList: [
        {
          id: "texturing",
          processName: "毛化",
          machineType: "2",
          basicVoList: [
            {
              pipeData: [
                {
                  id: "texturingSpeed",
                  monitorName: "毛化速度",
                  dfmMinimumValue: "0",
                  monitorValue: "0",
                  monitorUnitStr: "m/min",
                  position: "-522, -827",
                  status: 1,
                },
                {
                  id: "texturingRoughness",
                  monitorName: "毛化粗糙度",
                  dfmMinimumValue: "0",
                  monitorValue: "0",
                  monitorUnitStr: "m/min",
                  position: "-522, -931",
                  status: 0,
                },
              ],
            },
          ],
        },
        {
          id: "finishRoll",
          processName: "精轧",
          machineType: "3",

          basicVoList: [
            {
              pipeData: [
                {
                  id: "finishRollSpeed",
                  monitorName: "精轧速度",
                  dfmMinimumValue: "0",
                  monitorValue: "0",
                  monitorUnitStr: "m/min",
                  position: "-996, -827",
                  status: 1,
                },
                {
                  id: "tothick",
                  monitorName: "总厚",
                  dfmMinimumValue: "0",
                  monitorValue: "0",
                  monitorUnitStr: "mm",
                  position: "-1209, -827",
                  status: 0,
                },
                {
                  id: "leftroll",
                  monitorName: "左轧制力",
                  dfmMinimumValue: "0",
                  monitorValue: "0",
                  monitorUnitStr: "KN",
                  position: "-996, -937",
                  status: 1,
                },
                {
                  id: "rightroll",
                  monitorName: "右轧制力",
                  dfmMinimumValue: "0",
                  monitorValue: "0",
                  monitorUnitStr: "KN",
                  position: "-1209, -937",
                  status: 0,
                },
              ],
            },
          ],
        },
        {
          id: "anneal",
          processName: "退火",
          machineType: "4",
          basicVoList: [
            {
              pipeData: [
                {
                  id: "texturingSpeed",
                  monitorName: "1号位置炉温",
                  dfmMinimumValue: "0",
                  dfmMaximumValue: "0",
                  monitorValue: "0",
                  monitorUnitStr: "℃",
                  position: "-1470, -647",
                  status: 2,
                },
                {
                  id: "texturingRoughness",
                  monitorName: "2号位置炉温",
                  dfmMinimumValue: "0",
                  dfmMaximumValue: "0",
                  monitorValue: "0",
                  monitorUnitStr: "℃",
                  position: "-1470, -647",
                  status: 0,
                },
              ],
            },
          ],
        },
      ],
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
  methods: {
    classNameListchoose(type) {
      let item = this.classNameList.find((item) => {
        return item.type == type;
      });
      return item || "";
    },
  },
  mounted() {},
  watch: {
    dataList: {
      handler(newValue) {
        if (newValue) {
          this.stripCastList = newValue.machineVoList.find(
            (item) => item.machineType == 1
          ).basicVoList;

          this.proessCardList = newValue.machineVoList.slice(1);
        }
      },
      // deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background: url(~@/assets/view/xnyHome/xnyHome.png) no-repeat;

  background-size: $bgSize;
}

.wrap {
  width: 10px;
  // margin-top: 3px;
  border-bottom: 4px solid #808080;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  border-top: 4px solid transparent;
  transform: rotate(-90deg) translateY(-10px);
}

::v-deep {
  .ff0Active {
    .progress-active {
      .el-progress-bar__inner {
        background: linear-gradient(
          90deg,
          rgba(255, 0, 0, 0.1) 0%,
          rgba(255, 0, 0, 1) 100%
        ) !important;
      }
    }
  }
}

.page-container {
  padding-top: 40px;
}

.monitorUnitStr {
  opacity: 0.8;
}
</style>
