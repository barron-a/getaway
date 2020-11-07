$(document).ready(function () {
    $('.modal').modal();
    $(".parallax").parallax();

    var zipCodeEl = document.getElementById("textarea1");

    let searchHistory = JSON.parse(localStorage.getItem('zipcode')) || [];


    window.onload = function () {

        searchHistory.forEach(function (v) { //append each element into the dom
            var value = v;
            var li = document.createElement('li');
            li.textContent = value
            var list = document.getElementById('zipCodeOp');

            list.appendChild(li);
        })

    }


    function getPointsOfInterest() {

        // will pull user zip from input field - likely need a search or submit button with listener
        var userZip = zipCodeEl.value.trim();

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
                        pois.reverse();
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
                            <div class="row">
                                <div class="col">
                                <div class="card horizontal">
                                    <div class="card-image">
                                    <img alt="" src="${imgUrl}">
                                    <span class="card-title">${poi.name}</span>
                                    </div>
                                    <div class="card-content">
                                    <p>${description}</p>
                                    </div>
                                    <div class="card-action">
                                    ${link}
                                    </div>
                                </div>
                                </div>
                            </div>
                        `;
                            document.querySelector(".container").insertAdjacentHTML("afterend", poitemplate);
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


    document.getElementById("zipForm").addEventListener("submit", function (event) {
        event.preventDefault();
        getPointsOfInterest();
        // set item to local storage
        var value = document.getElementById("textarea1").value.trim();
        // localStorage.setItem("zipcode", value)
        searchHistory.unshift(value);
        searchHistory.splice(5)



        var li = document.createElement("li");
        li.textContent = value;


        // retrieve from local storeage and append in zipcodeop
        document.getElementById("zipCodeOp").append(li);

        git

        // zipcodeArray.push(input.value)
        localStorage.setItem('zipcode', JSON.stringify(searchHistory))


    })


});






