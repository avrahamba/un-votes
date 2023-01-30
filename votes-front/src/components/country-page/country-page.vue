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
      textLastType: [this.$t(" voted against Israel"), this.$t(" avoided"), this.$t(" voted for Israel")],
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
          text: this.$t("history by date1")+this.$t(this.selectedCountry.key)+this.$t("history by date2"),
          align: "center",
        },

        yAxis: {
          title: {
            text: this.$t('Votes'),
          },
          stackLabels: {
            enabled: true,
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
          column: {
            stacking: "normal",
          },
        },
        colors: ["#ff2c27", "#fbbc05", "#34a853"],

        series: [
          {
            name: this.$t("Anti-Israel"),
            data: this.votesByDate.map((v) => v.countB),
          },
          {
            name: this.$t("Neutral"),
            data: this.votesByDate.map((v) => v.countA),
          },
          {
            name: this.$t("Pro Israel"),
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
    <h1>{{ $t(selectedCountry.key) }}</h1>
    <highcharts
      style="margin-bottom: 20px"
      :options="chartOptions"
    ></highcharts>

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
          <div>{{ $t('Pro Israel Votes') }}: {{ vote.countG }}</div>
          <div>{{ $t('Neutral votes') }}: {{ vote.countA }}</div>
          <div>{{ $t('Anti-Israel votes') }}: {{ vote.countB }}</div>
          <div>{{ $t('Date of last vote') }}: {{ vote.lastDate }}</div>
          <div>{{ $t('In the last vote the state') + textLastType[vote.type] }}</div>
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
