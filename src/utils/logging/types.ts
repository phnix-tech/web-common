interface LevelMap {
  readonly DEBUG: "DEBUG";
  readonly INFO: "INFO";
  readonly WARN: "WARN";
  readonly ERROR: "ERROR";
  readonly ASSERT: "ASSERT";
  readonly TRACE: "TRACE";
  /**
   * `LOG` level nodejs use only.
   */
  readonly LOG: "LOG";
}

type Level = keyof LevelMap;

type ConsoleMethodName = Lowercase<Level>;

export type {LevelMap, Level, ConsoleMethodName};