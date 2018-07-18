<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';


HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  props: ['styles'],
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
        width: 1100,
        height: 600
      }
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      console.log(this.$el);
      this.$el.style.width = (this.styles.width || 800) + 'px';
      this.$el.style.height = (this.styles.height || 400) + 'px';

      var data_xrd_test = this.getJson('../../handled_json/188-ka.json')
      var data_xrd_sample = this.getJson('../../handled_json/kclo4-1-30-ka.json')

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
  }
}
</script>

<style lang="scss">
  .highcharts-container {
    width: 800px;
    height: 400px;
  }
</style>