// for onclick search btn
let searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', getCount);

// this for hitting the enter btn or using search btn
const textbox = document.getElementById("mySearch");
textbox.addEventListener("keypress", function onEvent(event){
    if(event.key ==="Enter"){
        document.getElementById("search-btn").click();
    }
});


let currentPage = "";

function homePage() {
    if (currentPage != "Home") {
        currentPage = "Home";
        displayNone();

        document.getElementById("Home").style.backgroundColor = "#E6E6E6";
        document.getElementById("Home").style.color = "white";

        document.getElementById("intro").style.display = "inline";
    }
}

function mapPage() {
    if (currentPage != "Map") {
        currentPage = "Map";
        displayNone();
        document.getElementById("Map").style.backgroundColor = "#E6E6E6";
        document.getElementById("Map").style.color = "white";
        
        document.getElementById("mapSection").style.display = "inline";
        getMap();
    
    }
}

function displayNone() {
    document.getElementById("Home").style.backgroundColor = "transparent";
    document.getElementById("Map").style.backgroundColor = "transparent";
    document.getElementById("Map").style.color = "#121212";
    document.getElementById("Home").style.color = "#121212";

    document.getElementById("intro").style.display = "none";
    document.getElementById("mapSection").style.display = "none";


}

window.onload = function() {
    homePage();

}

function getCount() {

    let input = document.getElementById('mySearch').value.trim();
    const fetchPromise = fetch(`https://corona.lmao.ninja/v2/countries/${input}`, {
        headers: {
            "Accept": "text/json",
        },
    });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => {      
        
            document.getElementById("country").innerHTML = data.country.toString();
            // document.getElementById("last-updated").innerHTML = data.message;
            document.getElementById("active").innerHTML = data.active.toString();
            document.getElementById("deaths").innerHTML = data.deaths.toString();
            document.getElementById("critical").innerHTML = data.critical.toString();
            document.getElementById("cases").innerHTML = data.cases.toString();
            document.getElementById("recovered").innerHTML = data.recovered.toString();
            document.getElementById("tests").innerHTML = data.tests.toString();
            document.getElementById("today").innerHTML = data.todayCases.toString();
            document.getElementById("today-recovered").innerHTML = data.todayRecovered.toString();
       

        // document.getElementById("flag").src = data.countryInfo.flag;

    })
}




function getMap(){
    let values = {}; //will hold data of all countries that are suitable in svgMaps
    const fetchPromise = fetch(`https://corona.lmao.ninja/v2/countries`, {
        headers: {
            "Accept": "text/json",
        },
    });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((mapData) => {
        // map the data 
        mapData.forEach((countryData) => {
            let temp = {}; //temp obj to hold data for country
            temp.total = countryData.cases;
            temp.deaths = countryData.deaths;
            temp.recovered = countryData.recovered;
            temp.active = countryData.active;
            values[countryData.countryInfo.iso2] = temp;
        });

         //Now rendering the map
    new svgMap({

        colorMax: '#2d4d1e',
        colorMin: '#bdf0a6',
        colorNoData: '#ffff',
        
      targetElementID: "svgMap",
      data: {
        data: {
          total: {
            name: "Total Cases",
            format: "{0}",
            thousandSeparator: ",",
          },
          deaths: {
            name: "Total Deaths",
            format: "{0}",
            thousandSeparator: ",",
          },
          recovered: {
            name: "Total Recovered",
            format: "{0}",
            thousandSeparator: ",",
          },
          active: {
            name: "Active Cases",
            format: "{0}",
            thousandSeparator: ",",
          },
        },
        applyData: "deaths",
        values: values,
      },
    });
  });
}

