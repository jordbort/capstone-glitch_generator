let imageData
let beforeByteArray
// let afterByteArray
// ; ((doc) => {
function getHex(e) {
    console.log('> getHex invoked!')
    imageData ? console.log('there is before image data!', imageData.substr(0, 8) + '...') : console.log('no before image data')
    // beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
    // afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')
    // 'use strict';

    // var store = Object.create(null)
    // const $ = (selector) => doc.querySelector(selector);
    // if binary, pad('1', 8) => 00000001
    const pad = (str, len) => str.length < len ? pad('0' + str, len) : str;

    // input[type="file"]
    // let control = $('.control')
    // let control = doc.querySelector('.control')
    // let control = document.querySelector('.control')
        // , output = $('.output')
        // , checkbox = $('[type="checkbox"]')
        let af = null
        // , store = {}

    // using Promise handling file processing
    const readFile = (file) => {
        // console.log(file)
        // if (!file) { return; }
        let FR = new FileReader();
        return new Promise((resolve, reject) => {
            FR.onloadend = (evt) => { resolve(evt.target.result); };
            FR.onerror = (err) => { reject(event.target.error); };
            FR.readAsArrayBuffer(file);
        })
    }

    const showData = () => {
        // if check checkbox before select a file, return
        if (!af) { return; }

        // toString => binary:2 || hex:16 
        // let scale = !checkbox.checked ? 2 : 16
            // format style purpose
            // 8 => binary: 1 => 00000001 || 2 => hex: 1 => 01   
            // let padValue = 2
            let view = new DataView(af)
            let result = ''
            // , offset = (8 / 8)

        // if value has been cache in store, use store value
        // if (store[scale]) {
        //     output.innerHTML = store[scale];
        //     return
        // }

        for (let i = 0; i < view.byteLength; i++) {
            let value = view.getUint8(i).toString(16)
            // result += pad(value, padValue) + ' ';
            result += pad(value, 2);
            // result += value
            // make 4 byte per line
            // result += ((i - 3) % 4 === 0) ? '<br/>' : '';
        }

        // make 1st-time-value into store then output result
        // store[scale] = output.innerHTML = result
        // console.log(result)
        // convert(result)
        // return result
        // return
        imageData = result
        imageData ? console.log('there is before image data!', imageData.substr(0, 8) + '...') : console.log('no before image data')
        // beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
        // afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')
        return newImageConvert(result)
    }

    // control.onchange = (e) => {
        // console.log(e.target.value)
        if (!e.target.value) { return; }
        readFile(e.target.files[0])
            // set file buffer 
            .then(fileBuffer => { af = fileBuffer })
            .then(() => showData())
    // }

    // checkbox.onchange = showData

// })(document)
}

imageData ? console.log('there is before image data!', imageData.substr(0, 8) + '...') : console.log('no before image data')
beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
// afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')

function newImageConvert(input) {
    console.log('> newImageConvert invoked!')
    imageData ? console.log('there is before image data!', imageData.substr(0, 8) + '...') : console.log('no before image data')
    beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
    // let input = document.frmConvert.hex.value.replace(/[^A-Fa-f0-9]/g, "");
    // if (input.length % 2) {
    //     console.log("cleaned hex string length is odd.");
    //     return;
    // }

    let binary = new Array();
    for (let i = 0; i < input.length / 2; i++) {
        let h = input.substr(i * 2, 2);
        binary[i] = parseInt(h, 16);
    }

    let byteArray = new Uint8Array(binary);
    let beforeImage = document.querySelector('.heximage-before');
    let afterImage = document.querySelector('.heximage-after');

    beforeImage.src = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }));
    afterImage.src = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }));
    beforeByteArray = byteArray
    // afterByteArray = beforeByteArray
    beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
    // afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')
    //document.body.appendChild(beforeImage)
}

function changeAfterImage() {
    afterByteArray = beforeByteArray
    console.log('> changeAfterImage invoked!')
    // imageData ? console.log('there is before image data!', imageData.substr(0, 8) + '...') : console.log('no before image data')
    // beforeByteArray ? console.log('beforeByteArray.length:', beforeByteArray.length) : console.log('no beforeByteArray data')
    if (afterByteArray) {
        console.log('afterByteArray.length:', afterByteArray.length)
    } else {
        console.log('no afterByteArray data')
        return
    }

    const randomIndexOne = Math.floor(Math.random() * beforeByteArray.length - 100) + 100
    const randomIndexTwo = Math.floor(Math.random() * beforeByteArray.length - 100) + 100
    const randomIndexThree = Math.floor(Math.random() * beforeByteArray.length - 100) + 100
    const randomIndexFour = Math.floor(Math.random() * beforeByteArray.length - 100) + 100
    console.log('* Random index 1:', randomIndexOne)
    console.log('* Random index 2:', randomIndexTwo)
    console.log('* Random index 3:', randomIndexThree)
    console.log('* Random index 4:', randomIndexFour)

    console.log('Index 1 before:', afterByteArray[randomIndexOne])
    console.log('Index 2 before:', afterByteArray[randomIndexTwo])
    console.log('Index 3 before:', afterByteArray[randomIndexThree])
    console.log('Index 4 before:', afterByteArray[randomIndexFour])
    afterByteArray[randomIndexOne] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndexTwo] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndexThree] = Math.floor(Math.random() * 256)
    afterByteArray[randomIndexFour] = Math.floor(Math.random() * 256)
    console.log('Index 1 after:', afterByteArray[randomIndexOne])
    console.log('Index 2 after:', afterByteArray[randomIndexTwo])
    console.log('Index 3 after:', afterByteArray[randomIndexThree])
    console.log('Index 4 after:', afterByteArray[randomIndexFour])
    
    let afterImage = document.querySelector('.heximage-after');
    
    // afterByteArray ? console.log('afterByteArray.length:', afterByteArray.length) : console.log('no afterByteArray data')
    afterImage.src = window.URL.createObjectURL(new Blob([afterByteArray], { type: 'application/octet-stream' }));
}

// document.querySelector('.control').onchange = (e) => getHex(e)
document.querySelector('.control').onchange = (e) => getHex(e)
// console.log('data:', data)
// console.log(getHex(document))
// console.log(result)
// document.querySelector('.control').onchange = async (e) => {
//     // console.log(getHex(e))
//     let data
//     try {
//         console.log('trying...')
//         data = getHex(e)
//     } catch (err) {
//         console.log('caught something!')
//         console.error(err.message)
//     } finally {
//         console.log('finally...!')
//         console.log(data)
//     }
// }