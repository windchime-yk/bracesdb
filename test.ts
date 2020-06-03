import { SimpleDB } from './mod.ts';

interface Test {
  _id: string,
  name?: string,
  description?: string,
  show: boolean
}

const db = new SimpleDB<Test>('file', 'db/store')

await db.add({
  _id: 'vafevwaegva343r',
  name: 'あそまか といか',
  show: true
}, 'name')

await db.delete('name', 'あそまか といか')

const data = await db.find('name', 'あそまか といか')

console.log(data);