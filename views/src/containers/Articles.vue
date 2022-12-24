<template>
  <div>
    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <h1>Strapi blog </h1>

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
  mounted() {},
  apollo: {
    articles: {
      query: gql`query {
          articles {
            data {
              id
              attributes {
                title
                content
                logo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                category {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `,
      update: data => {
        console.info("update==0", data);
        return data.articles;
      }
    },
   
  }
};
</script>
