import { isExistFileSync } from 'https://github.com/windchime-yk/deno-util/raw/master/mod.ts';

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

  private writeFile(array: string, file: string) {
    const encoder = new TextEncoder()
    const data = encoder.encode(array)
    Deno.writeFileSync(file, data)
  }

  private readFile(file: string) {
    const decoder = new TextDecoder('utf-8')
    const data = Deno.readFileSync(file)
    return decoder.decode(data)
  }

  constructor(type: 'memory' | 'file', path?: string) {
    this.data = []
    this.type = type
    this.path = path
    this.file = `${path}${path?.slice(-1) === '/' ? '' : '/'}main.db`

    if (this.path && !isExistFileSync(this.path)) Deno.mkdirSync(this.path)
    if (this.path && !isExistFileSync(this.file) && this.type === 'file') {
      this.writeFile(JSON.stringify(this.data), this.file)
    }
    if (isExistFileSync(this.file)) {
      const json: T[] = JSON.parse(this.readFile(this.file))
      this.data = json
    }
  }

  /**
   * DBにObjectを追加する
   * @param object DBに追加するObject
   * @param keyword 指定したkeyを重複防止に利用する
   */
  add(object: T, keyword: keyof T) {
    const isDuplicate = this.data.filter(item => item[keyword] === object[keyword]).length
    if (isDuplicate) return

    this.data.push(object)
    if (this.type === 'file') this.writeFile(JSON.stringify(this.data), this.file)
  }

  /**
   * 条件に該当するすべてのObjectをDBから削除する
   * @param key 検索したいObjectのkey
   * @param keyword 検索条件の文言
   */
  delete(key: keyof T, keyword: T[keyof T]) {
    const candidate = this.data.filter(item => item[key] !== keyword)
    this.data = candidate
    if (this.type === 'file') this.writeFile(JSON.stringify(candidate), this.file)
  }

  /**
   * 条件に該当するすべてのObjectをDBから返す
   * @param key 検索したいObjectのkey
   * @param keyword 検索条件の文言
   */
  find(key: keyof T, keyword: T[keyof T]) {
    const result = this.data.filter(item => item[key] === keyword)
    return result
  }
}