import * as blessed from 'blessed';
import * as discord from 'discord.js';
import { UI } from './classes/ui';
import * as mz from 'mz';

const main = async () => {
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

    const formatMessage = async (string: string, guild: discord.Guild) => {
        const bold = /\*\*([^\*]*)\*\*/g;
        const underline = /__([^\*]*)__/g;

        string = string.replace(bold, '{bold}$1{/bold}');
        string = string.replace(underline, '{underline}$1{/underline}');
        string = await resolveMention(string, guild);
        return string;
    }

    Client.on('ready', () => {
        GUI.setDiscordClient(Client);
        GUI.init();
    });

    Client.on('message', async (msg) => {
        if (msg.channel.type === "text" && GUI.activeChannel && msg.channel.id === GUI.activeChannel.id) {
            GUI.pushMessage(await formatMessage(`> ${msg.author.username}: ${msg.content}`, msg.guild));
        }
    });

    Client.login(config.token);
}

main().catch(err => { throw err });