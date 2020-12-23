import { GraphQLQuery } from "../types";
import { ExecutionResult } from "graphql";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { GraphQLContext } from "./context";

export default function useQuery<
  T = { [key: string]: any },
  E = { [key: string]: any }
>(
  query: GraphQLQuery,
  options?: {
    variables?: { [key: string]: any };
    operationName?: string;
  }
): ExecutionResult<T, E> & {
  loading: boolean;
  refetch: () => Promise<ExecutionResult<T, E>>;
  fetchMore: (field: keyof T) => Promise<ExecutionResult<T, E>>;
} {
  if (!query)
    return {
      loading: false,
      refetch: () => {
        return null as any;
      },
      fetchMore: () => {
        return null as any;
      },
    };
  const { client } = useContext(GraphQLContext);
  const state = useRef<ExecutionResult<T, E>>();
  const [loading, setLoading] = useState<boolean>(false);
  const variables = options?.variables;
  const operationName = options?.operationName;

  const execute = async () => {
    setLoading(true);
    const result = (await client.execute(
      query,
      variables,
      operationName
    )) as any;
    state.current = result;
    setLoading(false);
    return result;
  };
  useEffect(() => {
    execute();
    //eslint-disable-next-line
  }, [JSON.stringify(query), JSON.stringify(variables), operationName]);

  const fetchMore = async (field: keyof T): Promise<any> => {
    const data = state.current?.data;
    if (!data) return;
    if (!(field in data)) {
      console.warn("cannot find field", field, "in", data);
      return;
    }
    const offset = (data[field] as any)?.nextOffset;
    if (offset === null) return;
    if (loading) return setTimeout(() => fetchMore(field), 100);

    setLoading(true);
    const result: any = await client.execute(
      query,
      { ...variables, offset },
      operationName
    );

    const oldItems = (data[field] as any)?.items ?? [];
    const newItems = (result.data[field] as any)?.items ?? [];
    const updatedData = {
      ...data,
      ...result,
      [field]: {
        ...data[field],
        ...result.data[field],
        items: [...oldItems, ...newItems],
      },
    };
    state.current = Object.assign({}, result, {
      loading: false,
      data: updatedData,
    });
    setLoading(false);
    return result;
  };
  const dataState = state.current ?? {};
  return {
    ...dataState,
    loading,
    refetch: execute,
    fetchMore,
  };
}
