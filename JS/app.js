const catchApi = () => {

  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', function(){

    const showPhoneSection = document.getElementById('showPhoneSection');
    showPhoneSection.innerHTML = '';

    const searchField = document.getElementById('searchField');
    const searchFieldValue = searchField.value.toLowerCase();
    console.log(searchFieldValue)

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`;

    fetch(url)
    .then(res => res.json())
    .then(data => getErrFunc(data.data.length));

    const searchResultDiv = document.getElementById('searchResultDiv');
    const searchResultDivNotFnd = document.getElementById('searchResultDivNotFnd');


    const getErrFunc = lengthNumber => {
      if(lengthNumber == 0){

        const loadMoreDiv = document.getElementById('loadMoreDiv').style.display = 'none';
        
        const makeDivSearchErr = document.createElement('div');
        makeDivSearchErr.innerHTML = `
        <h4 class="text-center py-2 mb-4 search_text" style="color: #d0342c; background-color: #d6d6d6">YOUR SEARCH '${searchField.value}' RESULT IS NOT FOUND</h4>
        `;

        searchResultDiv.innerHTML = '';
        searchResultDivNotFnd.innerHTML = '';
        searchResultDivNotFnd.appendChild(makeDivSearchErr);
      }
      else{
        const makeDivSearchFound = document.createElement('div');
        makeDivSearchFound.innerHTML = `
        <h4 class="text-center py-2 mb-4 search_text" style=" color: #3a3b3c;  background-color: #90ee90">YOUR SEARCH '${searchField.value}' RESULT IS ${lengthNumber}</h4>
        `;
        searchResultDivNotFnd.innerHTML = '';
        searchResultDiv.innerHTML = '';
        searchResultDiv.appendChild(makeDivSearchFound);
      }
    }

    fetch(url)
  .then(res => res.json())
  .then(data => showPhoneFunc(data))

  })

  
}

const showPhoneFunc = phones => {

  const showPhoneSection = document.getElementById('showPhoneSection');
  const loadMorePhonesParent = document.getElementById('loadMorePhonesParent');
  const loadMorePhones = document.getElementById('loadMorePhones');
  const loadMoreDiv = document.getElementById('loadMoreDiv');

  showPhoneSection.innerHTML = '';

  const emptyArr = [];
  let emptyString = '';

      // GET ALL PHONE OBJECT 
  const elPhones = phones.data.forEach(phone => {

    emptyArr.push(phone.phone_name);

    const makeCard = document.createElement('div');
    makeCard.innerHTML = `
        <div class="card" style="width: 245px; height: 405px; padding: 20px 30px 30px;">
          <h3 style="text-align: center; padding-bottom: 10px;">${phone.brand}</h3>
          <img src=${phone.image} class="card-img-top" alt="..." style="width: 117px; height: 180px; object-fit: contain; margin: auto;">
          <div class="card-body" style="height: 160;padding: 30px 0;">
            <h6 style="text-align: center;">${phone.phone_name}</h6>
            <p style="text-align: center; font-weight: 500;"><span>$</span><span>${(Math.random()*1000).toFixed(2)}</span></p>
            <div class="d-flex justify-content-center">
              <p style="color: #ED6908;"><i class="fa-solid fa-cart-arrow-down fs-5"></i></p>
              <p class="detailsButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" style="color: #0E9BC9"><i class="fa-solid fa-circle-info fs-5 mx-3"></i></p>
            </div>
          </div>
        </div>
    `;

    if(emptyArr.length <= 20){

      // loadMoreDiv.style.display = 'none';

      loadMorePhones.innerHTML = '';

      
      loadMoreDiv.style.display = 'none';

      // APPEND SEARCH PHONES 
      showPhoneSection.appendChild(makeCard);

    }

    if(emptyArr.length > 20){
      loadMoreDiv.style.display = 'block';

      const makeLoadButton = document.createElement('div');
      makeLoadButton.innerHTML = `
      <div class="w-50 mx-auto mt-5 mb-3">
        <button class="py-1 px-3 fs-5 fw-bold rounded border" style="color: rgb(255,69,0)">LOAD ALL PHONES<span class="ms-2"><i class="fa-solid fa-angle-down"></i></span></button>
      </div>
      `;

      // APPEND LOAD MORE PHONES 
      loadMoreDiv.innerHTML = '';
      loadMoreDiv.appendChild(makeLoadButton);
      loadMorePhones.appendChild(makeCard);
    }


    loadMoreDiv.addEventListener('click', function(){
      loadMorePhonesParent.style.display = 'block';

    })

    
  })

  const catchDetailApi = () => {

    const getAllSlugs = phones.data;
    const getSlug = getAllSlugs.forEach(singlePhone => {
      // console.log(singlePhone.slug)

      const catchAllDetailsButton = document.getElementsByClassName('detailsButton');
      for(const catchAllDetailsButtonMin of catchAllDetailsButton){
        // console.log(catchAllDetailsButtonMin)

        catchAllDetailsButtonMin.addEventListener('click', function(){
          const getTargetPhoneName = this.parentNode.parentNode.children[0].innerText;
          // console.log(getTargetPhoneName)
          const phonesDataEl = phones.data.forEach(phoneData => {
            // console.log(phoneData.phone_name)

            if(phoneData.phone_name === getTargetPhoneName){
              // console.log(phoneData.slug)

              const urlTwo = `https://openapi.programming-hero.com/api/phone/${phoneData.slug}`;
              
              fetch(urlTwo)
              .then(res => res.json())
              .then(data => showDetailsOnUi(data))
            }

          })

        })

      }


    })

    const showDetailsOnUi = details => {

      const showDetailsParent = document.getElementById('showDetailsParent');

      showDetailsParent.innerHTML = '';

      const makeDivForModal = document.createElement('div');
      makeDivForModal.classList.add('showDetailsParent');
      makeDivForModal.setAttribute('id', 'showModal')

      makeDivForModal.innerHTML = `
          <div id="showDetailsImage">
            <img src=${details.data.image}>
          </div>
          <div id="showDetailsText">
            <div class="border">
              <h3>${details.data.name}</h3>
              <p>${details.data.releaseDate ? details.data.releaseDate : 'DATA NOT FOUND'}</p>
            </div>
            <div class="border" style="display: grid; grid-template-columns: repeat(12, 1fr);">
              <div style="grid-column: 1 / 2;">
                <h5>Features</h5>
              </div>
              <div class="border" style="grid-column: 3 / -1;">
                <h5>
                  ${details.data.mainFeatures.chipSet+ ', ' + details.data.mainFeatures.displaySize+ ', ' + details.data.mainFeatures.memory}
                </h5>
            </div>
            </div>
            <div class="border" style="display: grid; grid-template-columns: repeat(12, 1fr);">
              <div style="grid-column: 1 / 2;">
                <h5>Others</h5>
              </div>
              <div class="border" style="grid-column: 3 / -1;">
                <div>
                  <h6 class="border"> Bluetooth: ${details.data.others ? details.data.others.Bluetooth : 'data not found'}</h6>
                  <h6 class="border"> GPS: ${details.data.others ? details.data.others.GPS : 'data not found'}</h6>
                  <h6 class="border"> NFC: ${details.data.others ? details.data.others.NFC : 'data not found'}</h6>
                  <h6 class="border"> Radio: ${details.data.others ? details.data.others.Radio : 'data not found'}</h6>
                  <h6 class="border"> USB: ${details.data.others ? details.data.others.USB : 'data not found'}</h6>
                  <h6 class="border"> WLAN: ${details.data.others ? details.data.others.WLAN : 'data not found'}</h6>
                </div>
            </div>
            </div>
            <div class="border" style="display: grid; grid-template-columns: repeat(12, 1fr);">
              <div style="grid-column: 1 / 2;">
                <h5>Sensor</h5>
              </div>
              <div class="border" style="grid-column: 3 / -1;">
                <h6 style="word-break: break-all">
                  ${details.data.mainFeatures.sensors}
                </h6>
            </div>
            </div>
          </div>
      `;

      showDetailsParent.appendChild(makeDivForModal);

    }


    
  };

  
catchDetailApi()

}


catchApi()