const imageSelector = document.querySelector('.selected-image')
imageSelector.onchange = (e) => getHex(e)

const beforeImage = document.querySelector('.heximage-before')
const afterImage = document.querySelector('.heximage-after')

const corruptButton = document.querySelector('.corrupt')
const corruptTenTimesButton = document.querySelector('.corrupt-ten-times')
const resetButton = document.querySelector('.reset')
const undoButton = document.querySelector('.undo')
const redoButton = document.querySelector('.redo')

const formImageFile = document.querySelector('.image-file')
const formImageSubmitButton = document.querySelector('.submit-image')

let imageData
// let beforeByteArray
// let afterByteArray
let fileExtension
let memoryBank = []
let memoryPoint = 0

function undoGlitch() {
    console.log(`*** UNDO ***`)
    URL.revokeObjectURL(afterImage.src)
    redoButton.disabled = false
    memoryPoint -= 1
    console.log("memoryBank.length:", memoryBank.length, "memoryPoint:", memoryPoint)

    afterImage.src = URL.createObjectURL(new Blob([memoryBank[memoryPoint]], { type: `image/${fileExtension}` }))

    if (memoryPoint === 0) {
        undoButton.disabled = true
    }
}

function redoGlitch() {
    console.log(`*** REDO ***`)
    URL.revokeObjectURL(afterImage.src)
    undoButton.disabled = false
    memoryPoint += 1
    console.log("memoryBank.length:", memoryBank.length, "memoryPoint:", memoryPoint)

    afterImage.src = URL.createObjectURL(new Blob([memoryBank[memoryPoint]], { type: `image/${fileExtension}` }))

    if (memoryPoint === memoryBank.length - 1) {
        redoButton.disabled = true
    }
}

function resetAfterImage() {
    console.log('> resetAfterImage invoked!')
    URL.revokeObjectURL(afterImage.src)
    formImageSubmitButton.disabled = true
    undoButton.disabled = true
    redoButton.disabled = true
    memoryBank.length = 1
    memoryPoint = 0

    console.log("memoryBank.length:", memoryBank.length, "memoryPoint:", memoryPoint)
    afterImage.src = URL.createObjectURL(new Blob([memoryBank[memoryPoint]], { type: `image/${fileExtension}` }))
}

function getHex(e) {
    console.log('> getHex invoked!')
    formImageSubmitButton.disabled = true
    undoButton.disabled = true
    redoButton.disabled = true
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
            undoButton.type = 'button'
            redoButton.type = 'button'
        }
        return newImageConvert(result)
    }

    if (!e.target.value) { return }

    readFile(e.target.files[0])
        .then(fileBuffer => { af = fileBuffer })
        .then(() => renderData())
}

// Converting accepted image to a hex array
function newImageConvert(input) {
    console.log('> newImageConvert invoked!')
    memoryBank.length = 0
    memoryPoint = 0
    fileExtension = imageSelector.value.substr(imageSelector.value.lastIndexOf(".") + 1)
    // URL.revokeObjectURL(beforeImage.src)
    // URL.revokeObjectURL(afterImage.src)

    let binary = new Array()
    for (let i = 0; i < input.length / 2; i++) {
        let h = input.substr(i * 2, 2)
        binary[i] = parseInt(h, 16)
    }

    let byteArray = new Uint8Array(binary)

    memoryBank.push(byteArray.slice(0))

    // console.log('memoryBank:', memoryBank)
    // console.log('memoryPoint:', memoryPoint)
    beforeImage.src = URL.createObjectURL(new Blob([memoryBank[memoryPoint]], { type: `image/${fileExtension}` }))
    afterImage.src = URL.createObjectURL(new Blob([memoryBank[memoryPoint]], { type: `image/${fileExtension}` }))
}

// "Corrupt x 1" button (change function name/destructure when there are more corruption settings)
function changeAfterImage() {
    console.log('> changeAfterImage invoked!')
    memoryPoint += 1
    memoryBank.length = memoryPoint
    URL.revokeObjectURL(afterImage.src)
    memoryBank.push(memoryBank[memoryPoint - 1].slice(0))

    // Possible placeholder for corruption settings
    // Make it possible to "anchor" a memory point to manage corruption forks

    // Pick random array index/indices to corrupt, skipping the first 16 bytes
    const randomIndex1 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    // const randomIndex2 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    // const randomIndex3 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    // const randomIndex4 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16

    // Possibly eventually for displaying hex values on-screen (ignore until ready to entertain flashy corruption visuals)
    // const beforeValue1 = memoryBank[memoryPoint][randomIndex1]
    // const beforeValue2 = memoryBank[memoryPoint][randomIndex2]
    // const beforeValue3 = memoryBank[memoryPoint][randomIndex3]
    // const beforeValue4 = memoryBank[memoryPoint][randomIndex4]

    // Corrupting indices by changing to a random number between 0x00 and 0xFF
    memoryBank[memoryPoint][randomIndex1] = Math.floor(Math.random() * 256)
    // memoryBank[memoryPoint][randomIndex2] = Math.floor(Math.random() * 256)
    // memoryBank[memoryPoint][randomIndex3] = Math.floor(Math.random() * 256)
    // memoryBank[memoryPoint][randomIndex4] = Math.floor(Math.random() * 256)

    // Example rendering of hex values (ignore until ready to entertain flashy corruption visuals)
    // console.log(`1) Byte ${randomIndex1.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue1.toString(16).padStart(2, '0').toUpperCase()} => ${memoryBank[memoryPoint][randomIndex1].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`2) Byte ${randomIndex2.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue2.toString(16).padStart(2, '0').toUpperCase()} => ${memoryBank[memoryPoint][randomIndex2].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`3) Byte ${randomIndex3.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue3.toString(16).padStart(2, '0').toUpperCase()} => ${memoryBank[memoryPoint][randomIndex3].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`4) Byte ${randomIndex4.toString(16).padStart(2, '0').toUpperCase()}: ${beforeValue4.toString(16).padStart(2, '0').toUpperCase()} => ${memoryBank[memoryPoint][randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)

    console.log("memoryBank.length:", memoryBank.length, "memoryPoint:", memoryPoint)
    afterImage.src = URL.createObjectURL(new Blob([memoryBank[memoryPoint]], { type: `image/${fileExtension}` }))
    undoButton.disabled = false
    redoButton.disabled = true

    let glitchedFile = new File([memoryBank[memoryPoint]], `${afterImage.src.substr(afterImage.src.lastIndexOf('/') + 1)}.${fileExtension}`, { type: `image/${fileExtension}` })
    let fileStorage = new DataTransfer()
    fileStorage.items.add(glitchedFile)
    formImageFile.files = fileStorage.files
    if (formImageSubmitButton.type === 'hidden') { formImageSubmitButton.type = 'submit' }
}

