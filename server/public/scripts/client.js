$(document).ready(function(){
    console.log('in jQ');
    getOwners();
    
    $('#registerBtn').on('click', function(e){
        e.preventDefault();
        packageOwner();
    }); // END registrationBtn onclick
    /*
    $('#addPetButton').on('click', function(e){
        e.preventDefault();
        sendPet();
    }) // END addPetBtn onclick
    */
    
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
        url: '/pet_hotel',
        data: owner
    }).done(function(response) {
        console.log(response);
        getOwners();
    }).fail(function(error) {
        console.log(error);
    }); // END ajax POST
}; // END sendOwner

/*
function packagePet(){
    let pet={
        
    }
}

function sendPet(){
    $.ajax({
        type:'POST',
        url:'/pet_hotel/add',

    })
}
*/

function getOwners(){
    $.ajax({
        type: 'GET',
        url: '/pet_hotel',
    }).done(function(response) {
        console.log(response);
        appendOwnersToSelect(response);
    }).fail(function(error) {
        console.log(error);
    }); // END ajax GET
}

function appendOwnersToSelect(listOfOwners){
    $('#ownerSelect').empty();
    let stringToAppend;
    for (owner of listOfOwners){
        stringToAppend += `<option>${owner.first_name} ${owner.last_name}</option>`
    }
    $('#ownerSelect').append(stringToAppend);
}