import * as blessed from 'blessed';
import * as discord from 'discord.js';
import { UI } from './classes/ui';
import * as mz from 'mz';

const main = async () => {
    const config = JSON.parse(await mz.fs.readFile(__dirname + '/config.json', 'utf8'));
    const Client = new discord.Client();
    const GUI = new UI();

    Client.on('ready', () => {
        GUI.setDiscordClient(Client);
        GUI.init();
    });

    Client.on('message', (msg) => {
        if (msg.channel.type === "text" && GUI.activeChannel && msg.channel.id === GUI.activeChannel.id) {
            GUI.pushMessage(`> ${msg.author.username}: ${msg.content}`);
        }
    });

    Client.login(config.token);
}

main().catch(err => { throw err });