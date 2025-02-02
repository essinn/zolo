const { exec } = require("child_process");
const path = require("path");

jest.mock("child_process");

describe("CLI", () => {
  it("should run tasks from a YAML config", done => {
    const configPath = path.join(__dirname, "../tasks.yaml");

    // Mock exec to simulate successful task execution
    exec.mockImplementation(callback => callback(null, "stdout", ""));

    // Run the CLI
    const { exec: execCli } = require("child_process");
    execCli(
      `node bin/cli.js --config ${configPath}`,
      (error, stdout, stderr) => {
        if (error) {
          done(error);
          return;
        }

        // Check that tasks were executed
        expect(stdout).toContain("Task completed: npm run lint");
        expect(stdout).toContain("Task completed: npm run build");
        expect(stdout).toContain("Task completed: npm test");
        done();
      }
    );
  });
});