function bigGlitch() {
    console.log('> bigGlitch invoked!')
    memoryPoint += 1
    memoryBank.length = memoryPoint
    URL.revokeObjectURL(afterImage.src)
    memoryBank.push(memoryBank[memoryPoint - 1].slice(0))

    const randomIndex1 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    const randomIndex2 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    const randomIndex3 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    const randomIndex4 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    const randomIndex5 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    const randomIndex6 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    const randomIndex7 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    const randomIndex8 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    const randomIndex9 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16
    const randomIndex10 = Math.floor(Math.random() * memoryBank[memoryPoint].length - 16) + 16

    // Possibly eventually for displaying hex values on-screen
    // const beforeValue1 = memoryBank[memoryPoint][randomIndex1]
    // const beforeValue2 = memoryBank[memoryPoint][randomIndex2]
    // const beforeValue3 = memoryBank[memoryPoint][randomIndex3]
    // const beforeValue4 = memoryBank[memoryPoint][randomIndex4]
    // const beforeValue5 = memoryBank[memoryPoint][randomIndex5]
    // const beforeValue6 = memoryBank[memoryPoint][randomIndex6]
    // const beforeValue7 = memoryBank[memoryPoint][randomIndex7]
    // const beforeValue8 = memoryBank[memoryPoint][randomIndex8]
    // const beforeValue9 = memoryBank[memoryPoint][randomIndex9]
    // const beforeValue10 = memoryBank[memoryPoint][randomIndex10]

    memoryBank[memoryPoint][randomIndex1] = Math.floor(Math.random() * 256)
    memoryBank[memoryPoint][randomIndex2] = Math.floor(Math.random() * 256)
    memoryBank[memoryPoint][randomIndex3] = Math.floor(Math.random() * 256)
    memoryBank[memoryPoint][randomIndex4] = Math.floor(Math.random() * 256)
    memoryBank[memoryPoint][randomIndex5] = Math.floor(Math.random() * 256)
    memoryBank[memoryPoint][randomIndex6] = Math.floor(Math.random() * 256)
    memoryBank[memoryPoint][randomIndex7] = Math.floor(Math.random() * 256)
    memoryBank[memoryPoint][randomIndex8] = Math.floor(Math.random() * 256)
    memoryBank[memoryPoint][randomIndex9] = Math.floor(Math.random() * 256)
    memoryBank[memoryPoint][randomIndex10] = Math.floor(Math.random() * 256)

    // Example rendering of hex values
    // console.log(`1) Byte 0x${randomIndex1.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue1.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex1].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`2) Byte 0x${randomIndex2.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue2.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex2].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`3) Byte 0x${randomIndex3.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue3.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex3].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`4) Byte 0x${randomIndex4.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue4.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex4].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`5) Byte 0x${randomIndex5.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue5.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex5].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`6) Byte 0x${randomIndex6.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue6.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex6].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`7) Byte 0x${randomIndex7.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue7.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex7].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`8) Byte 0x${randomIndex8.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue8.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex8].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`9) Byte 0x${randomIndex9.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue9.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex9].toString(16).padStart(2, '0').toUpperCase()}`)
    // console.log(`10) Byte 0x${randomIndex10.toString(16).padStart(2, '0').toUpperCase()}: 0x${beforeValue10.toString(16).padStart(2, '0').toUpperCase()} => 0x${memoryBank[memoryPoint][randomIndex10].toString(16).padStart(2, '0').toUpperCase()}`)

    console.log("memoryBank.length:", memoryBank.length, "memoryPoint:", memoryPoint)
    afterImage.src = URL.createObjectURL(new Blob([memoryBank[memoryPoint]], { type: `image/${fileExtension}` }))
    undoButton.disabled = false
    redoButton.disabled = true

    let glitchedFile = new File([memoryBank[memoryPoint]], `${afterImage.src.substr(afterImage.src.lastIndexOf('/') + 1)}.${fileExtension}`, { type: `image/${fileExtension}` })
    let fileStorage = new DataTransfer()
    fileStorage.items.add(glitchedFile)
    formImageFile.files = fileStorage.files
    if (formImageSubmitButton.type === 'hidden') { formImageSubmitButton.type = 'submit' }
}