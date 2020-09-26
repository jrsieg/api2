const baseURL = 'http://api.airvisual.com/v2/nearest_city?key=026d02ab-d420-4cdc-bb46-af2985bb1705';
//setting API endpoint to a variable

const key = '026d02ab-d420-4cdc-bb46-af2985bb1705'; // authorizes access to API endpoint

let pollution = document.querySelector("#pollutionMeter");
let city = document.querySelector("#currentCity");
let safety = document.querySelector("#safety");
let icon = document.querySelector("#weatherIcon");


const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener('click', fetchResults);


// submitBtn.addEventListener('click', fetchResults);


function fetchResults(){

 

  while (pollution.firstChild){
    pollution.removeChild(pollution.firstChild)
  }

    fetch(baseURL) 

      .then(res => res.json())
      .then(data => {
        console.log(data.data)
        appendPollution(data)
        move(data);
      });

  while (city.firstChild){
    city.removeChild(city.firstChild)
  }

    fetch(baseURL) 

      .then(res => res.json())
      .then(data => {
        appendCity(data)
      });

      
  while (safety.firstChild){
    safety.removeChild(city.firstChild)
  }

  fetch(baseURL) 

  .then(res => res.json())
  .then(data => {
    if(data.data.current.pollution.aqius < 100){
      appendSafe();
    }
    else {
      appendDanger();
    }
  });



};

function appendPollution(data){  
  let listPol = document.createElement('li'); 
  listPol.innerText =  'The Air Quality Index is '  + data.data.current.pollution.aqius + ' today.'; 
  pollution.appendChild(listPol); 
  
}

function appendCity(data){  
  let listCity = document.createElement('li'); 
  listCity.innerText =   'This reading is based in ' + data.data.city + '.'; 
  pollution.appendChild(listCity); 
  
}

function appendSafe(){  
  let listSafe = document.createElement('li'); 
  listSafe.innerText =  'Air quality is safe today. Have fun!'; 
  safety.appendChild(listSafe); 
  
}

function appendDanger(){  
  let listDanger = document.createElement('li'); 
  listDanger.innerText =  'Air quality is poor today. Stay inside!'; 
  danger.appendChild(listDanger); 
  
}

var i = 0;
function move(data) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = data.data.current.pollution.aqius;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 500) {
        clearInterval(id);
        i = 0;
      } else{
        //width++;
        elem.style.width = width/5 + "%";
        elem.innerHTML = width + "AQI";
      }
    }
  }
}
 



