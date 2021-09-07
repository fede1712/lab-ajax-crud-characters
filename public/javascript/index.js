const charactersAPI = new APIHandler('http://localhost:8000');


window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI

      .getFullList()
      .then(result => {
        console.log(result.data)
        document.querySelector('#fetch-all').classList.add('active')
        setTimeout(() => document.querySelector('#fetch-all').classList.remove('active'), 3000)
        let text = ''
        result.data.forEach(element => {
          text +=
            `<div class="character-info">
        <div class="name">Name: ${element.name}</div>
        <div class="occupation">Occupation: ${element.occupation}</div>
        <div class="cartoon">Cartoon: ${element.cartoon}</div>
        <div class="weapon">weapon: ${element.weapon}</div>
      </div>`
          document.querySelector('.characters-container').innerHTML = text
        });

      })
      .catch()

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const id = document.querySelector('#get-one').value
    charactersAPI
      .getOneRegister(id)
      .then(result => {
        console.log(result.data)

        if (result.data) {
          document.querySelector('#fetch-one').classList.add('active')
          setTimeout(() => document.querySelector('#fetch-one').classList.remove('active'), 3000)
          let text = ''
          result.data
          text +=
            `<div class="character-info">
            <div class="name">Name: ${result.data.name}</div>
            <div class="occupation">Occupation: ${result.data.occupation}</div>
            <div class="cartoon">Cartoon: ${result.data.cartoon}</div>
            <div class="weapon">weapon: ${result.data.weapon}</div>
          </div>`
          document.querySelector('.characters-container').innerHTML = text;
        } else {
          document.querySelector('#fetch-one').classList.add('deleted')
          setTimeout(() => document.querySelector('#fetch-one').classList.remove('deleted'), 3000)
        }
        document.querySelector('#get-one').value = ''

      })
      .catch(err => console.error('Errooooor', err))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const id = document.querySelector('#remove-one').value
    charactersAPI
      .deleteOneRegister(id)
      .then(result => {
        console.log(result.data)
        if (result.data) {
          document.querySelector('#delete-one').classList.add('active')
          setTimeout(() => document.querySelector('#delete-one').classList.remove('active'), 3000)
        } else {
          document.querySelector('#delete-one').classList.add('deleted')
          setTimeout(() => document.querySelector('#delete-one').classList.remove('deleted'), 3000)
        }
        document.querySelector('#remove-one').value = ''
      })
      .catch(err => console.error('Errooooor', err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const inputs = document.querySelectorAll('#edit-character-form input')
    const id = document.querySelector('#the-id').value
    const characterInfo = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    charactersAPI
      .updateOneRegister(id, characterInfo)
      .then(result => {
        console.log(result.data)
        if (result.data) {
          document.querySelector('#send-data').classList.add('active')
          setTimeout(() => document.querySelector('#send-data').classList.remove('active'), 3000)
        } else {
          document.querySelector('#send-data').classList.add('deleted')
          setTimeout(() => document.querySelector('#send-data').classList.remove('deleted'), 3000)
        }
        document.querySelector('#edit-character-form').reset()
      })
      .catch(err => console.error('Errooooor', err))

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const inputs = document.querySelectorAll('#new-character-form input')
    const characterInfo = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(characterInfo)
      .then(result => {
        if (result.data) {
          document.querySelector('#send-new-data').classList.add('active')
          setTimeout(() => document.querySelector('#send-new-data').classList.remove('active'), 3000)
        } else {
          document.querySelector('#send-new-data').classList.add('deleted')
          setTimeout(() => document.querySelector('#send-new-data').classList.remove('deleted'), 3000)
        }
        document.querySelector('#new-character-form').reset()
      })
      .catch(err => console.error('Errooooor', err))



  });
});
