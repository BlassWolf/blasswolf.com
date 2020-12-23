import { DocumentNode, parse } from "graphql";
export default function gql(
  template: TemplateStringsArray,
  ...replacements: any[]
): DocumentNode & { text: string } {
  const stringQuery = String.raw(template, ...replacements);
  const ast = parse(stringQuery);
  return { ...ast, text: stringQuery };
}
