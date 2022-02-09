const charactersAPI = new APIHandler();


// ----- MINIONS LIST
window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    let text = ""

    function showAllMinions() {
      charactersAPI
        .getFullList()
        .then(response => {
          response.data.forEach(minion => {
            text += `<div class="character-info">
              <div class="id">Id<span>${minion.id}</span></div>
              <div class="name">Character Name<span>${minion.name}</span></div>
              <div class="occupation">Character Occupation<span>${minion.occupation}</span></div>
              <div class="cartoon">Is a Cartoon?<span>${minion.cartoon}</span></div>
              <div class="weapon">Character Weapon<span>${minion.weapon}</span></div>
            </div>`
            document.querySelector('.characters-container').innerHTML = text
          })
        })
        .catch(err => console.log(err))
    }
    showAllMinions()
  });



  // -------- GET ONE MINION
  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const id = document.querySelector('.operation input').value
    let text = ""

    function showOneMinion(minionId) {
      charactersAPI
        .getOneRegister(minionId)
        .then(minion => {
          console.log(minion)
          text += `<div class="character-info">
              <div class="id">Id<span>${minion.data.id}</span></div>
              <div class="name">Character Name<span>${minion.data.name}</span></div>
              <div class="occupation">Character Occupation<span>${minion.data.occupation}</span></div>
              <div class="cartoon">Is a Cartoon?<span>${minion.data.cartoon}</span></div>
              <div class="weapon">Character Weapon<span>${minion.data.weapon}</span></div>
            </div>`
          document.querySelector('.characters-container').innerHTML = text
        })
        .catch(err => console.log(err))
    }
    showOneMinion(id)
  });



  // ------------ DELETE MINION
  document.getElementById('delete-one').addEventListener('click', function (event) {

    const id = document.querySelector('.delete input').value

    const button = document.querySelector('#delete-one')

    function deleteOneMinion(minionId) {
      charactersAPI
        .deleteOneRegister(minionId)
        .then(minion => {
          button.setAttribute('class', 'green')
        })
        .catch(err => {
          button.setAttribute('class', 'red')
          console.log(err)
        })
    }
    deleteOneMinion(id)

  });


  // ------------- EDIT MINION
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const button = document.querySelector('.edit')

    const inputs = document.querySelectorAll('#edit-character-form input')

    const id = inputs[0].value

    const minionData = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    function getEditFormInfo(minionId, minionInfo) {
      charactersAPI
        .updateOneRegister(minionId, minionInfo)
        .then(updatedMinion => {
          document.querySelector('#edit-character-form').reset()
          button.setAttribute('class', 'green')
        })
        .catch(err => {
          console.log(err)
          button.setAttribute('class', 'red')
        })
    }
    getEditFormInfo(id, minionData)
  });


  // ------------- CREATE MINION
  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const button = document.querySelector('.create')

    const inputs = document.querySelectorAll('#new-character-form input')

    const minionData = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(minionData)
      .then(createdMinion => {
        document.querySelector('#new-character-form').reset()
        button.setAttribute('class', 'green')
      })
      .catch(err => {
        button.setAttribute('class', 'red')
        console.log(err)
      })

  });

});
