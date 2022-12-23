<template>
  <div>
    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <h1>Strapi blog {{articles.length}}</h1>

        <ArticlesList :articles="articles"></ArticlesList>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlesList from "../components/ArticlesList.vue";
import gql from "graphql-tag";

export default {
  components: {
    ArticlesList
  },
  data() {
    return {
      articles: []
    };
  },
  mounted(){
      let res = gql`
          {
            articles {
              data{
                id
                attributes{
                  title
                  content
                  logo {
                    data{
                      attributes{
                        url
                      }
                    }
                  }
                  category {
                    data {
                      id
                      attributes{
                        name
                      }
                    }
                  }
                }
                
              }
            }
          }
        `
      
      console.info("mount========", res);
  },
  apollo: {
    articles: gql`
      {
        articles {
          data{
            id
            attributes{
              title
              content
              logo {
                data{
                  attributes{
                    url
                  }
                }
              }
              category {
                data {
                  id
                  attributes{
                    name
                  }
                }
              }
            }
            
          }
        }
      }
    `
  }
};
</script>
