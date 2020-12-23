import { gql } from "gql";
export default gql`
  type Image {
    url: String!
    width: Int!
    height: Int!
    alt: String
  }

  type JournalEntry {
    id: ID!
    title: String!
    content: String!
    createdAt: Date!
    images: [Image]
    description: String
    alias: String
    updatedAt: Date
  }

  input JournalInput {
    title: String!
    content: String!
    images: [ImageInput]
    description: String
    alias: String
  }

  input ImageInput {
    url: String!
    width: Int!
    height: Int!
    alt: String
  }

  type JournalPage {
    items: [JournalEntry]
    nextOffset: Int
  }

  type Query {
    entries(limit: Int, offset: Int): JournalPage
  }

  type Mutation {
    createEntry(input: JournalInput!): JournalEntry
      @permission(item: "Journal", action: create)
    updateEntry(id: ID!, input: JournalInput!): JournalEntry
      @permission(item: "Journal", action: update)
    deleteEntry(id: ID!): Boolean @permission(item: "Journal", action: delete)
  }
`;
