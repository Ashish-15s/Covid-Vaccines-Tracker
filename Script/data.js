const DATA_URL = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/";
const MASTER_DATA_URL = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv";
var allData = [];
let lastDataAvaible = [];
let secondlastData = []


async function loadVariables(){
    allData = await GetAllData();
    lastDataAvaible = await GetLastData();
    secondlastData = await getSecondLastData();
}

async function GetAllData(){
    const {data} = await axios.get(MASTER_DATA_URL);
    return data.split("\n");
}

async function GetCountryData(country_name){
    return allData.filter(word => word.split(',')[0] == country_name.toString().replaceAll("%20", " "));
}

function GetCountriesLastData(){
  //DELATE "NON COUNTRIES" FROM LASTDATAAVAIBLE
    var query =  lastDataAvaible.filter(word => word.split(',')[0] != "World" 
    && word.split(',')[0] != "Europe"
    && word.split(',')[0] != "Asia"
    && word.split(',')[0] != "North America"
    && word.split(',')[0] != "Africa"
    && word.split(',')[0] != "South America"
    && word.split(',')[0] != "Australia"
    && word.split(',')[0] != "High income"
    && word.split(',')[0] != "Upper middle income"
    && word.split(',')[0] != "Lower middle income"
    && word.split(',')[0] != "European Union")
    return query;
  }
  
async function GetWorldLastData(){
    var query =  allData.filter(word => word.split(',')[0] == "World")
    return query[query.length - 1].split(',');
  }

async function GetLastData(){
    var alldata = [];
    var lastadata = [];
    const {data} = await axios.get(MASTER_DATA_URL);
    let lines = data.split('\n');
    for (let i = 1; i < lines.length; i++) {
      alldata.push(lines[i].toString().split(','));
    }
    for (let i = 0; i < alldata.length - 1; i++) {
      if(alldata[i][1] != alldata[i + 1][1])
      {
        lastadata.push(alldata[i].toString());
      }
    }
    return lastadata;
}

async function getSecondLastData(){
    var alldata = [];
    var secondlastdata = [];
    const {data} = await axios.get(MASTER_DATA_URL);
    let lines = data.split('\n');
    for (let i = 1; i < lines.length; i++) {
      alldata.push(lines[i].toString().split(','));
    }
    for (let i = 0; i < alldata.length - 1; i++) {
      if(alldata[i][1] != alldata[i + 1][1] && alldata[i][1] == alldata[i - 1][1])
      {
        secondlastdata.push(alldata[i-1].toString());
      }else if(alldata[i][1] != alldata[i + 1][1] && alldata[i][1] != alldata[i - 1][1]){
        secondlastdata.push(alldata[i].toString());
      }
    }
    return secondlastdata;
  }

function GetContinentsData(){
    var continents = []
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Europe").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Asia").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "North America").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Africa").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "South America").toString());
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Australia").toString());
    return continents;
  }

  async function GetCountriesByIncome(){
    var incomeData = []
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "High income"));
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Upper middle income"));
    continents.push(lastDataAvaible.filter(word => word.split(',')[0] == "Low middle income"));
    return incomeData;
  }

  function formatNumberWithCommas(number) {
    return parseInt(number).toLocaleString();
  }