import { isExistFileSync, writeFileSync, readFileSync, writeFile } from 'https://github.com/windchime-yk/deno-util/raw/master/mod.ts';

export type JsonDBOption = {
  /** 
   * Save type.
   * 
   * If `memory` is in-memory.  
   * If `file` is generate file
   */
  type: 'memory' | 'file',
  /**
   * Folder path.  
   * It is generated in the project root by default.  
   * If the type is `memory`, you don't need it.
   * 
   * ex. db/store/
   */
  folder?: string,
  /**
   * File Name.  
   * Saved `{filename}.db` .  
   * The default name is `main` .  
   * If the type is `memory`, you don't need it.
   */
  filename?: string
}

/**
 * 簡単なデータベース
 * @param type DBの保存形式。インメモリならmemory、ファイルならfile
 * @param path DBの保存場所。指定したパスにmain.dbが保存される
 */
export class JsonDB<T> {
  private readonly type: string
  private readonly folder?: string
  private readonly file: string
  private data: T[]

  constructor(option: JsonDBOption) {
    const { type, folder = './', filename = 'main' } = option

    this.type = type
    this.folder = folder
    this.file = `${folder}${folder?.slice(-1) === '/' ? '' : '/'}${filename}.db`
    this.data = []

    if (this.folder && !isExistFileSync(this.folder)) Deno.mkdirSync(this.folder, { recursive: true })
    if (this.folder && !isExistFileSync(this.file) && this.type === 'file')
      writeFileSync(JSON.stringify(this.data), this.file)
    if (isExistFileSync(this.file)) {
      const json: T[] = JSON.parse(readFileSync(this.file))
      this.data = json
    }
  }

  /**
   * DBにObjectを追加する
   * @param object DBに追加するObject
   * @param keyword 指定したkeyを重複防止に利用する
   */
  async add(object: T, keyword: keyof T) {
    const isDuplicate = this.data.filter(item => item[keyword] === object[keyword]).length
    if (isDuplicate) return

    this.data.push(object)
    if (this.type === 'file') await writeFile(JSON.stringify(this.data), this.file)
  }

  /**
   * 条件に該当するすべてのObjectをDBから削除する
   * @param key 検索したいObjectのkey
   * @param keyword 検索条件の文言
   */
  async delete(key: keyof T, keyword: T[keyof T]) {
    const candidate = this.data.filter(item => item[key] !== keyword)
    this.data = candidate
    if (this.type === 'file') await writeFile(JSON.stringify(candidate), this.file)
  }

  /**
   * 条件に該当するすべてのObjectをDBから返す
   * @param key 検索したいObjectのkey
   * @param keyword 検索条件の文言
   */
  async find(key?: keyof T, keyword?: T[keyof T] | RegExp) {
    if (key && keyword instanceof RegExp) return this.data.filter(item => keyword.test(`${item[key]}`))
    else if (key && keyword) return this.data.filter(item => item[key] === keyword)
    else return this.data
  }
}