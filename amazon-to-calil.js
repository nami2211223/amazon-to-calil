// ==UserScript==
// @name     Amazon to Calil
// @match    https://www.amazon.co.jp/*
// ==/UserScript==

{
	main()

	function main () {
		if (shouldSetup()) {
			setup()
		}
	}

	function shouldSetup () {
		return isBookPage()
	}

	function isBookPage () {
		const {classList} = document.querySelector('#dp')
		return (
			classList.contains('book')
			|| classList.contains('book_mobile')
		)
	}

	function setup () {
		setupCSS()
		setupButton()
	}

	function setupCSS () {
		const html = `
			<style>
				.calil-container {
					position: relative;
				}

				.calil-link {
					z-index: 999999;
					position: absolute;
					top: 0;
					right: 0;
				}
			</style>
		`
		document.querySelector('head').insertAdjacentHTML('beforeend', html)
	}

	function setupButton () {
		const asin = findAsin()
		const html = `
			<div class="calil-container">
				<a class="calil-link" href="https://calil.jp/book/${asin}" target="_blank">
					<img src="https://calil.jp/favicon-32x32.png">
				</a>
			</div>
		`
		document.querySelector('#dp').insertAdjacentHTML('afterbegin', html)
	}

	function findAsin () {
		return document.querySelector('link[rel=canonical]').href.split('/').pop()
	}
}