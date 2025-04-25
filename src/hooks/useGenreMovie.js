import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchGenreMovie = ({ genreId, page }) => {
    return api.get(`/discover/movie?with_genres=${genreId}&page=${page}`)
}

export const useGenreMovieQuery = ({ genreId, page = 1 }) => {
    return useQuery({
        queryKey: ['movie-genre-list', { genreId, page }],
        queryFn: () => fetchGenreMovie({ genreId, page }),
        select: (result) => result.data,
        enabled: !!genreId
    })
} 