import { SimpleDB } from './mod.ts';

interface Test {
  _id: string,
  name?: string,
  description?: string,
  show: boolean
}

const db = new SimpleDB<Test>('file', 'db/store')

db.add({
  _id: 'vafevwaegva343r',
  name: 'あそまか といか',
  show: true
}, 'name')

db.delete('name', 'あそまか といか')

const data = db.find('name', 'あそまか といか')

console.log(data);