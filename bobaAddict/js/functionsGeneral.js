var longitude;
var latitude;

//Functions to get current location
function getLoc() {
    var x = document.getElementById("demo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
}

//Functions to return search preferences
function getSearchValue() {
    return document.getElementById('searchInput').value;
}

function getDistanceValue() {
    var ele = document.getElementsByName('distance');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            return ele[i].value;
    }
}

function getPriceValue() {
    var ele = document.getElementsByName('price');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            return ele[i].value;
    }
}

function getOpenValue() {
    var ele = document.getElementsByName('open');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            return ele[i].value;
    }
}

function getLocationValue() {
    return document.getElementById('locationInput').value;
}

//Count variable to keep track of the businesses returned
var count = 0;

// Function that calls the Yelp API
function searchClicked() {
    count = 0;
    var elmnt = document.getElementById("feed");
    elmnt.scrollIntoView();

    var searchInput = getSearchValue();
    searchInput = searchInput.split(" ").join("+")
    console.log(searchInput)
    var distance = getDistanceValue();
    var price = getPriceValue();
    var open = getOpenValue();
    var location = getLocationValue();
    if (location == "") {
        location = "&latitude=" + latitude + "&longitude=" + longitude;
    }
    else {
        location = location.split(" ").join("+")
        location = "&location=" + location;
    }

    //Building up Yelp API Get request url with search preferences
    var getrequest = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";
    getrequest += location;
    getrequest += "&term=" + searchInput;
    getrequest += "&limit=" + 5;
    getrequest += "&open_now=" + open;
    getrequest += "&radius=" + distance;
    getrequest += "&price=" + price;
    getrequest += "&categories=" + "restaurants";


    console.log(getrequest)
    var settings = {
        "url": getrequest,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer ybuYzx8pLB4S18TRtSxPvkM-eI0cDT1p_J2d9aXgoQlaeobKI8BB_Oq-bqdA__xjqBsts3aC0JXgg0nZE-hfBGpXnjvFKirEDt2ZqLgWVU8fjfI8_3qFPLBB5r4dX3Yx"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        parse(response, 0);
    });
}

//Gets the previous restaurant, after the prev button clicked
function prevSearch() {
    var elmnt = document.getElementById("feed");
    elmnt.scrollIntoView();

    var searchInput = getSearchValue();
    searchInput = searchInput.split(" ").join("+")
    console.log(searchInput)
    var distance = getDistanceValue();
    var open = getOpenValue();
    var price = getPriceValue();
    var location = getLocationValue();
    if (location == "") {
        location = "&latitude=" + latitude + "&longitude=" + longitude;
    }
    else {
        location = location.split(" ").join("+")
        location = "&location=" + location;
    }


    //Building up Yelp API Get request url with search preferences
    var getrequest = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";
    getrequest += location;
    getrequest += "&term=" + searchInput;
    getrequest += "&limit=" + 5;
    getrequest += "&open_now=" + open;
    getrequest += "&radius=" + distance;
    getrequest += "&price=" + price;
    getrequest += "&categories=" + "restaurants";


    console.log(getrequest)
    var settings = {
        "url": getrequest,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer ybuYzx8pLB4S18TRtSxPvkM-eI0cDT1p_J2d9aXgoQlaeobKI8BB_Oq-bqdA__xjqBsts3aC0JXgg0nZE-hfBGpXnjvFKirEDt2ZqLgWVU8fjfI8_3qFPLBB5r4dX3Yx"
        },
    };

    count -= 1
    $.ajax(settings).done(function (response) {
        console.log(response);
        parse(response, count);
    });

}


