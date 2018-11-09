'use strict'

const title = document.querySelector('#title')

sendToHomePage('.btn-block')

//find the right recipe by the id
const recipeId = location.hash.substring(1)
let recipes = getSavedRecipes()
let recipe = recipes.find((recipe) => recipe.id === recipeId)

title.value = recipe.title
title.addEventListener('input', (e) => {
recipe.title = e.target.value
saveRecipes(recipes)
})

const recipeText = document.querySelector('#recipe-text')

recipeText.value = recipe.content
recipeText.addEventListener('input', (e) => {
recipe.content = e.target.value
saveRecipes(recipes)
})

//delete recipe with click on the button
const deleteRecipe = document.querySelector('#delete-button')

deleteRecipe.addEventListener('click', (e) => {
    removeRecipe(recipe.id)
    saveRecipes(recipes)
    location.assign(`/index.html`)
})

//submit recipe and send to display
const displayRecipe = document.querySelector('#display-button')

displayRecipe.addEventListener('click', (e) => {
    location.assign(`/display.html#${recipe.id}`)
})

//simultaneous updationg across the app pages
window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        
        recipe = recipes.find((recipe) => recipe.id === recipeId)

        title.value = recipe.title
        recipeText.value = recipe.content
    }
})