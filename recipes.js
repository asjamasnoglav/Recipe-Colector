'use strict'

let recipes = getSavedRecipes()

const filters = {
    filterBy: ''
}

filteringRecipes(recipes, filters)

//when clicking add recipe push new element into the recipes and send to the edit page
const addRecipe = document.querySelector('#add-recipe')

addRecipe.addEventListener('click', (e) => {
    const id = uuidv4()

    recipes.push({
        title: '',
        content: '',
        id: id,
    })

    saveRecipes(recipes)
    location.assign(`/edit.html#${id}`)
})

//serch text by input
const searchText = document.querySelector('#search-text')

searchText.addEventListener('input', (e) => {
    filters.filterBy = e.target.value
    filteringRecipes(recipes, filters)
})

//simultaneous updationg across the app pages
window.addEventListener('storage', (e) => {
    console.log(JSON.parse(e.newValue))
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        
        filteringRecipes(recipes, filters)
    }
})