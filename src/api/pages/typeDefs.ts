import { gql } from "gql";
export default gql`
  type Page {
    id: ID!
    title: String!
    content: String!
    createdAt: Date!
    images: [Image]
    description: String
    updatedAt: Date
  }

  input PageInput {
    title: String!
    content: String!
    images: [ImageInput]
    description: String
  }

  type Query {
    page(id: ID!): Page
  }

  type Mutation {
    createPage(input: PageInput!): Page
      @permission(item: "Page", action: create)
    updatePage(id: ID!, input: PageInput!): Page
      @permission(item: "Page", action: update)
    deletePage(id: ID!): Boolean @permission(item: "Page", action: delete)
  }
`;
