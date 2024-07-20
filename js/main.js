let width = $('.aside').outerWidth()
$('.side-nav').css({ left: `-${width}px` })
$('.nav-links li').slideUp(300);
document.querySelector("#close").addEventListener('click', function () {
    $('.side-nav').animate({ left: `-${width}px` }, 500)
    document.querySelector("#close").classList.add("d-none")
    document.querySelector("#close").classList.remove("d-block")
    document.querySelector("#open").classList.remove("d-none")
    document.querySelector("#open").classList.add("d-block")
    $('.nav-links li').slideUp(300);
})
document.querySelector("#open").addEventListener("click", function () {
    $('.side-nav').animate({ left: `0px` }, 500)
    document.querySelector("#close").classList.remove("d-none")
    document.querySelector("#close").classList.add("d-block")
    document.querySelector("#open").classList.add("d-none")
    document.querySelector("#open").classList.remove("d-block")
    let delay = 0;
    $('.nav-links li').each(function () {
        $(this).delay(delay).slideDown(300);
        delay += 100;
    });
})
// ------------------------------------------------------------------------ 1-Home page-----------------------------------------------------------------------------
let reloader = document.querySelector("#reload")
let row = document.querySelector("#row")
let meals = []
async function getfood() {
    reloader.style.display = "none";
    let url = await fetch("https://themealdb.com/api/json/v1/1/search.php?s=")
    let res = await url.json()
    console.log(res)
    meals = res.meals
    HomeContent()

}
getfood()
function HomeContent() {
    let box = ""
    for (let i = 0; i < meals.length; i++) {
        box +=
            `
                <div class="col-md-3 food py-3" id="food" onclick="getbyid(${meals[i].idMeal})">
                    <div class="img position-relative">
                        <img src="${meals[i].strMealThumb}" class="img-fluid rounded-3 ">
                            <div class="layer rounded-3">
                                <h3 class="position-absolute food-name">${meals[i].strMeal}</h3>
                            </div>
                    </div>
              
              </div>
            `

    }

    row.innerHTML = box

}
//------------------------------------------------------------------------ Details----------------------------------------------------------------------------- 
let detailrow = document.getElementById("detailrow")
async function getbyid(id) {
    reloader.style.display = "none";
    let url = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let detail = await url.json()
    console.log(detail)
    displaydetails(detail)
}
getbyid()
function displaydetails(detail) {
    let cartona = ""
    for (let i = 0; i < detail.meals.length; i++) {
        cartona +=
            `
    <div class="col-md-4">
                <img src="${detail.meals[i].strMealThumb}" class="img-fluid rounded-3">
                <h3 class="text-white">${detail.meals[i].strMeal}</h3>
            </div>
            <div class="col-md-8 text-white">
                <h3 class="py-2">Instructions</h3>
                <p>${detail.meals[i].strInstructions}</p>
                <h2>Area : <span>${detail.meals[i].strArea}</span></h2>
                <h2>Category : <span>${detail.meals[i].strCategory}</span></h2>
                <h2>Category :</h2>
                <h5><span class="badge bg-color lead">${detail.meals[i].strIngredient1}</span></h5>
                <h2>Tags :</h2>
                <h5><span class="badge bg-colo lead">${detail.meals[i].strTags}</span></h5>
                <button class="btn btn-success"><a target="_blank" href="${detail.meals[i].strSource}"  class="text-decoration-none text-white">Source</a></button>
                <button class="btn btn-danger"><a  target="_blank" href="${detail.meals[i].strYoutube}"  class="text-decoration-none text-white">Youtube</a></button>
            </div>
`
        detailrow.innerHTML = cartona
        document.querySelector("#fooddetails").classList.replace("d-none", "d-block")
        document.querySelector("#home").classList.replace("d-block", "d-none")
        document.querySelector("#searchpage").classList.replace("d-block", "d-none")
        document.querySelector("#categories").classList.replace("d-block", "d-none")
        document.querySelector("#area").classList.replace("d-block", "d-none")
        document.querySelector("#filtermeal").classList.replace("d-block", "d-none")
        document.querySelector("#Ingredients").classList.replace("d-block", "d-none")
        document.querySelector("#Ingredientde").classList.replace("d-block", "d-none")
        document.querySelector("#contact").classList.replace("d-block", "d-none")


    }
}
// ------------------------------------------------------------------------done-----------------------------------------------------------------------------------

