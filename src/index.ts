#!/usr/bin/env node
import * as blessed from 'blessed';
import * as discord from 'discord.js';
import * as readline from 'readline';
import { UI } from './classes/ui';
import * as mz from 'mz';

const getUserToken = () => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('What is your user token? ', (token) => {
            rl.close();
            resolve(token);
        });
    });
}

const main = async () => {
    // Checks for user config
    if (!await mz.fs.exists(__dirname + '/config.json')) {
        const token = await getUserToken();
        await mz.fs.writeFile(__dirname + '/config.json', JSON.stringify({ token: token }));
    }

    const config = JSON.parse(await mz.fs.readFile(__dirname + '/config.json', 'utf8'));
    const Client = new discord.Client();
    const GUI = new UI();
    GUI.initLoading();

    const resolveMention = async (string: string, guild: discord.Guild) => {
        const mention = /<@(\d*)>/g;
        let match = mention.exec(string);

        while (match != null) {
            const member = await guild.members.get(match[1]);
            string = string.replace(mention, `{#0000ff-fg}@${member ? member.user.username : match[1]}{/#0000ff-fg}`);
            match = mention.exec(string);
        }

        return string;
    }

    const formatAttachments = (msg: discord.Message, string: string) => {
        if (msg.attachments.array().length > 0) {
            string += " (";
            for (let attachment of msg.attachments.array()) {
                string += attachment.url;
            }
            string += ")";
        }

        return string;
    }

    const formatMessage = async (msg: discord.Message, guild: discord.Guild) => {
        let string = msg.content;
        const bold = /\*\*([^\*]*)\*\*/g;
        const underline = /__([^\*]*)__/g;

        string = string.replace(bold, '{bold}$1{/bold}');
        string = string.replace(underline, '{underline}$1{/underline}');
        string = await resolveMention(string, guild);
        string = formatAttachments(msg, string);

        return `> ${msg.member.displayName || msg.author.username}: ${string}`;
    }

    Client.on('ready', () => {
        GUI.setDiscordClient(Client);
        GUI.init();
    });

    Client.on('message', async (msg) => {
        if (msg.channel.type === "text" && GUI.activeChannel && msg.channel.id === GUI.activeChannel.id) {
            GUI.pushMessage(await formatMessage(msg, msg.guild));
        }
    });

    Client.on('messageDelete', async (msg) => {
        if (GUI.ready && GUI.activeChannel.id === msg.channel.id) {
            GUI.deleteMessage(await formatMessage(msg, msg.guild));
        }
    });

    Client.on('messageUpdate', async (oldMsg, newMsg) => {
        if (GUI.ready && GUI.activeChannel.id === oldMsg.channel.id) {
            GUI.updateMessage(await formatMessage(oldMsg, oldMsg.guild), await formatMessage(newMsg, newMsg.guild));
        }
    })

    Client.login(config.token);
}

main().catch(err => { throw err });