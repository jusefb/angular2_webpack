import {Http, Headers} from 'angular2/http';
import {Reducer, Action} from '@ngrx/store/src/interfaces';
import {Store} from '@ngrx/store/src/store';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

const BASE_URL = 'http://localhost:3000/items/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

export interface Item {
    id: number;
    name: string;
    description: string;
};

export interface AppStore {
    items: Item[];
    selectedItem: Item;
};

//-------------------------------------------------------------------
// ITEMS STORE
//-------------------------------------------------------------------
export const items:Reducer<any> = (state:any = [], action:Action) => {
    let index: number;
    switch (action.type) {
        case 'ADD_ITEMS':
            return action.payload;
        case 'CREATE_ITEM':
            return [...state, action.payload];
        case 'UPDATE_ITEM':
            return state.map(item => {
                return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
            });
        case 'DELETE_ITEM':
            return state.filter(item => {
                return item.id !== action.payload.id;
            });
        default:
            return state;
    }
};

//-------------------------------------------------------------------
// SELECTED ITEM STORE
//-------------------------------------------------------------------
export const selectedItem:Reducer<any> = (state:any = null, action:Action) => {
    switch (action.type) {
        case 'SELECT_ITEM':
            return action.payload;
        default:
            return state;
    }
};

//-------------------------------------------------------------------
// ITEMS SERVICE
//-------------------------------------------------------------------
@Injectable()
export class ItemsService {
    items: Observable<Item[]>;

    constructor(private http: Http, private store: Store<AppStore>) {
        this.items = store.select('items');
    }

    loadItems() {
        this.http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => ({ type: 'ADD_ITEMS', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    saveItem(item: Item) {
        (item.id) ? this.updateItem(item) : this.createItem(item);
    }

    createItem(item: Item) {
        this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_ITEM', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateItem(item: Item) {
        this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
            .subscribe(action => this.store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
    }

    deleteItem(item: Item) {
        this.http.delete(`${BASE_URL}${item.id}`)
            .subscribe(action => this.store.dispatch({ type: 'DELETE_ITEM', payload: item }));
    }
}