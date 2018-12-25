import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
const client = new ApolloClient({
    uri: "http://localhost:8080/api/graphql"
});

export default {
  getMoviesSummaryInfos: ({text = ''} = {}) => {
    return new Promise((resolve, reject) => {
        client
        .query({
          query: gql`
            {
              findMovies(text: "${text}")  {
                id
                title
                year
                details {
                  poster
                  imdb {
                    rating
                    votes
                  }
                }
              }
            }
          `
        })
        .then(result => {
          resolve(result.data.findMovies);
        }).catch(error => {
          reject(error);
        });
    })
  }
}