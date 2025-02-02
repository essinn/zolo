const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function loadConfig(configPath) {
  const fileContents = fs.readFileSync(configPath, "utf8");
  const ext = path.extname(configPath).toLowerCase();

  if (ext === ".yaml" || ext === ".yml") {
    return yaml.load(fileContents);
  } else if (ext === ".json") {
    return JSON.parse(fileContents);
  } else {
    throw new Error("Unsupported config file format. Use YAML or JSON.");
  }
}

module.exports = { loadConfig };
