async function editFormHandler(event) {
    event.preventDefault();
    const recipe_name = document.querySelector('input[name="recipe-name"]').value.trim();
    const recipe_method = document.querySelector('input[name="recipe-method"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',

        body: JSON.stringify({ 
            recipe_name,    
            recipe_method
        }),

        header: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard');
        // res.redirect('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-recipe-form').addEventListener('submit', editFormHandler);