var welcomeText = document.querySelector('h1');

var currentAccount = JSON.parse(localStorage.getItem('currentAccount'));

welcomeText.innerHTML = `Welcome ${currentAccount.name}`;

document.querySelector('button.btn').addEventListener('click', function () {
    localStorage.removeItem('currentAccount');
    window.open('../index.html', '_self');
});