//Gets the next restaurant, after the next button clicked
function nextSearch() {
    var elmnt = document.getElementById("feed");
    elmnt.scrollIntoView();

    var searchInput = getSearchValue();
    searchInput = searchInput.split(" ").join("+")
    console.log(searchInput)
    var distance = getDistanceValue();
    var open = getOpenValue();
    var price = getPriceValue();
    var location = getLocationValue();
    if (location == "") {
        location = "&latitude=" + latitude + "&longitude=" + longitude;
    }
    else {
        location = location.split(" ").join("+")
        location = "&location=" + location;
    }


    //Building up Yelp API Get request url with search preferences
    var getrequest = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";
    getrequest += location;
    getrequest += "&term=" + searchInput;
    getrequest += "&limit=" + 5;
    getrequest += "&open_now=" + open;
    getrequest += "&radius=" + distance;
    getrequest += "&price=" + price;
    getrequest += "&categories=" + "restaurants";


    console.log(getrequest)
    var settings = {
        "url": getrequest,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer ybuYzx8pLB4S18TRtSxPvkM-eI0cDT1p_J2d9aXgoQlaeobKI8BB_Oq-bqdA__xjqBsts3aC0JXgg0nZE-hfBGpXnjvFKirEDt2ZqLgWVU8fjfI8_3qFPLBB5r4dX3Yx"
        },
    };

    count += 1
    $.ajax(settings).done(function (response) {
        console.log(response);
        parse(response, count);
    });

}

//Parses through data and updates page with resturant information
function parse(data, index) {
    if (data == undefined) return;

    //Store all business data in arrays
    var name = [];
    var imgUrl = [];
    var url = [];
    var address = [];
    var rating = [];
    var price = [];
    var distance = [];
    var restLat = [];
    var restLng = [];
    var userLat = data.region.center.latitude;
    var userLng = data.region.center.longitude;
    var busCount = (data.businesses.length);


    for (var i = 0; i < busCount; i++) {
        name.push(data.businesses[i].name);
        imgUrl.push(data.businesses[i].image_url);
        if (imgUrl[i] == undefined) imgUrl[i] = "images/favicon.png"

        url.push(data.businesses[i].url);

        if (data.businesses[i].location.display_address[0] == undefined) var a1 = "";
        else var a1 = data.businesses[i].location.display_address[0];
        if (data.businesses[i].location.display_address[1] == undefined) var a2 = "";
        else var a2 = data.businesses[i].location.display_address[1];
        address.push(a1 + " " + a2);

        if (data.businesses[i].distance == undefined) distance.push("N/A");
        else distance.push((data.businesses[i].distance / 1609).toFixed(2));


        if (data.businesses[i].price == undefined) price.push("N/A")
        else price.push(data.businesses[i].price);

        if (data.businesses[i].rating == undefined) rating.push("N/A")
        else rating.push(data.businesses[i].rating);


        restLat.push(data.businesses[i].coordinates.latitude);
        restLng.push(data.businesses[i].coordinates.longitude);
    }


    //Keeps track of which business to display
    if (index < 0) {
        index = busCount - 1;
        count = busCount - 1;
    } else if (index >= busCount) {
        index = 0;
        count = 0;
    }

    //If no restaurants found
    if (name[index] == undefined) {
        document.getElementById("restTitle").innerHTML = "<strong>" + "No Restaurants found :((" + "</strong>";
        document.getElementById("address").innerHTML = "Try changing your search preferences or search query!";
        document.getElementById("navButtons").innerHTML = "";
        document.getElementById("restImage").src = "images/favicon.png";
        document.getElementById("details").innerHTML = "";
        myMap(undefined, undefined, userLat, userLng);
        return;
    }

    //Update page with business information
    document.getElementById("restTitle").innerHTML = "<strong><a href=" + url[index] + " target='_blank'>" + name[index] + "</a></strong>";
    document.getElementById("navButtons").innerHTML = (index + 1) + " out of " + busCount + " found";
    document.getElementById("restImage").src = imgUrl[index];
    document.getElementById("address").innerHTML = "<a href =http://maps.google.com/maps?daddr=" + address[index].split(" ").join("+") + " target='_blank'>" + address[index] + "</a>";
    document.getElementById("details").innerHTML = ("Rating: " + rating[index] + "<br>Price: " + price[index] +
        "<br>Distance: " + distance[index] + " Miles Away");
    myMap(restLat[index], restLng[index], userLat, userLng);
}
