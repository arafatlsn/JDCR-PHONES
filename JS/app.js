const catchApi = () => {

  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', function(){

    const searchField = document.getElementById('searchField');

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`;

    fetch(url)
  .then(res => res.json())
  .then(data => showPhoneFunc(data))

  })

  
}

const showPhoneFunc = phones => {

  console.log(phones)
  const showPhoneSection = document.getElementById('showPhoneSection');

  showPhoneSection.innerHTML = '';

  const emptyArr = [];

      // GET ALL PHONE OBJECT 
  const elPhones = phones.data.forEach(phone => {
    // console.log(phone);
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

    // APPEND SEARCH PHONES 
    showPhoneSection.appendChild(makeCard);
  })

  const catchDetailApi = () => {

    console.log(phones.data)
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
      console.log(details)
      console.log(details.data)

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
              <p>${details.data.releaseDate}</p>
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
                  <h6 class="border"> Bluetooth: ${details.data.others.Bluetooth}</h6>
                  <h6 class="border"> GPS: ${details.data.others.GPS}</h6>
                  <h6 class="border"> NFC: ${details.data.others.NFC}</h6>
                  <h6 class="border"> Radio: ${details.data.others.Radio}</h6>
                  <h6 class="border"> USB: ${details.data.others.USB}</h6>
                  <h6 class="border"> WLAN: ${details.data.others.WLAN}</h6>
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