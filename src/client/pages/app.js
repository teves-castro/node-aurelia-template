"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const aurelia_framework_1 = require('aurelia-framework');
const aurelia_fetch_client_1 = require("aurelia-fetch-client");
let App = class App {
    constructor(http) {
        this.http = http;
        this.newTodo = {
            description: "",
            complete: false
        };
        http.configure(config => config
            .useStandardConfiguration()
            .withBaseUrl("api/"));
        this.refresh();
    }
    completeChanged(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(todo);
            yield this.http.fetch("todos/setcomplete", {
                method: 'put',
                body: aurelia_fetch_client_1.json(todo)
            });
            yield this.refresh();
        });
    }
    addTodo() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.http.fetch("todos", {
                method: 'post',
                body: aurelia_fetch_client_1.json(this.newTodo)
            });
            yield this.refresh();
            this.newTodo.description = "";
        });
    }
    deleteTodo(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.http.fetch("todos/" + todo._id, {
                method: 'delete'
            });
            yield this.refresh();
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            let todos = yield this.http.fetch("todos");
            this.todos = yield todos.json();
        });
    }
    activate() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }
};
App = __decorate([
    aurelia_framework_1.autoinject, 
    __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient])
], App);
exports.App = App;
//# sourceMappingURL=app.js.map