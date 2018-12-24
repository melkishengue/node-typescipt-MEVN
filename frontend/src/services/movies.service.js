import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
const client = new ApolloClient({
    uri: "http://localhost:8080/api/graphql"
});

export default {
  getMoviesSummaryInfos: () => {
    return new Promise((resolve, reject) => {
        client
        .query({
          query: gql`
            {
              movies {
              # id
              title
              year
              details {
                poster
                awards {
                  text
                }
              }
            }
            }
          `
        })
        .then(result => {
          resolve(result.data.movies);
        }).catch(error => {
          reject(error);
        });
    })
  }
}