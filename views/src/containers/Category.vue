<template>
  <div>
    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <h1>{{ category.name }}</h1>

        <ArticlesList :articles="category.articles || []"></ArticlesList>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlesList from "../components/ArticlesList";
import gql from "graphql-tag";

export default {
  data() {
    return {
      category: [],
      routeParam: this.$route.params.id
    };
  },
  components: {
    ArticlesList 
  },
  apollo: {
    category: {
      query: gql`
        query category($id: ID!) {
          category(id: $id) {
            data{
              id
              attributes{
                name
                articles{
                  data{
                    id
                    attributes{
                      title
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return { id: this.routeParam };
      }
    }
  }
};
</script>
