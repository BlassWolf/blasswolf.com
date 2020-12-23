import { gql } from "gql";
export default gql`
  scalar Date
  enum PermittedAction {
    create
    read
    update
    delete
    list
  }

  directive @permission(
    item: String!
    action: PermittedAction!
  ) on FIELD_DEFINITION
`;
