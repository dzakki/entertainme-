import { gql } from 'apollo-boost';
export const GET_ALL_TVSERIES = gql`
    query {
        tvSeries {
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

export const GET_TVSERIES = gql`
    query tvSeriesById ($id: String) {
        tvSeriesById (id: $id) {
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
export const ADD_TVSERIES  = gql`

    mutation addTvSeries($input: inputTvSeries!) {
        addTvSeries (input: $input) {
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

export const UPDATE_TVSERIES  = gql`
mutation updateTvSeries($input: inputTvSeries!, $id: String) {
    updateTvSeries (input: $input, id: $id) {
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

export const DELETE_TVSERIES = gql`
    mutation deleteTvSeries ( $id: String ) {
        deleteTvSeries(id: $id) {
            text
        }
    }
`