import { v4 } from 'https://deno.land/std@0.77.0/uuid/mod.ts';
import { SimpleDB } from './mod.ts';

interface Test {
  _id: string,
  name?: string,
  description?: string,
  show: boolean
}

const db = new SimpleDB<Test>('file', 'db/store')

const generateUuid = () => v4.generate()

const testList: Test[] = [
  {
    _id: generateUuid(),
    name: 'あそまか といか',
    description: 'なぞのりっぽうたい',
    show: true
  },
  {
    _id: generateUuid(),
    name: '桃太郎',
    description: 'オニスレイヤー',
    show: false
  },
  {
    _id: generateUuid(),
    name: '金太郎',
    description: '熊と相撲した',
    show: true
  },
  {
    _id: generateUuid(),
    name: '浦島太郎',
    description: '置いていかれた人',
    show: false
  },
]

for (const item of testList) {
  await db.add({
    _id: item._id,
    name: item.name,
    description: item.description,
    show: item.show
  }, 'name')
}

await db.delete('name', '金太郎')

const data = await db.find('name', 'あそまか といか')
const dataAll = await db.find()

console.log({data, dataAll})