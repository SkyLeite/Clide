import * as blessed from 'blessed';
import * as discord from 'discord.js';
import * as mz from 'mz';

export class UI {
    screen: blessed.Widgets.Screen;
    chat: blessed.Widgets.BoxElement;
    input: blessed.Widgets.TextboxElement;
    loading: blessed.Widgets.BoxElement;
    program: any;
    ready: boolean;

    client: discord.Client;
    activeGuild: discord.Guild;
    activeChannel: discord.TextChannel;
    messageCache: Array<{ message : discord.Message, formattedMessage : string }> = [];

    constructor() {
        this.screen = blessed.screen({
            fullUnicode: true,
        });
    }

    init() {
        if (!this.activeGuild) {
            this.renderGuildSelect();
            this.ready = true;
        }
        else {
            this.renderUI();
        }
    }

    hideUI() {
        this.chat.hide();
        this.input.hide();
    }

    showUI() {
        this.chat.show();
        this.input.show();
    }

    renderGuildSelect() {
        const guilds = this.client.guilds;
        const selectScreen = blessed.list({
            items: guilds.map((i: discord.Guild) => i.name),
            parent: this.screen,
            label: 'Guilds: ',
            draggable: true,
            top: 'center',
            left: 'center',
            width: '50%',
            height: '50%',
            scrollable: true,
            keys: true,
            mouse: true,
            border: {
                type: 'line'
            },
            style: {
                item: {
                    hover: {
                        bg: 'blue'
                    }
                },
                selected: {
                    bg: 'blue',
                    bold: true
                }
            },
        });

        selectScreen.on('select', (item) => {
            this.activeGuild = guilds.find(i => i.name === item.getText());
            selectScreen.destroy();
            this.renderChannelSelect();
        });

        selectScreen.focus();
        this.screen.render();
    }

    renderChannelSelect() {
        const channels = this.activeGuild.channels.filter(i => i.type === "text");
        const selectScreen = blessed.list({
            items: channels.map(i => i.name),
            parent: this.screen,
            label: 'Guilds: ',
            draggable: true,
            top: 'center',
            left: 'center',
            width: '50%',
            height: '50%',
            scrollable: true,
            keys: true,
            mouse: true,
            border: {
                type: 'line'
            },
            style: {
                item: {
                    hover: {
                        bg: 'blue'
                    }
                },
                selected: {
                    bg: 'blue',
                    bold: true
                }
            },
        });

        selectScreen.on('select', (item) => {
            this.activeChannel = channels.find(i => i.name === item.getText()) as discord.TextChannel;
            selectScreen.destroy();
            this.renderUI();
        });

        selectScreen.focus();
        this.screen.render();
    }

    renderMemberList() {
        const members = this.activeChannel.members.map(i => {
            return `${i.displayName}`;
        });

        const memberList = blessed.list({
            items: members,
            parent: this.screen,
            label: 'Members: ',
            keys: true,
            draggable: true,
            top: 'center',
            left: 'center',
            width: '50%',
            height: '50%',
            scrollable: true,
            mouse: true,
            border: {
                type: 'line'
            },
            style: {
                item: {
                    hover: {
                        bg: 'blue'
                    }
                },
                selected: {
                    bg: 'blue',
                    bold: true
                }
            },
        });

        memberList.on('select', (member) => {
            memberList.destroy();
            this.renderUI();
        });

        memberList.on('cancel', () => {
            memberList.destroy();
            this.renderUI();
        });

        memberList.focus();
        this.screen.render();
    }

    initLoading() {
        this.loading = blessed.box({
            top: 'center',
            left: 'center',
            content: 'loading...'
        });

        this.screen.append(this.loading);
        this.screen.render();
    }

    renderUI() {
        this.chat = blessed.box({
            top: 0,
            left: 0,
            width: '100%',
            height: '90%',
            scrollable: true,
            alwaysScroll: true,
            tags: true,
            label: `${this.activeGuild.name} - #${this.activeChannel.name}`,
            border: {
                type: 'line'
            },
        });

        this.input = blessed.textbox({
            bottom: 0,
            left: 0,
            width: '100%',
            height: '15%',
            inputOnFocus: true,
            border: {
                type: 'line'
            },
        });

        this.input.on('submit', async (text: string) => {
            if (this.activeChannel) {
                const channel = await this.activeChannel as discord.TextChannel;
                if (text && channel.type === "text") {
                    channel.send(text);
                }
            }
            this.input.clearValue();
            this.screen.render();
            this.input.focus();
        });

        this.input.key('escape', () => {
            process.exit(0);
        });

        this.input.key('C-s', () => {
            this.hideUI();
            this.renderGuildSelect();
        });

        this.input.key('C-t', () => {
            this.hideUI();
            this.renderGuildSelect();
        });

        this.input.key('C-d', () => {
            this.hideUI();
            this.renderMemberList();
        });

        this.input.key('C-a', () => {
            this.hideUI();
            this.renderMessageSelect();
        })

        this.screen.append(this.chat);
        this.screen.append(this.input);
        this.input.focus();
        this.screen.render();

        for (let message of this.messageCache) {
            this.chat.pushLine(message.formattedMessage);
            this.chat.render();
        }
    }

