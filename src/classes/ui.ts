import * as blessed from 'blessed';
import * as discord from 'discord.js';

export class UI {
    screen: blessed.Widgets.Screen;
    chat: blessed.Widgets.BoxElement;
    input: blessed.Widgets.TextboxElement;
    loading: blessed.Widgets.BoxElement;
    program: any;

    client: discord.Client;
    activeGuild: discord.Guild;
    activeChannel: discord.TextChannel;

    constructor() {
        this.screen = blessed.screen({
            fullUnicode: true,
        });
    }

    init() {
        if (!this.activeGuild) {
            this.renderGuildSelect();
        }
        else {
            this.renderUI();
        }
    }

    hideUI() {
        this.chat.destroy();
        this.input.destroy();
    }

    renderGuildSelect() {
        const guilds = this.client.guilds;
        const selectScreen = blessed.list({
            items: guilds.map(i => i.name),
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
            vi: true,
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
            vi: true,
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

        this.input.on('submit', async (text) => {
            if (this.activeChannel) {
                const channel = await this.activeChannel as discord.TextChannel;
                if (channel.type === "text") {
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

        this.input.key('escape', () => {
            process.exit(0);
        });

        this.input.key('C-k', () => {
            this.hideUI();
            this.renderChannelSelect();
        });

        this.input.key('C-s', () => {
            this.hideUI();
            this.renderGuildSelect();
        });

        this.screen.append(this.chat);
        this.screen.append(this.input);
        this.input.focus();
        this.screen.render();
    }

    formatText(string: string) {
        const bold = /\*\*([^\*]*)\*\*/;
        const underline = /__([^\*]*)__/;

        string = string.replace(bold, '{bold}$1{/bold}');
        string = string.replace(underline, '{underline}$1{/underline}')
        return string;
    }

    pushMessage(text: string) {
        this.chat.pushLine(this.formatText(text));
        this.chat.setScrollPerc(100);
        this.screen.render();
    }

    setDiscordClient(client: discord.Client) {
        this.client = client;
    }
}