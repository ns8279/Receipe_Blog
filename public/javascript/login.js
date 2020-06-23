async function signupFormHandler (event) {
    event.preventDefault();

    const username = document.querySelector('#InputUsername').value.trim();
    const email = document.querySelector('#InputEmail').value.trim();
    const password = document.querySelector('#InputPassword').value.trim();

    if(username && email && password ) {
        const response = await fetch ('/api/users', {
            method: 'post',

            body: JSON.stringify({
                username,
                email,
                password
            }),

            headers: { 'Content-Type': 'application/json'}
        })
        //adding error handler
        if(response.ok) {
            console.log('Success');
            document.location.replace('/');
        } else {
            alert (response.statusText);
        }
        
    }
}

async function loginFormHandler (event) {
    event.preventDefault();

    const email = document.querySelector('#InputEmail1').value.trim();
    const password = document.querySelector('#InputPassword1').value.trim();

    if( email && password ) {
        const response = await fetch ('/api/users/login', {
            method: 'post',

            body: JSON.stringify({
                email,
                password
            }),

            headers: { 'Content-Type': 'application/json'}
        })
        //adding error handler
        if(response.ok) {
            document.location.replace('/');
        } else {
            alert (response.statusText);
        }
        
    }
}

document.querySelector('.signup').addEventListener('submit', signupFormHandler);
document.querySelector('.login').addEventListener('click', loginFormHandler);