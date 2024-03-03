import { promises as fsPromise } from "fs";
import fs from "fs";

const makeGeojson = async (target: string, outputDir: string) => {
  const file = await fsPromise.readFile(target, "utf8");
  const parsedData = JSON.parse(file);

  const features = parsedData.map((item: any) => {
    return {
      type: "Feature",
      properties: item,
      geometry: {
        type: "Point",
        coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)],
      },
    };
  });

  const geojson = {
    type: "FeatureCollection",
    features,
  };

  const randomChar = Math.random().toString(36).substring(7);
  const geojsonFileName = `${outputDir}/geojson-${randomChar}.json`;

  await fsPromise.writeFile(geojsonFileName, JSON.stringify(geojson), "utf8");

  console.log("\nGeojson file created: ", geojsonFileName, '\n');
  return geojsonFileName;
};

const targetArg = process.argv.find((arg) => arg.startsWith("--file="));
const outputDirArg = process.argv.find((arg) => arg.startsWith("--output="));

if (!targetArg || !outputDirArg) {
  console.error(
    "\nPlease provide a target file and output directory \n\n Availabe arguments: \n --file=src/data/merged.json \n --output=src/data\n"
  );
  process.exit(1);
}

const targetDirValue = targetArg.split("--file=")[1];
const outputDirValue = outputDirArg.split("--output=")[1];

if (!fs.existsSync(targetDirValue)) {
  console.error("\nTarget file does not exist\n");
  process.exit(1);
}

makeGeojson(targetDirValue, outputDirValue)
  .then(() => {})
  .catch((err) => console.log(err));
