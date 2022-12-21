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
  /**
   * Add an Object to the DB
   * @param data Datastore targeted for add
   * @param object Object to be added to the DB
   * @param keyword Use the specified key to prevent duplication
   */
  add<T>(data: T[], object: T, keyword: keyof T): T[];

  /**
   * Remove matching objects from DB
   * @param data Datastore targeted for delete
   * @param key The key of the Object you want to search
   * @param keyword Wording of search conditions
   */
  delete<T>(data: T[], key: keyof T, keyword: T[keyof T]): T[];

  /**
   * Finding the DB
   * @param data Datastore targeted for find
   * @param key The key of the Object you want to search
   * @param keyword Wording of search conditions
   */
  find<T>(data: T[], key?: keyof T, keyword?: T[keyof T] | RegExp): T[];
}
