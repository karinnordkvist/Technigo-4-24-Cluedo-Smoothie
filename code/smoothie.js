// ------------------ Main Fruits ------------------
const apple = {
  name: 'Apple',
  color: 'green',
  category: 'fresh',
  image: './images/apple.jpg',
  tastesGoodWith: 'Coconut water' //Not using these for now, rather saving them for later
}

const banana = {
  name: 'Banana',
  color: 'light yellow',
  category: 'sweet',
  image: './images/banana.jpg',
  tastesGoodWith: 'Almond milk'
}

const mango = {
  name: 'Mango',
  color: 'yellow',
  category: 'sweet',
  image: './images/mango.jpg',
  tastesGoodWith: 'Yoghurt'
}

const orange = {
  name: 'Orange',
  color: 'orange',
  category: 'tangy',
  image: './images/orange.jpg',
  tastesGoodWith: 'Coconut water'
}

const raspberry = {
  name: 'Raspberry',
  color: 'red',
  category: 'fresh',
  image: './images/raspberry.jpg',
  tastesGoodWith: 'Milk and oats'
}

const lemon = {
  name: 'Lemon',
  color: 'yellow',
  category: 'sour',
  image: './images/lemon.jpg',
  tastesGoodWith: 'Coconut water'
}

// ------------------ Mixer ------------------
const almondMilk = {
  name: 'Almond milk',
  image: './images/almondmilk.jpg'
}

const yoghurt = {
  name: 'Yoghurt',
  image: './images/yoghurt.jpg'
}

const coconutWater = {
  name: 'Coconut water',
  image: './images/coconutwater.jpg'
}

const milkOats = {
  name: 'Milk and oats',
  image: './images/oat.jpg'
}

// ------------------ Superboosters ------------------
const spirulina = {
  name: 'Spirulina',
  amount: 'about 1 tbsp',
  image: './images/spirulina.jpg'
}

const ginger = {
  name: 'Ginger',
  amount: 'about 2 cm',
  image: './images/ginger.jpg'
}

const kale = {
  name: 'Kale',
  amount: 'about a fist',
  image: './images/kale.jpg'
}

const chiaSeeds = {
  name: 'Chia seeds',
  amount: 'about 2 tbsp',
  image: './images/chia.jpg'
}

// Arrays made with all ingredients, separated into 3 groups
const mainFruits = [
  apple,
  banana,
  mango,
  orange,
  raspberry,
  lemon
]

const mixers = [
  almondMilk,
  yoghurt,
  coconutWater,
  milkOats
]

const superBoosters = [
  spirulina,
  ginger,
  kale,
  chiaSeeds
]

// Array for favorites (Objects will be added when favorite is selected in browser)
let mainFruitsPlusFavorite = [
  apple,
  banana,
  mango,
  orange,
  raspberry,
  lemon
]

// Object that will define all ingredients currently selected in the smoothie
let smoothie = {
  mainFruit: undefined,
  mixer: undefined,
  superBooster: undefined
}

let favoriteFruit = document.getElementById('fruit-input')

// Select a favorite fruit to make it appear more frequently in the mix
const selectFavorite = (value) => {
  event.preventDefault()
  favoriteFruit = value.replace(/(^"|"$)/g, '')

  // If a favorite is selected, remove the extra favorite-objects in array
  const removeFavorites = () => {
    if (mainFruitsPlusFavorite.length > 6) {
      mainFruitsPlusFavorite.splice(-3, 3)
    }
  }

  // If favorite is selected in browser, add matching object from mainFruit-array x 3 
  // to a new array which will later be used to randomize fruit 
  if (favoriteFruit == "Apple") {
    removeFavorites()
    mainFruitsPlusFavorite.push(mainFruits[0], mainFruits[0], mainFruits[0])
  } else if (favoriteFruit == "Banana") {
    removeFavorites()
    mainFruitsPlusFavorite.push(mainFruits[1], mainFruits[1], mainFruits[1])
  } else if (favoriteFruit == "Mango") {
    removeFavorites()
    mainFruitsPlusFavorite.push(mainFruits[2], mainFruits[2], mainFruits[2])
  } else if (favoriteFruit == "Orange") {
    removeFavorites()
    mainFruitsPlusFavorite.push(mainFruits[3], mainFruits[3], mainFruits[3])
  } else if (favoriteFruit == "Raspberry") {
    removeFavorites()
    mainFruitsPlusFavorite.push(mainFruits[4], mainFruits[4], mainFruits[4])
  } else if (favoriteFruit == "Lemon") {
    removeFavorites()
    mainFruitsPlusFavorite.push(mainFruits[5], mainFruits[5], mainFruits[5])
  }
}

