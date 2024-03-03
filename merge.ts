import * as fsPromise from "fs/promises";
import fs from "fs";

const mergeFile = async (target: string) => {
  const listOfFiles = fs.readdirSync(target);
  const filesCount = listOfFiles.length;

  if (!filesCount) throw new Error("No files found");
  const randomChar = Math.random().toString(36).substring(7);
  const tempData = [];

  console.log("\nMerging files started...");

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  for (let i = 0; i < filesCount; i++) {
    const fileName = `${target}/${listOfFiles[i]}`;
    const fileData = await fsPromise.readFile(fileName, { encoding: "utf8" });
    const parsedData = JSON.parse(fileData);

    await delay(500);
    console.log("file", listOfFiles[i], "merged");

    tempData.push(parsedData);
  }

  const mergedData = tempData.flat();
  const mergedFileName = `${target}/merged-${randomChar}.json`;

  await fsPromise.writeFile(mergedFileName, JSON.stringify(mergedData), "utf8");
  console.log("Merging files completed - total files: ", filesCount);
  console.log("Merged file created: ", mergedFileName);
  console.log("\n");

  return mergedFileName;
};

const targetDirArg = '--dir=';
const targetDir = process.argv.find((arg) => arg.includes(targetDirArg));
const targetDirValue = targetDir?.split(targetDirArg)[1];

if (!targetDirValue) {
  console.log("\nPlease provide a target directory \n e.g. --dir=src/data\n");
  process.exit(1);
}

if (!fs.existsSync(targetDirValue)) {
  console.log("\nTarget directory does not exist\n");
  process.exit(1);
}

mergeFile(targetDirValue)
  .then(() => {})
  .catch((err) => console.log(err));
