const sheetUrl = 'https://spreadsheets.google.com/feeds/list/10YBAyiuJQCqSv4U-uHGGsKvEThszd_xPBo2w9zeEkfY/2/public/values?alt=json'


fetch(sheetUrl).then(function(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {
      // now that you've got the data let's do something with it per item
      if (json.feed.entry) {
        const data = json.feed.entry;
        let countries = [];//
        let cancelDate = [];//
        let openClose = [];//
        let stateAdv = [];//
        let cdc = [];//
        let flight = [];//
        let usEnter = [];//
        let fEnter = [];//
        let quarantine = [];//
        let covidTest = [];//
        let proof = [];//
        let usVisa = [];//
        let fVisa = [];//
        let perVac = [];//
        let row1 = [];
        let holder = [];
        data.forEach(function(element,index){
          //console.log(element);//
              countries.push(element.gsx$one.$t);
              cancelDate.push(element.gsx$two.$t);
              openClose.push(element.gsx$three.$t);
              stateAdv.push(element.gsx$four.$t);
              cdc.push(element.gsx$five.$t);
              flight.push(element.gsx$six.$t);
              usEnter.push(element.gsx$seven.$t);
              fEnter.push(element.gsx$eight.$t);
              quarantine.push(element.gsx$nine.$t);
              covidTest.push(element.gsx$ten.$t);
              proof.push(element.gsx$eleven.$t);
              usVisa.push(element.gsx$twelve.$t);
              fVisa.push(element.gsx$thirteen.$t);
              perVac.push(element.gsx$fourteen.$t);
    
        })
        writeTheData(countries)
        writeTheData(cancelDate)
        writeTheData(openClose)
        writeTheData(stateAdv)
        writeTheData(cdc)
        writeTheData(flight)
        writeTheData(usEnter)
        writeTheData(fEnter)
        writeTheData(quarantine)
        writeTheData(covidTest)
        writeTheData(proof)
        writeTheData(usVisa)
        writeTheData(fVisa)        
        writeTheData(perVac)

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
              const numbers = ['1','2','3','4']
               if (index === 0){
                 var wrapper = 'th'
               } else {
                 var wrapper = 'td'
               }
               let destination = document.getElementById('row-'+index)
              // console.log('row-'+index)
               if (element.toLowerCase() === 'yes'){
                element = '<img class="yes" src="imgs/checkbox.svg" alt="Yes.">';
               }
               if (element.toLowerCase() === 'no'){
                element = '<img class="yes" src="imgs/no.svg" alt="No.">';
               }
               if(numbers.includes(element)){
                element = `<span class="number">${element}</span>`
               }

               let html = destination.innerHTML
               destination.innerHTML = html + `<${wrapper} class="${name}">${element}</${wrapper}>`;
             })
 
  }



function usTravelWarning(number){
  if (number === 1){
    return 'Level 1 - Exercise Normal Precautions: This is the lowest advisory level for safety and security risk. There is some risk in any international travel. Conditions in other countries may differ from those in the United States and may change at any time.'
  } 
  if (number === 2){
    return 'Level 2 - Exercise Increased Caution: Be aware of heightened risks to safety and security. The Department of State provides additional advice for travelers in these areas in the Travel Advisory. Conditions in any country may change at any time.'
  }
   if (number === 3){
    return 'Level 3 - Reconsider Travel: Avoid travel due to serious risks to safety and security. The Department of State provides additional advice for travelers in these areas in the Travel Advisory. Conditions in any country may change at any time.'
  }
   if (number === 4){
    return 'Level 4 – Do Not Travel: This is the highest advisory level due to greater likelihood of life-threatening risks. During an emergency, the U.S. government may have very limited ability to provide assistance. The Department of State advises that U.S. citizens not travel to the country or to leave as soon as it is safe to do so. The Department of State provides additional advice for travelers in these areas in the Travel Advisory. Conditions in any country may change at any time.'
  }

}

function covidTravelWarning(number){
    if (number === 1){
      return 'Level 1: COVID-19 Low'
    } 
    if (number === 2){
      return 'Level 2: COVID-19 Moderate'
    }
     if (number === 3){
      return 'Level 3: COVID-19 High'
    }
     if (number === 4){
      return 'Level 4: COVID-19 Very High'
    }
    if (number === 'Unknown'){
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