// Function that selects a random object from chosen array
const randomSelector = array => {
  return array[Math.floor(Math.random() * array.length)]
}

// Function that toggles loading-gif
const toggleLoader = (whatBox) => {
  document.getElementById(whatBox).classList.add('loading')
  // remove the loading-gif...
  const removeLoader = () => {
    document.getElementById(whatBox).classList.remove('loading')
  }
  //... after 1.5 second
  setTimeout(removeLoader, 1500)
}

// 3 x Display random image and title from each category 
// + add value to smoothie-object
// + check if smoothie-button color should be changed
const pickMainFruit = () => {
  mainFruit = randomSelector(mainFruits)

  // Pick a random fruit, unless favorite is selected, 
  // then pick random from a different array
  if (mainFruitsPlusFavorite[6] == undefined) {
    mainFruit = randomSelector(mainFruits)
  } else {
    mainFruit = randomSelector(mainFruitsPlusFavorite)
  }

  toggleLoader('main-fruit-box')

  document.getElementById('main-fruit-box').style.background = `url('${mainFruit.image}')`
  // document.getElementById('fruit-header').innerHTML = `Main Fruit/berry: ${mainFruit.name}`

  smoothie.mainFruit = mainFruit.name
  colorCheck()
}

const pickMixer = () => {
  mixer = randomSelector(mixers)

  toggleLoader('mixer-box')

  document.getElementById('mixer-box').style.background = `url('${mixer.image}')`
  // document.getElementById('mixer-header').innerHTML = `Mixer: ${mixer.name}`

  smoothie.mixer = mixer.name
  colorCheck()
}

const pickSuperBooster = () => {
  superBooster = randomSelector(superBoosters)

  toggleLoader('superbooster-box')

  document.getElementById('superbooster-box').style.background = `url('${superBooster.image}')`
  // document.getElementById('superbooster-header').innerHTML = `Super Booster: ${superBooster.name}`

  smoothie.superBooster = superBooster.name
  colorCheck()
}

// Randomize-button in the header - to quickly randomize a smoothie
const randomizeSmoothie = () => {
  pickMainFruit()
  pickMixer()
  pickSuperBooster()
}

// Check if the show smoothie-button should change into 'active' color
// (based on if all object properties of smoothie-object is set)
const colorCheck = () => {
  if (smoothie.mainFruit !== undefined && smoothie.mixer !== undefined && smoothie.superBooster !== undefined) {
    document.getElementById('mixer-button').classList.add('active')
  } else {
  }
}

// Display the summary of smoothie + details (details depending on ingredients)
// IF all categories are selected
const mixSmoothie = () => {
  if (smoothie.mainFruit == undefined) {
    document.getElementById('finished-smoothie').innerHTML = "Please select a Main Fruit/berry"
  } else if (smoothie.mixer == undefined) {
    document.getElementById('finished-smoothie').innerHTML = "Please select a Mixer"
  } else if (smoothie.superBooster == undefined) {
    document.getElementById('finished-smoothie').innerHTML = "Please select a Super Booster"
  } else {
    document.getElementById('finished-smoothie').innerHTML = `A smoothie made of ${mainFruit.color}, ${mainFruit.category} ${mainFruit.name} mixed with ${mixer.name} and spiced up with ${superBooster.amount} of ${superBooster.name}.`
  }
}

// Not finished. TODO: Fix function that will 
// display what day, date, month and year it is
// document.getElementById('date').innerText = `<Day>, <date> of <month> <year>`




