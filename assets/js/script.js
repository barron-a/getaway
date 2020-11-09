$(document).ready(function () {
    $('.modal').modal();
    $(".parallax").parallax();

    var zipCodeEl = document.getElementById("textarea1");
    var searchHistory = JSON.parse(localStorage.getItem('zipcode')) || [];

    //display search history on page load
    window.onload = function () {
        displaySearchHistory();
    }

    // function to display search history list from local storage
    function displaySearchHistory() {
        var list = document.getElementById('zipCodeOp');
        list.innerHTML = "";
        searchHistory.forEach(function (v) { 
            //append each element into the dom
            var li = createSearchHistoryLi(v);
            list.appendChild(li);
        })
    }

    // function to collect and display point of interest based on user zipcode
    function getPointsOfInterest(userZip) {

        var mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + userZip + ".json?access_token=pk.eyJ1IjoiYWRhbWJhcnJvbiIsImEiOiJja2d2dm84aW4wMXA0MzBsODltNjZ5ZzFiIn0.W7Kpov0CjgFZQWXRaFlKzg"
        // fetch coordinates based on zip from map box.

        fetch(mapboxUrl).then(function (response) {
            // mapbox API call
            return response.json();
        })
            .then(function (data) {
                var latitude = data.features[0].center[1];
                var longitude = data.features[0].center[0];

                // triposo API call
                var triposoUrl = "https://www.triposo.com/api/20200803/local_highlights.json?latitude=" + latitude + "&longitude=" + longitude + "&max_distance=3000&poi_fields=all&account=ZCUNOA55&token=8pemze46o1tfvvh58e1tskjo5wegfswp"
                return fetch(triposoUrl);
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                // display points of interest
                const pois = response.results[0].pois;
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

                    // template literal
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
            })
            .catch(function (err) {
                // Modal with error message
                $('.modal').modal("open");
            })
    };

    // function to make search history clickable
    function createSearchHistoryLi(zipcode) {
        var li = document.createElement("li");
        li.classList.add("collection-item");
        li.textContent = zipcode;
        li.addEventListener("click", function () {
            document.querySelector("#searchResults").innerHTML = "";
            getPointsOfInterest(zipcode);
        });
        return li;
    }

    // event listener function for submit button
    document.getElementById("zipForm").addEventListener("submit", function (event) {
        event.preventDefault();
        var userZip = zipCodeEl.value.trim();
        document.querySelector("#searchResults").innerHTML = "";
        getPointsOfInterest(userZip);
        var value = document.getElementById("textarea1").value.trim();
        searchHistory.unshift(value);
        searchHistory.splice(5);

        displaySearchHistory();

        // set array to local storage
        localStorage.setItem('zipcode', JSON.stringify(searchHistory));
    });

});






