<script>
import {
  Line,
  mixins
} from 'vue-chartjs'
const {
  reactiveProp
} = mixins

export default Line.extend({
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    let options = {
      tooltips: {
        enabled: false
      },
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      layout: {
        padding: 5
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }

    options = Object.assign(this.options, options)

    // this.chartData is created in the mixin
    this.renderChart(this.chartData, options)
  }
})
</script>

<style scoped>

</style>
