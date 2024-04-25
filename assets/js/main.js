let buttonNode = document.getElementById('getUser')
buttonNode.addEventListener('click', (event)=>{
    //getUser()
    postData('http://localhost:8000/api/user', {userName: "Ole Bengt"})
})



async function getUser() {
    const response = await fetch('http://localhost:8000/api/',{
        method: "GET",
        mode: "cors",
        cache: "no-cache",
    })

    let data = await response.json()
    document.body.innerHTML = document.body.innerHTML + "<p>" + data.response + "</p>"
}

async function postData(url="http://localhost:8000/api/user", data={}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    let answer = await response.json()
    if (answer.status == "OK") {
        document.getElementById('status').innerHTML = "🦠"
    }
}

