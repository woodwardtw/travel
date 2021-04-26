const sheetUrl = 'https://spreadsheets.google.com/feeds/list/10YBAyiuJQCqSv4U-uHGGsKvEThszd_xPBo2w9zeEkfY/2/public/values?alt=json'


fetch(sheetUrl).then(function(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {
      const date = json.feed.updated.$t
      setUpdateDate(date)
      // now that you've got the data let's do something with it per item
      if (json.feed.entry) {
        const data = json.feed.entry;
        let countries = [];//1
        let cancelDate = [];//2
        let openClose = [];//3
        let flight = [];
        let stateAdv = [];//4
        let cdc = [];//5
        let usEnter = [];//7
        let fEnter = [];//8
        let quarantine = [];//9
        let covidTest = [];//10
        let proof = [];//11
        let usVisa = [];//12
        let fVisa = [];//13
        let perVac = [];//14
        let fifteen = [];
        let row1 = [];
        let holder = [];
        data.forEach(function(element,index){
          //console.log(element);//
              countries.push(element.gsx$one.$t);
              cancelDate.push(element.gsx$two.$t);
              openClose.push(element.gsx$three.$t);
              flight.push(element.gsx$six.$t);
              usEnter.push(element.gsx$seven.$t);
              fEnter.push(element.gsx$eight.$t);
              quarantine.push(element.gsx$nine.$t);
              covidTest.push(element.gsx$ten.$t);
              proof.push(element.gsx$eleven.$t);
              usVisa.push(element.gsx$twelve.$t);
              fVisa.push(element.gsx$thirteen.$t);
              stateAdv.push(element.gsx$four.$t);
              cdc.push(element.gsx$five.$t);
              perVac.push(element.gsx$fourteen.$t);
              fifteen.push(element.gsx$fifteen.$t);
        })
        writeTheData(countries)//1
        writeTheData(cancelDate)//2
        writeTheData(openClose)//3
        writeTheData(stateAdv)//4
        writeTheData(cdc)//5
        writeTheData(flight)//6
        writeTheData(usEnter)//7
        writeTheData(fEnter)//8
        writeTheData(quarantine)//9
        writeTheData(covidTest)//10
        writeTheData(proof)//11
        writeTheData(usVisa)//12
        writeTheData(fVisa) //13       
        writeTheData(perVac)//14
        writeTheData(fifteen)//15
      }
    });
  } 
  cellHeaders('travel-updates')
});

function writeTheData(array){
        const name = cleanseName(array[0]);
  //const col = document.querySelector('#travel-updates')
  array.forEach(function(element, index) {
              // console.log(index)
              const numbers = ['1','2','3','4', 1, 2, 3, 4]; //check for numbers and deal with text issue in lzy way
              const regions = ['latin-america','africa', 'asia', 'europe','middle-east'];//check for regions
               if (index === 0){
                 var wrapper = 'th';//shift for headers
               } else {
                 var wrapper = 'td';//regular tds
               }
               let destination = document.getElementById('row-'+index);//send to pre-created rows
               let cleanName = cleanseName(element);//clean up name
               if(regions.includes(cleanName)){
                  destination.classList.add(cleanName);//if in region add it to row
               }
               element = wordsToImages(element);
               if(numbers.includes(element) && name == 'us-dept-of-state-advisory'){
                //element = `<span class="number">${element}</span>`
                let warning = usTravelWarning(element);
                element = `<div aria-labelledby="tip${index}" class="tooltip number">${element}
    <span class="tooltiptext" id="tip${index}">${warning}</span></div>`;//deal with tooltips
               }
              if(numbers.includes(element) && name == 'us-cdc-level'){
                //element = `<span class="number">${element}</span>`
                let warning = covidTravelWarning(element);
                element = `<div aria-labelledby="tip${index}" class="tooltip number">${element}
    <span class="tooltiptext" id="tip${index}">${warning}</span></div>`;//deal with tooltips 
               }
               if(name === 'more-covid-specific-country-information' && index != 0){
                  element = urlFix(element)
               }
               let html = destination.innerHTML
               destination.innerHTML = html + `<${wrapper} class="${name}"><div><span>${element}</span></div></${wrapper}>`;//set cell content
             })
  }

  function wordsToImages(element){
      const word = element.split(" ").join("")
      if (word.toLowerCase() === 'yes'){
        return element = '<img class="icon" src="imgs/yes.svg" alt="Yes.">';//change to icons
      }
      if (word.toLowerCase() === 'no'){
        return element = '<img class="icon" src="imgs/no_oct.svg" alt="No.">';//change to icons
      }
      if (word.toLowerCase() === 'depends'){
        return element = '<img class="icon" src="imgs/depends_tri.svg" alt="Depends.">';//change to icons
      } else {
        return element;
      }
  }