//2- sidenav
// 1-search
// 1-------------------------------------------------------------------------search by name-----------------------------------------------------------------------
let search = document.getElementById("search")
search.addEventListener('click', function () {
    document.querySelector("#searchpage").classList.replace("d-none", "d-block")
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#categories").classList.replace("d-block", "d-none")
    document.querySelector("#area").classList.replace("d-block", "d-none")
    document.querySelector("#fooddetails").classList.replace("d-block", "d-none")
    document.querySelector("#Ingredients").classList.replace("d-block", "d-none")
    document.querySelector("#contact").classList.replace("d-block", "d-none")

})
async function getbyname(mealName) {
    reloader.style.display = "none";
    let url = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    let response = await url.json()
    console.log(response)
    displaybyname(response)
}
let byname = document.getElementById("byname")
byname.addEventListener('keyup', function () {
    let mealName = byname.value.trim()
    getbyname(mealName)
})
let searchrow = document.querySelector("#searchrow")
function displaybyname(response) {
    let cartoona = ""
    for (let i = 0; i < response.meals.length; i++) {
        cartoona +=
            `
                <div class="col-md-3 food py-3" id="food" onclick="getbyid(${response.meals[i].idMeal})">
                    <div class="img position-relative">
                        <img src="${response.meals[i].strMealThumb}" class="img-fluid rounded-3 ">
                            <div class="layer rounded-3">
                                <h3 class="position-absolute food-name">${response.meals[i].strMeal}</h3>
                            </div>
                    </div>
              
              </div>
            `

    }

    searchrow.innerHTML = cartoona

}
// 2-------------------------------------------------------------------------search by first letter-----------------------------------------------------------------
async function getbyletter(letter) {
    reloader.style.display = "none";
    let url = await fetch(`https://themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let result = await url.json()
    console.log(result)
    displaybyletter(result)
}
let byletter = document.getElementById("byletter")
byletter.addEventListener('keyup', function () {
    let letter = byletter.value.trim()
    getbyletter(letter)
})
function displaybyletter(result) {
    let cartoona = ""
    for (let i = 0; i < result.meals.length; i++) {
        cartoona +=
            `
                <div class="col-md-3 food py-3" id="food" onclick="getbyid(${result.meals[i].idMeal})">
                    <div class="img position-relative">
                        <img src="${result.meals[i].strMealThumb}" class="img-fluid rounded-3 ">
                            <div class="layer rounded-3">
                                <h3 class="position-absolute food-name">${result.meals[i].strMeal}</h3>
                            </div>
                    </div>
              
              </div>
            `

    }

    searchrow.innerHTML = cartoona

}
// ------------------------------------------------------------------------done-----------------------------------------------------------------------------------
// 2-------------------------------------------------------------------------categories---------------------------------------------------------------------------
let cat = document.getElementById("cat")
cat.addEventListener('click', function () {
    document.querySelector("#categories").classList.replace("d-none", "d-block")
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#searchpage").classList.replace("d-block", "d-none")
    document.querySelector("#area").classList.replace("d-block", "d-none")
    document.querySelector("#fooddetails").classList.replace("d-block", "d-none")
    document.querySelector("#Ingredients").classList.replace("d-block", "d-none")
    document.querySelector("#contact").classList.replace("d-block", "d-none")
})

let catrow = document.getElementById("catrow")
async function categories() {
    reloader.style.display = "none";
    let url = await fetch("https://themealdb.com/api/json/v1/1/categories.php")
    let catres = await url.json()
    console.log(catres)
    displaycategories(catres)
}
categories()
function displaycategories(catres) {
    let catbox = ""
    for (let i = 0; i < catres.categories.length; i++) {
        catbox +=
            `
                <div class="col-md-3 food py-3" id="categ" onclick="catfilter('${catres.categories[i].strCategory}')">
                    <div class="img position-relative">
                        <img src="${catres.categories[i].strCategoryThumb}" class="img-fluid rounded-3 ">
                            <div class="layer rounded-3">
                                <h3 class= "text-center"  >${catres.categories[i].strCategory}</h3>
                                <p class="position-absolute food-name text-center">${catres.categories[i].strCategoryDescription.slice(0, 105)}</p>
                            </div>
                    </div>
              </div>
            `

    }

    catrow.innerHTML = catbox
}
// ------------------------------------------------------------------------done-----------------------------------------------------------------------------------
async function catfilter(catname) {
    reloader.style.display = "none";
    let url = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${catname}`)
    let rescat = await url.json()
    console.log(rescat)
    displayMeals(rescat)
}
catfilter()
function displayMeals(rescat) {
    let mealsContainer = document.getElementById("mealsContainer")
    let filter = ""
    for (let i = 0; i < rescat.meals.length; i++) {
        filter +=
            `
                <div class="col-md-3 food py-3"  onclick="getbyid(${rescat.meals[i].idMeal})">
                    <div class="img position-relative">
                        <img src="${rescat.meals[i].strMealThumb}" class="img-fluid rounded-3 ">
                            <div class="layer rounded-3">
                                <h3 class="position-absolute food-name">${rescat.meals[i].strMeal}</h3>
                                
                            </div>
                    </div>
              </div>
            `

    }

    mealsContainer.innerHTML = filter;
    document.querySelector("#categories").classList.replace("d-block", "d-none")
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#searchpage").classList.replace("d-block", "d-none")
    document.querySelector("#area").classList.replace("d-block", "d-none")
    document.querySelector("#fooddetails").classList.replace("d-block", "d-none")
    document.querySelector("#filtermeal").classList.replace("d-none", "d-block")
    document.querySelector("#Ingredients").classList.replace("d-block", "d-none")
    document.querySelector("#contact").classList.replace("d-block", "d-none")


}
// 2-------------------------------------------------------------------------Area---------------------------------------------------------------------------
let Ingredientsrow = document.querySelector("#Ingredientsrow")
async function getingre() {
    let url = await fetch("https://themealdb.com/api/json/v1/1/list.php?i=list")
    let resinged = await url.json()
    console.log(resinged)
    displayarea(resinged.meals)

}
getingre()
function displayarea(resinged) {
    let cartoon = "";
    for (let i = 0; i < resinged.length && i < 20; i++) {
        let description = resinged[i].strDescription ? resinged[i].strDescription.slice(0, 100) : "";
        cartoon += `
            <div class="col-md-3 py-3 ara text-center" onclick="ingredientde('${resinged[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x text-center"></i>
                <h3 class="food-name "text-center"">${resinged[i].strIngredient}</h3>
                <p class= "text-center">${description}</p>
            </div>
        `;
    }

    Ingredientsrow.innerHTML = cartoon;
}
let arearow = document.querySelector("#arearow");
let areasElement = document.querySelector("#areas");

