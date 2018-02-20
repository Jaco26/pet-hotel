$(document).ready(function(){
    console.log('in jQ');
    getOwners();
    getAllPets();

    $('#registerBtn').on('click', function(e){
        e.preventDefault();
        packageOwner();
    }); // END registrationBtn onclick

    $('#addPetBtn').on('click', function(e){
        e.preventDefault();
        packagePet();
    }) // END addPetBtn onclick

    $('#pet-display').on('click', '.deleteBtn', function(){
        let id = $(this).data('id');
        deleteInfo(id);
    }); // EMD deleteBtn onclick

    $('#pet-display').on('click', '.updateBtn', updateButtonClicked);
    $('#pet-display').on('click', '.goBtn', packageEdit);

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


function packagePet(){
    let pet={
        owner_id: $('#ownerSelect').val(),
        name: $('#petNameIn').val(),
        color: $('#colorIn').val(),
        breed: $('#breedIn').val()
    }
    sendPet(pet);
}

function sendPet(newPet){
    $.ajax({
        type:'POST',
        url:'/pet_hotel/add',
        data: newPet
    }).done(function(response){
        //get all pets
        getAllPets();
        console.log(response);
    }).fail(function(error){
        console.log(error);
    }); //END ajax POST /add
}


function getOwners(){
    $.ajax({
        type: 'GET',
        url: '/pet_hotel/owners',
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
        stringToAppend += `<option value="${owner.id}">${owner.first_name} ${owner.last_name}</option>`
    }
    $('#ownerSelect').append(stringToAppend);
}


function displayInfo(petInfo) {
    $('#pet-display').empty();
    let stringToAppend;
    for (let i=0; i<petInfo.length; i++){
        let pet = petInfo[i];
        stringToAppend += `<tr><td>${pet.first_name} ${pet.last_name}</td>
        <td><div class="column${pet.id}">${pet.name}</div><input id="name${pet.id}" class="hiddenColumn${pet.id} hidden" type="text" value="${pet.name}" data-id="${pet.id}"></td>
        <td><div class="column${pet.id}">${pet.breed}</div><input id="breed${pet.id}" class="hiddenColumn${pet.id} hidden" type="text" value="${pet.breed}" data-id="${pet.id}"></td>
        <td><div class="column${pet.id}">${pet.color}</div><input id="color${pet.id}" class="hiddenColumn${pet.id} hidden" type="text" value="${pet.color}" data-id="${pet.id}"></td>
        <td><div class="column${pet.id}"><button data-id="${pet.id}" class="updateBtn">Update</button></div><button class="hiddenColumn${pet.id} hidden goBtn" data-id="${pet.id}">Go</button></td>
        <td><button data-id="${pet.id}" class="deleteBtn">Delete</button></td>
        <td><div class="column${pet.id}"><button data-id="${pet.id}" class="checkInBtn">Check In</button></div>
        <button data-id="${pet.id}" class="checkOutBtn hidden">Check Out</button></td></tr>`;
    }
    $('#pet-display').append(stringToAppend);
}; // END displayInfo

function updateButtonClicked(){
    let id = $(this).data('id');
    $(`.column${id}`).addClass("hidden");
    $(`.hiddenColumn${id}`).removeClass("hidden");
}

function packageEdit(){
    let id = $(this).data('id');
    let editPet = {
        name: $(`#name${id}`).val(),
        breed: $(`#breed${id}`).val(),
        color: $(`#color${id}`).val()
    }
    console.log($(this));
    
    goButtonClicked(editPet, id);
}

function goButtonClicked(editPet, id){
    console.log('go button clicked!');
    console.log('edit pet:', editPet);

    $.ajax ({
        type: 'PUT',
        url: `/pet_hotel/${id}`,
        data: editPet
    }).done (function(response){
        console.log(response);
        getAllPets();
    }).fail(function(error){
        console.log(error);    
    })
}

function getAllPets(){
    $.ajax({
        type: 'GET',
        url: '/pet_hotel/pets',
    }).done(function(response) {
        console.log(response);

        displayInfo(response);

    }).fail(function(error) {
        console.log(error);
    }); // END ajax GET
};


function deleteInfo(id){
  $.ajax ({
    type : 'DELETE',
    url :`/pet_hotel/delete/${id}`,
  }).done (function( response ){
    console.log( 'delete', response );
    getAllPets();
  })// end done
  .fail (function(){
    console.log( 'error');
  }) //end fail
}
