<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import $ from 'jquery'
import { getExploMatchsList, getExploMatchsItem, getData } from '@/api/analysis'
import { getExploSampleList, showExploSample, getExploEvisList, showExploEvis } from '@/api/table'

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  props: ['drawItemID'],
  name: 'highcharts',
  data() {
    return {
      chart:null,
      options: {
          title: {
                text: 'X射线衍射谱图匹配'
              },
          chart:{
            zoomType: 'x',
            panning: true,
            panKey: 'shift'
          },
          subtitle: {
            text: document.ontouchstart === undefined ?
            '鼠标拖动可以进行缩放' : '手势操作进行缩放'
          },
          xAxis: {
              title: {
                text: '2θ'
              },
              categories: []
          },
          yAxis: {
              title: {
                  text: 'Intensity'
              },
              lineWidth: 2,
              lineColor: '#F33',
              id: 'temperature-axis'
          },
          series: [{
              name: '物证XRD谱图',
              color: '#F33'
          },{
              name: '正在匹配的XRD样本谱图',
              color: 'blue'
          }]
      },
      styles: {
        width: 1150,
        height: 550
      },
      sampleData: null,
      eviData: null,
      sampleDataArray2D: null,
      eviDataArray2D: null,
    }
  },
  mounted() {
    console.log('---- HighChart init ID:', this.drawItemID)
    this.getDataPromise().then((value) => {
      this.initChart()
    }).catch((error) => {
      console.log('++++ Get Data Error ++++', error);
    })
  },
  watch: {
    drawItemID: function() {
      console.log('---- HighChart update ID:', this.drawItemID)
      this.sampleDataArray2D = null
      this.eviDataArray2D = null
      this.getDataPromise().then((value) => {
        this.initChart()
      }).catch((error) => {
        console.log('++++ Get Data Error ++++', error);
      })
    }
  },

  methods: {
    initChart() {
      // console.log(this.$el);
      console.log('---- ---- initChart');
      this.$el.style.width = (this.styles.width || 1000) + 'px';
      this.$el.style.height = (this.styles.height || 400) + 'px';

      // var data_xrd_test = this.getJson('../../handled_json/188-ka.json')
      // var data_xrd_sample = this.getJson('../../handled_json/kclo4-1-30-ka.json')
      var data_xrd_test = this.eviDataArray2D
      var data_xrd_sample = this.sampleDataArray2D

      // console.log('---- data_xrd_test: ', data_xrd_test)
      // console.log('---- data_xrd_sample: ', data_xrd_sample)

      this.options.xAxis.categories = data_xrd_test[0]
      this.options.series[0].data = data_xrd_test[1]
      this.options.series[1].data = data_xrd_sample[1]
      this.chart = new Highcharts.Chart(this.$el, this.options);
    },
    getJson(file){
      var data_xrd = new Array()

      $.ajaxSettings.async = false;  
      $.getJSON(file,function(data){
        $.each(JSON.parse(data),function(i,item)
        {
          data_xrd[i] = item.data
        });
      });
      return data_xrd;
    },

    getDataPromise() {
      return new Promise((resolve, reject) => {
        this.getMatchsItem(resolve, reject)
        // setTimeout(() => {
        //     if (this.sampleDataArray2D && this.eviDataArray2D) {
        //     resolve();
        //   } else {
        //     reject();
        //   }
        // } , 2000)
      }); 
    },

    getMatchsItem(resolve, reject) {
      getExploMatchsItem(this.drawItemID).then((response) => {
        console.log('---- ---- getMatchsItem')
        // this.getSampleData(response.data.exploSample)
        // this.getEviData(response.data.exploEvi, resolve)
        this.getAllData(response.data.exploSample, response.data.exploEvi, resolve, reject)
      })
    },
    getAllData(SampleID, EviID, resolve, reject) {
      showExploSample(SampleID).then((response) => {
        /* exploSample.exploSampleFile.detectType */
        this.sampleData = response.data.exploSampleFile.filter((matchItem) => {
          return matchItem  //.detectType == 3
        })
        getData(this.sampleData[0].handledUrl).then((response) => {
          let dataStr = response.data
          dataStr = dataStr.replace('\r\n', ' ')
          dataStr = dataStr.replace('\r\n', '')
          let dataArray = dataStr.split(" ")
          dataArray = dataArray.map((currentValue) => {
            return parseFloat(currentValue)
          })
          let dataLength = dataArray.length / 2
          let xData = dataArray.slice(0, dataLength)
          let yData = dataArray.slice(dataLength, )
          let dataArray2D = []
          dataArray2D[0] = xData
          dataArray2D[1] = yData
          this.sampleDataArray2D = dataArray2D
        })
        this.getEviData(EviID, resolve)
      })
    },
    getSampleData(SampleID) {
      
    },
    getEviData(EviID, resolve) {
      showExploEvis(EviID).then((response) => {
        // console.log('---- getEvisData:' , response.data.exploEviFile)  //detectType: 3
        this.eviData = response.data.exploEviFile.filter((matchItem) => {
          // console.log('---- getSampleData matchItem:' , matchItem)
          return matchItem //.detectType == 3
        })
        // console.log('---- getEvisDataURL:' , this.eviData[0].handledUrl)
        getData(this.eviData[0].handledUrl).then((response) => {
          let dataStr = response.data
          dataStr = dataStr.replace('\r\n', ' ')
          dataStr = dataStr.replace('\r\n', '')
          let dataArray = dataStr.split(" ")
          dataArray = dataArray.map((currentValue) => {
            return parseFloat(currentValue)
          })
          let dataLength = dataArray.length / 2
          let xData = dataArray.slice(0, dataLength)
          let yData = dataArray.slice(dataLength, )
          // console.log('---- getData to array:' , xData)
          // console.log('---- getData to array:' , yData)
          let dataArray2D = []
          dataArray2D[0] = xData
          dataArray2D[1] = yData
          console.log('---- getData to 2Darray:' , dataArray2D)
          this.eviDataArray2D = dataArray2D
          resolve()
        })

      })
    },
  }
}
</script>

<style lang="scss">
  .highcharts-container {
    width: 400px;
    height: 400px;
  }
</style>