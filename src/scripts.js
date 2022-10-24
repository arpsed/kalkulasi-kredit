/* global html2pdf */

document.addEventListener( 'DOMContentLoaded', e => {
	const $form = document.getElementById( 'creditSimulation' ),
		$result = document.querySelector( '.result-container' ),
		$csTable = document.querySelector( '.installment-table' ),
		$tbody = $csTable.querySelector( 'tbody' ),
		$tfoot = $csTable.querySelector( 'tfoot' ),
		formatter = new Intl.NumberFormat( 'id-ID', {
			style: 'currency',
			currency: 'IDR',
		}),

		formReset = () => {
			$result.style.display = 'none';
			$result.querySelectorAll( 'p span' ).forEach( span => {
				span.innerHTML = '&nbsp;';
			});
			$tbody.innerHTML = '';
			$tfoot.querySelector( 'th:not(:first-child)' ).innerHTML = '&nbsp;';
		},

		annuity = ( amount, interest, period, type ) => {
			const rateMonths = ( 1 + interest ) ** period,
				theEMI = amount * interest * ( rateMonths / ( rateMonths - 1 ) );

			document.getElementById( 'textInstallment' ).innerHTML = type + ' - ' + formatter.format( theEMI );

			let i, principal, intecomp,
				tr = '',
				totPrincipal = 0,
				totalIntecomp = 0,
				balance = amount;

			for ( i = 0; i < period; i++ ) {
				intecomp = interest * balance;
				totalIntecomp += intecomp;
				principal = theEMI - intecomp;
				totPrincipal += principal;
				balance = balance - principal;
				balance = balance <= 0 ? 0 : balance;

				tr += `<tr><th scope="row">${i + 1}</th>`;
				tr += `<td>${formatter.format( principal )}</td>`;
				tr += `<td>${formatter.format( intecomp )}</td>`;
				tr += `<td>${formatter.format( theEMI )}</td>`;
				tr += `<td>${formatter.format( balance )}</td></tr>`;
			}

			$tbody.innerHTML += tr;

			$tfoot.querySelector( ':nth-child(2)' ).innerHTML = formatter.format( totPrincipal );
			$tfoot.querySelector( ':nth-child(3)' ).innerHTML = formatter.format( totalIntecomp );
			$tfoot.querySelector( ':nth-child(4)' ).innerHTML = formatter.format( theEMI * period );
		},

		flat = ( amount, interest, period, type ) => {
			const principal = amount / period,
				intecomp = amount * interest,
				theInstallment = principal + intecomp;

			document.getElementById( 'textInstallment' ).innerHTML = type + ' - ' + formatter.format( theInstallment );

			let i,
				tr = '',
				totPrincipal = 0,
				totalIntecomp = 0,
				balance = amount;

			for ( i = 0; i < period; i++ ) {
				balance = balance - principal;
				balance = balance <= 0 ? 0 : balance;
				totPrincipal += principal;
				totalIntecomp += intecomp;

				tr += `<tr><th scope="row">${i + 1}</th>`;
				tr += `<td>${formatter.format( principal )}</td>`;
				tr += `<td>${formatter.format( intecomp )}</td>`;
				tr += `<td>${formatter.format( theInstallment )}</td>`;
				tr += `<td>${formatter.format( balance )}</td></tr>`;
			}

			$tbody.innerHTML += tr;

			$tfoot.querySelector( ':nth-child(2)' ).innerHTML = formatter.format( totPrincipal );
			$tfoot.querySelector( ':nth-child(3)' ).innerHTML = formatter.format( totalIntecomp );
			$tfoot.querySelector( ':nth-child(4)' ).innerHTML = formatter.format( theInstallment * period );
		},

		effective = ( amount, interest, period, type ) => {
			const principal = amount / period;

			document.getElementById( 'textInstallment' ).innerHTML = type + ' - ' + 'Lihat tabel';

			let i, intecomp, theInstallment,
				tr = '',
				totPrincipal = 0,
				totalIntecomp = 0,
				totalInstallment = 0,
				balance = amount;

			for ( i = 0; i < period; i++ ) {
				intecomp = ( amount - ( i * principal ) ) * interest;
				theInstallment = intecomp + principal;
				totalInstallment += theInstallment;
				balance = balance - principal;
				balance = balance <= 0 ? 0 : balance;
				totPrincipal += principal;
				totalIntecomp += intecomp;

				tr += `<tr><th scope="row">${i + 1}</th>`;
				tr += `<td>${formatter.format( principal )}</td>`;
				tr += `<td>${formatter.format( intecomp )}</td>`;
				tr += `<td>${formatter.format( theInstallment )}</td>`;
				tr += `<td>${formatter.format( balance )}</td></tr>`;
			}

			$tbody.innerHTML += tr;

			$tfoot.querySelector( ':nth-child(2)' ).innerHTML = formatter.format( totPrincipal );
			$tfoot.querySelector( ':nth-child(3)' ).innerHTML = formatter.format( totalIntecomp );
			$tfoot.querySelector( ':nth-child(4)' ).innerHTML = formatter.format( totalInstallment );
		};

	$form.querySelector( '#csCount' ).addEventListener( 'click', e => {
		formReset();

		const csAmount = Number( document.getElementById( 'csAmount' ).value ),
			csInterest = ( Number( document.getElementById( 'csInterest' ).value ) / 12 ) / 100,
			csPeriod = Math.round( Number( document.getElementById( 'csPeriod' ).value ) ),
			csType = document.getElementById( 'csType' ),
			csTypeLabel = csType.options[ csType.selectedIndex ].text;

		document.getElementById( 'textPeriod' ).innerHTML = `${csPeriod} bulan`;
		document.getElementById( 'textAmount' ).innerHTML = formatter.format( csAmount );

		let tr = '<tr><th scope="row">0</th><td>0</td><td>0</td>';
		tr += `<td>0</td><td>${formatter.format( csAmount )}</td></tr>`;

		$tbody.innerHTML = tr;

		if ( csType.value === 'annuity' ) {
			annuity( csAmount, csInterest, csPeriod, csTypeLabel );
		} else if ( csType.value === 'flat' ) {
			flat( csAmount, csInterest, csPeriod, csTypeLabel );
		} else if ( csType.value === 'effective' ) {
			effective( csAmount, csInterest, csPeriod, csTypeLabel );
		} else {
			return;
		}

		$result.style.display = '';
	});

	$form.addEventListener( 'reset', e => {
		formReset();
	});

	$form.querySelector( '[type="text"]' ).addEventListener( 'input', function ( e ) {
		this.value = this.value.replace( /[^0-9.,]/, '' );
	});

	$result.querySelector( '#csDownload' ).addEventListener( 'click', e => {
		e.preventDefault();

		const opt = {
			filename: 'kalkulasi-kredit.pdf',
			margin: 10,
		};

		html2pdf().set( opt ).from( $result ).save();
	});
});
