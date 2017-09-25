import {store} from 'ts/util/store.ts';
import opg from 'ts/opg.ts';

//noinspection TypeScriptUnresolvedVariable
store.set('apiServer', window.CONFIG.apiServer);

opg.api({
	login: 'Bll.Authen/SignIn',
});


let form = $('#loginForm');

let btnLogin = $('#btnLogin').click(function () {

	let param = form.fieldsToJson({
		name: {
			name: '用户名',
			require: true,
		},
		password: {
			name: '密码',
			require: true,
		},
	});

	if (param) {
		opg.api.login(param, function (json) {
			if (json.data === 1) {

				let url = __uri('./page/main.aspx');

				let previousLoginName = store.get('user');
				//debugger;
				if (previousLoginName && previousLoginName === param.name) {
					let hash = opg.request['ReturnUrl'];
					if (hash) {
						url += hash;
					}
				}

				store.set('user', param.name);

				$('#cycle').attr('stroke', '#ffffff').addClass('cycle');

				setTimeout(function () {
					window.location.replace(url);
				}, 1300);
			}
			else {
				opg.err('用户名或密码错误');
			}
		});

	}
});
