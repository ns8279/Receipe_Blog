async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="recipe-name"]').value.trim();
    const prepTime = document.querySelector('input[name="prep_time"]').value.trim();
    const cookTime = document.querySelector('input[name="cook_time"]').value.trim();
    const recipeMethod = document.querySelector('input[name="recipe_method"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            recipe_id: id,
            title,
            prepTime,
            cookTime,
            recipeMethod
        }),
        header: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-recipe-form').addEventListener('submit', editFormHandler);