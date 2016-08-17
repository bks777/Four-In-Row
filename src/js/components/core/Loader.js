/**
 * Class for loading of resources
 * @singleton
 */

var loaderInstance;

class Loader {
    /**
     * Constructor
     */
    constructor() {
        this.XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        this.serverAlias = "http://localhost:8080/slot/";
    }

    /**
     * GET Action
     * @param config
     * @returns {Promise}
     */
    httpGet(config = {url: 'http://google.com'}) {
        var request = new this.XHR();

        return new Promise((resolve, reject)=> {
            request.onload = function () {
                resolve(request.responseText);
            };
            request.onerror = function () {
                reject(request);
            };
            request.open("GET", config.url, true);
            request.send();
        });
    }
}

/**
 * Realization of singleton in ES6
 */
if (!loaderInstance) {
    loaderInstance = new Loader();
}

export default loaderInstance;
