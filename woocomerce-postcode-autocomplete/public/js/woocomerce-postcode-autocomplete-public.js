function PluginScope ($) {
	'use strict';

	/*
 *	[All Form Fields]
 *	postcode - cep
 *	address_1 - endereco
 *	number - numero
 *	address_2 - complemento
 *	neighborhood - bairro
 *	city - cidade
 */

	/*
	 * Definitions
	 */

	const BILLING_POSTCODE_FIELD = 'billing_postcode'
	const CEP_API_ENDPOINT = 'https://webmaniabr.com/api/1/cep'
	const RED_BACKGROUND = '#EF5350';

	const CREDENTIALS = {
		app_key: 'VNLaEk0EmNTyuHgjnPdXCILUQKxDDUm8',
		app_secret: 'WGkzFdMHxWKE68yUOst5ijJCC7YQQ0P319Hk7tuhGTZMD61Y'
	}

	/*
	 * Utils
	 */

	const fromFieldName = (id) => `#${ id }`

	const buildPostcodeAPIUri = (postcode, credentials) =>
		`${ CEP_API_ENDPOINT }/${ postcode }/?app_key=${ credentials.app_key }&app_secret=${ credentials.app_secret }`

	const address = (response) => ({
		postcode: response.cep,
		address_1: response.endereco,
		address_2: response.complemento,
		neighborhood: response.bairro,
		city: response.cidade,
		state: response.uf,
	})

	const billingForm = $('.woocommerce-billing-fields');

	if (!billingForm.length) {
		console.log('[Warn] Billing form not found')
		return;
	}

	const $fields = billingForm.find('input[id^="billing"], select')
	const fieldNames = Array.from($fields).map(({ id }) => id)

	if (!fieldNames.includes(BILLING_POSTCODE_FIELD)) {
		console.log('[Warn] CEP field not found')
		return
	}

	const cepField = billingForm.find(
		fromFieldName(BILLING_POSTCODE_FIELD)
	);

	/* Attach blur listener */
	cepField.on('blur', onInputBlur)

	/*
	 * Handlers
	 */

	function handlePostcodeAPIError(err) {
		console.log('[Warn] Postcode API throws an error');

		Snackbar.show({
			text: 'Não foi possivel pesquisar as informações do CEP',
			duration: 3000,
			showAction: false,
			backgroundColor: RED_BACKGROUND
		})

		throw new Error(err)
	}

	function onInputBlur() {
		const postcode = cepField.val();
		
		if (!postcode.length) {
			return
		}

		const API_REQUEST = {
			url: buildPostcodeAPIUri(postcode, CREDENTIALS),
			type: 'GET',
		}

		Snackbar.show({
			text: 'Carregando informações do CEP',
			duration: 2000,
			showAction: false
		})

		/* Api request */
		$.ajax(API_REQUEST)
			.success((response) =>
				applyValues(address(response), $fields)
			)
			.fail(handlePostcodeAPIError)
	}

	function applyValues(formated, fields) {
		Object.keys(formated).forEach((formatedKey) => {
			const value = formated[formatedKey];

			const fieldID = fromFieldName(`billing_${ formatedKey }`)
			const field = billingForm.find(fieldID)

			field.val(value)
		})

		Snackbar.show({
			text: 'O endereço foi preenchido automaticamente',
			duration: 3000,
			showAction: false
		})
	}
}

jQuery(() => PluginScope(jQuery))