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
    chat.setContent(chat.content + '\n' + text);
    screen.render();
    input.clearValue();
    input.focus();
});

screen.append(chat);
screen.append(input);
input.focus();
screen.render();