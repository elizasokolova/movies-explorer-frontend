import { useMemo } from "react";

export default function useFilterFilms(films, filmControl, localFilm) {
    return useMemo(() => films.filter((film) => {
        const v = localFilm.toLowerCase();
        const nameEN = film.nameEN;
        const nameRU = film.nameRU;
        if (filmControl && film.duration > 40) {return false;}
        if (nameEN?.toLowerCase().includes(v) || nameRU?.toLowerCase().includes(v)) {return true;}
        return false;
    }), [filmControl, localFilm, films]);
}
