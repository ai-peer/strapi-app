
export default `
  type Category {
    id: String
    name: String
  }
  type Article {
    id: String
    title: String
    logo: String
    content: String
  }
  type Query {
     hello: String
     cates: [Category]
     artis: [Article]
  }
  
  schema {
    query: Query
  }
`;
