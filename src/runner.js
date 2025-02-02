const { exec } = require("child_process");
const ora = require("ora");
const { loadConfig } = require("./config");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTask(task, retries = 0, initialDelay = 1000) {
  const spinner = ora(`Running task: ${task.command}`).start();

  try {
    await new Promise((resolve, reject) => {
      exec(task.command, error => {
        if (error) {
          spinner.fail(`Task failed: ${task.command}`);
          if (retries > 0) {
            const retryDelay = initialDelay * 2 ** (task.retries - retries);
            spinner.info(`Retrying in ${retryDelay / 1000} seconds...`);
            setTimeout(async () => {
              await runTask(task, retries - 1, initialDelay);
              resolve();
            }, retryDelay);
          } else {
            reject(new Error(`Task failed after retries: ${task.command}`));
          }
        } else {
          spinner.succeed(`Task completed: ${task.command}`);
          resolve();
        }
      });
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

async function runTasks(configPath) {
  const config = loadConfig(configPath);
  const tasks = config.tasks;

  const runParallel = async taskNames => {
    await Promise.all(
      taskNames.map(taskName =>
        runTask(tasks[taskName], tasks[taskName].retries || 0)
      )
    );
  };

  const runSequential = async taskNames => {
    for (const taskName of taskNames) {
      const task = tasks[taskName];
      if (task.dependsOn) {
        await runParallel(task.dependsOn);
      }
      await runTask(task, task.retries || 0);
    }
  };

  await runSequential(Object.keys(tasks));
}

module.exports = { runTask, runTasks };
