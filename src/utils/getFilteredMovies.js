import { useMemo } from "react";

export default function useFilteredMovies(movies, localCheck, localValue) {
    return useMemo(() => movies.filter((movie) => {
        const values = localValue.toLowerCase();
        const nameEN = movie.nameEN;
        const nameRU = movie.nameRU;

        if (localCheck && movie.duration > 40) {return false;}
        if (nameEN?.toLowerCase().includes(values) || nameRU?.toLowerCase().includes(values)) {return true;}
        return false;
    }), [localCheck, localValue, movies]);
}
