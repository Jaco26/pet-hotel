$(document).ready(function(){
    console.log('in jQ');
    // getAppInfo()
    
    $('#registerBtn').on('click', function(e){

        e.preventDefault();
        packageOwner();
    }); // END registrationBtn onclick

    
}); // END document.ready

// package owner info
function packageOwner(){
    let owner = {
        first_name: $('#firstNameIn').val(),
        last_name: $('#lastNameIn').val(),
    }
    sendOwner(owner);
}


// POST owner info
function sendOwner(owner) {
    console.log('in sendOwner');
    
    $.ajax({
        type: 'POST',
        url: '/pets',
        data: owner
    }).done(function(response) {
        console.log(response);
        // getInfo()
    }).fail(function(error) {
        console.log(error);
    }); // END ajax POST
}; // END sendOwner