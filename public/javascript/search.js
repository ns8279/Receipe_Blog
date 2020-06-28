async function searchFormHandler(event) {
    event.preventDefault();
  
  // -- declare search
  // -- reference from main.handlebar:  id="search-input" name="search-text"
  const search = document.querySelector('input[name="search-recipe"]').value;
    // console.log(search);
  
  if (search) {
  const response = await fetch( `/search/${search}` , {
          method: 'get',
          headers: { 'Content-Type': 'application/json' }
    }); 
  
      if (response.ok) {
          document.location.replace(`/search/${search}`);
      } else {
          alert(response.statusText);
      }
    }
  }
  
  
  // document.querySelector('.search-form').addEventListener('submit', searchFormHandler);
  document.querySelector('#search-form').addEventListener('submit', searchFormHandler);