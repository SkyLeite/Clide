const blessed = require('blessed');
const discord = require('discord.js');

const screen = blessed.screen({
    smartCSR: true
});

const Client = new discord.Client();

const chat = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: '90%',
    content: 'hello!',
    scrollable: true,
    alwaysScroll: true,
    border: {
        type: 'line'
    },
});

const input = blessed.textbox({
    bottom: 0,
    left: 0,
    width: '100%',
    height: '10%',
    inputOnFocus: true,
});

input.on('submit', (text) => {
    pushMessage(text);
    input.focus();
    input.clearValue();
    screen.render();
});

const renderUI = () => {
    screen.append(chat);
    screen.append(input);
    input.focus();
    screen.render();
}

const pushMessage = (text) => {
    chat.pushLine(text);
    chat.setScrollPerc(100);
    screen.render();
}

Client.on('ready', () => {
    renderUI();
});

Client.on('message', (msg) => {
    pushMessage(`> ${msg.author.username}: ${msg.content}`);
});

Client.login("OTEzODc5NDM2NzkxNzI2MDg.DDlttA.UruedfL9Ubxc4hVb7281HO9J2A4");