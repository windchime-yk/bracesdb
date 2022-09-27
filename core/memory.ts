import type { DatabaseFormat } from "../model.ts";

export const memoryFormat: DatabaseFormat = {
  add<T>(data: T[], object: T, keyword: keyof T) {
    const isDuplicate =
      data?.filter((item) => item[keyword] === object[keyword]).length;
    if (isDuplicate) return data;

    data?.push(object);
    return data;
  },

  delete<T>(data: T[], key: keyof T, keyword: T[keyof T]) {
    return data?.filter((item) => item[key] !== keyword);
  },

  find<T>(data: T[], key?: keyof T, keyword?: T[keyof T] | RegExp) {
    if (key && keyword instanceof RegExp) {
      return data?.filter((item) => keyword.test(`${item[key]}`));
    } else if (key && keyword) {
      return data?.filter((item) => item[key] === keyword);
    } else return data;
  },
};
