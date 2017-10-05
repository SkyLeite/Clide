"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var blessed = require("blessed");
var UI = /** @class */ (function () {
    function UI() {
        this.screen = blessed.screen({
            fullUnicode: true,
        });
    }
    UI.prototype.init = function () {
        if (!this.activeGuild) {
            this.renderGuildSelect();
            this.ready = true;
        }
        else {
            this.renderUI();
        }
    };
    UI.prototype.hideUI = function () {
        this.chat.destroy();
        this.input.destroy();
    };
    UI.prototype.renderGuildSelect = function () {
        var _this = this;
        var guilds = this.client.guilds;
        var selectScreen = blessed.list({
            items: guilds.map(function (i) { return i.name; }),
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
        selectScreen.on('select', function (item) {
            _this.activeGuild = guilds.find(function (i) { return i.name === item.getText(); });
            selectScreen.destroy();
            _this.renderChannelSelect();
        });
        selectScreen.focus();
        this.screen.render();
    };
    UI.prototype.renderChannelSelect = function () {
        var _this = this;
        var channels = this.activeGuild.channels.filter(function (i) { return i.type === "text"; });
        var selectScreen = blessed.list({
            items: channels.map(function (i) { return i.name; }),
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
        selectScreen.on('select', function (item) {
            _this.activeChannel = channels.find(function (i) { return i.name === item.getText(); });
            selectScreen.destroy();
            _this.renderUI();
        });
        selectScreen.focus();
        this.screen.render();
    };
    UI.prototype.initLoading = function () {
        this.loading = blessed.box({
            top: 'center',
            left: 'center',
            content: 'loading...'
        });
        this.screen.append(this.loading);
        this.screen.render();
    };
    UI.prototype.renderUI = function () {
        var _this = this;
        this.chat = blessed.box({
            top: 0,
            left: 0,
            width: '100%',
            height: '90%',
            scrollable: true,
            alwaysScroll: true,
            tags: true,
            label: this.activeGuild.name + " - #" + this.activeChannel.name,
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
        this.input.on('submit', function (text) { return __awaiter(_this, void 0, void 0, function () {
            var channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.activeChannel) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.activeChannel];
                    case 1:
                        channel = _a.sent();
                        if (channel.type === "text") {
                            channel.send(text);
                        }
                        _a.label = 2;
                    case 2:
                        this.input.clearValue();
                        this.screen.render();
                        this.input.focus();
                        return [2 /*return*/];
                }
            });
        }); });
        this.input.key('escape', function () {
            process.exit(0);
        });
        this.input.key('escape', function () {
            process.exit(0);
        });
        this.input.key('C-s', function () {
            _this.hideUI();
            _this.renderGuildSelect();
        });
        this.input.key('C-t', function () {
            _this.hideUI();
            _this.renderGuildSelect();
        });
        this.screen.append(this.chat);
        this.screen.append(this.input);
        this.input.focus();
        this.screen.render();
    };
    UI.prototype.pushMessage = function (text) {
        this.chat.pushLine(text);
        this.chat.setScrollPerc(100);
        this.screen.render();
    };
    UI.prototype.deleteMessage = function (msg) {
        var line = this.chat.getScreenLines().findIndex(function (i) {
            return i === msg;
        });
        this.chat.deleteLine(line);
        this.screen.render();
    };
    UI.prototype.updateMessage = function (oldMsg, newMsg) {
        var line = this.chat.getScreenLines().findIndex(function (i) {
            return i === oldMsg;
        });
        this.chat.deleteLine(line);
        this.chat.insertLine(line, newMsg);
        this.screen.render();
    };
    UI.prototype.setDiscordClient = function (client) {
        this.client = client;
    };
    UI.prototype.log = function () {
    };
    return UI;
}());
exports.UI = UI;
//# sourceMappingURL=ui.js.map