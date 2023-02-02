const imageSelector = document.querySelector('.control')
imageSelector.onchange = (e) => getHex(e)

const beforeImage = document.querySelector('.heximage-before')
const afterImage = document.querySelector('.heximage-after')

const corruptButton = document.querySelector('.corrupt')
const corruptTenTimesButton = document.querySelector('.corrupt-ten-times')
const resetButton = document.querySelector('.reset')

let imageData
let beforeByteArray
let afterByteArray

function getHex(e) {
    console.log('> getHex invoked!')

    const pad = (str, len) => str.length < len ? pad('0' + str, len) : str

    let af = null

    // using Promise handling file processing
    function readFile(file) {
        // console.log(file)
        if (!file) {
            console.log('Error: no file detected!')
            return
        }
        let FR = new FileReader()
        return new Promise((resolve, reject) => {
            FR.onloadend = (evt) => { resolve(evt.target.result) }
            FR.onerror = (err) => { reject(event.target.error) }
            FR.readAsArrayBuffer(file)
        })
    }

    function renderData() {
        if (!af) { return }

        let view = new DataView(af)
        let result = ''

        for (let i = 0; i < view.byteLength; i++) {
            let value = view.getUint8(i).toString(16)
            result += pad(value, 2)
        }

        result ? corruptButton.type = 'button' : null
        result ? corruptTenTimesButton.type = 'button' : null
        result ? resetButton.type = 'button' : null
        return newImageConvert(result)
    }

    if (!e.target.value) {
        // console.log('no file selected')
        // beforeImage.src = ""
        // beforeImage.alt = "nope"
        // afterImage.src = ""
        // afterImage.alt = "nope"
        return
    }

    readFile(e.target.files[0])
        .then(fileBuffer => { af = fileBuffer })
        .then(() => renderData())
}

function newImageConvert(input) {
    console.log('> newImageConvert invoked!')

    let binary = new Array()
    for (let i = 0; i < input.length / 2; i++) {
        let h = input.substr(i * 2, 2)
        binary[i] = parseInt(h, 16)
    }

    let byteArray = new Uint8Array(binary)

    beforeByteArray = byteArray.slice(0)
    afterByteArray = byteArray.slice(0)
    beforeImage.src = window.URL.createObjectURL(new Blob([beforeByteArray], { type: 'application/octet-stream' }))
    afterImage.src = window.URL.createObjectURL(new Blob([afterByteArray], { type: 'application/octet-stream' }))
}

function changeAfterImage() {
    console.log('> changeAfterImage invoked!')
    // afterByteArray = beforeByteArray.slice(0)

    if (!afterByteArray) {
        console.log('no afterByteArray data')
        return
    }

    const randomIndex1 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex2 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex3 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex4 = Math.floor(Math.random() * afterByteArray.length - 16) + 16

    const beforeValue1 = afterByteArray[randomIndex1]
    const beforeValue2 = afterByteArray[randomIndex2]
    const beforeValue3 = afterByteArray[randomIndex3]
    const beforeValue4 = afterByteArray[randomIndex4]

    afterByteArray[randomIndex1] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex2] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex3] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex4] = Math.floor(Math.random() * 256)

    console.log(`1) Byte ${randomIndex1.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue1.toString(16).padStart(2, '0').toUpperCase()} => ${afterByteArray[randomIndex1].toString(16).padStart(2, '0').toUpperCase()}`)
    console.log(`2) Byte ${randomIndex2.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue2.toString(16).padStart(2, '0').toUpperCase()} => ${afterByteArray[randomIndex2].toString(16).padStart(2, '0').toUpperCase()}`)
    console.log(`3) Byte ${randomIndex3.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue3.toString(16).padStart(2, '0').toUpperCase()} => ${afterByteArray[randomIndex3].toString(16).padStart(2, '0').toUpperCase()}`)
    console.log(`4) Byte ${randomIndex4.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue4.toString(16).padStart(2, '0').toUpperCase()} => ${afterByteArray[randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)

    afterImage.src = window.URL.createObjectURL(new Blob([afterByteArray], { type: 'application/octet-stream' }))
    // console.log('afterImage.src:', afterImage.src)
}

function resetAfterImage() {
    console.log('> resetAfterImage invoked!')
    afterByteArray = beforeByteArray.slice(0)
    afterImage.src = window.URL.createObjectURL(new Blob([afterByteArray], { type: 'application/octet-stream' }))
}

function doItTenTimes() {
    changeAfterImage()
    changeAfterImage()
    changeAfterImage()
    changeAfterImage()
    changeAfterImage()
    changeAfterImage()
    changeAfterImage()
    changeAfterImage()
    changeAfterImage()
    changeAfterImage()
}