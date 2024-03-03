import { promises as fsPromise } from "fs";

const cleaning = async (
  target: string,
  uniqueKey: string,
  outputDir: string
) => {
  const file = await fsPromise.readFile(target, { encoding: "utf8" });
  const parsedData = JSON.parse(file);

  const getId = parsedData.map((item: any) => item[uniqueKey]);
  console.log("\nCleaning started...");
  console.log("Total records: ", getId.length);

  const uniqueId = [...new Set(getId)];

  console.log("Unique records: ", uniqueId.length);

  const cleanedData = uniqueId.map((id: any) => {
    return parsedData.find((item: any) => item[uniqueKey] === id);
  });

  const randomChar = Math.random().toString(36).substring(7);
  const cleanedFileName = `${outputDir}/cleaned-${randomChar}.json`;

  await fsPromise.writeFile(
    cleanedFileName,
    JSON.stringify(cleanedData),
    "utf8"
  );

  console.log("Cleaning completed - total records: ", cleanedData.length);
  console.log("Cleaned file created: ", cleanedFileName);
  console.log("\n");
  return cleanedFileName;
};

const args = {
  target: process.argv.find((arg) => arg.includes("--file=")),
  uniqueKey: process.argv.find((arg) => arg.includes("--uniqueKey=")),
  outputDir: process.argv.find((arg) => arg.includes("--output=")),
};

if (!args.target || !args.uniqueKey) {
  console.log(
    "\n Please provide --file and --unique arguments \n\n Available arguments: \n --file=[file path] \n --uniqueKey=[json unique key/id] \n --output=[outpur dir]\n"
  );
  process.exit(1);
}

const { target, uniqueKey, outputDir } = {
  target: args.target.split("=")[1] || "",
  uniqueKey: args.uniqueKey.split("=")[1] || "",
  outputDir: args.outputDir?.split("=")[1] || "./",
};

cleaning(target, uniqueKey, outputDir)
  .then(() => {})
  .catch((err) => console.log(err));
