$(document).ready(function () {
    $('.modal').modal();
    $(".parallax").parallax();

    var zipCodeEl = document.getElementById("textarea1");

    let searchHistory = JSON.parse(localStorage.getItem('zipcode')) || [];


    window.onload = function () {
        displaySearchHistory()


    }
    function displaySearchHistory() {
        var list = document.getElementById('zipCodeOp');
        list.innerHTML = "";
        searchHistory.forEach(function (v) { //append each element into the dom

            var li = createSearchHistoryLi(v)
            list.appendChild(li);
        })
    }

    function getPointsOfInterest(userZip) {

        // will pull user zip from input field - likely need a search or submit button with listener

        console.log(userZip);
        var mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + userZip + ".json?access_token=pk.eyJ1IjoiYWRhbWJhcnJvbiIsImEiOiJja2d2dm84aW4wMXA0MzBsODltNjZ5ZzFiIn0.W7Kpov0CjgFZQWXRaFlKzg"

        // fetch coordinates based on zip from map box. Can replace fill URL with 'mapboxUrl' variable when button is enabled

        fetch(mapboxUrl).then(function (response) {
            // mapbox API call
            if (response.ok) {
                response.json().then(function (data) {

                    var latitude = data.features[0].center[1];
                    var longitude = data.features[0].center[0];


                    var triposoUrl = "https://www.triposo.com/api/20200803/local_highlights.json?latitude=" + latitude + "&longitude=" + longitude + "&max_distance=3000&poi_fields=all&account=ZCUNOA55&token=8pemze46o1tfvvh58e1tskjo5wegfswp"
                    return fetch(triposoUrl);
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {

                        const pois = response.results[0].pois;
                        // pois.reverse();
                        for (let index = 0; index < pois.length; index++) {
                            const poi = pois[index];

                            const url = poi.content && poi.content.attribution[0] && poi.content.attribution[0].url
                                ? poi.content.attribution[0].url
                                : "";
                            const link = url
                                ? `<a href="${url}">Visit Website</a>`
                                : "";
                            const imgUrl = poi.images[0]
                                ? poi.images[0].source_url
                                : "https://sgl-assets.imgix.net/files/article_hero/how-to-plan-trip-guide-aaa-via-magazine-shutterstock_446918872.jpg?w=1440&h=720&crop=faces,edges";
                            const description = poi.content.sections[0].body
                                ? poi.content.sections[0].body
                                : "";
                            const poitemplate = `
                            <div class="card ">
                            <div class="card-image">
                              <img class=" responsive-img"  src="${imgUrl}">
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">${poi.name}<i class="material-icons right">more_vert</i></span>
                              <p><a href="#">${link}</a></p>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">${poi.name}<i class="material-icons right">close</i></span>
                              <p>${description}</p>
                            </div>
                          </div>
                        `;
                            document.querySelector("#searchResults").innerHTML += poitemplate
                        }

                        function process() {

                            const file = document.querySelector

                        }
                    })
            } else {
                // insert modal here with error message? (Had trouble getting this to work with Materialize)
                $(document).ready(function () {

                    $('.modal').modal();

                })
            };
        })
    }

    function createSearchHistoryLi(zipcode) {
        var li = document.createElement("li");
        li.classList.add("collection-item")
        li.textContent = zipcode;
        li.addEventListener("click", function () {
            getPointsOfInterest(zipcode);
        });
        return li
    }


    document.getElementById("zipForm").addEventListener("submit", function (event) {
        event.preventDefault();
        var userZip = zipCodeEl.value.trim();
        getPointsOfInterest(userZip);
        // set item to local storage
        var value = document.getElementById("textarea1").value.trim();
        // localStorage.setItem("zipcode", value)
        searchHistory.unshift(value);
        searchHistory.splice(5)

        displaySearchHistory()


        // zipcodeArray.push(input.value)
        localStorage.setItem('zipcode', JSON.stringify(searchHistory))


    })


});






