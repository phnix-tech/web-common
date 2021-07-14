import type {Config} from "@jest/types";

// https://jestjs.io/zh-Hans/docs/configuration
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node"
};

export default config;