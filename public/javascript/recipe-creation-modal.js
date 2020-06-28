async function createRecipe (event) {
    event.preventDefault();

    const response = await fetch ('/api/recipes', {
        method: 'post',

        body: JSON.stringify({
            recipe_name: $('#recipe_name').val(),
            prep_time:$('#prep_time').val(),
            cook_time: $('#cook_time').val(),
            //recipe_method: $('#recipe_method').val(),
            recipe_method: $('textarea[name = "recipe-method"]').val(),
            items: $('textarea[name = "recipe-ingredient"]').val()

        }),

        headers: { 'Content-Type': 'application/json'}
    });
    // }).then(() => {
    //     $('#recipe-creation-modal').modal('toggle')
    // });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
       alert(response.statusText);
   }
}

document.getElementById('create-recipe').addEventListener('click', createRecipe);