    renderMessageOptions(message: discord.Message) {
        const optionSelect = blessed.list({
            items: ['Delete', 'Edit'],
            parent: this.screen,
            label: 'Guilds: ',
            top: 'center',
            left: 'center',
            width: '50%',
            height: '50%',
            keys: true,
            mouse: true,
            border: {
                type: 'line'
            },
            style: {
                item: {
                    hover: {
                        bg: 'blue'
                    }
                },
                selected: {
                    bg: 'blue',
                    bold: true
                }
            },
        });

        optionSelect.on('select', async (option) => {
            if (option.getText() === 'Delete') {
                await (await this.activeChannel.fetchMessage(message.id)).delete();
                optionSelect.destroy();
                this.renderUI();
            }
        });

        this.screen.append(optionSelect);
        optionSelect.focus();
        this.screen.render();
    }

    async renderMessageSelect() {
        const messages = await Promise.all(this.messageCache
            .map(async i => i.formattedMessage
        ));

        const messageSelect = blessed.list({
            items: messages,
            parent: this.screen,
            label: `${this.activeGuild.name} - #${this.activeChannel.name}`,
            top: 0,
            left: 0,
            width: '100%',
            height: '90%',
            scrollable: true,
            keys: true,
            mouse: true,
            border: {
                type: 'line'
            },
            style: {
                item: {
                    hover: {
                        bg: 'blue'
                    }
                },
                selected: {
                    bg: 'blue',
                    bold: true
                }
            },
        });

        messageSelect.on('select', (text) => {
            const message = this.messageCache.find(i => i.formattedMessage === text.getText());
            if (message) {
                this.hideUI();
                this.renderMessageOptions(message.message);
            }
            messageSelect.destroy();
            this.showUI();
        });

        this.screen.append(messageSelect);
        this.screen.render();
    }

    async resolveMention (string: string, guild: discord.Guild) {
        const mention = /<@(\d*)>/g;
        let match = mention.exec(string);

        while (match != null) {
            const member = await guild.members.get(match[1]);
            string = string.replace(mention, `{#0000ff-fg}@${member ? member.user.username : match[1]}{/#0000ff-fg}`);
            match = mention.exec(string);
        }

        return string;
    }

    async formatAttachments (msg: discord.Message, string: string) {
        if (msg.attachments.array().length > 0) {
            string += " (";
            for (let attachment of msg.attachments.array()) {
                string += attachment.url;
            }
            string += ")";
        }

        return string;
    }

    async formatMessage (msg: discord.Message, guild: discord.Guild) {
        let string = msg.content;
        const bold = /\*\*([^\*]*)\*\*/g;
        const underline = /__([^\*]*)__/g;

        string = string.replace(bold, '{bold}$1{/bold}');
        string = string.replace(underline, '{underline}$1{/underline}');
        string = await this.resolveMention(string, guild);
        string = await this.formatAttachments(msg, string);

        return `> ${msg.member.displayName || msg.author.username}: ${string}`;
    }

    async updateMessageCache(msg: discord.Message) {
        const screenLines = this.chat.getLines();
        const formattedMessage = await this.formatMessage(msg, msg.guild);

        if (screenLines.includes(formattedMessage)) {
            this.messageCache.push({ message: msg, formattedMessage: formattedMessage});
        }
    }

    async pushMessage(text: string, msg: discord.Message) {
        // hue
        this.chat.pushLine(text);
        this.chat.setScrollPerc(100);
        this.screen.render();

        await this.updateMessageCache(msg);
    }

    deleteMessage(msgString: string, msg: discord.Message) {
        const line = this.chat.getScreenLines().findIndex(i => {
            return i === msgString
        });

        this.chat.deleteLine(line);
        this.screen.render();

        this.updateMessageCache(msg);
    }

    updateMessage(oldMsgString: string, newMsgString: string, newMsg: discord.Message) {
        const line = this.chat.getScreenLines().findIndex(i => {
            return i === oldMsgString
        });

        this.chat.deleteLine(line);
        this.chat.insertLine(line, newMsgString);
        this.screen.render();

        this.updateMessageCache(newMsg);
    }

    setDiscordClient(client: discord.Client) {
        this.client = client;
    }

    log() {

    }
}