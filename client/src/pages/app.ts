import {HttpClient, json} from "aurelia-fetch-client"
import {autoinject, computedFrom} from 'aurelia-framework'
import {Todo, ITodo} from "../models/todo"
//import * as Immutable from "immutable"

@autoinject
export class App {
    todos: Todo[];

    constructor(private http: HttpClient) {
        http.configure(config =>
            config
                .useStandardConfiguration()
                .withBaseUrl("http://localhost:5000/api/"));

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

    activate() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        });
    }
}