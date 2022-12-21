import { memoryFormat } from "./core/memory.ts";
import type { BracesDBOption } from "./model.ts";

export class BracesDB<T> {
  private type: BracesDBOption["type"] = "memory";
  private data: T[] = [];

  constructor(option: BracesDBOption) {
    this.type = option.type;
  }

  /**
   * Add an Object to the DB
   * @param object Object to be added to the DB
   * @param keyword Use the specified key to prevent duplication
   */
  add(object: T, keyword: keyof T) {
    this.data = memoryFormat.add(this.data, object, keyword);
  }

  /**
   * Remove matching objects from DB
   * @param key The key of the Object you want to search
   * @param keyword Wording of search conditions
   */
  delete(key: keyof T, keyword: T[keyof T]) {
    this.data = memoryFormat.delete(this.data, key, keyword);
  }

  /**
   * Searching the DB
   * @param key The key of the Object you want to search
   * @param keyword Wording of search conditions
   */
  find(key?: keyof T, keyword?: T[keyof T] | RegExp) {
    this.data = memoryFormat.find(this.data, key, keyword);
    return this.data;
  }
}
