<template>
  <div class="app-container">
    <div>爆炸装置成分匹配结果</div>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:20px;">
      <el-tab-pane label="XRF" name="first">XRF
        <div>
          <el-table
            :data="matchDataItems"
            border fit highlight-current-row stripe
            style="width: 1051px; margin-top: 10px;">

            <el-table-column
              prop="exploEvi_id"
              label="exploEvi_id"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="exploSample_id"
              label="exploSample_id"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="matchType"
              label="matchType"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="matchModel"
              label="matchModel"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="matchDegree"
              label="matchDegree"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="isSure"
              label="isSure"
              align="center"
              width="100">
            </el-table-column>

            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="drawChart(scope.$index, scope.row)">
                  绘图
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="FTIR" name="second">FTIR
        <div>
          <el-table
            :data="matchDataItems"
            border fit highlight-current-row stripe
            style="width: 1051px; margin-top: 10px;">

            <el-table-column
              prop="exploEvi_id"
              label="exploEvi_id"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="exploSample_id"
              label="exploSample_id"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="matchType"
              label="matchType"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="matchModel"
              label="matchModel"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="matchDegree"
              label="matchDegree"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="isSure"
              label="isSure"
              align="center"
              width="100">
            </el-table-column>

            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="drawChart(scope.$index, scope.row)">
                  绘图
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Raman" name="third">Raman
        <div>
          <el-table
            :data="matchDataItems"
            border fit highlight-current-row stripe
            style="width: 1051px; margin-top: 10px;">

            <el-table-column
              prop="exploEvi_id"
              label="exploEvi_id"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="exploSample_id"
              label="exploSample_id"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="matchType"
              label="matchType"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="matchModel"
              label="matchModel"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="matchDegree"
              label="matchDegree"
              align="center"
              width="150">
            </el-table-column>

            <el-table-column
              prop="isSure"
              label="isSure"
              align="center"
              width="100">
            </el-table-column>

            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="drawChart(scope.$index, scope.row)">
                  绘图
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-button 
      style="margin-top:30px;"
      @click="goBack">
      返回
    </el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExlpoMatch } from '@/api/table'

export default {
  name: 'deviceIngredientAnalysis',

  computed: {
    ...mapGetters([])
  },

  data() {
    return {
      matchDataItems: [],
      drawChartFlag: false,
      drawExploSampleID: null,
      activeName: 'first'
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getExlpoMatch().then(response => {
        this.matchDataItems = response.data
      })
    },

    handleClick(tab, event) {
      console.log('--- handleClick: ', tab, event);
    },

    goBack() {
      this.$router.go(-1)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
