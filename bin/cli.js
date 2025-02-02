const { program } = require("commander");
const { runTasks } = require("../src/runner");

program
  .version("1.0.0")
  .description(
    "A simple CLI tool to run tasks defined in a YAML or JSON config"
  )
  .requiredOption(
    "-c, --config <path>",
    "Path to the task config file (YAML or JSON)"
  )
  .action(options => {
    runTasks(options.config);
  });

program.parse(process.argv);
