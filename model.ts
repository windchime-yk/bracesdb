export interface BracesDBOption {
  /**
   * Save type.
   *
   * If `memory` is in-memory.
   */
  type: "memory";
}

export interface FileDBOption {
  /**
   * Folder path.
   * It is generated in the project root by default.
   *
   * ex. db/store/
   */
  folder?: string;
  /**
   * File Name.
   * Saved `{filename}.db` .
   * The default name is `main` .
   */
  filename?: string;
}

export interface DatabaseFormat {
  add<T>(data: T[], object: T, keyword: keyof T): T[];
  delete<T>(data: T[], key: keyof T, keyword: T[keyof T]): T[];
  find<T>(data: T[], key?: keyof T, keyword?: T[keyof T] | RegExp): T[];
}
