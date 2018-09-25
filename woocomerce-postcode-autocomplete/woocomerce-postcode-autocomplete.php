<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           WoocomercePostcodeAutocomplete
 *
 * @wordpress-plugin
 * Plugin Name:       Woocomerce Postcode Autocomplete
 * Plugin URI:        http://example.com/woocomerce-postcode-autocomplete-uri/
 * Description:       Woocomerce Postcode Autocomplete plugin for registering/payment forms
 * Version:           1.2.0
 * Author:            Rodrigo Silva (HDIG)
 * Author URI:        https://github.com/rodrigorhas
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       woocomerce-postcode-autocomplete
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'WOOCOMERCE_POSTCODE_AUTOCOMPLETE_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-woocomerce-postcode-autocomplete-activator.php
 */
function activate_woocomerce_postcode_autocomplete() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-woocomerce-postcode-autocomplete-activator.php';
	WoocomercePostcodeAutocompleteActivator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-woocomerce-postcode-autocomplete-deactivator.php
 */
function deactivate_woocomerce_postcode_autocomplete() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-woocomerce-postcode-autocomplete-deactivator.php';
	WoocomercePostcodeAutocompleteDeactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_woocomerce_postcode_autocomplete' );
register_deactivation_hook( __FILE__, 'deactivate_woocomerce_postcode_autocomplete' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-woocomerce-postcode-autocomplete.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_woocomerce_postcode_autocomplete() {

	$plugin = new WoocomercePostcodeAutocomplete();
	$plugin->run();

}
run_woocomerce_postcode_autocomplete();
