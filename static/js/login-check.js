(function loginCheck() {
    var a = sessionStorage.getItem('token');
    if (!a) {
        window.location.href = './page-login.html';
    }
})()