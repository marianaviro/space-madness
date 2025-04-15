// Functions for calculating stuff
// Takes my data and transforms it into the format I need
export const aggregateSatellites = (data) => {
  let aggData = data;
  // Wrangling
  return aggData;
};

export const processSats = (data) => {
  return data
    .filter((d) => d["year"])
    .map((d) => {
      let date = new Date(d["Date of Launch"]);
      return {
        name: d["Name of Satellite, Alternate Names"],
        country: d["Country of Operator/Owner"],
        owner: d["Operator/Owner"],
        use: d["Users"],
        purpose: d["Purpose"],
        contractor: d["Contractor"],
        country_contractor: d["Country of Contractor"],
        lifetime: d["Expected Lifetime (yrs.)"],
        date_launch: date.getFullYear(),
        year: d["year"],
      };
    });
};
