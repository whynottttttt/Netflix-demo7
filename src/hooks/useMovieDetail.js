import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchMovieDetail = async ({ queryKey }) => {
    const movieId = queryKey[1];
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
}

export const useMovieDetailQuery = (movieId) =>
    useQuery({
        queryKey: ["movie-detail", movieId],
        queryFn: fetchMovieDetail,
        staleTime: 1000 * 60 * 5, // 5 분
    }) 