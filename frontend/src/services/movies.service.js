import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { backendUri } from "../config";

const client = new ApolloClient({
    uri: `${backendUri}/api/graphql`
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
                  director
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