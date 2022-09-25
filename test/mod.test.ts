import { assertEquals } from "../deps.ts";
import { BracesDB } from "../mod.ts";

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

const addDb = (db: BracesDB<Test>): void => {
  for (const item of dataList) {
    db.add(
      {
        name: item.name,
        description: item.description,
        show: item.show,
      },
      "name",
    );
  }
};

Deno.test(
  "Add item",
  (): void => {
    const db = new BracesDB<Test>({ type: "memory" });
    addDb(db);
    assertEquals(db.find(), dataList);
  },
);

Deno.test(
  "Delete item",
  (): void => {
    const db = new BracesDB<Test>({ type: "memory" });
    addDb(db);
    db.delete("name", "Kintaro");
    const dataDeleteList = dataList.filter((item) => item.name !== "Kintaro");
    assertEquals(db.find(), dataDeleteList);
  },
);

Deno.test(
  "Find item",
  (): void => {
    const db = new BracesDB<Test>({ type: "memory" });
    addDb(db);
    const data = db.find("name", "Kintaro");
    const dataFindList = dataList.filter((item) => item.name === "Kintaro");
    assertEquals(data, dataFindList);
  },
);

Deno.test(
  "Partial find item",
  (): void => {
    const db = new BracesDB<Test>({ type: "memory" });
    addDb(db);
    const data = db.find("name", /taro/);
    const dataFindList = dataList.filter((item) =>
      /taro/.test(item.name || "")
    );
    assertEquals(data, dataFindList);
  },
);
