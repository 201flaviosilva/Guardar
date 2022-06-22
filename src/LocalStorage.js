/**
 * @class Local
 * @classdesc Class for dealing with local storage.
 * 
 * @example Local.getAll();
 */
export default class Local {
	constructor() {
		this.name = "guardar";
		this._init();
	}

	/**
	 * Core function to initialize the local storage api
	 * 
	 * @returns {void}
	 * @memberof Local
	 * @private
	 */
	_init() {
		localStorage.getItem(this.name) || localStorage.setItem(this.name, "{}");
	}

	/**
	 * Change the name of data saved in the local storage
	 * 
	 * @example Local._init("myLocalStorage");
	 * 
	 * @param {string} newSaveDataName - the name to save the data in the local storage
	 * @returns {void}
	 * @memberof Local
	 */
	setName(newSaveDataName = this.name) {
		this.name = newSaveDataName;
		this._init();
	}

	/**
	 * Get all data saved in the local storage
	 * 
	 * @example Local.getAll();
	 * 
	 * @returns {object} the data saved in the local storage
	 * @memberof Local
	 */
	getAll() {
		return JSON.parse(localStorage.getItem(this.name));
	}

	/**
	 * Get a specific data saved in the local storage
	 * 
	 * @example Local.getData("myKey");
	 * 
	 * @param {string} key - key of the data to get
	 * @returns {any} the data saved in the local storage
	 * @memberof Local
	 */
	getData(key) {
		let data = this.getAll();
		return data[key];
	}

	/**
	 * Save/change a specific data by key
	 * 
	 * @example Local.setData("myKeyString", "myString");
	 * @example Local.setData("myKeyBool", true);
	 * @example Local.setData("myKeyNumber", 1234567890);
	 * @example Local.setData("myKeyObject", {name: "Dog", age: 3,});
	 * @example Local.setData("myKeyArr", [1, 2, 3, 4, 5]);
	 * 
	 * @param {string} key - name of the key
	 * @param {any} value value of the item
	 * @returns {void}
	 * @memberof Local
	 */
	setData(key, value) {
		let saveData = this.getAll();
		saveData[key] = value;
		this.updateAll(saveData);
	}

	/**
	 * Save/change all data
	 * 
	 * @example Local.updateAll({ otherNewData: "Hello World" });
	 * 
	 * @param {any} data - data to save
	 * @returns {void}
	 * @memberof Local
	 */
	updateAll(data) {
		localStorage.setItem(this.name, JSON.stringify(data));
	}

	/**
	 * Delete a specific data by name
	 * 
	 * @example Local.removeData("myKey");
	 * 
	 * @param {sting} key - the name of the data to delete
	 * @returns {void}
	 * @memberof Local
	 */
	removeData(key) {
		let saveData = this.getAll();
		delete saveData[key];
		this.updateAll(saveData);
	}

	/**
	 * Change the name of the local storage
	 * 
	 * @example Local.changeSaveDataName("myNewLocalStorageName");
	 * 
	 * @param {sting} name - new name of the local storage
	 * @memberof Local
	 */
	changeSaveDataName(name = this.name) {
		let saveData = this.getAll();
		localStorage.removeItem(this.name);
		this.setName(name);
		this.updateAll(saveData);
	}

	/**
	 * Delete all data saved in the local storage
	 * 
	 * @example Local.clear();
	 * 
	 * @returns {void}
	 * @memberof Local
	 */
	clear() { this.updateAll({}); }

	/**
	 * Get keys of the stored items
	 * 
	 * @example Local.keys();
	 * 
	 * @returns {string[]} return all keys
	 * @memberof Local
	 */
	keys() { return Object.keys(this.getAll()); }

	/**
	 * Get number of stored items
	 * 
	 * @example Local.size();
	 * 
	 * @returns {number} number of stored items
	 * @memberof Local
	 */
	size() { return this.keys().length; }

	/**
	 * Check if the given key is stored
	 * 
	 * @example Local.has("myKey");
	 * 
	 * @param {string} key - key to check
	 * @returns {boolean} true if the key is stored
	 * @memberof Local
	 */
	has(key) { return this.keys().includes(key); }

	/**
	 * Check if the local storage is empty
	 * 
	 * @example Local.isEmpty();
	 * 
	 * @returns {boolean} true if the local storage is empty
	 * @memberof Local
	 */
	isEmpty() { return this.size() === 0; }
}
