import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"

const fetchVideo = async ({ queryKey }) => {
    const movieId = queryKey[1];
    const response = await api.get(`/movie/${movieId}/videos`);
    return response.data;
}

export const useMovieVideoQuery = (movieId) =>
    useQuery({
        queryKey: ["movie-video", movieId],
        queryFn: fetchVideo,
        staleTime: 1000 * 60 * 5,
    })