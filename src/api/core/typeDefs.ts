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

  type Image {
    url: String!
    width: Int!
    height: Int!
    alt: String
  }
  input ImageInput {
    url: String!
    width: Int!
    height: Int!
    alt: String
  }
`;
