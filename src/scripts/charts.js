import getData from "../../libs/getCharts.js";

async function generatePieChart() {
  try {
    const data = await getData("../../utils/pieChart.json");

    const years = data.map((install) => install.year);
    console.log(years);

    const ctx = document.getElementById("pie_chart");

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((install) => install.year),
        datasets: [
          {
            label: "Bar",
            data: data.map((install) => install.numInstalls),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsiv: true
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

generatePieChart();

async function generateBarGraph() {
  try {
    const data = await getData("../../utils/barGraph.json");

    const ctx = document.getElementById("bar_graph");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((install) => install.month),
        datasets: [
          {
            label: "Bar",
            data: data.map((install) => install.numInstalls),
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

generateBarGraph();
