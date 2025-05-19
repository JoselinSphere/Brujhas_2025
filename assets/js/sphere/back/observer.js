// *************************************************************************************

// Observer

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

  // Add buttons
  safeDOMUpdate(() => {
    // Ejemplo: se agrega un contenedor de botones (según tu lógica)
    addButtonsContainer("sphere-method-selector");

  });
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




// *************************************************************************************

// *************************************************************************************

// *********** ADD SELECT BUTTONS

// *************************************************************************************

// *************************************************************************************



// Variables globales
const topTime = new Date();
topTime.setHours(11, 0, 0, 0); // Establece el horario límite para mostrar el método express
const express_key_word = 'ingresar aqui palabra clave'; // To hide express option

// Función auxiliar para crear un botón con texto y clases adicionales.
function crearBoton(texto, claseExtra) {
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.className = `btn ${claseExtra}`;

  // Deshabilitar funcionalidades por defecto al hacer click
  boton.addEventListener("click", function (event) {
    event.preventDefault();   // Evita la acción por defecto
    event.stopPropagation();  // Evita la propagación del evento
  });
  return boton;
}

function addButtonsContainerStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* Estilos para el contenedor específico de los botones */
    #sphere-method-selector {
      display: flex;
      gap: 16px;
      margin: 16px 0;
    }
    
    /* Estilos base para los botones dentro del contenedor */
    #sphere-method-selector .btn {
      padding: 12px 24px;
      font-size: 1.1rem;
      background-color: white;
      color: black;
      border: 1px solid black;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      margin: 8px;
    }
    
    /* Efecto hover: sombra al pasar el mouse */
    #sphere-method-selector .btn:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    /* Efecto active: sombra y pequeño movimiento cuando se hace click */
    #sphere-method-selector .btn:active {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transform: translateY(2px);
    }
    
    /* Estilo para el botón activo (seleccionado) */
    #sphere-method-selector .btn.active {
      background-color: #ddd;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(style);
}

function createButtonsContainer(id = 'method-selector') {
  // Add buttonContainer styles
  addButtonsContainerStyles();

  // Crear un contenedor para los botones
  const botonesContainer = document.createElement("div");
  botonesContainer.id = id;
  botonesContainer.className = "botones-envio";

  // Crear los dos botones
  const botonRecojo = crearBoton("Recojo en tienda", "btn-primary");
  const botonEntrega = crearBoton("Entrega a domicilio", "btn-secondary");

  // Agregar los botones al contenedor
  botonesContainer.appendChild(botonRecojo);
  botonesContainer.appendChild(botonEntrega);
  return botonesContainer
}

// ********************************************************************************

// ************* Add buttons container to Checkout

function addButtonsContainer(id = 'method-selector') {

  // Verificar si no está creado, sino terminar
  if (document.getElementById(id)) return

  // Obtener el fieldset de shipping options usando su ID
  const shippingFieldset = document.getElementById("checkout-shipping-options");
  if (!shippingFieldset) return

  // Obtener <legend> dentro del fieldset
  const legend = shippingFieldset?.querySelector("legend");
  if (!legend) return

  // Insertar el contenedor de botones justo después del <legend>
  legend.insertAdjacentElement("afterend", createButtonsContainer(id));

  setupButtonFunctionality();
}

// ***********************************************************
// *************************** Add buttons Functionality

function setupButtonFunctionality() {
  const shippingOptionsFieldset = document.querySelector('#checkout-shipping-options');
  if (!shippingOptionsFieldset) return;

  // Selecciona el contenedor de botones por su id "sphere-method-selector"
  const buttonsContainer = document.getElementById("sphere-method-selector");
  if (!buttonsContainer) return;

  // Asumimos que dentro del contenedor existen dos botones 
  // (el primero: "Recojo en tienda", el segundo: "Entrega a domicilio")
  const botones = buttonsContainer.querySelectorAll("button");
  if (botones.length < 2) return;
  const [btnRecojo, btnEntrega] = botones;

  // Función auxiliar para actualizar el botón activo
  const updateActiveButton = (clickedButton) => {
    buttonsContainer.querySelectorAll("button").forEach(boton => {
      boton.classList.remove("active");
    });
    clickedButton.classList.add("active");
  };

  // Función manejadora para el botón "Recojo en tienda"
  const handleRecojoClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateActiveButton(btnRecojo);

    // Cada vez que hacemos clic, tomamos los listItems **actuales**
    const shippingOptionsFieldset = document.querySelector('#checkout-shipping-options');
    if (!shippingOptionsFieldset) return;
    const listItems = shippingOptionsFieldset.querySelectorAll('ul.form-checklist > li');
    if (!listItems.length) return;

    filterShippingOptions(listItems, true);
  };

  // Función manejadora para el botón "Entrega a domicilio"
  const handleEntregaClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateActiveButton(btnEntrega);

    // Lo mismo: adquirimos la lista actual de <li>
    const shippingOptionsFieldset = document.querySelector('#checkout-shipping-options');
    if (!shippingOptionsFieldset) return;
    const listItems = shippingOptionsFieldset.querySelectorAll('ul.form-checklist > li');
    if (!listItems.length) return;

    filterShippingOptions(listItems, false);
  };

  // Añadimos listeners solo si no se han agregado antes
  if (!btnRecojo.dataset.listenerAttached) {
    btnRecojo.addEventListener("click", handleRecojoClick);
    btnRecojo.dataset.listenerAttached = "true";
    // Simula el click en el primer botón para que se muestre por defecto
    btnRecojo.click();
  }

  if (!btnEntrega.dataset.listenerAttached) {
    btnEntrega.addEventListener("click", handleEntregaClick);
    btnEntrega.dataset.listenerAttached = "true";
  }
}

// Función encargada de filtrar las opciones de envío
// segun `recojoEnTienda` (true = costo 0, false = costo > 0).
function filterShippingOptions(listItems, recojoEnTienda) {
  if (!listItems) return;

  const now = new Date();

  listItems.forEach(item => {
    // Intentar obtener el elemento que contiene el precio
    const priceElement = item.querySelector('.shippingOption-price');
    const descElement = item.querySelector('.shippingOption-desc');
    if (!priceElement) {
      // Si no hay elemento de precio, mejor ocultar
      item.style.display = 'none';
      return;
    }

    // Ocultar metodo express
    // Si la hora actual es mayor que topTime y la descripción contiene "express", se oculta el item.
    if (now > topTime && descElement && descElement.textContent.toLowerCase().includes(express_key_word)) {
      item.style.display = 'none';
      return;
    }

    // Extraer el texto, por ejemplo "S/.0.00", y convertirlo a número
    const priceText = priceElement.textContent.trim(); // "S/.0.00"
    // Eliminar todo lo que no sea dígito o punto (.)
    const numericPrice = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;

    // Si es recojoEnTienda, sólo mostramos métodos con costo 0
    if (recojoEnTienda) {
      if (numericPrice === 0) {
        item.style.display = "list-item";
      } else {
        item.style.display = "none";
      }
    } else {
      // Entrega a domicilio: métodos con costo > 0
      if (numericPrice > 0) {
        item.style.display = "list-item";
      } else {
        item.style.display = "none";
      }
    }
  });
}

// *************************************************************************************

// *************************************************************************************

// *********** DEACTIVATE SHIPPING OPTIONS

// *************************************************************************************

// *************************************************************************************


// Variables globales para controlar el estado del checkout y la selección del método
let checkoutReady = false;
let methodSelected = false;
let isHandlingSelection = false; // Bandera para indicar que se está procesando la selección
let OBSERVER_MS = 0;


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
}
