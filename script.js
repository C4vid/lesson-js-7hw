const API_URL = 'http://localhost:3000/users/'
const myTable = document.querySelector('table')
const addUserBtn = document.getElementById('addBtn')
const modal = document.querySelector('.modal')
const closeModalBtn = document.getElementById('closeBtn')
const inputs = document.querySelectorAll('input')
const regBtn = document.getElementById('myBtn')

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        console.log("data:", data )
        data.forEach((user) => {
            const trEl = document.createElement('tr')
            const tdId = document.createElement('td')
            const tdUsername = document.createElement('td')
            const tdEmail = document.createElement('td')
            const tdAge = document.createElement('td')
            const tdPosition = document.createElement('td')
            const tdDel = document.createElement('td')
            tdId.innerText = user.id
            tdUsername.innerText = user.username
            tdEmail.innerText = user.email
            tdAge.innerText = user.age
            tdPosition.innerText = user.city
            tdDel.innerHTML = '<button id="delBtn">Del</button>'

            trEl.appendChild(tdId)
            trEl.appendChild(tdUsername)
            trEl.appendChild(tdEmail)
            trEl.appendChild(tdAge)
            trEl.appendChild(tdPosition)
            trEl.appendChild(tdDel)
            myTable.appendChild(trEl)
        })
        const delBtns = document.querySelectorAll('#delBtn')

        delBtns.forEach((btn, index) => {
            btn.addEventListener("click", function(e) {
                e.preventDefault()
                const deletedId = e.target.parentElement.parentElement.children[0].innerText
                fetch(`${API_URL}${deletedId}`, {
                    method: 'DELETE'
                })
                .then(console.log("user deleted"))
            })
        })
    })

addUserBtn.addEventListener('click', function(e) {
    e.preventDefault()
    modal.classList += ' activeModal'
})

closeModalBtn.addEventListener('click', function() {
    closeModal()
})

function closeModal() {
    modal.classList = 'modal'
}

regBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const inputsObj = {
        username: '',
        email: '',
        age: 0,
        city: ''
    }

    inputs.forEach(inp => {
        inputsObj[inp.id] = inp.value
    })

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputsObj)
        })
        .then(console.log("user added"))

})
    
    