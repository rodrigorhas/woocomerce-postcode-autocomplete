<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    WoocomercePostcodeAutocomplete
 * @subpackage WoocomercePostcodeAutocomplete/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    WoocomercePostcodeAutocomplete
 * @subpackage WoocomercePostcodeAutocomplete/includes
 * @author     Your Name <email@example.com>
 */
class WoocomercePostcodeAutocompletei18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'woocomerce-postcode-autocomplete',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
