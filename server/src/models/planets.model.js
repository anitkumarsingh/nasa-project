const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');

const result = [];

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
const filePath = path.join(__dirname,'../','data','kepler.csv');

fs.createReadStream(filePath)
  .pipe(
    parse({
      comment: "#",
      columns: true,
    }),
  )
  .on("data", (res) => {
    if (isHabitable) {
      result.push(res);
    }
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(`We found ${result.length} habitable planets`);
  });

  module.exports ={
    planets:result
  }