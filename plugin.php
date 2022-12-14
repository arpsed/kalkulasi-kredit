<?php
/**
 * Plugin Name: Kalkulasi Kredit
 * Plugin URI: https://github.com/arpsed/kalkulasi-kredit
 * Description: Plugin untuk menyimulasi kredit secara umum.
 * Version: 1.1.0
 * Author: Dessi Prayogo
 * Author URI: https://github.com/arpsed
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: anpebu
 * Domain Path: /languages
 *
 * @since 1.0.0
 * @package anpebu
 */

defined( 'ABSPATH' ) || exit;

define( 'APB_VER', '1.1.0' );
define( 'APB_PATH', plugin_dir_path( __FILE__ ) );
define( 'APB_URL', plugin_dir_url( __FILE__ ) );

register_activation_hook(
	__FILE__,
	function() {}
);
register_deactivation_hook(
	__FILE__,
	function() {}
);

add_action( 'init', function() {
	add_shortcode( 'kalkulatorKredit', function( $atts ) {
		wp_enqueue_style( 'anpebu' );
		wp_enqueue_script( 'anpebu' );

		$atts = shortcode_atts( [
			'nominal' => '13120000',
			'jangka'  => '24',
			'bunga'   => '16.2',
		], $atts );

		$amount   = (int) sanitize_text_field( $atts['nominal'] );
		$period   = (int) sanitize_text_field( $atts['jangka'] );
		$interest = (float) sanitize_text_field( $atts['bunga'] );

		ob_start();
		include_once APB_PATH . 'simulator.php';

		return ob_get_clean();
	} );
} );

add_action( 'wp_enqueue_scripts', function() {
	wp_register_style( 'anpebu', APB_URL . 'styles.css', [], APB_VER, 'screen' );
	wp_register_script( 'anpebu', APB_URL . 'scripts.js', [ 'jquery', 'html2pdf' ], APB_VER, true );
	wp_register_script( 'html2pdf', 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js', [], '0.9.3', true );
} );
