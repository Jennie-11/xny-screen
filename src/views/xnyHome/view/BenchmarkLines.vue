<template>
  <div class="pd-tp-16 f cr-wt-10 mg-24">
    <div
      v-if="stripCastList.length > 0"
      class="fx-sp-un wd-100bai fx-wp processList ht-441"
    >
      <ProessCard
        class="proess-card-item wd-608"
        :processName="item.processName"
        :imgurl="stripCast"
        v-for="item in stripCastList.slice(0, 2)"
        :key="item.id"
        :class="$activeHalfClass(item.produceStatus)"
      >
        <template v-slot:cardConent>
          <benchmarkProess
            :processList="item.basicVoList"
            class="max-ht-400px"
          />
        </template>
      </ProessCard>
      <div class="fx-cl fx-sp-un">
        <div v-for="item in stripCastList.slice(2, 4)" :key="item.id">
          <ProessCard
            class="proess-card-item wd-608 ht-208"
            :processName="item.processName"
            :imgurl="xiaokuan"
            :class="$activeHalfClass(item.produceStatus)"
          >
            <template v-slot:cardConent>
              <benchmarkProess
                :processList="item.basicVoList"
                class="max-ht-200px"
              />
            </template>
          </ProessCard>
        </div>
      </div>
    </div>
    <div class="wd-100bai fx-sp-un fx-cl fx-wp ht-441 mg-tp-40 proess-items">
      <template v-if="proessCardList.length > 0">
        <ProessCard
          class="wd-608"
          v-for="item in proessCardList.slice(0, 4)"
          :key="item.id"
          :processName="item.processName"
          :imgurl="imgurl(item.machineType)"
          :class="proessCardClass(item.machineType, item.produceStatus)"
        >
          <template v-slot:cardConent>
            <ProessItem
              :classNameList="classNameListchoose(item.machineType)"
              :item="item"
            />
          </template>
        </ProessCard>

        <div class="wd-608 mg-tp-24 ht-208 fx fx-sp-un">
          <ProessCard
            v-for="item in comeCheck"
            :key="item.id"
            class="wd-49bai"
            :processName="item.processName"
            :imgurl="lailiaobox"
          >
            <template v-slot:cardConent>
              <div
                class="bg ht-91 wd-244 fx-sa-ct fx-cl mg-tp-27"
                :style="$bgPsFun(-156, -136)"
              >
                <div class="ff-tx ft-24 lh-24">0</div>
                <div class="ff-ysb ft-24 cr-ff0">NG</div>
              </div></template
            >
          </ProessCard>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ProessCard from "../components/ProessCard.vue";
