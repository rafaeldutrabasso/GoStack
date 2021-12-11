"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const CreateUser_1 = __importDefault(require("./services/CreateUser"));
function helloWorld(request, response) {
    const user = (0, CreateUser_1.default)({
        email: 'victor@gmail.com',
        password: '123456'
    });
    console.log(user.email);
    return response.json({ message: 'Hello, world!' });
}
exports.helloWorld = helloWorld;
