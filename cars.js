let price = document.getElementById("vehicle_price");
let kilometers = document.getElementById("km");
let brand = document.getElementById("brand");
let production_year = document.getElementById("production_year");
let dugme = document.getElementById("dugme");

let errorRed = document.getElementById("erorRed")
let errorKm = document.getElementById("erorKm")
let errorBrand = document.getElementById("erorBrand")
let errorYear = document.getElementById("erorYear")
let errorDugme = document.getElementById("erorDugme")


let automobili = JSON.parse(localStorage?.getItem('automobili')) || [];

function Insert() {

    let NoviAuto = {
        brand: brand.value,
        production_year: production_year.value,
        vehicle_price: vehicle_price.value,
        kilometers: kilometers.value
    }

    if (brand.value === "" || production_year.value === "" || vehicle_price.value === "" || kilometers.value === "") {

        errorDugme.textContent = "All fields must be filled"
    }
    else if (dugme.textContent.toLowerCase() === "confirm" &&
        automobili.filter(e => e.price === vehicle_price.value).length !== 0) {
        errorDugme.textContent = "vehicle_price postoji u bazi"
    }
    else {
        if (dugme.textContent.toLowerCase() === "confirm") {

            errorDugme.textContent = ""
            automobili.push(NoviAuto)

            localStorage.setItem("automobili", JSON.stringify(automobili))
            ShowAndClear();
        }
        else {
            let i = dugme.value;
            automobili.splice(i, 1, NoviAuto)
            localStorage.setItem("automobili", JSON.stringify(automobili))
            ShowAndClear()
        }
    }
}

function Show(arr) {
    let a = "";
    let b = "";
    let c = "";
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i].kilometers) < 50000) {
            a += `
            <tr>
            <td>${arr[i].vehicle_price}</td>
            <td>${arr[i].kilometers}</td>
            <td>${arr[i].brand}</td>
            <td>${arr[i].production_year}</td>
                <td><button onclick = "Delete(automobili,${i})">Delete</button></td>
                <td><button onclick = "Edit(automobili,${i})">Edit</button></td>
            </tr>
            </tr>`
        }
        else if (Number(arr[i].kilometers) >= 50000 && Number(arr[i].kilometers) < 150000) {
            b += `
                <tr>
                <td>${arr[i].vehicle_price}</td>
                <td>${arr[i].kilometers}</td>
                <td>${arr[i].brand}</td>
                <td>${arr[i].production_year}</td>
                <td><button onclick = "Delete(automobili,${i})">Delete</button></td>
                <td><button onclick = "Edit(automobili,${i})">Edit</button></td>
                </tr>
                </tr>`
        }
        else {
            c += `
                    <tr>
                    <td>${arr[i].vehicle_price}</td>
                    <td>${arr[i].kilometers}</td>
                    <td>${arr[i].brand}</td>
                    <td>${arr[i].production_year}</td>
                    <td><button onclick = "Delete(automobili,${i})">Delete</button></td>
                    <td><button onclick = "Edit(automobili,${i})">Edit</button></td>
                    </tr>
                    </tr>`
        }
    }
    document.getElementById("tabela0").innerHTML = a
    document.getElementById("tabela1").innerHTML = b
    document.getElementById("tabela2").innerHTML = c
}


function Delete(niz, index) {

    niz.splice(index, 1)
    Show(niz)
}

function Edit(niz, index) {

    brand.value = niz[index].brand;
    production_year.value = niz[index].production_year;
    vehicle_price.value = niz[index].vehicle_price;
    kilometers.value = niz[index].kilometers;
    dugme.textContent = "Confirm";
    dugme.value = i;


}

function Brand() {
    let brandname = document.getElementById("brand");
    document.getElementsByClassName("tabela").innerHTML = brandname;
}

function Year() {
    let yearname = document.getElementById("production_year");
    document.getElementsByClassName("tabela").innerHTML = yearname;
}

function ShowAndClear() {
    Show(automobili);

    vehicle_price.value = "";
    brand.value = "";
    production_year.value = "";
    kilometers.value = "";
    dugme.textContent = "Confirm"
}

automobili.length > 0 && ShowAndClear()


