async function createRecipe (event) {
    event.preventDefault();

    const response = await fetch ('/api/recipes', {
        method: 'post',

        body: JSON.stringify({
            recipe_name: $('#recipe_name').val(),
            prep_time:$('#prep_time').val(),
            cook_time: $('#cook_time').val(),
            recipe_method: $('#recipe_method').val()
        }),

        headers: { 'Content-Type': 'application/json'}
    }).then(() => {
        $('#recipe-creation-modal').modal('toggle')
    });
}

document.getElementById('create-recipe').addEventListener('click', createRecipe);
