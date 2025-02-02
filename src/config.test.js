const { loadConfig } = require("./config");
const fs = require("fs");

jest.mock("fs");

describe("loadConfig", () => {
  it("should load and parse a YAML config file", () => {
    const mockConfig = `
      tasks:
        build:
          command: "npm run build"
    `;
    fs.readFileSync.mockReturnValue(mockConfig);

    const config = loadConfig("tasks.yaml");
    expect(config).toEqual({
      tasks: {
        build: {
          command: "npm run build",
        },
      },
    });
  });

  it("should throw an error if the file does not exist", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => loadConfig("invalid.yaml")).toThrow("File not found");
  });
});
