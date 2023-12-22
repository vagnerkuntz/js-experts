import { createServer } from 'node:http'
import { statusCodes } from './util/httpStatusCode.js'
import HeroEntity from './heroEntity.js'

async function handler(request, response) {
    for await (const data of request) {
        try {
            const parsedData = JSON.parse(data)
            
            // simulando outro erro, por exemplo de banco de dados
            if (Reflect.has(parsedData, 'connectionError')) {
                // erro generico para trazer outro cenario de erro inexperado
                throw new Error('Connection error!')
            }
            
            const hero = new HeroEntity(parsedData)
            if (!hero.isValid()) {
                response.writeHead(statusCodes.BAD_REQUEST)
                response.end(hero.notifications.join('\n'))
                continue
            }

            // continua a execucao
            response.writeHead(statusCodes.OK)
            response.end()
        } catch (error) {
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            response.end()
        }
    }
}

createServer(handler).listen(3000, () => console.log('Server started, running on port 3000'))

/**
 * curl -i localhost:3000 -X POST --data '{"name": "John Doe", "age": 30}'
 */