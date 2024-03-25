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
					position: fixed;
					bottom: 20px;
					right: 20px;
					width: 40px;
					height: 40px;
					border-radius: 100%;
					overflow: hidden;
					box-shadow: 0px 0px 10px -5px #777d83;
					transition: transform .1s;
				}

				.calil-link:hover {
					transform: scale(1.12);
				}

				.calil-image {
					width: 100%;
					height: 100%;
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
					<img class="calil-image" src="https://calil.jp/favicon-32x32.png">
				</a>
			</div>
		`
		document.querySelector('#dp').insertAdjacentHTML('afterbegin', html)
	}

	function findAsin () {
		return document.querySelector('link[rel=canonical]').href.split('/').pop()
	}
}