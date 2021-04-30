var modal = document.getElementById('myModal');
var loginModal = document.getElementById('loginModal');
var registerModal = document.getElementById('registerModal');
var accountLi = document.getElementById('accountLi');
var logoutLi = document.getElementById('logoutLi');
// Get the button that opens the modal
var btnAccount = document.getElementById('account');

var btnLogin = document.getElementById('openLoginModal');
var btnRegister = document.getElementById('openRegisterModal');

// Get the <span> element that closes the modal
var spanLogin = document.getElementById('closeLogin');
var spanRegister = document.getElementById('closeRegister');
const url = 'https://jsonplaceholder.typicode.com/posts';
const showListElement = document.getElementById('show-list');

const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');

btnAccount.onclick = function () {
  registerModal.style.display = 'none';
  loginModal.style.display = 'block';
};
// When the user clicks the button, open the modal
btnLogin.onclick = function () {
  registerModal.style.display = 'none';
  loginModal.style.display = 'block';
};
btnRegister.onclick = function () {
  loginModal.style.display = 'none';
  registerModal.style.display = 'block';
};

// When the user clicks on <spanLogin> (x), close the modal
spanLogin.onclick = function () {
  loginModal.style.display = 'none';
};
spanRegister.onclick = function () {
  registerModal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
  if (event.target == loginModal) {
    loginModal.style.display = 'none';
  }
  if (event.target == registerModal) {
    registerModal.style.display = 'none';
  }
};

let output = '';

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    [0, 1, 2, 3, 5, 7, 8, 9].forEach((element) => {
      const { title, body } = res[element];
      output += `<li class="btmspace-30">
      <article class="service largeicon">
        <i class="icon nobg circle fa fa-ra"></i>
        <h6 class="heading"><a href="#">${title}</a></h6>
        <p>
          ${body.slice(0, 100)}
        </p>
      </article>
    </li>`;
      showListElement.innerHTML = output;
    });
  });

// Login
// POST
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username: loginUsernameInput.value,
  //       password: loginPasswordInput.value,
  //     }),
  //   });
  console.log(loginUsernameInput.value, loginPasswordInput.value);
  if (!!loginUsernameInput && !!loginPasswordInput) {
    console.log('username and password saved!');
    const tokenLogin = JSON.stringify({
      id: '123',
      username: loginUsernameInput.value,
    });
    sessionStorage.setItem('tokenLogin', tokenLogin);

    registerModal.style.display = 'none';
    loginModal.style.display = 'none';
    accountLi.innerHTML = `<a title="Account" href="#"
                ><i class="far fa-user"></i>Welcome, ${loginUsernameInput.value}</a
              >`;
    logoutLi.style.display = 'inline-block';
    loginUsernameInput.value = '';
    loginPasswordInput.value = '';
  }
});

(function checkIfUserIsAuth() {
  let tokenLogin = sessionStorage.getItem('tokenLogin');
  logoutLi.style.display = 'none';
  if (tokenLogin) {
    tokenLogin = JSON.parse(tokenLogin);
    console.log(tokenLogin);
    if (tokenLogin && tokenLogin.username) {
      accountLi.innerHTML = `<a title="Account" href="#"
                ><i class="far fa-user"></i>Welcome, ${tokenLogin.username}</a
              >`;
      logoutLi.style.display = 'inline-block';
    }
  }
})();

function logout() {
  sessionStorage.clear();
  logoutLi.style.display = 'none';
  accountLi.innerHTML = `<a title="Account" href="#" id="openLoginModal"
  ><i class="far fa-user"></i> Account</a
>`;
  location.reload();
}
