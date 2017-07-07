<script>
import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default HorizontalBar.extend({
  name: 'estatistica-vert-bar',
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    let options = {
      // responsive: true
      tooltips: {
        enabled: false
      },
      legend: {
        display: false
      },
      // maintainAspectRatio: false,
      scales: {
        xAxes: [{
          display: false,
          stacked: true
        }],
        yAxes: [{
          display: true,
          stacked: true
        }]
      }
    }
    if (this.options) {
      options = Object.assign(this.options, options)
    }
    this.renderChart(this.chartData, options)
  }
})
</script>

<style scoped>

</style>
