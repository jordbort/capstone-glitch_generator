const imageSelector = document.querySelector('.control')
imageSelector.onchange = (e) => getHex(e)

// Somehow, before and after byte arrays aren't different?

const beforeImage = document.querySelector('.heximage-before')
const afterImage = document.querySelector('.heximage-after')


const corruptButton = document.querySelector('.corrupt')
const resetButton = document.querySelector('.reset')
// corruptButton.type = 'hidden'
console.log(corruptButton.type)

let imageData
let beforeByteArray
let afterByteArray

function getHex(e) {
    console.log('> getHex invoked!')
    imageData ? console.log('there is before image data!', imageData.substr(0, 8) + '...') : console.log('no before image data')
    // beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
    // afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')

    const pad = (str, len) => str.length < len ? pad('0' + str, len) : str

    let af = null

    // using Promise handling file processing
    const readFile = (file) => {
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

    const showData = () => {
        if (!af) { return }

        let view = new DataView(af)
        let result = ''

        for (let i = 0; i < view.byteLength; i++) {
            let value = view.getUint8(i).toString(16)
            result += pad(value, 2)
        }

        imageData = result
        imageData ? console.log('there is before image data!', imageData.substr(0, 8) + '...') : console.log('no before image data')
        imageData ? corruptButton.type = 'button' : null
        imageData ? resetButton.type = 'button' : null
        // beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
        // afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')
        return newImageConvert(result)
    }

    if (!e.target.value) {
        // console.log('no file selected?')
        // beforeImage.src = ""
        // beforeImage.alt = "nope"
        // afterImage.src = ""
        // afterImage.alt = "nope"
        return
    }
    readFile(e.target.files[0])
        // set file buffer 
        .then(fileBuffer => { af = fileBuffer })
        .then(() => showData())
}

imageData ? console.log('there is before image data!', imageData.substr(0, 8) + '...') : console.log('no before image data')
beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
// afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')

function newImageConvert(input) {
    console.log('> newImageConvert invoked!')
    imageData ? console.log('there is before image data!', imageData.substr(0, 8) + '...') : console.log('no before image data')
    beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')

    let binary = new Array()
    for (let i = 0; i < input.length / 2; i++) {
        let h = input.substr(i * 2, 2)
        binary[i] = parseInt(h, 16)
    }

    let byteArray = new Uint8Array(binary)

    beforeByteArray = byteArray
    afterByteArray = byteArray
    beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
    afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')
    beforeImage.src = window.URL.createObjectURL(new Blob([beforeByteArray], { type: 'application/octet-stream' }))
    afterImage.src = window.URL.createObjectURL(new Blob([afterByteArray], { type: 'application/octet-stream' }))
}

function changeAfterImage() {
    console.log('> changeAfterImage invoked!')

    if (afterByteArray) {
        console.log('afterByteArray.length:', afterByteArray.length)
    } else {
        console.log('no afterByteArray data')
        return
    }

    const randomIndex1 = Math.floor(Math.random() * afterByteArray.length - 100) + 100
    const randomIndex2 = Math.floor(Math.random() * afterByteArray.length - 100) + 100
    const randomIndex3 = Math.floor(Math.random() * afterByteArray.length - 100) + 100
    const randomIndex4 = Math.floor(Math.random() * afterByteArray.length - 100) + 100
    console.log('* Random index 1:', randomIndex1)
    console.log('* Random index 2:', randomIndex2)
    console.log('* Random index 3:', randomIndex3)
    console.log('* Random index 4:', randomIndex4)

    console.log('Index 1 before:', afterByteArray[randomIndex1])
    console.log('Index 2 before:', afterByteArray[randomIndex2])
    console.log('Index 3 before:', afterByteArray[randomIndex3])
    console.log('Index 4 before:', afterByteArray[randomIndex4])
    afterByteArray[randomIndex1] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex2] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex3] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex4] = Math.floor(Math.random() * 256)
    console.log('Index 1 after:', afterByteArray[randomIndex1])
    console.log('Index 2 after:', afterByteArray[randomIndex2])
    console.log('Index 3 after:', afterByteArray[randomIndex3])
    console.log('Index 4 after:', afterByteArray[randomIndex4])


    // afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')
    afterImage.src = window.URL.createObjectURL(new Blob([afterByteArray], { type: 'application/octet-stream' }))
    console.log('afterImage.src:', afterImage.src)
}

function resetAfterImage() {
    console.log('before:', beforeByteArray)
    console.log('after:', afterByteArray)
    console.log('same?', beforeByteArray === afterByteArray)
}