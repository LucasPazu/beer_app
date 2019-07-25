(async () => {
    /* Selectors */
    const randomBeerBtn = document.querySelector('#random-beer');
    const searchBeerBtn = document.querySelector('#search-btn');
    const inputBeerName = document.querySelector('#input-beer-name');
    const minABV = document.querySelector('#min-abv');
    const maxABV = document.querySelector('#max-abv');
    const minIBU = document.querySelector('#min-ibu');
    const maxIBU = document.querySelector('#max-ibu');
    const minEBC = document.querySelector('#min-ebc');
    const maxEBC = document.querySelector('#max-ebc');

    const resultsBox = document.querySelector('.results-box');

    const rootEndpoint = 'https://api.punkapi.com/v2/';

    function searchBeer() {
        const baseUrl = `https://api.punkapi.com/v2/beers?`;
        let url = `https://api.punkapi.com/v2/beers?`;

        clearResultsBox();

        /* beer name */
        if (inputBeerName.value != '') {
            url += `beer_name=${inputBeerName.value}`;
        }

        /* beer ABV */
        if (minABV.value != '') {
            if (minABV.value >= 0 && minABV.value <= 100) {
                url = addAmpersand(url, baseUrl);
                url += `abv_gt=${minABV.value}`;
            } else {
                displayIncorrectData();
            }
        }

        if (maxABV.value != '') {
            if (maxABV.value >= 0 && maxABV.value <= 100) {
                url = addAmpersand(url, baseUrl);
                url += `abv_lt=${maxABV.value}`;
            } else {
                displayIncorrectData();
            }
        }

        if (minABV.value != '' && maxABV.value != '') {
            if (maxABV.value < minABV.value) {
                displayIncorrectData();
            }
        }

        /* beer IBU */
        if (minIBU.value != '') {
            if (minIBU.value >= 0) {
                url = addAmpersand(url, baseUrl);
                url += `ibu_gt=${minIBU.value}`;
            } else {
                displayIncorrectData();
            }
        }

        if (maxIBU.value != '') {
            if (maxIBU.value >= 0) {
                url = addAmpersand(url, baseUrl);
                url += `ibu_lt=${maxIBU.value}`;
            } else {
                displayIncorrectData();
            }
        }

        if (minIBU.value != '' && maxIBU.value != '') {
            if (maxIBU.value < minIBU.value) {
                displayIncorrectData();
            }
        }

        /* beer EBC */
        if (minEBC.value != '') {
            if (minEBC.value >= 0) {
                url = addAmpersand(url, baseUrl);
                url += `ebc_gt=${minEBC.value}`;
            } else {
                displayIncorrectData();
            }
        }

        if (maxEBC.value != '') {
            if (maxEBC.value >= 0) {
                url = addAmpersand(url, baseUrl);
                url += `ebc_lt=${maxEBC.value}`;
            } else {
                displayIncorrectData();
            }
        }

        if (minEBC.value != '' && maxEBC.value != '') {
            if (maxEBC.value < minEBC.value) {
                displayIncorrectData();
            }
        }

        //console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                if (data.length === 0) {
                    displayNoBeerFound();
                } else {
                    resultsBox.innerHTML = '';
                    data.forEach(el => {
                        displayResults(el);
                        //console.log(el);
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });

        function addAmpersand(URL, BASE_URL) {
            if (URL !== BASE_URL) {
                URL += `&`;
            }
            return URL;
        }
    }

    function searchRandomBeer() {
        const url = rootEndpoint + '/beers/random';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function displayResults(el) {
        const beer = document.createElement('div');
        beer.classList.add('beer');

        const leftBox = document.createElement('div');
        leftBox.classList.add('left');

        const rightBox = document.createElement('div');
        rightBox.classList.add('right');

        /* Left */

        const beerNameBox = document.createElement('div');
        beerNameBox.classList.add('beer-name-box');

        const beerName = document.createElement('h3');
        beerName.classList.add('beer-name');
        beerName.innerText = el.name;

        const beerTagline = document.createElement('p');
        beerTagline.classList.add('beer-tagline');
        beerTagline.innerText = el.tagline;

        const propertiesBox = document.createElement('div');
        propertiesBox.classList.add('properties-box');

        const ABV = document.createElement('div');
        ABV.classList.add('abv');
        ABV.classList.add('property');
        ABV.innerText = `ABV: ${el.abv}%`;

        const IBU = document.createElement('div');
        IBU.classList.add('ibu');
        IBU.classList.add('property');
        IBU.innerText = `IBU: ${el.ibu}`;

        const EBC = document.createElement('div');
        EBC.classList.add('ebc');
        EBC.classList.add('property');
        EBC.innerText = `EBC: ${el.ebc}`;

        /* Right */

        const description = document.createElement('div');
        description.classList.add('description');

        const text = document.createElement('p');
        text.classList.add('text');
        text.innerText = el.description;

        /*********/

        resultsBox.appendChild(beer);
        beer.appendChild(leftBox);
        beer.appendChild(rightBox);

        leftBox.appendChild(beerNameBox);
        leftBox.appendChild(propertiesBox);

        beerNameBox.appendChild(beerName);
        beerNameBox.appendChild(beerTagline);

        propertiesBox.appendChild(ABV);
        propertiesBox.appendChild(IBU);
        propertiesBox.appendChild(EBC);

        rightBox.appendChild(description);
        description.appendChild(text);
    }

    function clearResultsBox() {
        const resultsHere = document.createElement('h2');
        resultsHere.classList.add('info');
        resultsHere.innerText = 'Results here';

        resultsBox.innerHTML = '';
        resultsBox.appendChild(resultsHere);
    }

    function displayNoBeerFound() {
        const resultsHere = document.createElement('h2');
        resultsHere.classList.add('info');
        resultsHere.innerText = 'No Beer Found:( ';

        resultsBox.innerHTML = '';
        resultsBox.appendChild(resultsHere);
    }

    function displayIncorrectData() {
        const resultsHere = document.createElement('h2');
        resultsHere.classList.add('info');
        resultsHere.classList.add('incorrect-data');
        resultsHere.innerText = 'Incorrect data!';

        resultsBox.innerHTML = '';
        resultsBox.appendChild(resultsHere);
    }

    /* Event Listeners */
    //randomBeerBtn.addEventListener('click', searchRandomBeer);
    searchBeerBtn.addEventListener('click', searchBeer);
})();
