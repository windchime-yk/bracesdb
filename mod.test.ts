import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { BracesDB } from "./mod.ts";

interface Test {
  name?: string;
  description?: string;
  show: boolean;
}

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

const folder = "./db/store";
const filename = "test";
const addDb = async (db: BracesDB<Test>): Promise<void> => {
  for (const item of dataList) {
    await db.add(
      {
        name: item.name,
        description: item.description,
        show: item.show,
      },
      "name",
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
      const db = new BracesDB<Test>({
        type: "file",
        folder,
        filename,
      });
      await addDb(db);
      assertEquals(db.find(), dataList);
    } finally {
      await deleteDbFile();
    }
  },
);

Deno.test(
  "Delete item",
  async (): Promise<void> => {
    try {
      const db = new BracesDB<Test>({
        type: "file",
        folder,
        filename,
      });
      await addDb(db);
      await db.delete("name", "Kintaro");
      const dataDeleteList = dataList.filter((item) => item.name !== "Kintaro");
      assertEquals(db.find(), dataDeleteList);
    } finally {
      await deleteDbFile();
    }
  },
);

Deno.test(
  "Find item",
  async (): Promise<void> => {
    try {
      const db = new BracesDB<Test>({
        type: "file",
        folder,
        filename,
      });
      await addDb(db);
      const data = db.find("name", "Kintaro");
      const dataFindList = dataList.filter((item) => item.name === "Kintaro");
      assertEquals(data, dataFindList);
    } finally {
      await deleteDbFile();
    }
  },
);

Deno.test(
  "Partial find item",
  async (): Promise<void> => {
    try {
      const db = new BracesDB<Test>({
        type: "file",
        folder,
        filename,
      });
      await addDb(db);
      const data = db.find("name", /taro/);
      const dataFindList = dataList.filter((item) =>
        /taro/.test(item.name || "")
      );
      assertEquals(data, dataFindList);
    } finally {
      await deleteDbFile();
    }
  },
);
