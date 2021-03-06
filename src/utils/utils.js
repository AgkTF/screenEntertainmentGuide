const utils = {
  timeExpander: (time) => {
    const hrs = Math.trunc(time / 60);
    const mins = time % 60;

    let result;
    if (mins === 0) {
      result = `${hrs}h`;
    } else {
      result = `${hrs}h ${mins}min`;
    }

    return result;
  },

  genreMapper: (genreIds) => {
    const genres = [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
      {
        id: 10759,
        name: "Action & Adventure",
      },
      {
        id: 10762,
        name: "Kids",
      },
      {
        id: 10763,
        name: "News",
      },
      {
        id: 10764,
        name: "Reality",
      },
      {
        id: 10765,
        name: "Sci-Fi & Fantasy",
      },
      {
        id: 10766,
        name: "Soap",
      },
      {
        id: 10767,
        name: "Talk",
      },
      {
        id: 10768,
        name: "War & Politics",
      },
    ];

    const findGenre = (id) => {
      const foundGenre = genres.find((genre) => id === genre.id);
      return foundGenre.name;
    };

    const found = genreIds.map((id) => findGenre(id));
    return found.join("/");
  },

  //FIXME: find better solution for gender === 0
  srcSelector: (profile_path, gender) => {
    if (!profile_path) {
      if (gender === 1) {
        return "/female-wo-1.svg";
      } else if (gender === 2 || gender === 0) {
        return "/male-wo-1.svg";
      }
    } else {
      return `https://image.tmdb.org/t/p/w185${profile_path}`;
    }
  },
};

module.exports = utils;
