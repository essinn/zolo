describe("runTasks", () => {
  it("should run tasks in the correct order", async () => {
    const mockConfig = {
      tasks: {
        lint: { command: "npm run lint" },
        build: { command: "npm run build", dependsOn: ["lint"] },
        test: { command: "npm test", dependsOn: ["build"] },
      },
    };

    jest.spyOn(require("./config"), "loadConfig").mockReturnValue(mockConfig);
    exec.mockImplementation((command, callback) =>
      callback(null, "stdout", "")
    );

    await runTasks("tasks.yaml");

    // Check that tasks were called in the correct order
    expect(exec).toHaveBeenCalledWith("npm run lint", expect.any(Function));
    expect(exec).toHaveBeenCalledWith("npm run build", expect.any(Function));
    expect(exec).toHaveBeenCalledWith("npm test", expect.any(Function));
  });
});
