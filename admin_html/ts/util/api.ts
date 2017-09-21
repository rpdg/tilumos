import cfg from '../app.cfg';
import {store} from "./store";
import {format} from './utils';



interface AjaxMessage {
	data ?: any ,
	error?: string
}

interface ApiCall {
	(param: any, callback: Function):void ;
	(callback: Function) :void ;
	set(key: string, value: any): this ;
	get(key: string): any
}

interface IApiConfig {
	(apiSets: Map): void
}

//noinspection TypeScriptUnresolvedVariable
//cfg.apiServer = window.apiServer ;

if (!cfg.apiServer) {
	cfg.onUnauthorizedError();
}

let onServerError = cfg.onServerError || function (msg) {
		alert("err: " + msg);
	};

let loading = {
	dom: $('#opgAjaxLoading'),
	handlers: 0,
	timer: 0,
	show: function () {
		loading.dom.stop(true, true).fadeIn();
	},
	hide: function () {
		if (!loading.handlers)
			loading.dom.stop(true, true).fadeOut();
	}
};



class ServerFn {

	name: string;
	method: string;
	restful: boolean;
	url: string;

	unlimited: boolean;
	accessible: boolean;
	timeOut: number ; //in milliseconds

	onError?: Function;


	constructor(url: string, name: string, method = 'GET', restful = true) {

		this.name = name;
		this.method = method;
		this.restful = restful;
		this.timeOut = cfg.ajaxTimeOut ;

		if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) this.url = url;
		else this.url = cfg.apiServer + url.replace(/^\//, '');


		this.unlimited = false;
		this.accessible = true;

	}

	handleError(error, callback) {
		if (typeof this.onError === 'function')
			return this.onError.call(this, error, callback);
		else
			return onServerError.call(this, error, callback);
	}

	invoke(data, callback): JQueryXHR {
		let that = this;

		if (this.accessible || this.unlimited) {
			this.accessible = false;
			//return $[this.method].apply(this, makeParam.call(this, data, callback, type || 'json'));
			if ($.isFunction(data)) {
				callback = data;
				data = null;
			}

			let url = this.url , method = this.method;
			let contentType: string|boolean = 'application/json';
			let processData: boolean = true;

			if(method === 'UPLOAD'){
				contentType = false;
				processData = false ;
				method = 'POST' ;
			}
			else{
				if (data) {
					if (!this.restful && this.method != 'GET') {
						data = JSON.stringify(data);
					}
					else if (this.restful) {
						url = format.json(url, data);
						data = null;
					}
				}
			}



			return $.ajax({
				//headers: xToken,
				contentType: contentType,
				processData : processData ,
				dataType: 'json' ,
				url: url,
				data: data,
				method: method,
				cache: false,
				timeout: that.timeOut,
				beforeSend: function (jqXHR: JQueryXHR, settings: JQueryAjaxSettings) {
					loading.handlers++;

					if (loading.timer) clearTimeout(loading.timer);
					loading.timer = 0;
					loading.show();

				},
				complete: function () {
					loading.handlers--;
					loading.timer = setTimeout(loading.hide, 100);

					that.accessible = true;
					that = null;

					return data;
				},
				error: function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
					if (jqXHR.responseJSON && jqXHR.responseJSON.meta && jqXHR.responseJSON.meta.message) {
						that.handleError.call(that, jqXHR.responseJSON.meta.message, callback);
					}
					else {
						let code = jqXHR.status;

						if (errorThrown === 'timeout')
							errorThrown = '连接超时';
						else if (!errorThrown)
							errorThrown = '无法连接服务器';
						else if (errorThrown === 'Not Found')
							errorThrown = '无此接口';

						that.handleError.call(that, `api.${that.name} error ${code} (${errorThrown})`);
					}

				},
				success: function (json: AjaxMessage, textStatus: string, jqXHR: JQueryXHR) {


					if (json.error) {
						that.handleError.call(that, json.error , callback);
					}
					else {
						if (callback && typeof callback === 'function')
							callback(json, textStatus, jqXHR);
					}
				}
			});

		}
		else {
			throw new Error('Server function [' + this.name + '] unusable now.');
		}
	}
}


let api: IApiConfig = function (apiSet: Map<string>) {

	for (let key: string in apiSet) {
		let uArr = key.split('!');
		let pName = uArr[0];
		let pMethod = uArr[1] ? uArr[1].toString().toUpperCase() : 'GET';
		let restful = (!(uArr[2] === undefined)) || (apiSet[key].indexOf('${') > -1);

		if (!api[pName]) {
			api[pName] = (function (srvFn: ServerFn) {

				let fn: ApiCall = <ApiCall> function (data, callback) {
					return srvFn.invoke.call(srvFn, data, callback);
				};

				fn.set = (k, v) => {
					srvFn[k] = v;
					return fn;
				};

				fn.get = (k: string) => srvFn[k];

				fn.toString = () => srvFn.url;

				/*fn.post = (data , cb)=>{
				 fn.set('method' , 'POST') ;
				 return fn(data , cb);
				 };*/


				return fn;
			})(new ServerFn(apiSet[key], pName, pMethod, restful));
		}
		else {
			//throw new Error('api [' + pName + '] duplicate definition');
			console.error(`api [${pName}] duplicate definition`);
		}
	}

	return api;
};


export {api, AjaxMessage} ;