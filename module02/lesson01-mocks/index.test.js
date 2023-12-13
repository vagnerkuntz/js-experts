const { error } = require("./src/constants")
const File = require("./src/file")
const assert = require("assert")

// IFEE
;(async () => {
    // variables created in this block are only valid during its execution
    {
        const filePath = "./mocks/emptyFile-invalid.csv"
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = "./mocks/invalid-header.csv"
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = "./mocks/fiveItems-invalid.csv"
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = "./mocks/threeItems-valid.csv"
        const expected = [
            {
                id: 1,
                name: "xuxa da0 silva",
                profession: "developer",
                age: 120
            },
            {
                id: 2,
                name: "xuxa da1 silva",
                profession: "manager",
                age: 90
            },
            {
                id: 3,
                name: "xuxa da2 silva",
                profession: "devops",
                age: 30
            }
        ]
        const result = await File.csvToJson(filePath)
        await assert.deepEqual(result, expected)
    }
})()