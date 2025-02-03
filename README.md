<h1>Zolo</h1>

Zolo is a Simple CLI tool to run tasks defined in YAML or JSON configs.

<h4>What it does:</h4>

It defines and runs complex task workflows (e.g., build, test, deploy) with dependencies, retries, and parallel execution.

<h4>Why it’s useful:</h4>

Developers often write custom scripts for task automation, but managing dependencies and retries can be messy. This package would provide a clean, declarative way to define and run tasks.

## Table of Contents

1. [Installation](#step-1-installation)
2. [Create a Task Configuration File](#step-2-create-a-task-configuration-file)
3. [Run the CLI Tool](#step-3-run-the-cli-tool)
4. [Expected Output](#step-4-output)
5. [Advanced Use Cases](#step-5-advanced-use-cases)
6. [Key Features](#key-features)

## Step 1: Installation

```bash
npm i zolo
```

## Step 2: Create a Task Configuration File

Example `tasks.yaml`:

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

Example `tasks.json`:

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

## Step 3: Run the CLI Tool

```bash
zolo --config tasks.yaml

#or

zolo --config tasks.json
```

## Step 4: Output

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

## Step 5: Advanced Use Cases

- Parallel Execution:

If the user wants to run tasks in parallel, they can modify the `tasks.yaml` file:

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

- Environment Variables:

The user can use environment variables in their commands:

```yaml
tasks:
  deploy:
    command: "npm run deploy --env=${DEPLOY_ENV}"
```

## Key Features

- Define tasks in a YAML or JSON config.
- Support for parallel and sequential execution.
- Retry failed tasks with exponential backoff.

## Key Features

- Define tasks in a YAML or JSON config.
- Support for parallel and sequential execution.
- Retry failed tasks with exponential backoff.
