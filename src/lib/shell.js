import { type, arch } from '@tauri-apps/api/os';
import { appDir } from "@tauri-apps/api/path";
import { invoke } from '@tauri-apps/api/tauri';
import { watchDebugLog, stopWatching } from '$lib/file/logger';

import { writeMergedConfig } from '$lib/file/config';

export async function getVersionFolder(version) {
    let baseDir = await appDir();

    return `${baseDir}/versions/${version}`;
}

export async function getBinaryLocation(version) {
    let [ platform, osArch, baseDir ] = await Promise.all([
        type(),
        arch(),
        getVersionFolder(version)
    ]);

    switch (platform) {
        case 'Linux':
            return `${baseDir}/minetest.AppImage`;

        case 'Darwin':
            return `${baseDir}/minetest.app`;

        case 'Windows_NT':
            return `${baseDir}/bin/minetest.exe`;
    }

    return `${baseDir}/minetest`;
}

export async function openServer(server, username, password, version = '5.6.0') {
    let dir = await appDir();
    let arch = 'win64';

    let args = [
        '--address',
        server.address,
        '--port',
        String(server.port),
        '--name',
        username,
        '--password',
        password,
        '--go'
    ];
    await openMinetest(version, args);
}

// TODO: this doesn't work on Windows (--gameid list does not return properly) - just more proof we're on the bleeding edge!
export async function openGame(game = 'minetest_game', version = '5.6.0') {
    let dir = await appDir();
    let arch = 'win64';

    let args = [
        '--gameid',
        game
    ];

    await openMinetest(version, args);
}

export async function openWorld(worldName, version = '5.6.0') {
    let dir = await appDir();
    let arch = 'win64';

    let args = [
        '--worldname',
        worldName,
        '--go'
    ];

    await openMinetest(version, args);
}

async function openMinetest(version, args) {
    await stopWatching();

    let binary = await getBinaryLocation(version);
    let baseDir = await getVersionFolder(version);

    let dir = await appDir();

    // add in the "merged" config if it exists & was written successfully
    let mergedConfigFile = await writeMergedConfig(version);
    if (mergedConfigFile) {
        console.log(`Applying merged config...`);
        args = [
            '--config',
            `${dir}/minetest.merged.conf`,
            ...args
        ];
    }

    await invoke('open_minetest', {
        loc: binary,
        contentDir: baseDir,
        args: args
    });

    await watchDebugLog(version);
}