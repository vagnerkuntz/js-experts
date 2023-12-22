import { createServer } from 'node:http'
import BusinessError from './errors/businessError.js'
import { statusCodes } from './util/httpStatusCode.js'

function validateHero(hero) {
    // simulando outro erro, por exemplo de banco de dados
    if (Reflect.has(hero, 'connectionError')) {
        // erro generico para trazer outro cenario de erro inexperado
        throw new Error('Connection error!')
    }
    
    if (hero.age < 20) {
        throw new BusinessError('Hero must be higher than 20!')
    }

    if (hero.name?.length < 3) {
        throw new BusinessError('Hero name must be higher than 3 characters!')
    }
}

async function handler(request, response) {
    for await (const data of request) {
        try {
            const hero = JSON.parse(data)
            // console.log(hero)
            validateHero(hero)
            response.writeHead(statusCodes.OK)
            response.end()
        } catch (error) {
            if (error instanceof BusinessError) {
                response.writeHead(statusCodes.BAD_REQUEST)
                response.end(error.message)
                continue
            }
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            response.end()
        }
    }
}

createServer(handler).listen(3000, () => console.log('Server started, running on port 3000'))

/**
 * curl -i localhost:3000 -X POST --data '{"name": "John Doe", "age": 30}'
 */