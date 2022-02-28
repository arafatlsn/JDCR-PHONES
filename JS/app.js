const catchApi = () => {

  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', function(){

    const inputField = document.getElementById('inputField');

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputField.value}`;

    fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))

  })

  
}

catchApi()