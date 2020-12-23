import { GraphQLQuery } from "../types";
import { ExecutionResult } from "graphql";
import { useContext, useState } from "preact/hooks";
import { GraphQLContext } from "./context";

export type OperationOptions = {
  variables?: { [key: string]: any };
  operationName?: string;
};

export default function useMutation<
  T = { [key: string]: any },
  E = { [key: string]: any }
>(
  query: GraphQLQuery,
  defaultOptions?: OperationOptions
): [
  (options?: OperationOptions) => Promise<ExecutionResult<T, E>>,
  ExecutionResult<T, E> & { loading: boolean; reset: () => void }
] {
  const { client } = useContext(GraphQLContext);
  const [state, setState] = useState<
    ExecutionResult<T, E> & { loading: boolean }
  >({ loading: false });

  const execute = (options?: OperationOptions) => {
    return client
      .execute(
        query,
        options?.variables ?? (defaultOptions?.variables as any),
        options?.operationName ?? defaultOptions?.operationName
      )
      .then((result: any) => {
        setState({ ...result, loading: false });
        return result;
      })
      .catch((error) => {
        setState({ data: undefined, errors: [error], loading: false });
      });
  };
  return [execute, { ...state, reset: () => setState({ loading: false }) }];
}
