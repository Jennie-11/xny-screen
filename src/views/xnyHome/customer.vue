<template>
  <div class="ht-100vh">
    <Header
      isNeedOption
      :option="lineOption"
      :defultActiveId="lineId"
      @changeOption="changeOption"
      isNeedExit
    />
    <FhcLine1
      ref="fhcLine1"
      v-if="lineId != 5"
      :dataList="dataList"
      :lineId="lineId"
    />
    <Benchmarkline :dataList="dataList" :lineId="lineId" v-if="lineId == 5" />
  </div>
</template>
<script>
import Header from "@/components/header/Header.vue";
import FhcLine1 from "./view/fhcLine1.vue";
import Benchmarkline from "./view/BenchmarkLines.vue";
import {
  getMachineVo,
  getlineList,
  getCustomerMachineVo,
  getlineListCustomer,
} from "@/api/xnyHome/xnyHome.js";

export default {
  name: "HomePage",
  components: {
    Header,
    FhcLine1,
    Benchmarkline,
  },
  data() {
    return {
      lineId: 0,
      lineOption: [
        {
          value: 1,
          label: "复合材料1号线",
        },
        {
          value: 2,
          label: "复合材料2号线",
        },
        {
          value: 5,
          label: "复合材料5号线",
        },
      ],
      firstRequest: false,
      dataList: undefined,
      timeInterval: null,
    };
  },

  methods: {
    changeOption(value) {
      this.lineId = value;
      this.$router.push(`/xnyHomecustomer${value}`);
      this.getMachineVo(value);
    },
    async getMachineVo(lineId) {
      if (!lineId) {
        lineId = this.lineId;
      }
      let data;
      if (lineId == 5) {
        data = await getCustomerMachineVo(lineId);
      } else {
        data = await getMachineVo(lineId);
      }
      this.dataList = data.data.data;
    },
    async getlineList() {
      let keyList = ["screenOptionLineCode"];
      let data;
      if (this.lineId == 5) {
        data = await getlineListCustomer({ keyList });
      } else {
        data = await getlineList({ keyList });
      }

      if (data.data.data.length == 0) return;
      this.lineOption = data.data.data.find(
        (item) => item.key == "screenOptionLineCode"
      ).list;
    },
  },
  created() {
    this.lineId = this.$route.params.lineId * 1;
  },
  mounted() {
    this.getlineList();
    this.getMachineVo(this.lineId);
    this.timeInterval = setInterval(() => {
      this.getMachineVo(this.lineId);
    }, 30000);
  },
  destroyed() {
    clearInterval(this.timeInterval);
  },
};
</script>
<style lang="scss" scoped></style>
