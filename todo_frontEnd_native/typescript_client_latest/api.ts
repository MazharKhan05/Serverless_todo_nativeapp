/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * Swagger todo-api
 * Api definition for todos.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from "url";
import * as isomorphicFetch from "isomorphic-fetch";
import { Configuration } from "./configuration";
import unfetch from "unfetch";

const BASE_PATH = "https://5ibauifiqk.execute-api.us-east-1.amazonaws.com/dev".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch = unfetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: string
    constructor(public field: string, msg?: string) {
        super(msg);
        this.name = "RequiredError"
    }
}

/**
 * 
 * @export
 * @interface AllTodos
 */
export interface AllTodos {
    /**
     * 
     * @type {string}
     * @memberof AllTodos
     */
    message: string;
    /**
     * 
     * @type {number}
     * @memberof AllTodos
     */
    statusCode: number;
    /**
     * 
     * @type {string}
     * @memberof AllTodos
     */
    errType?: string;
    /**
     * 
     * @type {Array<AllTodosFetchedTodos>}
     * @memberof AllTodos
     */
    fetchedTodos?: Array<AllTodosFetchedTodos>;
}
/**
 * 
 * @export
 * @interface AllTodosFetchedTodos
 */
export interface AllTodosFetchedTodos {
    /**
     * 
     * @type {string}
     * @memberof AllTodosFetchedTodos
     */
    PK?: string;
    /**
     * 
     * @type {string}
     * @memberof AllTodosFetchedTodos
     */
    SK?: string;
    /**
     * 
     * @type {string}
     * @memberof AllTodosFetchedTodos
     */
    Name?: string;
    /**
     * todo status for an org
     * @type {string}
     * @memberof AllTodosFetchedTodos
     */
    State?: AllTodosFetchedTodos.StateEnum;
    /**
     * 
     * @type {string}
     * @memberof AllTodosFetchedTodos
     */
    time?: string;
}

/**
 * @export
 * @namespace AllTodosFetchedTodos
 */
export namespace AllTodosFetchedTodos {
    /**
     * @export
     * @enum {string}
     */
    export enum StateEnum {
        Pending = <any> 'pending',
        Processing = <any> 'processing',
        Done = <any> 'done',
        Cancelled = <any> 'cancelled'
    }
}
/**
 * 
 * @export
 * @interface HistoryResponse
 */
export interface HistoryResponse {
    /**
     * 
     * @type {string}
     * @memberof HistoryResponse
     */
    message: string;
    /**
     * 
     * @type {number}
     * @memberof HistoryResponse
     */
    statusCode: number;
    /**
     * 
     * @type {string}
     * @memberof HistoryResponse
     */
    errType?: string;
    /**
     * 
     * @type {Array<AllTodosFetchedTodos>}
     * @memberof HistoryResponse
     */
    historyTodos?: Array<AllTodosFetchedTodos>;
}
/**
 * 
 * @export
 * @interface InValidInput
 */
export interface InValidInput {
    /**
     * 
     * @type {string}
     * @memberof InValidInput
     */
    message: string;
    /**
     * 
     * @type {number}
     * @memberof InValidInput
     */
    statusCode?: number;
}
/**
 * 
 * @export
 * @interface PostTodo
 */
export interface PostTodo {
    /**
     * 
     * @type {string}
     * @memberof PostTodo
     */
    Name: string;
}
/**
 * 
 * @export
 * @interface ResponseTodo
 */
export interface ResponseTodo {
    /**
     * 
     * @type {string}
     * @memberof ResponseTodo
     */
    message: string;
    /**
     * 
     * @type {number}
     * @memberof ResponseTodo
     */
    statusCode: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseTodo
     */
    errType?: string;
}
/**
 * 
 * @export
 * @interface UpdateTodo
 */
export interface UpdateTodo {
    /**
     * 
     * @type {string}
     * @memberof UpdateTodo
     */
    Name?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateTodo
     */
    State?: string;
}
/**
 * 
 * @export
 * @interface UptResponseTodo
 */
export interface UptResponseTodo {
    /**
     * 
     * @type {string}
     * @memberof UptResponseTodo
     */
    message: string;
    /**
     * 
     * @type {string}
     * @memberof UptResponseTodo
     */
    errType?: string;
    /**
     * 
     * @type {number}
     * @memberof UptResponseTodo
     */
    statusCode: number;
}
/**
 * TodoApi - fetch parameter creator
 * @export
 */
