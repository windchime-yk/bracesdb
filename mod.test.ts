import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { JsonDB } from "./mod.ts";

interface Test {
  name?: string;
  description?: string;
  show: boolean;
}

const folder = "./db/store";
const filename = "test";
const db = new JsonDB<Test>({
  type: "file",
  folder,
  filename,
});

const dataList: Test[] = [
  {
    name: "Toika Asomaka",
    description: "A name that just popped into my head",
    show: true,
  },
  {
    name: "Momotaro",
    description: "Japanese demon slayer",
    show: false,
  },
  {
    name: "Kintaro",
    description: "Sumo with a bear",
    show: true,
  },
  {
    name: "Urashimataro",
    description: "The person left behind",
    show: false,
  },
];

const addDb = async (): Promise<void> => {
  for (const item of dataList) {
    await db.add(
      {
        name: item.name,
        description: item.description,
        show: item.show,
      },
      "name"
    );
  }
};
const deleteDbFile = async (): Promise<void> => {
  await Deno.remove(`${folder}/${filename}.db`);
};

Deno.test(
  "Add item",
  async (): Promise<void> => {
    try {
      await addDb();
      assertEquals(await db.find(), dataList);
    } finally {
      await deleteDbFile();
    }
  }
);

Deno.test(
  "Delete item",
  async (): Promise<void> => {
    try {
      await addDb();
      await db.delete("name", "Kintaro");
      const dataDeleteList = dataList.filter((item) => item.name !== "Kintaro");
      assertEquals(await db.find(), dataDeleteList);
    } finally {
      await deleteDbFile();
    }
  }
);

Deno.test(
  "Find item",
  async (): Promise<void> => {
    try {
      await addDb();
      const data = await db.find("name", "Kintaro")
      const dataFindList = dataList.filter((item) => item.name === "Kintaro");
      assertEquals(data, dataFindList);
    } finally {
      await deleteDbFile();
    }
  }
);