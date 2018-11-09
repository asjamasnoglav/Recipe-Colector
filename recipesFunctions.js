'use strict'

// read existing Recipes from local storage 
const getSavedRecipes = () => {
    //items saved in the local storage (not parsed yet)
    const recipesJSON = localStorage.getItem('recipes')
    //if recipesJSON is not empty return parsed data, else return empty array
    //if there is an error return empty array
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch {
        return []
    }
}

//save recipes to local storage 
//takes in recipes 
const saveRecipes = (recipes) => {
    //set item into local storage (needs to be a string)
    //key = 'recipes'
    //stored value = stringified recipes
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

//print recipe titles and edit buttons on the first page
const generateRecipeTitleDOM = (recipe) => {
    const recipesEl = document.querySelector('#recipes')

    //create new division for recipe titles
    const recipeDiv = document.createElement('div')
    recipeDiv.setAttribute('class', 'recipe-element')
    recipesEl.appendChild(recipeDiv)

    //print title text or. 'unnamed recipe' if there is no title
    //link to the edit page, where you can edit the recipe 
    const newRecipe = document.createElement('span')
    if (recipe.title.length > 0) {
        newRecipe.textContent = recipe.title
    } else {
        newRecipe.textContent = 'Unnamed Recipe'
    }
    
    newRecipe.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeDiv.appendChild(newRecipe)

    // //create edit button, when you click on it send to the right edit page
    // const editButton = document.createElement('button')
    // editButton.textContent = 'Edit'
    // editButton.addEventListener('click', (e) => {
    //     location.assign(`/edit.html#${recipe.id}`)
    // })
    // recipeDiv.appendChild(editButton)

    //when you click on a recipe go to display
    recipeDiv.addEventListener('click', () => {
        location.assign(`/display.html#${recipe.id}`)
    })
}


//filtering recipes
const filteringRecipes = (recipes, filters) => {
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.filterBy.toLowerCase()))

    document.querySelector('#recipes').innerHTML = ''

    filteredRecipes.forEach((recipe) => {
        generateRecipeTitleDOM(recipe)
    })
}


// removing recipes
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
    }
}

//add event to the home button
//clicking on home -> send back home
const sendToHomePage = (buttonClass) => {
    const homeButton = document.querySelector(buttonClass)

    homeButton.addEventListener('click', () => {
        location.assign('/index.html')
    })
}