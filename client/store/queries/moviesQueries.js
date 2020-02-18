import { gql } from 'apollo-boost';
export const GET_MOVIES = gql`
    query {
        movies {
            _id
            title
            overview
            popularity
            poster_path
            tags {
              _id
              name
            }
        }
    }
`

export const GET_MOVIE = gql`
    query getMovie ($id: String) {
        movie (id: $id) {
            _id
            title
            overview
            popularity
            poster_path
            tags {
                _id
                name
            }
        }
    }
`
export const ADD_MOVIE  = gql`

    mutation addMovie($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        addMovie (title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
            _id,
            title
            overview
            popularity
            poster_path
            tags {
              _id
              name
            }
        }
    }
`

export const UPDATE_MOVIE  = gql`
mutation updateMovie($input: inputUpdateMovie!, $id: String) {
    updateMovie (input: $input, id: $id) {
        _id,
        title
        overview
        popularity
        poster_path
        tags {
          _id
          name
        }
    }
}
`

export const DELETE_MOVIE = gql`
    mutation deleteMovie ( $id: String ) {
        deleteMovie(id: $id) {
            text
        }
    }
`