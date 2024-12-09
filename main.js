import * as partLyric from './nightChanges.js';
         
function shoutIt(text, interval) {
    return new Promise(success => {
        setTimeout(function() {
            success(text);
        }, interval);
    });
}

async function loadingScreen(...args) {
    for (let i = 0; i < args.length; i++) {
        const a = await shoutIt(args[i], 1000);
        process.stdout.write(`${a} `);
    }
    process.stdout.write('\u001B[2J\u001B[0;0f');
}

async function doSinging(lyrics) {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    for (let i = 0; i < lyrics.length; i++) {

        if (lyrics[i].newLine) {
            const a = await shoutIt(lyrics[i].name, lyrics[i].duration);
            console.log(a);   
            if (lyrics[i].clearScreen) {
                console.clear();
            }
        } else {
            const a = await shoutIt(lyrics[i].name, lyrics[i].duration);
            process.stdout.write(`${a} `);
            }
    }
    // process.exit();
}
async function doSingingSomeParts() {

    await loadingScreen('. ', ' . ', ' . ', ' .');
    await doSinging(partLyric.part2);
    await loadingScreen('. ', ' . ', ' . ', ' .');
    await doSinging(partLyric.part3);
    await doSinging(partLyric.part4);
    await doSinging(partLyric.part5);
    await loadingScreen('. ', ' . ', ' . ', ' .', ' .');
}

doSingingSomeParts();