import {
  isExistFileSync,
  readFileSync,
  writeFile,
  writeFileSync,
} from "./deps.ts";
import { FileDBOption } from "./model.ts";

export class FileDB<T> {
  private readonly folder?: string;
  private readonly file: string;
  private data: T[];

  constructor(option: FileDBOption) {
    const { folder = "./", filename = "main" } = option;

    this.folder = folder;
    this.file = `${folder}${
      folder?.slice(-1) === "/" ? "" : "/"
    }${filename}.db`;
    this.data = [];

    if (this.folder && !isExistFileSync(this.folder)) {
      Deno.mkdirSync(this.folder, { recursive: true });
    }
    if (this.folder && !isExistFileSync(this.file)) {
      writeFileSync(JSON.stringify(this.data), this.file);
    }
    if (isExistFileSync(this.file)) {
      const json: T[] = JSON.parse(readFileSync(this.file));
      this.data = json;
    }
  }

  /**
   * Add an Object to the DB
   * @param object Object to be added to the DB
   * @param keyword Use the specified key to prevent duplication
   */
  async add(object: T, keyword: keyof T) {
    const isDuplicate =
      this.data.filter((item) => item[keyword] === object[keyword]).length;
    if (isDuplicate) return;

    this.data.push(object);
    await writeFile(JSON.stringify(this.data), this.file);
  }

  /**
   * Remove matching objects from DB
   * @param key The key of the Object you want to search
   * @param keyword Wording of search conditions
   */
  async delete(key: keyof T, keyword: T[keyof T]) {
    const candidate = this.data.filter((item) => item[key] !== keyword);
    this.data = candidate;
    await writeFile(JSON.stringify(candidate), this.file);
  }

  /**
   * Searching the DB
   * @param key The key of the Object you want to search
   * @param keyword Wording of search conditions
   */
  find(key?: keyof T, keyword?: T[keyof T] | RegExp) {
    if (key && keyword instanceof RegExp) {
      return this.data.filter((item) => keyword.test(`${item[key]}`));
    } else if (key && keyword) {
      return this.data.filter((item) => item[key] === keyword);
    } else return this.data;
  }
}
