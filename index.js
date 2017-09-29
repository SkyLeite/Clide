const blessed = require('blessed');

const screen = blessed.screen({
    smartCSR: true
});

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
}

renderUI();