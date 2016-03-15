import {autoinject, computedFrom} from 'aurelia-framework'
import {HttpClient, json} from "aurelia-fetch-client"
import {Todo, ITodo} from "../models/todo"
//import * as Immutable from "immutable"

@autoinject
export class App {
    todos: Todo[];

    constructor(private http: HttpClient) {
        http.configure(config =>
            config
                .useStandardConfiguration()
                .withBaseUrl("api/"));

        this.refresh();
    }

    newTodo: ITodo = {
        description: "",
        complete: false
    };

    async completeChanged(todo: Todo) {
        console.log(todo);
        await this.http.fetch("todos/setcomplete", {
            method: 'put',
            body: json(todo)
        });

        await this.refresh();
    }

    async addTodo() {
        await this.http.fetch("todos", {
            method: 'post',
            body: json(this.newTodo)
        });

        await this.refresh();
        this.newTodo.description = "";
    }

    async deleteTodo(todo: Todo) {
        await this.http.fetch("todos/" + todo._id, {
            method: 'delete'
        });

        await this.refresh();
    }

    async refresh() {
        let todos = await this.http.fetch("todos");
        this.todos = await todos.json() as Todo[];
    }
}