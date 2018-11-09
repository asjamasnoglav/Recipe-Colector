'use strict'

let recipes = getSavedRecipes()
const recipeId = location.hash.substring(1)
let recipe = recipes.find((recipe) => recipe.id === recipeId)

sendToHomePage('.btn-block')

const body = document.querySelector('body')
const title = document.createElement('h1')
const recipeText = document.createElement('pre')
const editButton = document.createElement('button')

title.textContent = recipe.title
body.appendChild(title)

recipeText.textContent = recipe.content
recipeText.setAttribute('wrap', 'hard')
body.appendChild(recipeText)

editButton.textContent = 'Edit'
editButton.addEventListener('click', (e) => {
    location.assign(`/edit.html#${recipe.id}`)
})
body.appendChild(editButton)

//delete button
const deleteRecipe = document.createElement('button')

deleteRecipe.textContent = 'Delete'
deleteRecipe.addEventListener('click', (e) => {
    removeRecipe(recipe.id)
    saveRecipes(recipes)
    location.assign(`/index.html`)
})
body.appendChild(deleteRecipe)

//simultaneous updationg across the app pages
window.addEventListener('storage', (e) => {
    console.log(JSON.parse(e.newValue))
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        
        let recipe = recipes.find((recipe) => recipe.id === recipeId)
        title.textContent = recipe.title
        recipeText.textContent = recipe.content
    }
})