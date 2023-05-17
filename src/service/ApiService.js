let apiUrl = '';

if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:8010/api';
} else {
    apiUrl = 'https://shopping-back.segment.best/api';
}

export default class ApiService {
    getAnonymousTokenFromDb() {
        // let apiUrl = inject('apiUrl');
        return fetch(apiUrl + '/new-anonymous').then(res => res.json());
    }

    getUserCardFromDb(token) {
        // let apiUrl = inject('apiUrl');
        return postData(apiUrl + '/user-cart/', {uuid:token});
    }

    getCategoriesList() {
        // let apiUrl = inject('apiUrl');
        return fetch(apiUrl + '/categories/').then(res => res.json());
    }

    getCategoryProducts(alias) {
        // let apiUrl = inject('apiUrl');
        return fetch(apiUrl + '/products-by-category/' + alias).then(res => res.json());
    }

    getDiscountsListDb() {
        return fetch(apiUrl + '/discounts/').then(res => res.json());
    }

    getCalculation() {
        return fetch(apiUrl + '/calculation/').then(res => res.json());
    }
}

function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }); //.json(); // parses JSON response into native JavaScript objects
}
