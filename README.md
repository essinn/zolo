<h1>Zolo<h1>

Zolo is a Simple CLI tool to run tasks defined in YAML or JSON configs.

**Table of Contents**

- [Installation](#step-1-installation)
- [Create a Task Configuration File](#step-2-create-a-task-configuration-file)
- [Run the CLI Tool](#step-3-run-the-cli-tool)
- [Expected Output](#step-4-output)
- [Advanced Use Cases](#advanced-use-cases)

## **Step 1: Installation**

```bash
npm i zolo
```

## **Step 2: Create a Task Configuration File**

Example _tasks.yaml_:

```yaml
tasks:
  build:
    command: "npm run build"
    retries: 2 # Retry up to 2 times if the task fails
  test:
    command: "npm test"
    dependsOn: ["build"] # Run "build" task before "test"
  deploy:
    command: "npm run deploy"
    dependsOn: ["test"] # Run "test" task before "deploy"
```

or

Example _tasks.json_

```json
{
  "tasks": {
    "build": {
      "command": "npm run build",
      "retries": 2
    },
    "test": {
      "command": "npm test",
      "dependsOn": ["build"]
    },
    "deploy": {
      "command": "npm run deploy",
      "dependsOn": ["test"]
    }
  }
}
```

## **Step 3: Run the CLI Tool**

```bash
zolo --config tasks.yaml

#or

zolo --config tasks.json
```

## **Step 4: Output**

When the user runs the CLI tool, they’ll see output like this:

```bash
✔ Running task: npm run build
✔ Running task: npm test
✔ Running task: npm run deploy
```

If a task fails and retries are configured, they’ll see something like this:

```bash
✖ Running task: npm run build
⚠ Task failed: npm run build
ℹ Retrying in 1 seconds...
✔ Running task: npm run build (retry 1)
✔ Running task: npm test
✔ Running task: npm run deploy
```

## **Advanced Use Cases**

- Parallel Execution:

If the user wants to run tasks in parallel, they can modify the tasks.yaml file:

```yaml
tasks:
  lint:
    command: "npm run lint"
  build:
    command: "npm run build"
  test:
    command: "npm test"
    dependsOn: ["lint", "build"] # Run "lint" and "build" in parallel
```

- Custom Retry Delay:

If the user wants to customize the retry delay, they can modify the runTask function in src/runner.js to accept a delay parameter.

- Environment Variables:

The user can use environment variables in their commands:

```yaml
tasks:
  deploy:
    command: "npm run deploy --env=${DEPLOY_ENV}"
```
