const imageSelector = document.querySelector('.selected-image')
imageSelector.onchange = (e) => getHex(e)

const beforeImage = document.querySelector('.heximage-before')
const afterImage = document.querySelector('.heximage-after')

const corruptButton = document.querySelector('.corrupt')
const corruptTenTimesButton = document.querySelector('.corrupt-ten-times')
const resetButton = document.querySelector('.reset')

const formImageFile = document.querySelector('.image-file')
const formImageSubmitButton = document.querySelector('.submit-image')

let imageData
let beforeByteArray
let afterByteArray
let fileExtension

function getHex(e) {
    // console.log('> getHex invoked!')
    if (formImageSubmitButton.type === 'submit') { formImageSubmitButton.type = 'hidden' }
    const pad = (str, len) => str.length < len ? pad('0' + str, len) : str

    let af = null

    // using Promise handling file processing
    function readFile(file) {
        // console.log(file)
        if (!file) {
            // console.log('Error: no file detected!')
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

        if (result) {
            corruptButton.type = 'button'
            corruptTenTimesButton.type = 'button'
            resetButton.type = 'button'
        }
        return newImageConvert(result)
    }

    if (!e.target.value) { return }

    readFile(e.target.files[0])
        .then(fileBuffer => { af = fileBuffer })
        .then(() => renderData())
}

function newImageConvert(input) {
    // console.log('> newImageConvert invoked!')
    fileExtension = imageSelector.value.substr(imageSelector.value.lastIndexOf(".") + 1)
    URL.revokeObjectURL(beforeImage.src)
    URL.revokeObjectURL(afterImage.src)

    let binary = new Array()
    for (let i = 0; i < input.length / 2; i++) {
        let h = input.substr(i * 2, 2)
        binary[i] = parseInt(h, 16)
    }

    let byteArray = new Uint8Array(binary)

    beforeByteArray = byteArray.slice(0)
    afterByteArray = byteArray.slice(0)
    beforeImage.src = URL.createObjectURL(new Blob([beforeByteArray], { type: `image/${fileExtension}` }))
    afterImage.src = URL.createObjectURL(new Blob([afterByteArray], { type: `image/${fileExtension}` }))
}

function changeAfterImage() {
    // console.log('> changeAfterImage invoked!')
    URL.revokeObjectURL(afterImage.src)

    // Possible placeholder for corruption settings

    // Uncomment to glitch the image from a clean slate each time
    // afterByteArray = beforeByteArray.slice(0)

    const randomIndex1 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    // const randomIndex2 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    // const randomIndex3 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    // const randomIndex4 = Math.floor(Math.random() * afterByteArray.length - 16) + 16

    // Possibly eventually for displaying hex values on-screen
    // const beforeValue1 = afterByteArray[randomIndex1]
    // const beforeValue2 = afterByteArray[randomIndex2]
    // const beforeValue3 = afterByteArray[randomIndex3]
    // const beforeValue4 = afterByteArray[randomIndex4]

    afterByteArray[randomIndex1] = Math.floor(Math.random() * 256)
    // afterByteArray[randomIndex2] = Math.floor(Math.random() * 256)
    // afterByteArray[randomIndex3] = Math.floor(Math.random() * 256)
    // afterByteArray[randomIndex4] = Math.floor(Math.random() * 256)

    // Example rendering of hex values
    // console.log(`1) Byte ${randomIndex1.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue1.toString(16).padStart(2, '0').toUpperCase()} => ${afterByteArray[randomIndex1].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`2) Byte ${randomIndex2.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue2.toString(16).padStart(2, '0').toUpperCase()} => ${afterByteArray[randomIndex2].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`3) Byte ${randomIndex3.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue3.toString(16).padStart(2, '0').toUpperCase()} => ${afterByteArray[randomIndex3].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`4) Byte ${randomIndex4.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue4.toString(16).padStart(2, '0').toUpperCase()} => ${afterByteArray[randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)

    afterImage.src = URL.createObjectURL(new Blob([afterByteArray], { type: `image/${fileExtension}` }))

    let glitchedFile = new File([afterByteArray], `${afterImage.src.substr(afterImage.src.lastIndexOf('/') + 1)}.${fileExtension}`, { type: `image/${fileExtension}` })
    let fileStorage = new DataTransfer()
    fileStorage.items.add(glitchedFile)
    formImageFile.files = fileStorage.files
    if (formImageSubmitButton.type === 'hidden') { formImageSubmitButton.type = 'submit' }
}

function resetAfterImage() {
    // console.log('> resetAfterImage invoked!')
    formImageSubmitButton.type = 'hidden'
    URL.revokeObjectURL(afterImage.src)
    afterByteArray = beforeByteArray.slice(0)
    afterImage.src = URL.createObjectURL(new Blob([afterByteArray], { type: `image/${fileExtension}` }))
}

function bigGlitch() {
    // console.log('> bigGlitch invoked!')
    URL.revokeObjectURL(afterImage.src)
    const randomIndex1 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex2 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex3 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex4 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex5 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex6 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex7 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex8 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex9 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    const randomIndex10 = Math.floor(Math.random() * afterByteArray.length - 16) + 16
    
    // Possibly eventually for displaying hex values on-screen
    // const beforeValue1 = afterByteArray[randomIndex1]
    // const beforeValue2 = afterByteArray[randomIndex2]
    // const beforeValue3 = afterByteArray[randomIndex3]
    // const beforeValue4 = afterByteArray[randomIndex4]
    // const beforeValue5 = afterByteArray[randomIndex5]
    // const beforeValue6 = afterByteArray[randomIndex6]
    // const beforeValue7 = afterByteArray[randomIndex7]
    // const beforeValue8 = afterByteArray[randomIndex8]
    // const beforeValue9 = afterByteArray[randomIndex9]
    // const beforeValue10 = afterByteArray[randomIndex10]

    afterByteArray[randomIndex1] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex2] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex3] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex4] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex5] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex6] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex7] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex8] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex9] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndex10] = Math.floor(Math.random() * 256)

    // Example rendering of hex values
    // console.log(`1) Byte 0x${randomIndex1.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue1.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex1].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`2) Byte 0x${randomIndex2.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue2.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex2].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`3) Byte 0x${randomIndex3.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue3.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex3].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`4) Byte 0x${randomIndex4.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue4.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`5) Byte 0x${randomIndex5.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue5.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`6) Byte 0x${randomIndex6.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue6.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`7) Byte 0x${randomIndex7.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue7.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`8) Byte 0x${randomIndex8.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue8.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`9) Byte 0x${randomIndex9.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue9.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`10) Byte 0x${randomIndex10.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue10.toString(16).padStart(2, '0').toUpperCase()} => 0x${afterByteArray[randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)

    afterImage.src = URL.createObjectURL(new Blob([afterByteArray], { type: `image/${fileExtension}` }))

    let glitchedFile = new File([afterByteArray], `${afterImage.src.substr(afterImage.src.lastIndexOf('/') + 1)}.${fileExtension}`, { type: `image/${fileExtension}` })
    let fileStorage = new DataTransfer()
    fileStorage.items.add(glitchedFile)
    formImageFile.files = fileStorage.files
    if (formImageSubmitButton.type === 'hidden') { formImageSubmitButton.type = 'submit' }
}

function doItTwentyTimes() {
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