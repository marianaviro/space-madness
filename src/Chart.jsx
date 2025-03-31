import * as d3 from "d3";

export function Chart({ data }) {
  const marginLeft = 230;
  const width = 1200;
  const height = 600;
  const marginRight = 230;
  const marginTop = 20;
  const marginBottom = 20;

  const heightBound = height - marginTop - marginBottom;
  const widthBound = width - marginLeft - marginRight;

  // Filter and process the data
  const sats = data.map((d, i) => {
    return {
      name: d["Name of Satellite, Alternate Names"],
      country: d["Country of Operator/Owner"],
      owner: d["Operator/Owner"],
      use: d["Users"],
      purpose: d["Purpose"],
      contractor: d["Contractor"],
      country_contractor: d["Country of Contractor"],
      lifetime: d["Expected Lifetime (yrs.)"],
      date_launch: d["Date of Launch"],
      year: d["year"],
    };
  });
  // console.log(sats);
  const test = sats.filter((d) => d.country == "USA");
  console.log(test);

  const years = sats.map((d) => d.year);

  const xAxis = d3
    .scaleLinear()
    .domain([d3.min(years), d3.max(years)])
    .range([marginLeft, width - marginRight]);

  // Rollup? group and count?
  const yAxis = d3
    .scaleBand()
    .domain(countries)
    .range([marginTop, height - marginBottom])
    .padding(0.5);

  return (
    <div>
      <p>Template for the Coding Exercise</p>
      <div className="">
        <svg width={width} height={height}>
          {test.map((d, i) => {
            console.log(xAxis(d));
            return (
              <image
                key={i}
                x={xAxis(d.year)}
                y={i}
                width="30"
                height="30"
                href="sat.svg"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
