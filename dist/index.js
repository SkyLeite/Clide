#!/usr/bin/env node
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var discord = require("discord.js");
var readline = require("readline");
var ui_1 = require("./classes/ui");
var mz = require("mz");
var getUserToken = function () {
    return new Promise(function (resolve, reject) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('What is your user token? ', function (token) {
            rl.close();
            resolve(token);
        });
    });
};
var main = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var token, config, _a, _b, Client, GUI, resolveMention, formatAttachments, formatMessage;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, mz.fs.exists(__dirname + '/config.json')];
            case 1:
                if (!!(_c.sent())) return [3 /*break*/, 4];
                return [4 /*yield*/, getUserToken()];
            case 2:
                token = _c.sent();
                return [4 /*yield*/, mz.fs.writeFile(__dirname + '/config.json', JSON.stringify({ token: token }))];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _b = (_a = JSON).parse;
                return [4 /*yield*/, mz.fs.readFile(__dirname + '/config.json', 'utf8')];
            case 5:
                config = _b.apply(_a, [_c.sent()]);
                Client = new discord.Client();
                GUI = new ui_1.UI();
                GUI.initLoading();
                resolveMention = function (string, guild) { return __awaiter(_this, void 0, void 0, function () {
                    var mention, match, member;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                mention = /<@(\d*)>/g;
                                match = mention.exec(string);
                                _a.label = 1;
                            case 1:
                                if (!(match != null)) return [3 /*break*/, 3];
                                return [4 /*yield*/, guild.members.get(match[1])];
                            case 2:
                                member = _a.sent();
                                string = string.replace(mention, "{#0000ff-fg}@" + (member ? member.user.username : match[1]) + "{/#0000ff-fg}");
                                match = mention.exec(string);
                                return [3 /*break*/, 1];
                            case 3: return [2 /*return*/, string];
                        }
                    });
                }); };
                formatAttachments = function (msg, string) {
                    if (msg.attachments.array().length > 0) {
                        string += " (";
                        for (var _i = 0, _a = msg.attachments.array(); _i < _a.length; _i++) {
                            var attachment = _a[_i];
                            string += attachment.url;
                        }
                        string += ")";
                    }
                    return string;
                };
                formatMessage = function (msg, guild) { return __awaiter(_this, void 0, void 0, function () {
                    var string, bold, underline;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                string = msg.content;
                                bold = /\*\*([^\*]*)\*\*/g;
                                underline = /__([^\*]*)__/g;
                                string = string.replace(bold, '{bold}$1{/bold}');
                                string = string.replace(underline, '{underline}$1{/underline}');
                                return [4 /*yield*/, resolveMention(string, guild)];
                            case 1:
                                string = _a.sent();
                                string = formatAttachments(msg, string);
                                return [2 /*return*/, "> " + (msg.member.displayName || msg.author.username) + ": " + string];
                        }
                    });
                }); };
                Client.on('ready', function () {
                    GUI.setDiscordClient(Client);
                    GUI.init();
                });
                Client.on('message', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!(msg.channel.type === "text" && GUI.activeChannel && msg.channel.id === GUI.activeChannel.id)) return [3 /*break*/, 2];
                                _b = (_a = GUI).pushMessage;
                                return [4 /*yield*/, formatMessage(msg, msg.guild)];
                            case 1:
                                _b.apply(_a, [_c.sent()]);
                                _c.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                Client.on('messageDelete', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!(GUI.ready && GUI.activeChannel.id === msg.channel.id)) return [3 /*break*/, 2];
                                _b = (_a = GUI).deleteMessage;
                                return [4 /*yield*/, formatMessage(msg, msg.guild)];
                            case 1:
                                _b.apply(_a, [_c.sent()]);
                                _c.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                Client.on('messageUpdate', function (oldMsg, newMsg) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                if (!(GUI.ready && GUI.activeChannel.id === oldMsg.channel.id)) return [3 /*break*/, 3];
                                _b = (_a = GUI).updateMessage;
                                return [4 /*yield*/, formatMessage(oldMsg, oldMsg.guild)];
                            case 1:
                                _c = [_d.sent()];
                                return [4 /*yield*/, formatMessage(newMsg, newMsg.guild)];
                            case 2:
                                _b.apply(_a, _c.concat([_d.sent()]));
                                _d.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                Client.login(config.token);
                return [2 /*return*/];
        }
    });
}); };
main().catch(function (err) { throw err; });
//# sourceMappingURL=index.js.map