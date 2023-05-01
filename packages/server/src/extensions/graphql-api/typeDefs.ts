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

  mutation {
    createArticle(
      data: {
        title: "title"
        logo: "http://xxx.com/a.jpg"
        content: "demoxxx"
        category: 0
    }) {
      data {
        title
        logo
        content
        category
      }
    }
    updateArticle(id: "1", data: { 
      title: "Hello"
      logo: ""
      content: ""
      category: 0 
    }) {
      data {
        id
        title
        logo
        content
        category
      }
    }
  }
 
`;
