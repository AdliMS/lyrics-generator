import {nightChanges, hopeIsTheThingWithFeathers} from './lyrics.js';
import * as fs from 'node:fs';
import * as readline from 'node:readline';
import { EventEmitter } from 'node:events';

// Import module
import { lyrics, lyricsv2 } from '@bochilteam/scraper-lyrics'

const data = await lyricsv2('Bohemian Rhapsody')
console.log(data) // JSON

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function createLyrics() {
    rl.question('Masukkan judul lagu: ', (songTitle) => {
        rl.question('Masukkan Penggalan lirik: ', (sentence) => {
            rl.question('Tentukan detik(s) waktu kemunculan liriknya : ', (interval) => {
                rl.question('Sambung lirik ini dengan penggalan lirik setelahnya? (yes/no): ', (newLine) => {
                    
                    if (newLine === 'yes'){
                        newLine = true;
                    } else {
                        newLine = false;
                    }
    
                    const lyricsData = { sentence, interval, newLine };
        
                    const file = JSON.parse(fs.readFileSync(`lyrics/someLyrics.json`, 'utf8'));
                    file.push(lyricsData);
                    fs.writeFileSync('lyrics/someLyrics.json', JSON.stringify(file));
    
                    rl.close();
    
                })
            })
        })
    })
}

// createLyrics();
         
function shoutIt(text, interval) {

    return new Promise(success => {
        setTimeout(function() {
            success(text);
        }, interval);
    });
}

async function loadingScreen(...args) {

    // const dots = ['. ', ' . ', ' . ', ' .\n'];
    for (let i = 0; i < args.length; i++) {
        const a = await shoutIt(args[i], 1000);
        process.stdout.write(`${a} `);
    }
    process.stdout.write('\u001B[2J\u001B[0;0f');
}

async function doSinging(lyrics) {

    await loadingScreen('. ', ' . ', ' . ', ' .');
    process.stdout.write('\u001B[2J\u001B[0;0f');
    for (let i = 0; i < lyrics.length; i++) {

        if (lyrics[i].newLine) {
            const a = await shoutIt(lyrics[i].name, lyrics[i].duration);
            console.log(a);   
        } else {
            const a = await shoutIt(lyrics[i].name, lyrics[i].duration);
            process.stdout.write(`${a} `);
            }
        }
    await loadingScreen('. ', ' . ', ' . ', ' . ', ' . ', ' . ');
    process.exit();
}
// doSinging(nightChanges);
