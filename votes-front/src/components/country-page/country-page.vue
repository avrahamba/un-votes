<script>
import { countryDataFn } from "../../services/data-service";
import { Chart } from "highcharts-vue";
export default {
  components: {
    highcharts: Chart,
  },
  beforeMount() {
    const { id } = this.$route.params;
    this.selectedCountry = { key: id, label: this.$t(id) };
    const { votesByDescrition, votesByDate } = countryDataFn(id);
    this.countryData = votesByDescrition
      .map((v) => ({
        ...v,
        type: v.last === "B" ? 0 : v.last === "G" ? 2 : 1,
      }))
      .sort((a, b) => (a.lastDate > b.lastDate ? -1 : 1));
    this.votesByDate = votesByDate.sort((a, b) => (a.date > b.date ? 1 : -1));
    window.scrollTo(0, 0);
  },
  data() {
    return {
      countryData: [],
      selectedCountry: null,
      countryList: [],
      classType: ["card-bed", "card-neutral", "card-good"],
      textLastType: ["הצביעה נגד ישראל", "נמנעה", "הצביעה בעד ישראל"],
      votesByDate: [],
    };
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "column",
        },

        title: {
          text: `הסטוריית ההצבעות של ${this.$t(this.selectedCountry.key)} לפי תאריך`,
          align: "center",
        },

        yAxis: {
          title: {
            text: "הצבעות",
          },
        },

        xAxis: {
          categories: this.votesByDate.map((v) => v.date),
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
            stacking: "normal",
            lineColor: "#666666",
            lineWidth: 1,

            marker: {
              lineWidth: 1,
              lineColor: "#666666",
            },
          },
        },
        colors: ["#ff2c27", "#fbbc05", "#34a853"],

        series: [
          {
            name: "נגד ישראל",
            data: this.votesByDate.map((v) => v.countB),
          },
          {
            name: "נטרלי",
            data: this.votesByDate.map((v) => v.countA),
          },
          {
            name: "בעד ישראל",
            data: this.votesByDate.map((v) => v.countG),
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
  <div class="page" v-if="countryData">
    <h1>{{ selectedCountry.label }}</h1>
    <highcharts style="margin-bottom: 20px;" :options="chartOptions"></highcharts>

    <div class="vote-list">
      <v-card
        v-for="vote in countryData"
        class="vote"
        :class="classType[vote.type]"
      >
        <v-card-item>
          <div class="descrition">
            {{ $t(vote.descrition) }}
          </div>
          <div class="good">הצבעות בעד ישראל: {{ vote.countG }}</div>
          <div class="noutral">הצבעות נטרליות: {{ vote.countA }}</div>
          <div class="good">הצבעות נגד ישראל: {{ vote.countB }}</div>
          <div class="good">תאריך הצבעה אחרונה: {{ vote.lastDate }}</div>
          <div class="good">
            בהצבעה האחרונה המדינה {{ textLastType[vote.type] }}
          </div>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.vote-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.descrition {
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
}
</style>
