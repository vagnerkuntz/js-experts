const { error } = require('./constants')
const { readFile } = require('fs/promises')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"]
}

class File {
    static async csvToJson(filePath) {
        const content = await readFile(filePath, "utf8")
        const validation = this.isValid(content)
        if (!validation.valid) throw new Error(validation.error)

        const result = this.parseCSVToJSON(content)
        return result
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        // to see the contents of the file
        // fs.readFileSync('./mocks/threeItems-valid.csv', 'utf8')

        // [0] - header
        // [1] - first line
        // [2] - second line
        // ...variable - spread operator - rest of the file
        const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/)

        const isHeaderValid = headers === options.fields.join(",")
        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        if (!fileWithoutHeader.length || fileWithoutHeader.length > options.maxLines) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true }
    }

    static parseCSVToJSON(csvString) {
        const lines = csvString.split(/\r?\n/)

        // remove the first line
        const firstLine = lines.shift()
        const header = firstLine.split(",")

        const users = lines.map(line => {
            const columns = line.split(",")
            const user = {}
            for(const index in columns) {
                user[header[index]] = columns[index].trim()
            }
            return user
        })

        return users
    }
}

module.exports = File