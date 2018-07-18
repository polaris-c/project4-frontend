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
  props: ['stylesxrf'],
  name: 'highcharts',
  data() {
    var categories = [];
    return {
      chart:null,
      options: {
        chart: {
          type: 'bar',
        },
        title: {
            text: 'X射线荧光有效元素匹配'
        },
        subtitle: {
            // useHTML: true,
            text: '合金模式'
        },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            }
        }, { 
            // 显示在右侧的镜像 xAxis （通过 linkedTo 与第一个 xAxis 关联）
            opposite: true, 
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
            formatter: function () {
                return (Math.abs(this.value)) + 'ppm';
            }
        },
        min: -4000000,
        max: 4000000

        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ':' + '</b><br/>' +
                    this.point.category + '<br/>'+
                    '元素含量: ' + Highcharts.numberFormat(Math.abs(this.point.y))+'  ppm';
            }
        },
        series: [{
            name: '物证XRF有效元素',
            data: []
        }, {
            name: '正在匹配的样本XRF有效元素',
            data: []
        }]
      },
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      console.log(this.$el);
      this.$el.style.width = (this.stylesxrf.width || 800) + 'px';
      this.$el.style.height = (this.stylesxrf.height || 400) + 'px';

      var data_xrf = this.getJson('../../xrf_json/xrf_test.json')
      var element_xrf = data_xrf[0]
      var data_test = data_xrf[1]
      var data_sample = data_xrf[2]

      var min_data = Math.min.apply(null,data_test)
      var max_data = Math.max.apply(null,data_sample)
      var max_ylable = Math.max.apply(null,[-min_data,max_data])
      console.log(data_test)
      console.log(data_sample)

      this.options.xAxis[0].categories = element_xrf
      this.options.xAxis[1].categories = element_xrf
      this.options.series[0].data = data_test
      this.options.series[1].data = data_sample
      this.options.yAxis.min = -max_ylable
      this.options.yAxis.max = max_ylable


      this.chart = new Highcharts.Chart(this.$el, this.options);
    },
    getJson(file){
      var element_xrf = new Array()
      var data_test = new Array()
      var data_sample = new Array()

      $.ajaxSettings.async = false;  
      $.getJSON(file,function(data){
        $.each(JSON.parse(data),function(i,item)
        {
          element_xrf[i] = item.element
          data_test[i] = item.num_test
          data_sample[i] = item.num_sample
        });
      });
      return [element_xrf,data_test,data_sample];
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