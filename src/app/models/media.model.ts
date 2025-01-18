export interface IMedia {
    _id:          string;
    show_id:      string;
    type:         MediaType;
    title:        string;
    director?:    string;
    country?:     string;
    date_added:   string;
    release_year: number;
    rating:       string;
    duration:     string;
    listed_in:    string;
    description:  string;
    cast?:        string;
}

export enum MediaType {
    Movie = "Movie",
    TVShow = "TV Show",
}