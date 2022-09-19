jQuery( $ => {
	const $form = $( '#creditSimulation' ),
		$csTable = $( '.installment-table' ),
		$tbody = $csTable.find( 'tbody' ),
		$tfoot = $csTable.find( 'tfoot' ),
		formatter = new Intl.NumberFormat( 'id-ID', {
			style: 'currency',
			currency: 'IDR',
		}),

		formReset = () => {
			$( '.result-container p span' ).empty()
				.parents( '.result-container' ).css( 'display', 'none' );
			$tbody.empty();
			$tfoot.find( 'th:not(:first-child)' ).html( '&nbsp;' );
		},

		annuity = ( amount, interest, period ) => {
			const rateMonths = ( 1 + interest ) ** period,
				theEMI = amount * interest * ( rateMonths / ( rateMonths - 1 ) );

			$( '#textInstallment' ).text( formatter.format( theEMI ) );

			let i, principal, intecomp, tr,
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

				tr = '';
				tr += `<tr><th scope="row">${i + 1}</th>`;
				tr += `<td>${formatter.format( principal )}</td>`;
				tr += `<td>${formatter.format( intecomp )}</td>`;
				tr += `<td>${formatter.format( theEMI )}</td>`;
				tr += `<td>${formatter.format( balance )}</td></tr>`;

				$tbody.append( tr );
			}

			$tfoot.find( ':nth-child(2)' ).text( formatter.format( totPrincipal ) );
			$tfoot.find( ':nth-child(3)' ).text( formatter.format( totalIntecomp ) );
			$tfoot.find( ':nth-child(4)' ).text( formatter.format( theEMI * period ) );
		},

		flat = ( amount, interest, period ) => {
			const principal = amount / period,
				intecomp = amount * interest,
				theInstallment = principal + intecomp;

			$( '#textInstallment' ).text( formatter.format( theInstallment ) );

			let i, tr,
				totPrincipal = 0,
				totalIntecomp = 0,
				balance = amount;

			for ( i = 0; i < period; i++ ) {
				balance = balance - principal;
				balance = balance <= 0 ? 0 : balance;
				totPrincipal += principal;
				totalIntecomp += intecomp;

				tr = '';
				tr += `<tr><th scope="row">${i + 1}</th>`;
				tr += `<td>${formatter.format( principal )}</td>`;
				tr += `<td>${formatter.format( intecomp )}</td>`;
				tr += `<td>${formatter.format( theInstallment )}</td>`;
				tr += `<td>${formatter.format( balance )}</td></tr>`;

				$tbody.append( tr );
			}

			$tfoot.find( ':nth-child(2)' ).text( formatter.format( totPrincipal ) );
			$tfoot.find( ':nth-child(3)' ).text( formatter.format( totalIntecomp ) );
			$tfoot.find( ':nth-child(4)' ).text( formatter.format( theInstallment * period ) );
		},

		effective = ( amount, interest, period ) => {
			const principal = amount / period;

			$( '#textInstallment' ).text( 'Lihat tabel' );

			let i, intecomp, theInstallment, tr,
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

				tr = '';
				tr += `<tr><th scope="row">${i + 1}</th>`;
				tr += `<td>${formatter.format( principal )}</td>`;
				tr += `<td>${formatter.format( intecomp )}</td>`;
				tr += `<td>${formatter.format( theInstallment )}</td>`;
				tr += `<td>${formatter.format( balance )}</td></tr>`;

				$tbody.append( tr );
			}

			$tfoot.find( ':nth-child(2)' ).text( formatter.format( totPrincipal ) );
			$tfoot.find( ':nth-child(3)' ).text( formatter.format( totalIntecomp ) );
			$tfoot.find( ':nth-child(4)' ).text( formatter.format( totalInstallment ) );
		};

	$form.on( 'click', '#csCount', e => {
		formReset();

		const csAmount = Number( $( '#csAmount' ).val() ),
			csInterest = ( Number( $( '#csInterest' ).val() ) / 12 ) / 100,
			csPeriod = Number( $( '#csPeriod' ).val() ),
			csType = $( '#csType' ).val();

		$( '#textPeriod' ).text( `${csPeriod} bulan` );
		$( '#textAmount' ).text( formatter.format( csAmount ) );

		let tr = '<tr><th scope="row">0</th><td>0</td><td>0</td>';
		tr += `<td>0</td><td>${formatter.format( csAmount )}</td></tr>`;

		$tbody.append( tr );

		if ( csType === 'annuity' ) {
			annuity( csAmount, csInterest, csPeriod );
		} else if ( csType === 'flat' ) {
			flat( csAmount, csInterest, csPeriod );
		} else if ( csType === 'effective' ) {
			effective( csAmount, csInterest, csPeriod );
		} else {
			return;
		}

		$( '.result-container' ).css( 'display', '' );
	});

	$form.on( 'reset', e => {
		formReset();
	});

	$form.on( 'input', '[type="text"]', function ( e ) {
		const $this = $( this ),
			theValue = $this.val();

		$this.val( theValue.replace( /[^0-9.,]/, '' ) );
	});
});
