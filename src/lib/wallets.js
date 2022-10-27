import { writable } from 'svelte/store';
import { readTextFile, writeTextFile, BaseDirectory, createDir, readDir } from "@tauri-apps/api/fs";

export async function walletStore(fileName, password,
                                      defaultValue = {},
                                      readFunc = async (content, pwd) => {
                                        let pwrdr = await import("@metamask/browser-passworder")
                                        console.log(JSON.parse(await pwrdr.decrypt(pwd, content)))
                                        return JSON.parse(await pwrdr.decrypt(pwd, content))
                                      },
                                      writeFunc = async (content, pwd) => {
                                        let pwrdr = await import("@metamask/browser-passworder")
                                        return await pwrdr.encrypt(pwd, JSON.stringify(content))
                                      }
                                      ) {
    try {
        await readDir('', { dir: BaseDirectory.App });
    }
    catch {
        console.log('App directory not found, creating...')

        await createDir('', {
            dir: BaseDirectory.App,
            recursive: true
        });
    }
    let shouldCreateFile = false;
    let startContent = await readTextFile(fileName, {
        dir: BaseDirectory.App
    }).then(async res => await readFunc(res,password)).then().catch(err => {
        console.log(err);
        shouldCreateFile = true;
    }) || defaultValue;

    if (shouldCreateFile) {
        console.log(`Writing ${fileName} for the first time...`)
        await writeTextFile(fileName, await writeFunc(defaultValue, password), {
            dir: BaseDirectory.App
        });
    }

    const { subscribe, set, update } = writable(startContent);

    let firstRun = true;
    subscribe(async value => {
        if (firstRun) {
            console.log(`Discarding write for ${fileName} because it's the first run`);
            firstRun = false;
            return;
        }
        console.log(`Writing ${fileName}...`);
        await writeTextFile(fileName, await writeFunc(value, password), {
            dir: BaseDirectory.App
        });
        console.log(`Written!`);
    });

    return { subscribe, set, update };
}

let walletsCache = false;
let rawWalletsCache = false;

export async function checkPassword(password) {
    if (!rawWalletsCache) {
        rawWalletsCache = await readTextFile('wallets.json', {
            dir: BaseDirectory.App
        });
    }

    try {
        return JSON.parse((await (await import("@metamask/browser-passworder")).decrypt(password, rawWalletsCache))).wallets != undefined;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

export async function hasWalletsFile() {
    let entries = await readDir('', {
        dir: BaseDirectory.App,
        recursive: false
    });
    return entries.filter(ent => !ent.hasOwnProperty('children') && 'wallets.json' === ent.name).length > 0;
}

export async function getWallets(password) {
    if (!walletsCache) {
        walletsCache = await walletStore('wallets.json', password, {
            wallets: [],
            selected: {name: "", address: ""}
        });
    }
    return walletsCache;
}