import ProessItem from "../components/benchmarkProessItem.vue";
import benchmarkProess from "../components/benchmarkProess.vue";
export default {
  components: {
    ProessCard,
    benchmarkProess,
    ProessItem,
  },
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
  data() {
    return {
      stripCast: require("@/assets/view/benchmarkLines/strip-cast.png"),
      xiaokuan: require("@/assets/view/benchmarkLines/xiaokuan.png"),
      proessCard: require("@/assets/view/xnyHome/proess-card.png"),
      lailiaobox: require("@/assets/view/benchmarkLines/lailiaobox.png"),
      stripCastList: [],
      proessCardList: [],
      // stripCastList: [
      //   {
      //     id: "1",

      //     machineType: "5",
      //     basicVoList: {
      //       pipeData: [
      //         {
      //           monitorName: "熔炼温度 ",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "kg",
      //           position: "-422,-283 ",
      //           status: 1,
      //         },
      //         {
      //           monitorName: "静置温度",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "g",
      //           position: "-422,-283",
      //         },
      //         {
      //           monitorName: "含渣量 ",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "g",
      //           position: "-52, -619",
      //         },
      //         {
      //           monitorName: "镁含量 ",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "g",
      //           position: "-52, -675",
      //         },
      //         {
      //           monitorName: "保温温度",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "g",
      //           position: "-422, -283",
      //         },
      //         {
      //           monitorName: "",
      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "℃",
      //           position: "-422, -283",
      //         },
      //         {
      //           monitorName: "锌含量",
      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "mm",
      //           position: "-52, -731",
      //           status: 2,
      //         },
      //         {
      //           monitorName: "氢含量",
      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "℃",
      //           position: "-52, -787",
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     id: "2",

      //     machineType: "1",
      //     basicVoList: {
      //       pipeData: [
      //         {
      //           monitorName: "进铸嘴前温度",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "kg",
      //           position: "-422, -283",
      //           status: 1,
      //         },
      //         {
      //           monitorName: "冷却水出水温度",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "g",
      //           position: "-422, -283",
      //         },
      //         {
      //           monitorName: "左侧轧制力",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "g",
      //           position: "-1161, -354",
      //         },
      //         {
      //           monitorName: "铸轧线速度 ",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "g",
      //           position: "-1161, -284",
      //         },
      //         {
      //           monitorName: "冷却水进水温度",

      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "g",
      //           position: "-422, -283",
      //         },
      //         {
      //           monitorName: "前箱液位高度",
      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "℃",
      //           position: "-422, -354",
      //         },
      //         {
      //           monitorName: "右侧轧制力",
      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "mm",
      //           position: "-1161, -426",
      //           status: 2,
      //         },
      //         {
      //           monitorName: "铸轧厚度",
      //           dfmMinimumValue: "0",
      //           monitorValue: "0",
      //           monitorUnitStr: "℃",
      //           position: "-1531, -283",
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     id: "3",

      //     machineType: "6",
      //     pipeData: [
      //       {
      //         monitorName: "切刀间距",

      //         dfmMinimumValue: "0",
      //         monitorValue: "0",
      //         monitorUnitStr: "kg",
      //         position: "-52, -843",
      //         status: 1,
      //       },
      //       {
      //         monitorName: "粗切线速度",

      //         dfmMinimumValue: "0",
      //         monitorValue: "0",
      //         monitorUnitStr: "g",
      //         position: "-52, -424",
      //       },
      //     ],
      //   },
      //   {
      //     id: "4",

      //     machineType: "11",
      //     pipeData: [
      //       // {
      //       //   monitorName: "铝锭投入量",
      //       //   dfmMinimumValue: "0",
      //       //   monitorValue: "0",
      //       //   monitorUnitStr: "kg",
      //       //   position: "-52, -283",
      //       //   status: 1,
      //       // },
      //       // {
      //       //   monitorName: "精炼剂加入量",
      //       //   dfmMinimumValue: "0",
      //       //   monitorValue: "0",
      //       //   monitorUnitStr: "g",
      //       //   position: "-52, -354",
      //       // },
      //     ],
      //   },
      // ],
      // proessCardList: [
      //   {
      //     id: "texturing",
      //     processName: "精轧",
      //     machineType: "3",
      //     basicVoList: [
      //       {
      //         pipeData: [
      //           {
      //             id: "texturingSpeed",
      //             monitorName: "精轧线速度",
      //             dfmMinimumValue: "0",
      //             monitorValue: "0",
      //             monitorUnitStr: "m/min",
      //             position: "-522, -827",
      //             status: 1,
      //           },
      //           {
      //             id: "texturingRoughness",
      //             monitorName: "左侧轧制力",
      //             dfmMinimumValue: "0",
      //             monitorValue: "0",
      //             monitorUnitStr: "KN",
      //             position: "-118, -843",
      //             status: 0,
      //           },
      //           {
      //             id: "texturingSpeed",
      //             monitorName: "右侧轧制力",
      //             dfmMinimumValue: "0",
      //             monitorValue: "0",
      //             monitorUnitStr: "KN",
      //             position: "-118, -958",
      //             status: 1,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     id: "finishRoll",
      //     processName: "退火",
      //     machineType: "4",

      //     basicVoList: [
      //       {
      //         pipeData: [
      //           {
      //             id: "leftroll",
      //             monitorName: "退火温度",
      //             dfmMinimumValue: "0",
      //             monitorValue: "0",
      //             monitorUnitStr: "KN",
      //             position: "-996, -882",
      //             status: 1,
      //           },
      //           {
      //             id: "rightroll",
      //             monitorName: "退火时间",
      //             dfmMinimumValue: "0",
      //             monitorValue: "0",
      //             monitorUnitStr: "KN",
      //             position: "-996, -755",
      //             status: 0,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     id: "finishRoll",
      //     processName: "打磨",
      //     machineType: "7",

      //     basicVoList: [
      //       {
      //         pipeData: [
      //           {
      //             id: "finishRollSpeed",
      //             monitorName: "磨头转速",
      //             dfmMinimumValue: "0",
      //             monitorValue: "0",
      //             monitorUnitStr: "m/min",
      //             position: "-996, -827",
      //             status: 1,
      //           },
      //           {
      //             id: "tothick",
      //             monitorName: "打磨线速度",
      //             dfmMinimumValue: "0",
      //             monitorValue: "0",
      //             monitorUnitStr: "mm",
      //             position: "-996, -827",
      //             status: 0,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     id: "anneal",
      //     processName: "精轧后侧厚",
      //     machineType: "8",
      //     basicVoList: [
      //       {
      //         pipeData: [
      //           {
      //             id: "texturingSpeed",
      //             monitorName: "1号位置炉温",
      //             dfmMinimumValue: "0",
      //             dfmMaximumValue: "0",
      //             monitorValue: "0",
      //             monitorUnitStr: "℃",
      //             position: "-1470, -647",
      //             status: 2,
      //           },
      //           {
      //             id: "texturingRoughness",
      //             monitorName: "2号位置炉温",
      //             dfmMinimumValue: "0",
      //             dfmMaximumValue: "0",
      //             monitorValue: "0",
      //             monitorUnitStr: "℃",
      //             position: "-1470, -647",
      //             status: 0,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      comeCheck: [
        {
          id: "1",
          processName: "来料CCO检验",
        },
        {
          id: "2",
          processName: "复合CCO检验",
        },
      ],
      classNameList: [
        {
          type: 3,
          className: "ht-441",
          list: [
            "pd-tp-40",
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
        {
          type: 4,
          className: "ht-208",
          list: [
            "fx-sp-ct",
            "fx-sp-ct fx-wp  wd-100bai",
            "fx-sp-ct   wd-50bai",
            "bg wd-48 ht-48 mg-rt-12",
            "fx-fl",
            "ps-rl",
            "ft-20 cr-wt-8 ",
            "",
            "monitorValue ff-tx",
            "ft-22 ft-at mg-rt-8",
            "monitorUnitStr ft-14",
            " ps-as ps-tp-4 ps-lt-110",
          ],
        },
        {
          type: 7,
          className: "ht-208",
          list: [
            "fx-sp-ct",
            "fx-sp-ct fx-wp  wd-100bai",
            "fx-sp-ct  wd-50bai",
            "bg wd-48 ht-48 mg-rt-12",
            "fx-fl",
            "ps-rl",
            "ft-20 cr-wt-8 ",
            "",
            "monitorValue ff-tx",
            "ft-22 ft-at mg-rt-8",
            "monitorUnitStr ft-14",
            " ps-as ps-tp-4 ps-lt-110",
          ],
        },
        {
          type: 8,
          className: "ht-208",
          list: [
            " fx-sp-ct",
            "fx-sp-ct wd-100bai",
            "fx-un-ct  ps-rl",
            "bg wd-126 ht-66 mg-rt-24",
            "fx-fl",
            "",
            "mg-bt-8 ft-20 cr-wt-8",
            "fx-sp-ct",
            "ff-tx ps-as ps-tp--10 ps-lt-0 wd-126 fx-ct-fe",
            "ft-24 ft-at mg-rt-4 lh-24",
            "monitorUnitStr ft-14 lh-14",
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
    imgurl(type) {
      if (type == 3) {
        return this.stripCast;
      } else {
        return this.xiaokuan;
      }
    },
    proessCardClass(type, produceStatus) {
      // console.log(type);

      let activeHalfClass = this.$activeHalfClass(produceStatus);
      let item = this.classNameList.find((item) => {
        return item.type == type;
      });
      return activeHalfClass + item.className;
    },
  },
  watch: {
    dataList: {
      handler(newValue) {
        this.stripCastList = newValue.machineVoList.slice(0, 4);

        this.stripCastList[0].basicVoList[0].pipeData.splice(5, 0, {
          id: 0,
          produceStatus: 30,
        });
        this.proessCardList = newValue.machineVoList.slice(4, 8);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
$bgurl: url(~@/assets/view/xnyHome/xnyHome.png) no-repeat;

.bg {
  background: $bgurl;

  background-size: $bgSize;
}
.proess-items {
  align-content: space-between;
}
</style>
