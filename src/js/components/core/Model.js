/**
 * Base class for a model
 */
export default class Model {
    /**
     * Setting of main property _data to class for further manipulating
     */
    constructor() {
        this._data = {};
    }

    /**
     * Getter for model
     * @param alias
     * @returns {*}
     */
    getData(alias){
        return this._data[alias];
    }

    /**
     * Setter for model
     * @param alias
     * @param data
     * @returns {*}
     */
    setData(alias, data){
        this._data[alias] = data;

        return this._data[alias];
    }

    /**
     * Setter for data deleting
     * @param alias
     */
    deleteData(alias){
        delete this._data[alias];
    }
}