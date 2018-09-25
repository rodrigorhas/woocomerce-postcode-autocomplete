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

	const FORM_POSTCODE_FIELD = 'postcode'
	const CEP_API_ENDPOINT = 'https://webmaniabr.com/api/1/cep'
	const RED_BACKGROUND = '#EF5350';

	const CREDENTIALS = {
		app_key: 'VNLaEk0EmNTyuHgjnPdXCILUQKxDDUm8',
		app_secret: 'WGkzFdMHxWKE68yUOst5ijJCC7YQQ0P319Hk7tuhGTZMD61Y'
	}

	const supportedForms = [
		
		{
			container: 'address',
			fieldPrefixes: [
				/* URI: /minha-conta/editar-endereco/cobranca/ */
				'billing',
				/* URI: /minha-conta/editar-endereco/entrega/ */
				'shipping',
			]
		},
		
		/* URI: /finalizar-compra/ */
		{ container: 'billing', fieldPrefixes: ['billing'] },
	]

	/*
	 * Utils
	 */

	const fromFieldName = (id) => `#${ id }`
	const fieldName = (prefix, name) => `${prefix}_${name}`

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

	const getActiveSupportedForm = (supported) => {
		const pluginError = { error: '[Postcode Plugin] No form supported' }
		let res = {};

		supported.forEach((sup) => {
			if (res && res.form) {
				return res
			}

			const containerForm = $(`.woocommerce-${ sup.container }-fields`)

			if (!containerForm.length) {
				return
			}

			res.form = containerForm

			if (sup.fieldPrefixes.length > 1) {

				const postcodeElementQuery = containerForm.find('[id$="_postcode"]')

				if (!postcodeElementQuery.length) {
					return
				}

				postcodeElementQuery.each((_, element) => {
					const elementPrefix = element.id.split('_')[0]

					if (sup.fieldPrefixes.includes(elementPrefix)) {
						res.fieldPrefix = elementPrefix
					}
				})

				if (res.fieldPrefix) {
					return res;
				}
			}

			res.fieldPrefix = sup.fieldPrefixes[0];
		})

		return res ? res : pluginError;
	}

	/*
	 * Logic
	 */

	const { form, fieldPrefix, error } = getActiveSupportedForm(supportedForms)

	if (error) {
		console.log(error)
		return;
	}

	const $fields = form.find(`input[id^="${fieldPrefix}"], select`)
	const fieldNames = Array.from($fields).map(({ id }) => id)

	const postcodeFieldName = fieldName(fieldPrefix, FORM_POSTCODE_FIELD)

	if (!fieldNames.includes(postcodeFieldName)) {
		console.log('[Warn] Postcode field not found')
		return
	}

	const postcodeField = form.find(
		fromFieldName(postcodeFieldName)
	);

	/* Attach blur listener */
	postcodeField.on('blur', onInputBlur)

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
		const postcode = postcodeField.val();
		
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

			const fieldID = fromFieldName(fieldName(fieldPrefix, formatedKey))
			const field = form.find(fieldID)

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