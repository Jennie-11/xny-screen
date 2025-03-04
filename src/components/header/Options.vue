<template>
  <div class="options-box fx-fl fx-un-ct ht-52">
    <el-select v-model="activeId" placeholder="请选择">
      <el-option
        v-for="item in optionList"
        :key="item.value"
        :label="item.label"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "OptionsBox",
  data: () => ({
    optionList: [
      {
        id: 1,
        label: "复合材料1号线",
      },
      // {
      //   id: 2,
      //   label: "复合材料2号线",
      // },
      // {
      //   id: 3,
      //   label: "复合材料3号线",
      // },
      // {
      //   id: 4,
      //   label: "复合材料4号线",
      // },
    ],
    activeId: 1,
  }),
  methods: {
    changeOptionHandle(item) {
      if (this.activeId == item.id) return;
      this.activeId = item.id;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-select {
  background: transparent;
  &.el-select--default {
    width: 142px;
  }
}
</style>
