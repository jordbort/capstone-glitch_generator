let imageData
// ; ((doc) => {
function getHex(e) {
    console.log('getHex invoked!')
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

imageData ? console.log('there is image data!', imageData.substr(0, 8) + '...') : console.log('no image data')
function newImageConvert(input) {
    console.log('newImageConvert invoked!')
    imageData ? console.log('there is image data!', imageData.substr(0, 8) + '...') : console.log('no image data')
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
    //document.body.appendChild(beforeImage)
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