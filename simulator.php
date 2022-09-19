<section class="cs-container">
	<form id="creditSimulation" method="get">
		<h3 class="cs-title"><?php esc_html_e( 'Kalkulator Simulasi', 'anpebu' ); ?></h3>
		<div class="cs-form-row">
			<label for="csAmount" class="cs-form-label"><?php esc_html_e( 'Jumlah Pinjaman', 'anpebu' ); ?></label>
			<div class="cs-form-field cs-input-group">
				<span class="cs-input-group-text">Rp.</span>
				<input id="csAmount" type="text" value="<?php echo esc_attr( $amount ); ?>" class="cs-form-control" inputmode="numeric">
			</div>
		</div>
		<div class="cs-form-row">
			<label for="csPeriod" class="cs-form-label"><?php esc_html_e( 'Jangka Waktu', 'anpebu' ); ?></label>
			<div class="cs-form-field cs-input-group">
				<input id="csPeriod" type="text" value="<?php echo esc_attr( $period ); ?>" class="cs-form-control" inputmode="numeric">
				<span class="cs-input-group-text"><?php esc_html_e( 'bulan', 'anpebu' ); ?></span>
			</div>
		</div>
		<div class="cs-form-row">
			<label for="csInterest" class="cs-form-label"><?php esc_html_e( 'Bunga', 'anpebu' ); ?></label>
			<div class="cs-form-field cs-input-group">
				<input id="csInterest" type="text" value="<?php echo esc_attr( $interest ); ?>" class="cs-form-control" inputmode="decimal">
				<span class="cs-input-group-text"><?php esc_html_e( '% /tahun', 'anpebu' ); ?></span>
			</div>
		</div>
		<div class="cs-form-row">
			<label for="csType" class="cs-form-label"><?php esc_html_e( 'Perhitungan Bunga', 'anpebu' ); ?></label>
			<div class="cs-form-field">
				<select id="csType" name="textType" class="cs-form-select">
					<option value="annuity"><?php esc_attr_e( 'ANUITAS', 'anpebu' ); ?></option>
					<option value="flat"><?php esc_attr_e( 'FLAT', 'anpebu' ); ?></option>
					<option value="effective"><?php esc_attr_e( 'EFEKTIF', 'anpebu' ); ?></option>
				</select>
			</div>
		</div>
		<div style="text-align:right;">
			<button id="csCount" type="button" class="cs-button"><?php esc_html_e( 'Kalkulasi', 'anpebu' ); ?></button>
			&nbsp;
			<button type="reset" class="cs-button"><?php esc_html_e( 'Bersihkan', 'anpebu' ); ?></button>
		</div>
	</form>
	<div class="result-container" style="display:none;">
		<div class="installment-info">
			<p><strong><?php esc_html_e( 'Total Pinjaman:', 'anpebu' ); ?></strong> <span id="textAmount"></span></p>
			<p><strong><?php esc_html_e( 'Jangka Waktu:', 'anpebu' ); ?></strong> <span id="textPeriod"></span></p>
			<p><strong><?php esc_html_e( 'Angsuran /bulan:', 'anpebu' ); ?></strong> <span id="textInstallment"></span></p>
		</div>
		<table class="installment-table">
			<thead>
				<tr>
					<th scope="col"><?php esc_html_e( 'Angsuran', 'anpebu' ); ?></th>
					<th scope="col"><?php esc_html_e( 'Pokok', 'anpebu' ); ?></th>
					<th scope="col"><?php esc_html_e( 'Bunga', 'anpebu' ); ?></th>
					<th scope="col"><?php esc_html_e( 'Pembayaran', 'anpebu' ); ?></th>
					<th scope="col"><?php esc_html_e( 'Sisa', 'anpebu' ); ?></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
			<tfoot>
				<tr>
					<th scope="col"><?php esc_html_e( 'Total', 'anpebu' ); ?></th>
					<th scope="col">&nbsp;</th>
					<th scope="col">&nbsp;</th>
					<th scope="col">&nbsp;</th>
					<th scope="col">&nbsp;</th>
				</tr>
			</tfoot>
		</table>
	</div>
</section>
