const plantsURL = 'http://localhost:3000/plants'
let form = document.querySelector('form')
form.addEventListener('submit', handleSubmit)

getAll(plantsURL)


// getOne(plantsURL, 1)

function getAll(url){
    fetch(url)
    .then(res => res.json())
    .then(plants => plants.forEach(plant => buildPlantCard(plant)))
}

function getOne(url, id){
    fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(console.log)
}

function postPlant(plant){
    fetch(plantsURL,{
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plant),
    })
    .then(res => res.json())
    .then(plant => buildPlantCard(plant) )
}



function buildPlantCard(plant){
    //div
    //plant name
    //plant price 
    //click event show one
    let div = document.createElement('div')
    let h3 = document.createElement('h3')
    let p = document.createElement('p')
    let main = document.querySelector('main')
    let btn = document.createElement('button')
    div.className = 'plant_card'
    div.id = plant.id
    h3.textContent = plant.name 
    p.textContent = `$ ${plant.price}`
    btn.textContent = 'x'
    //grabbing id from event 
    //div.addEventListener('click', handleClick)

    //grabbing id from plant
    div.addEventListener('click', (e) => handleDelete(plant))
    btn.addEventListener('click', (e) => handleClick(plant))

    div.append(h3, p)
    main.appendChild(div)
    
}

function handleClick(plant){
//grabbing id from event 
// function handleClick(e){
    // getOne(plantsURL, e.target.id)
    getOne(plantsURL, plant.id)
}


function handleSubmit(e){
    e.preventDefault()
    let plant = {
        name: e.target.name.value,
        light: e.target.light.value,
        water: e.target.water.value,
        price: e.target.price.value
    }
    postPlant(plant)
}