async function getAreas() {
    let url = 'https://themealdb.com/api/json/v1/1/list.php?a=list';
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    displayAreas(data.meals);
}

function displayAreas(areas) {
    let boox = '';
    for (let i = 0; i < areas.length; i++) {
        boox += `
            <div class="col-md-3 py-3 ara" onclick="areafilter('${areas[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3 class="food-name">${areas[i].strArea}</h3>
            </div>
        `;
    }
    arearow.innerHTML = boox;
}
getAreas();

if (areasElement) {
    areasElement.addEventListener('click', function () {
        document.querySelector("#area").classList.replace("d-none", "d-block");
        document.querySelector("#Ingredients").classList.replace("d-block", "d-none")
        document.querySelector("#home").classList.replace("d-block", "d-none")
        document.querySelector("#fooddetails").classList.replace("d-block", "d-none")
        document.querySelector("#searchpage").classList.replace("d-block", "d-none")
        document.querySelector("#categories").classList.replace("d-block", "d-none")
        document.querySelector("#filtermeal").classList.replace("d-block", "d-none")
        document.querySelector("#contact").classList.replace("d-block", "d-none")
    });
}
async function areafilter(areaname) {
    reloader.style.display = "none";
    let url = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?a=${areaname}`)
    let resdata = await url.json()
    console.log(resdata)
    displayMeals(resdata)
}
areafilter()
function displayera(resdata) {
    let mealsContainer = document.getElementById("mealsContainer")
    let filter = ""
    for (let i = 0; i < resdata.meals.length; i++) {
        filter +=
            `
                <div class="col-md-3 food py-3"  onclick="getbyid(${resdata.meals[i].idMeal})">
                    <div class="img position-relative">
                        <img src="${resdata.meals[i].strMealThumb}" class="img-fluid rounded-3 ">
                            <div class="layer rounded-3">
                                <h3 class="position-absolute food-name">${resdata.meals[i].strMeal}</h3>
                                
                            </div>
                    </div>
              </div>
            `

    }

    mealsContainer.innerHTML = filter;
    document.querySelector("#categories").classList.replace("d-block", "d-none")
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#searchpage").classList.replace("d-block", "d-none")
    document.querySelector("#area").classList.replace("d-block", "d-none")
    document.querySelector("#fooddetails").classList.replace("d-block", "d-none")
    document.querySelector("#filtermeal").classList.replace("d-none", "d-block")
    document.querySelector("#Ingredients").classList.replace("d-block", "d-none")
    document.querySelector("#contact").classList.replace("d-block", "d-none")


}
// -------------------------------------------------------------------------Done---------------------------------------------------------------------------
let ingredients = document.getElementById("ingredients")
ingredients.addEventListener('click', function () {
    document.querySelector("#Ingredients").classList.replace("d-none", "d-block")
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#fooddetails").classList.replace("d-block", "d-none")
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#searchpage").classList.replace("d-block", "d-none")
    document.querySelector("#categories").classList.replace("d-block", "d-none")
    document.querySelector("#area").classList.replace("d-block", "d-none")
    document.querySelector("#filtermeal").classList.replace("d-block", "d-none")
    document.querySelector("#contact").classList.replace("d-block", "d-none")

})

async function ingredientde(name) {
    reloader.style.display = "none";
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
    let final = await url.json()
    console.log(final)
    displayfood(final)
}
ingredientde()
function displayfood(final) {
    let Ingred = document.getElementById("Ingred")
    let inde = ""
    for (let i = 0; i < final.meals.length; i++) {
        inde +=
            `
                <div class="col-md-3 food py-3"  onclick="getbyid(${final.meals[i].idMeal})">
                    <div class="img position-relative">
                        <img src="${final.meals[i].strMealThumb}" class="img-fluid rounded-3 ">
                            <div class="layer rounded-3">
                                <h3 class="position-absolute food-name">${final.meals[i].strMeal}</h3>
                                
                            </div>
                    </div>
              </div>
            `

    }

    Ingred.innerHTML = inde;
    document.querySelector("#Ingredients").classList.replace("d-block", "d-none")
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#fooddetails").classList.replace("d-block", "d-none")
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#searchpage").classList.replace("d-block", "d-none")
    document.querySelector("#categories").classList.replace("d-block", "d-none")
    document.querySelector("#area").classList.replace("d-block", "d-none")
    document.querySelector("#filtermeal").classList.replace("d-block", "d-none")
    document.querySelector("#Ingredientde").classList.replace("d-none", "d-block")
    document.querySelector("#contact").classList.replace("d-block", "d-none")

}
document.querySelector("#contacts").addEventListener("click", function () {
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#fooddetails").classList.replace("d-block", "d-none")
    document.querySelector("#home").classList.replace("d-block", "d-none")
    document.querySelector("#searchpage").classList.replace("d-block", "d-none")
    document.querySelector("#categories").classList.replace("d-block", "d-none")
    document.querySelector("#area").classList.replace("d-block", "d-none")
    document.querySelector("#filtermeal").classList.replace("d-block", "d-none")
    document.querySelector("#Ingredientde").classList.replace("d-block", "d-none")
    document.querySelector("#contact").classList.replace("d-none", "d-block")
})
let submitButtonId = document.getElementById('submitButtonId');
let name = document.querySelector("#name")
let password = document.querySelector("#password")
let repassword = document.querySelector("#repassword")
let email = document.querySelector("#email")
let age = document.querySelector("#age")
let phone = document.querySelector("#phone")
function validation(ele) {
    let regex = {
        name: /^[a-zA-Z0-9_\s]+$/,
        phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        age: /^([3-9]|[1-6][0-9])$/
    }
    if (regex[ele.id].test(ele.value)) {
        ele.classList.add("is-valid")
        ele.classList.remove("is-invalid")
        ele.nextElementSibling.classList.replace("d-block", "d-none")
        submitButtonId.classList.remove("disabled");
        return true
    }
    else {
        ele.classList.add("is-invalid")
        ele.classList.remove("is-valid")
        ele.nextElementSibling.classList.replace("d-none", "d-block")
        submitButtonId.classList.add("disabled");
        return false
    }
}
function validationpass() {
    if ((password.value) !== (repassword.value)) {
        repassword.classList.add("is-invalid")
        repassword.classList.remove("is-valid")
        repassword.nextElementSibling.classList.replace("d-none", "d-block")
        submitButtonId.classList.add("disabled");
        return false
    }
    else {
        repassword.classList.add("is-valid")
        repassword.classList.remove("is-invalid")
        repassword.nextElementSibling.classList.replace("d-block", "d-none")
        submitButtonId.classList.remove("disabled");
        return true
    }
}