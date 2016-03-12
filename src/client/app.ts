import {autoinject, computedFrom} from 'aurelia-framework'
import {HttpClient} from "aurelia-fetch-client"
import {Todo} from "../models/todo"
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

    async refresh() {
        let todos = await this.http.fetch("todos");
        this.todos = await todos.json() as Todo[];
    }
}