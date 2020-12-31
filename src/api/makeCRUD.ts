import DataSource from "./DataSource";
import { APIContext, APIItem, APIResolvers, ListParams } from "./types";

export default function makeCRUD<
  C extends APIContext,
  T extends APIItem,
  I = any
>(item: string, items: string, source: keyof C = items): APIResolvers {
  const createItem = ({ input }: { input: I }, ctx: C) => {
    return (ctx[source] as DataSource<T>).create(input);
  };
  const getItem = (params: { id: string }, ctx: C) => {
    return (ctx[source] as DataSource<T>).get(params.id);
  };
  const updateItem = ({ id, input }: { id: string; input: I }, ctx: C) => {
    return (ctx[source] as DataSource<T>).set(id, input);
  };
  const deleteItem = async (params: { id: string }, ctx: C) => {
    const success = await (ctx[source] as DataSource<T>).delete(params.id);
    return { success };
  };
  const listItems = (params: ListParams, ctx: C) => {
    return (ctx[source] as DataSource<T>).list(params);
  };

  return {
    [item]: {
      GET: getItem,
      POST: createItem,
      PATCH: updateItem,
      DELETE: deleteItem,
    },
    [items]: {
      GET: listItems,
    },
  };
}
