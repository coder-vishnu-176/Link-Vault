//an array
let myLeads = []

const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorgae = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorgae) {
    myLeads = leadsFromLocalStorgae
    render(myLeads)
}



tabBtn.addEventListener("click", function () {
    //grab the url of the current tab 

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })


})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems = listItems +
            `<li>
            <a target='_blank' href=${leads[i]}>  
                ${leads[i]}  
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

//delete button
delBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})



inputBtn.addEventListener("click", function () {
    if (inputEl.value.trim() !== "") {
        myLeads.push(inputEl.value)
    }
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})



