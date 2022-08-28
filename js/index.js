document.addEventListener('DOMContentLoaded',() => {
  const monsterContainer = document.querySelector('#monster-container')
  const monsterUrl = 'http://localhost:3000/monsters/'
  const createMonster = document.querySelector('#create-monster')
  const forward = document.querySelector('#forward')
  const back = document.querySelector('#back')
  let page = 1

  createMonsterForm()

  getMonsters()

  const monsterForm = document.querySelector('#create-monster-form')
  monsterForm.addEventListener('submit', e => {
    e.preventDefault()
    const monsterName = document.querySelector('#monster-name').value
    const monsterDesc = document.querySelector('#monster-desc').value
    const monsterAge = document.querySelector('#monster-age').value

    fetch(monsterUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: monsterName,
        age: monsterAge,
        description: monsterDesc
      })
    })
    .then(resp => resp.json())
    .then(monster => console.log(monster))
  })

  forward.addEventListener('click', () => {
    removeAllChildNodes(monsterContainer)
    page++
    console.log(page)
    getMonsters()
  })
  
  back.addEventListener('click', () => {
    removeAllChildNodes(monsterContainer)
    while (page > 0) {
      page--
      console.log(page)
      getMonsters()
    }
  })

  function createMonsterForm() {
    const form = document.createElement('form')
    const nameInput = document.createElement('input')
    const descInput = document.createElement('input')
    const ageInput = document.createElement('input')
    const submit = document.createElement('button')

    nameInput.type = 'text'
    nameInput.name = 'monster-name'
    nameInput.id = 'monster-name'
    nameInput.placeholder = 'Enter Name...'

    descInput.type = 'text'
    descInput.name = 'monster-desc'
    descInput.id = 'monster-desc'
    descInput.placeholder = 'Enter Description...'

    ageInput.type = 'text'
    ageInput.name = 'monster-age'
    ageInput.id = 'monster-age'
    ageInput.placeholder = 'Enter Age...'

    submit.type = 'submit'
    submit.textContent = 'Create Monster'
    
    form.id = 'create-monster-form'

    form.appendChild(nameInput)
    form.appendChild(descInput)
    form.appendChild(ageInput)
    form.appendChild(submit)

    createMonster.appendChild(form)
  }

  function removeAllChildNodes(parent) {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }

  function getMonsters() {
    fetch(`${monsterUrl}/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(monsters => {
      monsters.forEach(createMonsterCard)
    })
  }

  function createMonsterCard(monster) {
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const bio = document.createElement('p')
    const age = document.createElement('p')

    div.classList.add('monster-card')
    div.id = monster.id

    h2.classList.add('monster-name')
    h2.id = `${monster.name}-header`
    h2.textContent = monster.name

    bio.classList.add('monster-desc')
    bio.textContent = `Bio: ${monster.description}`

    age.classList.add('monster-age')
    age.textContent = `Age: ${monster.age}`

    div.appendChild(h2)
    div.appendChild(bio)
    div.appendChild(age)

    monsterContainer.appendChild(div)
  }

})