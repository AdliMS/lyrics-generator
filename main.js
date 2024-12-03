import {nightChanges, hopeIsTheThingWithFeathers} from './lyrics.js';
               
function shoutIt(text, interval) {

    return new Promise(success => {
        setTimeout(function() {
            success(text);
        }, interval);
    });

}

async function doSinging(lyrics) {
    
    for (let i = 0; i < lyrics.length; i++) {
        if (lyrics[i].newLine) {
            const a = await shoutIt(lyrics[i].name, lyrics[i].duration);
            console.log(a);
        } else {
            
            const a = await shoutIt(lyrics[i].name, lyrics[i].duration);
            process.stdout.write(`${a} `);
        }
    }
    
}

doSinging(hopeIsTheThingWithFeathers);
