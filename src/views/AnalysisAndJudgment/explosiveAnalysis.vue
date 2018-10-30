<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="19">炸药与原材料 分析研判</el-col>
        <el-col :span="5">
          <el-button type="warning" size="medium">识 别</el-button>
          <el-button type="success" size="medium">核 准</el-button>
          <el-button type="primary" size="medium">报 告</el-button>
        </el-col>
      </el-row>
    </div>

    <el-tabs 
      v-model="activeName" 
      type="card" 
      @tab-click="handleClick" 
      style="margin-top:10px;">
      <el-tab-pane label="XRD" name="first">
        <el-row :gutter="10">
          <el-col :span="19">
            <div 
              id="highChart" 
              v-if="true" 
              style="width: 100%; height: 550px; background: #EFEFEF; margin-top: 0px">
              <!-- {{ drawExploSampleID }} -->
              <xrd-component :drawItemID="drawItemID" ref="simpleChart"></xrd-component>
            </div>
          </el-col>
          
          <el-col :span="5">
            <el-table
              :data="matchXRDItems"
              border fit highlight-current-row stripe
              style="">
              <el-table-column
                prop="exploSample.sname"
                label="样本名称"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="drawChart(scope.$index, scope.row)">
                    {{scope.row.exploSample.sname}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="matchDegree"
                label="匹配度"
                align="center">
              </el-table-column>
              <el-table-column
                label="状态"
                align="center">
                
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="XRF" name="second">XRF
        <div>
          <el-table
            :data="matchXRFItems"
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

      <el-tab-pane label="GC-MS" name="third">GCMS
        <div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="FTIR" name="fourth">FTIR
        <div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Raman" name="">Raman
        <div>
        </div>
      </el-tab-pane>
    </el-tabs>

<!--     <div 
      id="highChart" 
      v-if="drawChartFlag" 
      style="width: 800px; height: 600px; background: #EFEFEF; margin-top: 50px">
      {{ drawExploSampleID }}
    </div> -->

    

    <div
      id="highChart_xrf"
      v-if="drawXRFChartFlag"
      style="width: 100%; height: 600px; background: #EFEFEF; margin-top: 50px">
      <!-- {{ drawExploSampleID }} -->
      <xrf-component :stylesxrf="styles_xrf" ref="simpleChart"></xrf-component>
    </div>

    <el-button 
      style="margin-top:30px;"
      @click="goBack">
      返回
    </el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExploMatchsList, getExploMatchsItem } from '@/api/analysis'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts)
import XrdComponent from './XrdHighchartsComponent.vue';
import XrfComponent from './XrfHighchartsComponent.vue'

export default {
  name: 'explosiveAnalysis',

  computed: {
    ...mapGetters([])
  },

  data() {
    return {
      allMatchData: null,
      matchDataItems: [],
      matchXRDItems: [],
      matchXRFItems: [],
      drawXRDChartFlag: false,
      drawXRFChartFlag: false,
      drawItemID: null,
      activeName: 'first',
      styles: {
        width: 1200,
        height: 600
      },
      styles_xrf: {
        width: 1200,
        height: 600
      },
    }
  },

  components: {
    XrdComponent,
    XrfComponent
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      let id = this.$route.params.id
      console.log('---- fetchData this.$route.params.id:', id)
      getExploMatchsList().then(response => {
        this.allMatchData = response.data
        this.matchDataItems = this.allMatchData.filter((matchItem) => {
          // console.log('---- getExploMatchsList matchItem.exploEvi.id:', matchItem.exploEvi.id)
          return matchItem.exploEvi.id == this.$route.params.id
        })
        this.filterMatchData();
      })
    },

    filterMatchData() {
      /* XRD */
      this.matchXRDItems = this.matchDataItems.filter((matchItem) => {
          // console.log('---- filterMatchData matchItem.matchType:', matchItem.matchType)
          return matchItem.matchType == 3
        })
      /* XRF */
      this.matchXRFItems = this.matchDataItems.filter((matchItem) => {
          // console.log('---- filterMatchData matchItem.matchType:', matchItem.matchType)
          return matchItem.matchType == 4
        })
    },

    handleClick(tab, event) {
      // console.log('--- handleClick: ', tab, event)
      this.drawXRDChartFlag = false
      this.drawXRFChartFlag = false
    },

    drawChart(index, row) {
      // console.log('--- drawChart: ', index, row)
      this.drawXRDChartFlag = false
      this.drawItemID = null
      
      if (row.matchType == 3) {
        this.drawXRDChartFlag = true
        this.drawItemID = row.id
        console.log('---- drawChart this.drawItemID:', this.drawItemID)
      } 
      else if (row.matchType == 4) {
        this.drawXRFChartFlag = true
      }
      else {

      }
    },

    goBack() {
      this.drawXRDChartFlag = false
      this.drawXRFChartFlag = false
      this.$router.go(-1)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
