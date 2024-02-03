(function() {
    $.ajaxSetup({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    });
})()