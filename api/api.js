import {Router} from 'express'
let api = Router()

import fs from 'fs'

// ALLE Restful api kald:
api.get('/', (request,response)=>{
    // masser af beregninger og db opslag og andet fedt
    response.status(200).send({
        status: true,
        response: "Hello world!"
    })
})

api.post('/user', async (request, response)=>{
    let userName = request.body.userName
    await writeFile({user: userName})
    let data = {status: 'OK'}
    response.status(200).send(JSON.stringify(data))
})

// ØVELSE: flyt læs og skriv over i en serviceKlasse fil og importer og brug den her
async function readFile(){
    let fileContent = await fs.promises.readFile('./users.json', {encoding: 'utf-8'})
    return JSON.parse(fileContent)
}
async function writeFile(data={}){
    let existingUsers = await readFile()
    existingUsers.push(data)
    existingUsers = JSON.stringify(existingUsers)
    await fs.promises.writeFile('./users.json', existingUsers, {encoding: 'utf-8'})
}

export default api