function setUpdateDate(date){
  const dateBox = document.getElementById('date')
  date = date.slice(0, 10);
  dateBox.innerHTML = date;
}

function urlFix(element){
  const data = element.split(';')
  let links = ''
  if (data.length >1){
      data.forEach(function(element,index){ 
        links = links + urlMaker(element) 
      })
    return links;
  }
  if (element.split(',').length > 1){
    return urlMaker(element);
  } 
  else {
    console.log(element.split(',').length > 1)
    return `<a href="${element}">${element}</a>`;
  }
}

//make URLs
function urlMaker(string){
  const urlArray = string.split(',')
  const name = cleanLeadingSpace(urlArray[0]);
  const url = cleanLeadingSpace(urlArray[1]);
  return `<a href="${url}">${name}</a>`
}


//clean up leading space
function cleanLeadingSpace(string){
  if(string.indexOf(' ') == 0){
    string = string.replace(' ','')
  }
  return string;
}
//BUTTONS and tooltips 


function usTravelWarning(number){
  if (number == 1){
    return 'Level 1 - Exercise Normal Precautions: This is the lowest advisory level for safety and security risk. There is some risk in any international travel. Conditions in other countries may differ from those in the United States and may change at any time.'
  } 
  if (number == 2){
    return 'Level 2 - Exercise Increased Caution: Be aware of heightened risks to safety and security. The Department of State provides additional advice for travelers in these areas in the Travel Advisory. Conditions in any country may change at any time.'
  }
   if (number == 3){
    return 'Level 3 - Reconsider Travel: Avoid travel due to serious risks to safety and security. The Department of State provides additional advice for travelers in these areas in the Travel Advisory. Conditions in any country may change at any time.'
  }
   if (number == 4){
    return 'Level 4 – Do Not Travel: This is the highest advisory level due to greater likelihood of life-threatening risks. During an emergency, the U.S. government may have very limited ability to provide assistance. The Department of State advises that U.S. citizens not travel to the country or to leave as soon as it is safe to do so. The Department of State provides additional advice for travelers in these areas in the Travel Advisory. Conditions in any country may change at any time.'
  }

}

function covidTravelWarning(number){
    if (number == 1){
      return 'Level 1: COVID-19 Low'
    } 
    if (number == 2){
      return 'Level 2: COVID-19 Moderate'
    }
     if (number == 3){
      return 'Level 3: COVID-19 High'
    }
     if (number == 4){
      return 'Level 4: COVID-19 Very High'
    }
    if (number == 'Unknown'){
      return 'Level Unknown: COVID-19 Unknown'
    }
}


//from https://gist.github.com/spyesx/561b1d65d4afb595f295
function cleanseName(str)
{
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñçěščřžýúůďťň·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuuncescrzyuudtn------";

  for (var i=0, l=from.length ; i<l ; i++)
  {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace('.', '-') // replace a dot by a dash 
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by a dash
    .replace(/-+/g, '-') // collapse dashes
    .replace( /\//g, '' ); // collapse all forward-slashes

  return str;
}

function buttonsActivate(){
  let buttons = document.querySelectorAll('.hider')
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if(button.id == 'show-all'){
        showAll()
        activeButton(button)
      } else {
        hideShow(button.id)
        activeButton(button)
      }
    });
  });
}

function activeButton(button){
   Array.from(document.querySelectorAll('.active')).forEach(function(el) { 
      el.classList.remove('active');
  });
    button.classList.add('active')
}

function hideShow(id){
  //from https://stackoverflow.com/a/61773683/3390935
    showAll();
    let rows = document.querySelectorAll('tr')
    rows.forEach((row) => {      
      if(row.id != 'row-0'){
        if(row.classList.contains(id) === false){
        row.classList.add('hidden')
       }
      }
      
  });
}

function showAll(){
    Array.from(document.querySelectorAll('.hidden')).forEach(function(el) { 
      el.classList.remove('hidden');
  });
}

buttonsActivate();
