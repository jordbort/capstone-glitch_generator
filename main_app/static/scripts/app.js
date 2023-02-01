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

    beforeImage.src = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }))
    afterImage.src = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }))
    beforeByteArray = byteArray
    afterByteArray = beforeByteArray
    beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
    // afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')
    //document.body.appendChild(beforeImage)
}

function changeAfterImage() {
    // afterByteArray = beforeByteArray
    console.log('> changeAfterImage invoked!')

    if (afterByteArray) {
        console.log('afterByteArray.length:', afterByteArray.length)
    } else {
        console.log('no afterByteArray data')
        return
    }

    const randomIndex1 = Math.floor(Math.random() * beforeByteArray.length - 100) + 100
    const randomIndex2 = Math.floor(Math.random() * beforeByteArray.length - 100) + 100
    const randomIndex3 = Math.floor(Math.random() * beforeByteArray.length - 100) + 100
    const randomIndex4 = Math.floor(Math.random() * beforeByteArray.length - 100) + 100
    console.log('* Random index 1:', 51)
    console.log('* Random index 2:', 52)
    console.log('* Random index 3:', 53)
    console.log('* Random index 4:', 54)

    console.log('Index 1 before:', afterByteArray[1])
    console.log('Index 2 before:', afterByteArray[2])
    console.log('Index 3 before:', afterByteArray[3])
    console.log('Index 4 before:', afterByteArray[4])
    afterByteArray[1] = Math.floor(Math.random() * 256)
    afterByteArray[2] = Math.floor(Math.random() * 256)
    afterByteArray[3] = Math.floor(Math.random() * 256)
    afterByteArray[4] = Math.floor(Math.random() * 256)
    console.log('Index 1 after:', afterByteArray[1])
    console.log('Index 2 after:', afterByteArray[2])
    console.log('Index 3 after:', afterByteArray[3])
    console.log('Index 4 after:', afterByteArray[4])


    // afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')
    afterImage.src = window.URL.createObjectURL(new Blob([afterByteArray], { type: 'application/octet-stream' }))
    console.log('afterImage.src:', afterImage.src)
}

function resetAfterImage() {
    console.log(beforeByteArray)
    console.log(afterByteArray)
    console.log(beforeByteArray === afterByteArray)
}