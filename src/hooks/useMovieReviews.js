import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchMovieReViews = (movieId) => {
    return api.get(`movie/${movieId}/reviews`);
}

export const useMovieReviewsQuery = (movieId) => {
    return useQuery({
        queryKey: ["movie-reviews", movieId],
        queryFn: () => fetchMovieReViews(movieId),
        select: (result) => result.data.results,
        enabled: !!movieId,
    })
}
