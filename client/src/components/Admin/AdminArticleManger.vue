<template>
  <div id="AdminArticleManger">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="des"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="pv"
        label="浏览量">
      </el-table-column>
      <el-table-column
        label="操作"
        :width="100"
      >
        <template #default="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdminArticleManger",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    //文章获取
    async getArticle() {
      let {data} = await this.$axios({
        method: "GET",
        url: "/art/all"
      })

      if (data.code) {
        return this.$message.error("文章列表查询失败")
      }

      this.tableData = data.data
    },
    //文章删除
    async handleDelete(item) {
      let {data} = await this.$axios({
        method: "DELETE",
        url: "/admin/articleDelete",
        data: {
          _id: item._id,
          md: item.md
        }
      })

      data.code || this.getArticle()
    }
  },
  created() {
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>

</style>














