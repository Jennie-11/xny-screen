<template>
  <div class="page-container cr-wt-10">
    <div class="strip-cast wd-100bai ht-vh593">
      <ProessCard processName="铸轧工序" :imgurl="stripCast">
        <template v-slot:cardConent>
          <StripCast :processList="stripCastList" />
        </template>
      </ProessCard>
      <div class="wd-100bai fx-sp-un ht-vh305">
        <ProessCard
          class="proess-card-out wd-450 mg-tp-24"
          :processName="comeCheck.processName"
          :imgurl="proessCard"
        >
          <template v-slot:cardConent>
            <div
              class="bg ht-146 mg-rt-8 wd-320 fx-sp-ct fx-cl pd-bt-19 mg-tp-45"
              :style="$bgPsFun(-89, -847)"
            >
              <div class="ff-tx ft-36">0</div>
              <div class="ff-ysb ft-40 cr-ff0">NG</div>
            </div></template
          >
        </ProessCard>
        <template v-if="proessCardList.length > 0">
          <ProessCard
            class="proess-card-out wd-450 mg-tp-24"
            v-for="item in proessCardList"
            :key="item.id"
            :processName="item.processName + '工序'"
            :imgurl="proessCard"
          >
            <template v-slot:cardConent>
              <ProessItem :item="item" />
            </template>
          </ProessCard>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { sendWebsocket, closeWebsocket, random } from "@/utils/websocket";
import ProessCard from "./proess-card/ProessCard.vue";
import StripCast from "./proess-card/StripCast.vue";
import { throttle } from "@/utils/throttle";
import ProessItem from "./proess-card/ProessItem.vue";

import { getMachineVo } from "@/api/xnyHome/xnyHome.js";
export default {
  name: "HomePage",
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
    };
  },
  mounted() {
    // this.wsMessage();
    this.requstWs();
  },
  methods: {
    transformX(monitorValue, max) {
      let Num = -100 + (monitorValue / max) * 100;
      if (Num >= 0) {
        Num = 0;
      }
      return `transform:translateX( ${Num}% ) `;
    },

    requstWs() {
      let randomNum = random(1, 1000000);

      closeWebsocket();
      // 需要参数
      const obj = {};

      // 发起ws请求
      sendWebsocket(
        `ws://192.168.100.56:3445/server/${randomNum}`,
        obj,
        this.wsMessage,
        this.wsError
      );
    },
    wsError(data) {
      console.log(data, "连接失败");
    },
    wsMessage() {
      if (!this.firstRequest) {
        this.getMachineVo();
        this.firstRequest = true;
        return;
      }
      //节流
      throttle(this.getMachineVo, 30 * 1000);
    },

    async getMachineVo() {
      let data = await getMachineVo();
      console.log(data, "data");
      this.stripCastList = data.data.data.machineVoList.find(
        (item) => item.machineType == 1
      ).basicVoList;

      this.proessCardList = data.data.data.machineVoList.slice(1);
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
  padding-top: 16px;
}

.monitorUnitStr {
  opacity: 0.8;
}
</style>
