// Variables globales para controlar el estado del checkout y la selección del método
let checkoutReady = false;
let methodSelected = false;
let isHandlingSelection = false; // Bandera para indicar que se está procesando la selección
let OBSERVER_MS = 0;

// MutationObserver que detecta cambios en el DOM
const observer = new MutationObserver(mutations => {
  // Si se está procesando la selección, no se reconfigura el checkout
  if (!methodSelected) {
    setTimeout(() => {
      safeDOMUpdate(() => {
        initCheckout();
      });
    }, OBSERVER_MS);
  }
});

observer.observe(document.body, { childList: true, subtree: true });

/**
 * Ejecuta cambios en el DOM de forma segura, desconectando temporalmente el observer
 * para evitar que detecte sus propias modificaciones.
 * @param {Function} func - Función que realiza las actualizaciones en el DOM.
 */
function safeDOMUpdate(func) {
  observer.disconnect();
  func();
  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Configura el estado inicial de cada radio.
 * - Desmarca el radio.
 * - Remueve clases de selección del contenedor (<li>) y su cabecera.
 * - Agrega el listener para el cambio.
 * 
 * @param {HTMLElement} radio - Elemento radio a configurar.
 */
function setRadioInitialState(radio) {
  radio.checked = false;
  const liParent = radio.closest('li');
  if (liParent) {
    liParent.classList.remove(
      'form-checklist-item--selected',
      'optimizedCheckout-form-checklist-item--selected'
    );
    const header = liParent.querySelector('.form-checklist-header');
    if (header) {
      header.classList.remove('form-checklist-header--selected');
    }
  }
  radio.addEventListener('change', onRadioChange);
}

/**
 * Se ejecuta al seleccionar un radio.
 * Se marca el radio, se elimina el listener de todos los radios, se agregan las clases de selección
 * y se habilita el botón de continuar. Durante el proceso se establece la bandera para evitar
 * que el observer reprograme la configuración.
 * 
 * @param {Event} event - Evento disparado al cambiar el radio.
 */
function onRadioChange(event) {
  // Aseguramos que el radio quede marcado
  // event.target.checked = true;
  methodSelected = true;

  safeDOMUpdate(() => {
    const allRadios = document.querySelectorAll('#checkout-shipping-options input[type="radio"]');
    allRadios.forEach(radio => {
      radio.removeEventListener('change', onRadioChange);
    });

    const selectedRadio = event.target;
    const liParent = selectedRadio.closest('li');
    if (liParent) {
      liParent.classList.add('form-checklist-item--selected', 'optimizedCheckout-form-checklist-item--selected');
      const header = liParent.querySelector('.form-checklist-header');
      if (header) {
        header.classList.add('form-checklist-header--selected');
      }
    }

    const continueButton = document.getElementById("checkout-shipping-continue");
    if (continueButton) {
      continueButton.disabled = false;
    }
    
    const warningMessage = document.getElementById('shippingWarning');
    if (warningMessage) {
      warningMessage.style.display = 'none';
    }
  });
}

/**
 * Inicializa o reconfigura el checkout: 
 * - Configura el estado inicial de cada radio (si no se ha seleccionado un método).
 * - Configura el botón de continuar (deshabilitándolo si no hay selección) y el mensaje de advertencia.
 */
function initCheckout() {
  const radios = document.querySelectorAll('#checkout-shipping-options input[type="radio"]');
  if (radios.length > 0 && !methodSelected) {
    radios.forEach(radio => {
      setRadioInitialState(radio);
    });
  }

  const continueButton = document.getElementById("checkout-shipping-continue");
  if (!continueButton) return;

  continueButton.disabled = !methodSelected;
  let warningMessage = document.getElementById('shippingWarning');
  if (!warningMessage) {
    warningMessage = document.createElement('div');
    warningMessage.id = 'shippingWarning';
    warningMessage.style.color = 'red';
    warningMessage.textContent = 'Debe seleccionar un método de envío';
    continueButton.parentNode.insertBefore(warningMessage, continueButton);
  }
  
  warningMessage.style.display = methodSelected ? 'none' : 'block';
  console.log('initCheckout');
  
}