export const TodoApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Add a new todo of an org
         * @summary Add a new todo
         * @param {PostTodo} body Create a new todo
         * @param {string} authToken login-token to authorize user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTodo(body: PostTodo, authToken: string, options: any = {}): FetchArgs {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling addTodo.');
            }
            // verify required parameter 'authToken' is not null or undefined
            if (authToken === null || authToken === undefined) {
                throw new RequiredError('authToken','Required parameter authToken was null or undefined when calling addTodo.');
            }
            const localVarPath = `/todos`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authToken !== undefined && authToken !== null) {
                localVarHeaderParameter['authToken'] = String(authToken);
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"PostTodo" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * delete a todo
         * @summary Deletes a todo
         * @param {string} authToken login-token to authorize user
         * @param {string} todo todo id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTodo(authToken: string, todo: string, options: any = {}): FetchArgs {
            // verify required parameter 'authToken' is not null or undefined
            if (authToken === null || authToken === undefined) {
                throw new RequiredError('authToken','Required parameter authToken was null or undefined when calling deleteTodo.');
            }
            // verify required parameter 'todo' is not null or undefined
            if (todo === null || todo === undefined) {
                throw new RequiredError('todo','Required parameter todo was null or undefined when calling deleteTodo.');
            }
            const localVarPath = `/todos/{todo}`
                .replace(`{${"todo"}}`, encodeURIComponent(String(todo)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authToken !== undefined && authToken !== null) {
                localVarHeaderParameter['authToken'] = String(authToken);
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * delete a todo
         * @summary get a todo's history
         * @param {string} authToken login-token to authorize user
         * @param {string} todo todo id for its history
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTodoHistory(authToken: string, todo: string, options: any = {}): FetchArgs {
            // verify required parameter 'authToken' is not null or undefined
            if (authToken === null || authToken === undefined) {
                throw new RequiredError('authToken','Required parameter authToken was null or undefined when calling getTodoHistory.');
            }
            // verify required parameter 'todo' is not null or undefined
            if (todo === null || todo === undefined) {
                throw new RequiredError('todo','Required parameter todo was null or undefined when calling getTodoHistory.');
            }
            const localVarPath = `/todos/{todo}`
                .replace(`{${"todo"}}`, encodeURIComponent(String(todo)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authToken !== undefined && authToken !== null) {
                localVarHeaderParameter['authToken'] = String(authToken);
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * fetch todos
         * @summary fetch all todos
         * @param {string} authToken login-token to authorize user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTodos(authToken: string, options: any = {}): FetchArgs {
            // verify required parameter 'authToken' is not null or undefined
            if (authToken === null || authToken === undefined) {
                throw new RequiredError('authToken','Required parameter authToken was null or undefined when calling getTodos.');
            }
            const localVarPath = `/todos`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authToken !== undefined && authToken !== null) {
                localVarHeaderParameter['authToken'] = String(authToken);
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update todo by Id
         * @summary Update todo by ID
         * @param {string} authToken login-token to authorize user
         * @param {string} todo ID of todo to update
         * @param {UpdateTodo} [body] update a created todo
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTodo(authToken: string, todo: string, body?: UpdateTodo, options: any = {}): FetchArgs {
            // verify required parameter 'authToken' is not null or undefined
            if (authToken === null || authToken === undefined) {
                throw new RequiredError('authToken','Required parameter authToken was null or undefined when calling updateTodo.');
            }
            // verify required parameter 'todo' is not null or undefined
            if (todo === null || todo === undefined) {
                throw new RequiredError('todo','Required parameter todo was null or undefined when calling updateTodo.');
            }
            const localVarPath = `/todos/{todo}`
                .replace(`{${"todo"}}`, encodeURIComponent(String(todo)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authToken !== undefined && authToken !== null) {
                localVarHeaderParameter['authToken'] = String(authToken);
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"UpdateTodo" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TodoApi - functional programming interface
 * @export
 */
export const TodoApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Add a new todo of an org
         * @summary Add a new todo
         * @param {PostTodo} body Create a new todo
         * @param {string} authToken login-token to authorize user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTodo(body: PostTodo, authToken: string, options?: any): (fetch?, basePath?: string) => Promise<ResponseTodo> {
            const localVarFetchArgs = TodoApiFetchParamCreator(configuration).addTodo(body, authToken, options);
            return (fetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * delete a todo
         * @summary Deletes a todo
         * @param {string} authToken login-token to authorize user
         * @param {string} todo todo id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTodo(authToken: string, todo: string, options?: any): (fetch?, basePath?: string) => Promise<ResponseTodo> {
            const localVarFetchArgs = TodoApiFetchParamCreator(configuration).deleteTodo(authToken, todo, options);
            return (fetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * delete a todo
         * @summary get a todo's history
         * @param {string} authToken login-token to authorize user
         * @param {string} todo todo id for its history
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTodoHistory(authToken: string, todo: string, options?: any): (fetch?, basePath?: string) => Promise<HistoryResponse> {
            const localVarFetchArgs = TodoApiFetchParamCreator(configuration).getTodoHistory(authToken, todo, options);
            return (fetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * fetch todos
         * @summary fetch all todos
         * @param {string} authToken login-token to authorize user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTodos(authToken: string, options?: any): (fetch?, basePath?: string) => Promise<AllTodos> {
            const localVarFetchArgs = TodoApiFetchParamCreator(configuration).getTodos(authToken, options);
            return (fetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Update todo by Id
         * @summary Update todo by ID
         * @param {string} authToken login-token to authorize user
         * @param {string} todo ID of todo to update
         * @param {UpdateTodo} [body] update a created todo
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTodo(authToken: string, todo: string, body?: UpdateTodo, options?: any): (fetch?, basePath?: string) => Promise<UptResponseTodo> {
            const localVarFetchArgs = TodoApiFetchParamCreator(configuration).updateTodo(authToken, todo, body, options);
            return (fetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * TodoApi - factory interface
 * @export
 */
export const TodoApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * Add a new todo of an org
         * @summary Add a new todo
         * @param {PostTodo} body Create a new todo
         * @param {string} authToken login-token to authorize user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTodo(body: PostTodo, authToken: string, options?: any) {
            return TodoApiFp(configuration).addTodo(body, authToken, options)(fetch, basePath);
        },
        /**
         * delete a todo
         * @summary Deletes a todo
         * @param {string} authToken login-token to authorize user
         * @param {string} todo todo id to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTodo(authToken: string, todo: string, options?: any) {
            return TodoApiFp(configuration).deleteTodo(authToken, todo, options)(fetch, basePath);
        },
        /**
         * delete a todo
         * @summary get a todo's history
         * @param {string} authToken login-token to authorize user
         * @param {string} todo todo id for its history
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTodoHistory(authToken: string, todo: string, options?: any) {
            return TodoApiFp(configuration).getTodoHistory(authToken, todo, options)(fetch, basePath);
        },
        /**
         * fetch todos
         * @summary fetch all todos
         * @param {string} authToken login-token to authorize user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTodos(authToken: string, options?: any) {
            return TodoApiFp(configuration).getTodos(authToken, options)(fetch, basePath);
        },
        /**
         * Update todo by Id
         * @summary Update todo by ID
         * @param {string} authToken login-token to authorize user
         * @param {string} todo ID of todo to update
         * @param {UpdateTodo} [body] update a created todo
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTodo(authToken: string, todo: string, body?: UpdateTodo, options?: any) {
            return TodoApiFp(configuration).updateTodo(authToken, todo, body, options)(fetch, basePath);
        },
    };
};

/**
 * TodoApi - object-oriented interface
 * @export
 * @class TodoApi
 * @extends {BaseAPI}
 */
export class TodoApi extends BaseAPI {
    /**
     * Add a new todo of an org
     * @summary Add a new todo
     * @param {PostTodo} body Create a new todo
     * @param {string} authToken login-token to authorize user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    public addTodo(body: PostTodo, authToken: string, options?: any) {
        return TodoApiFp(this.configuration).addTodo(body, authToken, options)(this.fetch, this.basePath);
    }

    /**
     * delete a todo
     * @summary Deletes a todo
     * @param {string} authToken login-token to authorize user
     * @param {string} todo todo id to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    public deleteTodo(authToken: string, todo: string, options?: any) {
        return TodoApiFp(this.configuration).deleteTodo(authToken, todo, options)(this.fetch, this.basePath);
    }

    /**
     * delete a todo
     * @summary get a todo's history
     * @param {string} authToken login-token to authorize user
     * @param {string} todo todo id for its history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    public getTodoHistory(authToken: string, todo: string, options?: any) {
        return TodoApiFp(this.configuration).getTodoHistory(authToken, todo, options)(this.fetch, this.basePath);
    }

    /**
     * fetch todos
     * @summary fetch all todos
     * @param {string} authToken login-token to authorize user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    public getTodos(authToken: string, options?: any) {
        return TodoApiFp(this.configuration).getTodos(authToken, options)(this.fetch, this.basePath);
    }

    /**
     * Update todo by Id
     * @summary Update todo by ID
     * @param {string} authToken login-token to authorize user
     * @param {string} todo ID of todo to update
     * @param {UpdateTodo} [body] update a created todo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    public updateTodo(authToken: string, todo: string, body?: UpdateTodo, options?: any) {
        return TodoApiFp(this.configuration).updateTodo(authToken, todo, body, options)(this.fetch, this.basePath);
    }

}
