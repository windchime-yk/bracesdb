import { isExistFileSync, writeFileSync, readFileSync, writeFile } from 'https://denopkg.com/windchime-yk/deno-util/mod.ts';

/**
 * 簡単なデータベース
 * @param type DBの保存形式。インメモリならmemory、ファイルならfile
 * @param path DBの保存場所。指定したパスにmain.dbが保存される
 */
export class SimpleDB<T> {
  data: T[]
  type: string
  path?: string
  file: string

  constructor(type: 'memory' | 'file', path?: string) {
    this.data = []
    this.type = type
    this.path = path
    this.file = `${path}${path?.slice(-1) === '/' ? '' : '/'}main.db`

    if (this.path && !isExistFileSync(this.path)) Deno.mkdirSync(this.path, { recursive: true })
    if (this.path && !isExistFileSync(this.file) && this.type === 'file') {
      writeFileSync(JSON.stringify(this.data), this.file)
    }
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
  async find(key?: keyof T, keyword?: T[keyof T]) {
    if (key && keyword) return this.data.filter(item => item[key] === keyword)
    else return this.data
  }
}