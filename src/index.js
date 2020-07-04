import { changeView } from './lib/viewController.js';
//@ts-check
/**
 * @file index.js is the root file for this web page
 * @author Grupo Qaira S.A.C.
 * @see <a href="https://qairamap.qairadrones.com/"> qAIRaMap </a>
 */

/**
 * Service Worker Initialization
 */

if ('serviceWorker' in navigator) {
	console.log('Service Worker: Supported');
	window.onload = () => {
		navigator.serviceWorker
			.register('service_worker.bundle.js')
			.then(() => console.log('Service Worker: Registered'))
			.catch(err => console.log(`Service Worker: Error: ${err}`));

		document.getElementById('loader').classList.add('hide');
		
		const chipAlert = document.querySelectorAll('.chip');
		M.Chips.getInstance(chipAlert);

		window.onhashchange = changeView(window.location.hash);
	};
}
