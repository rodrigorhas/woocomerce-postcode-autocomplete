<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    WoocomerceCepAutocomplete
 * @subpackage WoocomerceCepAutocomplete/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    WoocomerceCepAutocomplete
 * @subpackage WoocomerceCepAutocomplete/admin
 * @author     Your Name <email@example.com>
 */
class WoocomerceCepAutocompleteAdmin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $woocomerce_cep_autocomplete    The ID of this plugin.
	 */
	private $woocomerce_cep_autocomplete;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $woocomerce_cep_autocomplete       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $woocomerce_cep_autocomplete, $version ) {

		$this->woocomerce_cep_autocomplete = $woocomerce_cep_autocomplete;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in WoocomerceCepAutocompleteLoader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The WoocomerceCepAutocompleteLoader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->woocomerce_cep_autocomplete, plugin_dir_url( __FILE__ ) . 'css/plugin-name-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in WoocomerceCepAutocompleteLoader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The WoocomerceCepAutocompleteLoader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->woocomerce_cep_autocomplete, plugin_dir_url( __FILE__ ) . 'js/plugin-name-admin.js', array( 'jquery' ), $this->version, false );

	}

}
