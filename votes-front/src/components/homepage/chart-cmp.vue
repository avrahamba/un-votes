<script>
import { goodBad } from "../../services/data-service.js";
import { Chart } from "highcharts-vue";

export default {
  props: {
    filterDescrition:String
  },
  components: {
    highcharts: Chart,
  },
  computed: {
    goodBadData() {
      const res = goodBad(this.filterDescrition);
      res.reverse();
      return res;
    },
    chartOptions() {
      return {
        chart: {
          type: "area",
        },

        title: {
          text: this.$t(this.filterDescrition),
          align: "left",
        },

        subtitle: {
          text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
          align: "left",
        },

        yAxis: {
          title: {
            text: "Billions",
          },
          labels: {
            formatter: function () {
              return this.value / 1000;
            },
          },
        },

        xAxis: {
          categories: this.goodBadData.map((v) => v.date),
          tickmarkPlacement: "on",

          title: {
            enabled: false,
          },
        },

        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },

        plotOptions: {
          area: {
            stacking: "percent",
            lineColor: "#666666",
            lineWidth: 1,

            marker: {
              lineWidth: 1,
              lineColor: "#666666",
            },
          },
        },
        colors: ['#ff2c27', '#fbbc05', '#34a853'],

        series: [
          {
            name: "bad",
            data: this.goodBadData.map((v) => v.bad),
          },
          {
            name: "neutral",
            data: this.goodBadData.map((v) => v.neutral),
          },
          {
            name: "good",
            data: this.goodBadData.map((v) => v.good),
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      };
    },
  },
};
</script>

<template>
  <highcharts :options="chartOptions"></highcharts>
</template>
