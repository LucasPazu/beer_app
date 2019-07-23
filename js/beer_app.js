(async () => {

    /* Selectors */
    const randomBeerBtn = document.querySelector('#random-beer');


    const rootEndpoint = 'https://api.punkapi.com/v2/';

    function searchRandomBeer() {
        const url = rootEndpoint + '/beers/random';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })

            location.reload();
    }

    /* Event Listeners */
    randomBeerBtn.addEventListener('click', searchRandomBeer);
   

})();