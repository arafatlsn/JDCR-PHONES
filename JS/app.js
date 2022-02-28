const catchApi = () => {

  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', function(){

    const searchField = document.getElementById('searchField');

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`;

    fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))

  })

  
}

catchApi()