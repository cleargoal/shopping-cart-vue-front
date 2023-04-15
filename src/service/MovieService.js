export default class MovieService {

    getMovies(title, page) {
        const apiToken = "1d507b54";
        const params = [];
        params['s'] = title;
        params['page'] = page;
        params['apikey'] = apiToken;
        const queryParams = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
        return fetch('http://www.omdbapi.com/?' + queryParams).then(res => res.json())
    }
    
}
  