async function deleteFormHandler(event) {
    event.preventDefault();
    

    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];
 
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
        
        body: JSON.stringify({
            recipe_id: id
    
        }),

        headers: {
            'Content-Type': 'application/JSON'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    }
    else{
        alert(response.statusText);
    }

  }
  
  document.querySelector('.delete-recipe-btn').addEventListener('click', deleteFormHandler);