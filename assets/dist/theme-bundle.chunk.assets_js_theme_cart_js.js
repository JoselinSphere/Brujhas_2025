"use strict";
(self["webpackChunkStyle"] = self["webpackChunkStyle"] || []).push([["assets_js_theme_cart_js"],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }







var Cart = /*#__PURE__*/function (_PageManager) {
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(Cart, _PageManager);
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.setApplePaySupport();
    this.bindEvents();
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!Number.isInteger(newQty)) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry));
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _this3.$overlay.hide();
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    if (this.$modal === null) {
      this.$modal = $('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__.ModalEvents.opened, optionChangeHandler);
      }
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(err);
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);
      $cartPageTitle.replaceWith(response.pageTitle);
      _this5.bindEvents();
      _this5.$overlay.hide();
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(string, {
        icon: 'warning',
        showCancelButton: true,
        onConfirm: function onConfirm() {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)($codeInput.data('error'));
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!(0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(_this8.context);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(validationDictionary.invalid_gift_certificate);
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(resp.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShippingEstimator)
/* harmony export */ });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    (0,_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.showAlertModal)(err);
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.Validators.cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();


/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CartItemDetails)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__.optionChangeDecorator.call(_this, hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = (0,_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.convertIntoArray)(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.insertStateHiddenField)($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()($selectElement)) {
    statesArray.states.forEach(function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }
  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_4__.showAlertModal)(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXJ0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRThCO0FBQ1M7QUFDakM7QUFDVztBQUNpQjtBQUNsQjtBQUFBLElBRXBDUyxJQUFJLDBCQUFBQyxZQUFBO0VBQUEsU0FBQUQsS0FBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0VBQUE7RUFBQUMsY0FBQSxDQUFBSixJQUFBLEVBQUFDLFlBQUE7RUFBQSxJQUFBSSxNQUFBLEdBQUFMLElBQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBQ3JCRSxPQUFPLEdBQVAsU0FBQUEsT0FBT0EsQ0FBQSxFQUFHO0lBQ04sSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSTtJQUNsQixJQUFJLENBQUNDLGdCQUFnQixHQUFHQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQ3hDLElBQUksQ0FBQ0MsWUFBWSxHQUFHRCxDQUFDLENBQUMscUJBQXFCLENBQUM7SUFDNUMsSUFBSSxDQUFDRSxhQUFhLEdBQUdGLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztJQUM1QyxJQUFJLENBQUNHLFdBQVcsR0FBR0gsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQzFDLElBQUksQ0FBQ0ksMkJBQTJCLEdBQUdKLENBQUMsQ0FBQyx5Q0FBeUMsQ0FBQztJQUMvRSxJQUFJLENBQUNLLFFBQVEsR0FBR0wsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQzNDTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUk7SUFDN0IsSUFBSSxDQUFDQyx3QkFBd0IsR0FBRyxJQUFJO0lBRXBDLElBQUksQ0FBQ0Msa0JBQWtCLENBQUMsQ0FBQztJQUN6QixJQUFJLENBQUNDLFVBQVUsQ0FBQyxDQUFDO0VBQ3JCLENBQUM7RUFBQWYsTUFBQSxDQUVEYyxrQkFBa0IsR0FBbEIsU0FB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Q0FBQy9DLEdBQUcsQ0FBQyxVQUFBK0QsR0FBRztJQUFBLE9BQUlBLEdBQUcsQ0FBQy9FLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ2dGLEdBQUcsQ0FBQyxDQUFDO0VBQUEsRUFBQztFQUVwRyxPQUFPRixlQUFlLENBQUNHLE1BQU0sQ0FBQyxVQUFDQyxHQUFHLEVBQUVILEdBQUcsRUFBRVgsQ0FBQyxFQUFLO0lBQzNDYyxHQUFHLENBQUNILEdBQUcsQ0FBQyxHQUFHSCxhQUFhLENBQUNSLENBQUMsQ0FBQztJQUMzQixPQUFPYyxHQUFHO0VBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL1N0eWxlLy4vYXNzZXRzL2pzL3RoZW1lL2NhcnQuanMiLCJ3ZWJwYWNrOi8vU3R5bGUvLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vU3R5bGUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2NhcnQtaXRlbS1kZXRhaWxzLmpzIiwid2VicGFjazovL1N0eWxlLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9TdHlsZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vc3RhdGUtY291bnRyeS5qcyIsIndlYnBhY2s6Ly9TdHlsZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XHJcbmltcG9ydCB7IGJpbmQsIGRlYm91bmNlIH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcclxuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xyXG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwsIHNob3dBbGVydE1vZGFsLCBNb2RhbEV2ZW50cyB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcclxuaW1wb3J0IENhcnRJdGVtRGV0YWlscyBmcm9tICcuL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICB0aGlzLiRtb2RhbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy4kY2FydFBhZ2VDb250ZW50ID0gJCgnW2RhdGEtY2FydF0nKTtcclxuICAgICAgICB0aGlzLiRjYXJ0Q29udGVudCA9ICQoJ1tkYXRhLWNhcnQtY29udGVudF0nKTtcclxuICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMgPSAkKCdbZGF0YS1jYXJ0LXN0YXR1c10nKTtcclxuICAgICAgICB0aGlzLiRjYXJ0VG90YWxzID0gJCgnW2RhdGEtY2FydC10b3RhbHNdJyk7XHJcbiAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMgPSAkKCdbZGF0YS1jYXJ0LWFkZGl0aW9uYWwtY2hlY2tvdXQtYnV0dG9uc10nKTtcclxuICAgICAgICB0aGlzLiRvdmVybGF5ID0gJCgnW2RhdGEtY2FydF0gLmxvYWRpbmdPdmVybGF5JylcclxuICAgICAgICAgICAgLmhpZGUoKTsgLy8gVE9ETzogdGVtcG9yYXJ5IHVudGlsIHJvcGVyIHB1bGxzIGluIGhpcyBjYXJ0IGNvbXBvbmVudHNcclxuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gbnVsbDtcclxuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0QXBwbGVQYXlTdXBwb3J0KCk7XHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXBwbGVQYXlTdXBwb3J0KCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuQXBwbGVQYXlTZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudC5hZGRDbGFzcygnYXBwbGUtcGF5LXN1cHBvcnRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpIHtcclxuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcclxuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gaXRlbUlkO1xyXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcclxuICAgICAgICBjb25zdCBvbGRRdHkgPSBwYXJzZUludCgkZWwudmFsKCksIDEwKTtcclxuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xyXG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XHJcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xyXG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcclxuICAgICAgICBjb25zdCBuZXdRdHkgPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpID09PSAnaW5jJyA/IG9sZFF0eSArIDEgOiBvbGRRdHkgLSAxO1xyXG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcclxuICAgICAgICBpZiAobmV3UXR5IDwgbWluUXR5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtaW5FcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWF4RXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XHJcblxyXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XHJcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwgPSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XHJcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcclxuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xyXG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XHJcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcHJlVmFsICE9PSBudWxsID8gcHJlVmFsIDogbWluUXR5O1xyXG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcclxuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XHJcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gcGFyc2VJbnQoTnVtYmVyKCRlbC52YWwoKSksIDEwKTtcclxuICAgICAgICBsZXQgaW52YWxpZEVudHJ5O1xyXG5cclxuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XHJcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG5ld1F0eSkpIHtcclxuICAgICAgICAgICAgaW52YWxpZEVudHJ5ID0gJGVsLnZhbCgpO1xyXG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCh0aGlzLmNvbnRleHQuaW52YWxpZEVudHJ5TWVzc2FnZS5yZXBsYWNlKCdbRU5UUlldJywgaW52YWxpZEVudHJ5KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcclxuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWluRXJyb3IpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcclxuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWF4RXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XHJcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XHJcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XHJcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVJlbW92ZShpdGVtSWQsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0geyBwcm9kdWN0Rm9yQ2hhbmdlSWQ6IHByb2R1Y3RJZCwgLi4udGhpcy5jb250ZXh0IH07XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuJG1vZGFsID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJG1vZGFsID0gJCgnI21vZGFsJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2NvbmZpZ3VyZS1wcm9kdWN0JyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBtb2RhbC5vcGVuKCk7XHJcbiAgICAgICAgdGhpcy4kbW9kYWwuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5hZGRDbGFzcygnaGlkZS1jb250ZW50Jyk7XHJcblxyXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5jb25maWd1cmVJbkNhcnQoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyID0gJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVzLXdyYXBwZXJdJywgdGhpcy4kbW9kYWwpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQgPSAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIub3V0ZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmxlbmd0aCAmJiBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5jc3MoJ2hlaWdodCcsIG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRtb2RhbC5oYXNDbGFzcygnb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25DaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRtb2RhbC5vbmUoTW9kYWxFdmVudHMub3BlbmVkLCBvcHRpb25DaGFuZ2VIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBDYXJ0SXRlbURldGFpbHModGhpcy4kbW9kYWwsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1dGlscy5ob29rcy5vbigncHJvZHVjdC1vcHRpb24tY2hhbmdlJywgKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJChjdXJyZW50VGFyZ2V0KS5maW5kKCdmb3JtJyk7XHJcbiAgICAgICAgICAgIGNvbnN0ICRzdWJtaXQgPSAkKCdpbnB1dC5idXR0b24nLCAkZm9ybSk7XHJcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJCgnLmFsZXJ0TWVzc2FnZUJveCcpO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YSB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgncC5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoQ29udGVudChyZW1vdmUpIHtcclxuICAgICAgICBjb25zdCAkY2FydEl0ZW1zUm93cyA9ICQoJ1tkYXRhLWl0ZW0tcm93XScsIHRoaXMuJGNhcnRDb250ZW50KTtcclxuICAgICAgICBjb25zdCAkY2FydFBhZ2VUaXRsZSA9ICQoJ1tkYXRhLWNhcnQtcGFnZS10aXRsZV0nKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ2NhcnQvY29udGVudCcsXHJcbiAgICAgICAgICAgICAgICB0b3RhbHM6ICdjYXJ0L3RvdGFscycsXHJcbiAgICAgICAgICAgICAgICBwYWdlVGl0bGU6ICdjYXJ0L3BhZ2UtdGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzTWVzc2FnZXM6ICdjYXJ0L3N0YXR1cy1tZXNzYWdlcycsXHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zOiAnY2FydC9hZGRpdGlvbmFsLWNoZWNrb3V0LWJ1dHRvbnMnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgbGFzdCBpdGVtIGZyb20gY2FydD8gUmVsb2FkXHJcbiAgICAgICAgaWYgKHJlbW92ZSAmJiAkY2FydEl0ZW1zUm93cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kY2FydENvbnRlbnQuaHRtbChyZXNwb25zZS5jb250ZW50KTtcclxuICAgICAgICAgICAgdGhpcy4kY2FydFRvdGFscy5odG1sKHJlc3BvbnNlLnRvdGFscyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcy5odG1sKHJlc3BvbnNlLnN0YXR1c01lc3NhZ2VzKTtcclxuICAgICAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMuaHRtbChyZXNwb25zZS5hZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zKTtcclxuXHJcbiAgICAgICAgICAgICRjYXJ0UGFnZVRpdGxlLnJlcGxhY2VXaXRoKHJlc3BvbnNlLnBhZ2VUaXRsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJCgnW2RhdGEtY2FydC1xdWFudGl0eV0nLCB0aGlzLiRjYXJ0Q29udGVudCkuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdjYXJ0LXF1YW50aXR5LXVwZGF0ZScsIHF1YW50aXR5KTtcclxuXHJcbiAgICAgICAgICAgICQoYFtkYXRhLWNhcnQtaXRlbWlkPScke3RoaXMuJGFjdGl2ZUNhcnRJdGVtSWR9J11gLCB0aGlzLiRjYXJ0Q29udGVudClcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoYFtkYXRhLWFjdGlvbj0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbn0nXWApXHJcbiAgICAgICAgICAgICAgICAudHJpZ2dlcignZm9jdXMnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kQ2FydEV2ZW50cygpIHtcclxuICAgICAgICBjb25zdCBkZWJvdW5jZVRpbWVvdXQgPSA0MDA7XHJcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcclxuICAgICAgICBjb25zdCBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XHJcbiAgICAgICAgY29uc3QgY2FydFJlbW92ZUl0ZW0gPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFJlbW92ZUl0ZW0sIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xyXG4gICAgICAgIGxldCBwcmVWYWw7XHJcblxyXG4gICAgICAgIC8vIGNhcnQgdXBkYXRlXHJcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcclxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xyXG4gICAgICAgICQoJy5jYXJ0LWl0ZW0tcXR5LWlucHV0JywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdmb2N1cycsIGZ1bmN0aW9uIG9uUXR5Rm9jdXMoKSB7XHJcbiAgICAgICAgICAgIHByZVZhbCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSkuY2hhbmdlKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxyXG4gICAgICAgICAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuY2FydC1yZW1vdmUnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb25maXJtRGVsZXRlJyk7XHJcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHN0cmluZywge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY2FydFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcm9kdWN0SWQnKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcclxuICAgICAgICAgICAgdGhpcy5jYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgJGNvdXBvbkNvbnRhaW5lciA9ICQoJy5jb3Vwb24tY29kZScpO1xyXG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcclxuXHJcbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcclxuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLnNob3coKTtcclxuICAgICAgICAgICAgJGNvZGVJbnB1dC50cmlnZ2VyKCdmb2N1cycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjb3Vwb25Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY29kZUlucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcclxuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwoJGNvZGVJbnB1dC5kYXRhKCdlcnJvcicpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlDb2RlKGNvZGUsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCkge1xyXG4gICAgICAgIGNvbnN0ICRjZXJ0Q29udGFpbmVyID0gJCgnLmdpZnQtY2VydGlmaWNhdGUtY29kZScpO1xyXG4gICAgICAgIGNvbnN0ICRjZXJ0Rm9ybSA9ICQoJy5jYXJ0LWdpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xyXG4gICAgICAgIGNvbnN0ICRjZXJ0SW5wdXQgPSAkKCdbbmFtZT1cImNlcnRjb2RlXCJdJywgJGNlcnRGb3JtKTtcclxuXHJcbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcclxuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGNlcnRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY2VydElucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY2hlY2tJc0dpZnRDZXJ0VmFsaWQoY29kZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwodmFsaWRhdGlvbkRpY3Rpb25hcnkuaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlHaWZ0Q2VydGlmaWNhdGUoY29kZSwgKGVyciwgcmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtaXRlbS1naWZ0d3JhcF0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2dpZnQtd3JhcHBpbmctZm9ybScsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWwub3BlbigpO1xyXG5cclxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRHaWZ0V3JhcHBpbmdGb3JtKCkge1xyXG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJHNlbGVjdCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJHNlbGVjdC52YWwoKTtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xyXG5cclxuICAgICAgICAgICAgJChgLmdpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fWApLmhpZGUoKTtcclxuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhbGxvd01lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVWaWV3cygpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XHJcbiAgICAgICAgICAgIGNvbnN0ICRzaW5nbGVGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1zaW5nbGUnKTtcclxuICAgICAgICAgICAgY29uc3QgJG11bHRpRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctbXVsdGlwbGUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3NhbWUnKSB7XHJcbiAgICAgICAgICAgICAgICAkc2luZ2xlRm9ybS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCdbbmFtZT1cImdpZnR3cmFwdHlwZVwiXScpLm9uKCdjbGljaycsIHRvZ2dsZVZpZXdzKTtcclxuXHJcbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuYmluZENhcnRFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmJpbmRQcm9tb0NvZGVFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxyXG4gICAgICAgIGNvbnN0IHNoaXBwaW5nRXJyb3JNZXNzYWdlcyA9IHtcclxuICAgICAgICAgICAgY291bnRyeTogdGhpcy5jb250ZXh0LnNoaXBwaW5nQ291bnRyeUVycm9yTWVzc2FnZSxcclxuICAgICAgICAgICAgcHJvdmluY2U6IHRoaXMuY29udGV4dC5zaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9IG5ldyBTaGlwcGluZ0VzdGltYXRvcigkKCdbZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJyksIHNoaXBwaW5nRXJyb3JNZXNzYWdlcyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuLi9jb21tb24vc3RhdGUtY291bnRyeSc7XHJcbmltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMsIGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XHJcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcclxuaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuLi9nbG9iYWwvbW9kYWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQsIHNoaXBwaW5nRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuXHJcbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nLCB0aGlzLiRlbGVtZW50KTtcclxuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0gc2hpcHBpbmdFcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuaW5pdEZvcm1WYWxpZGF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQgPSAkKCcuc2hpcHBpbmctcXVvdGVzJyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSAnZm9ybVtkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nO1xyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxyXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXQnLCB0aGlzLiRlbGVtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGVzdGltYXRvciBlcnJvciBtZXNzYWdlcyBhcmUgYmVpbmcgaW5qZWN0ZWQgaW4gaHRtbCBhcyBhIHJlc3VsdFxyXG4gICAgICAgICAgICAvLyBvZiB1c2VyIHN1Ym1pdDsgY2xlYXJpbmcgYW5kIGFkZGluZyByb2xlIG9uIHN1Ym1pdCBwcm92aWRlc1xyXG4gICAgICAgICAgICAvLyByZWd1bGFyIGFubm91bmNlbWVudCBvZiB0aGVzZSBlcnJvciBtZXNzYWdlc1xyXG4gICAgICAgICAgICBpZiAoc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJykpIHtcclxuICAgICAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQucmVtb3ZlQXR0cigncm9sZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnLCAnYWxlcnQnKTtcclxuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xyXG4gICAgICAgICAgICAvLyBPbmx5IHBlcmZvcm0gYSBjaGVjayBmb3IgYWxsIGZpZWxkcyB3aGVuIGNvdW50cnkgaGFzIGEgdmFsdWVcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFyZUFsbCgndmFsaWQnKSB3aWxsIGNoZWNrIGNvdW50cnkgZm9yIHZhbGlkaXR5XHJcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYmluZFVQU1JhdGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZFZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvdW50cnlJZCAhPT0gMCAmJiAhTnVtYmVyLmlzTmFOKGNvdW50cnlJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5jb3VudHJ5LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRTdGF0ZVZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCksXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVsZSA9ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlVmFsID0gJGVsZS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVsZVZhbCAmJiBlbGVWYWwubGVuZ3RoICYmIGVsZVZhbCAhPT0gJ1N0YXRlL3Byb3ZpbmNlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5wcm92aW5jZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIGRlZmF1bHQgc2hpcHBpbmcgYW5kIHVwcyBzaGlwcGluZyByYXRlc1xyXG4gICAgICovXHJcbiAgICBiaW5kVVBTUmF0ZXMoKSB7XHJcbiAgICAgICAgY29uc3QgVVBTUmF0ZVRvZ2dsZSA9ICcuZXN0aW1hdG9yLWZvcm0tdG9nZ2xlVVBTUmF0ZSc7XHJcblxyXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1VcHMgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLXVwcycpO1xyXG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybURlZmF1bHQgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLWRlZmF1bHQnKTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xyXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybURlZmF1bHQudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCkge1xyXG4gICAgICAgIGxldCAkbGFzdDtcclxuXHJcbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxyXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGVycik7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5nZXRTdGF0dXModGhpcy4kc3RhdGUpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcclxuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRmaWVsZC5hdHRyKCdwbGFjZWhvbGRlcicsICdTdGF0ZS9wcm92aW5jZScpO1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXHJcbiAgICAgICAgICAgIC8vIE5vdCBhbGwgY291bnRyaWVzIHJlcXVpcmUgdGhlIHByb3ZpbmNlIHRvIGJlIGZpbGxlZFxyXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlbW92ZSB0aGlzIGNsYXNzIHdoZW4gd2Ugc3dhcCBzaW5jZSBub2QgdmFsaWRhdGlvbiBkb2Vzbid0IGNsZWFudXAgZm9yIHVzXHJcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSh0b2dnbGVCdXR0b24sIGJ1dHRvblNlbGVjdG9yLCAkdG9nZ2xlQ29udGFpbmVyKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlID0gKHNlbGVjdG9yVG9BY3RpdmF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcclxuICAgICAgICAgICAgJChidXR0b25TZWxlY3RvcikudGV4dCgkKGAjJHtzZWxlY3RvclRvQWN0aXZhdGV9YCkudGV4dCgpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWNsb3NlJyk7XHJcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItYWRkJyk7XHJcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFc3RpbWF0b3JFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcclxuICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybSA9ICQoJy5lc3RpbWF0b3ItZm9ybScpO1xyXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xyXG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50cnlfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcclxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgY2l0eTogJCgnW25hbWU9XCJzaGlwcGluZy1jaXR5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgemlwX2NvZGU6ICQoJ1tuYW1lPVwic2hpcHBpbmctemlwXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldFNoaXBwaW5nUXVvdGVzKHBhcmFtcywgJ2NhcnQvc2hpcHBpbmctcXVvdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICQoJy5zaGlwcGluZy1xdW90ZXMnKS5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJpbmQgdGhlIHNlbGVjdCBidXR0b25cclxuICAgICAgICAgICAgICAgICQoJy5zZWxlY3Qtc2hpcHBpbmctcXVvdGUnKS5vbignY2xpY2snLCBjbGlja0V2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5zdWJtaXRTaGlwcGluZ1F1b3RlKHF1b3RlSWQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUoZXZlbnQuY3VycmVudFRhcmdldCwgJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93X19idG4tbmFtZScsICRlc3RpbWF0b3JDb250YWluZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBQcm9kdWN0RGV0YWlsc0Jhc2UsIHsgb3B0aW9uQ2hhbmdlRGVjb3JhdG9yIH0gZnJvbSAnLi9wcm9kdWN0LWRldGFpbHMtYmFzZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBpc0Jyb3dzZXJJRSwgY29udmVydEludG9BcnJheSB9IGZyb20gJy4vdXRpbHMvaWUtaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0SXRlbURldGFpbHMgZXh0ZW5kcyBQcm9kdWN0RGV0YWlsc0Jhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCBjb250ZXh0LCBwcm9kdWN0QXR0cmlidXRlc0RhdGEgPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgY29udGV4dCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJCgnI0NhcnRFZGl0UHJvZHVjdEZpZWxkc0Zvcm0nLCB0aGlzLiRzY29wZSk7XHJcbiAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsICRmb3JtKTtcclxuICAgICAgICBjb25zdCBoYXNPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5odG1sKCkudHJpbSgpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBoYXNEZWZhdWx0T3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnW2RhdGEtZGVmYXVsdF0nKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQcm9kdWN0VmFyaWFudCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VDYWxsYmFjayA9IG9wdGlvbkNoYW5nZURlY29yYXRvci5jYWxsKHRoaXMsIGhhc0RlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHByb2R1Y3QgYXR0cmlidXRlcy4gQWxzbyB1cGRhdGUgdGhlIGluaXRpYWwgdmlldyBpbiBjYXNlIGl0ZW1zIGFyZSBvb3NcclxuICAgICAgICAvLyBvciBoYXZlIGRlZmF1bHQgdmFyaWFudCBwcm9wZXJ0aWVzIHRoYXQgY2hhbmdlIHRoZSB2aWV3XHJcbiAgICAgICAgaWYgKChpc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gdGhpcy5jb250ZXh0LnByb2R1Y3RGb3JDaGFuZ2VJZDtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCBvcHRpb25DaGFuZ2VDYWxsYmFjayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRQcm9kdWN0VmFyaWFudCgpIHtcclxuICAgICAgICBjb25zdCB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzID0gW107XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICAkLmVhY2goJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVdJyksIChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSB2YWx1ZS5jaGlsZHJlblswXS5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gb3B0aW9uTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncmVxdWlyZWQnKTtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHZhbHVlLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0eXBlID09PSAnaW5wdXQtZmlsZScgfHwgdHlwZSA9PT0gJ2lucHV0LXRleHQnIHx8IHR5cGUgPT09ICdpbnB1dC1udW1iZXInKSAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScgJiYgdmFsdWUucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2F0aXNmaWVkID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkuZXZlcnkoKHNlbGVjdCkgPT4gc2VsZWN0LnNlbGVjdGVkSW5kZXggIT09IDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5tYXAoKHgpID0+IHgudmFsdWUpLmpvaW4oJy0nKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7ZGF0ZVN0cmluZ31gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlbGVjdC5zZWxlY3RlZEluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke3NlbGVjdC5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLmlubmVyVGV4dH1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RWYXJpYW50c2xpc3QgPSBjb252ZXJ0SW50b0FycmF5KHZhbHVlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCA9IGlucHQgPT4gaW5wdC5kYXRhc2V0LnByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSA9PT0gY2hlY2tlZC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RWYXJpYW50c2xpc3QuZmlsdGVyKG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5jaGlsZHJlblswXSA6IGNoZWNrZWQubGFiZWxzWzBdLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpZZXNgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbignLCAnKSA6ICd1bnNhdGlzZmllZCc7XHJcbiAgICAgICAgY29uc3QgdmlldyA9ICQoJy5tb2RhbC1oZWFkZXItdGl0bGUnKTtcclxuXHJcbiAgICAgICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50ID0gcHJvZHVjdFZhcmlhbnQgPT09ICd1bnNhdGlzZmllZCcgPyAnJyA6IHByb2R1Y3RWYXJpYW50O1xyXG4gICAgICAgICAgICBpZiAodmlldy5hdHRyKCdkYXRhLWV2ZW50LXR5cGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdmlldy5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gdmlldy5odG1sKCkubWF0Y2goLycoLio/KScvKVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSAkKGBbZGF0YS1uYW1lPVwiJHtwcm9kdWN0TmFtZX1cIl1gKTtcclxuICAgICAgICAgICAgICAgIGNhcmQuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlIG9yIG1hcmsgYXMgdW5hdmFpbGFibGUgb3V0IG9mIHN0b2NrIGF0dHJpYnV0ZXMgaWYgZW5hYmxlZFxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcclxuICAgICAqL1xyXG4gICAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSkge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCcubW9kYWwtY29udGVudCcpLnJlbW92ZUNsYXNzKCdoaWRlLWNvbnRlbnQnKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xyXG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XHJcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcclxuXHJcbi8qKlxyXG4gKiBJZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBmcm9tIGJjYXBwLCBhIHRleHQgZmllbGQgd2lsbCBiZSBzZW50LiBUaGlzIHdpbGwgY3JlYXRlIGEgc2VsZWN0IGVsZW1lbnQgdG8gaG9sZCBvcHRpb25zIGFmdGVyIHRoZSByZW1vdGUgcmVxdWVzdC5cclxuICogQHJldHVybnMge2pRdWVyeXxIVE1MRWxlbWVudH1cclxuICovXHJcbmZ1bmN0aW9uIG1ha2VTdGF0ZVJlcXVpcmVkKHN0YXRlRWxlbWVudCwgY29udGV4dCkge1xyXG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xyXG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgIGlkOiBhdHRycy5pZCxcclxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXHJcbiAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCcsXHJcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcclxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPHNlbGVjdD48L3NlbGVjdD4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcclxuXHJcbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xyXG4gICAgY29uc3QgJGhpZGRlbklucHV0ID0gJCgnW25hbWUqPVwiRm9ybUZpZWxkSXNUZXh0XCJdJyk7XHJcblxyXG4gICAgaWYgKCRoaWRkZW5JbnB1dC5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAkaGlkZGVuSW5wdXQucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIC8vIFN0cmluZyBpcyBpbmplY3RlZCBmcm9tIGxvY2FsaXplclxyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5hcHBlbmQoYDxzbWFsbD4ke2NvbnRleHQucmVxdWlyZWR9PC9zbWFsbD5gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIElmIGEgY291bnRyeSB3aXRoIHN0YXRlcyBpcyB0aGUgZGVmYXVsdCwgYSBzZWxlY3Qgd2lsbCBiZSBzZW50LFxyXG4gKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIHN3aXRjaCB0byBhbiBpbnB1dCBmaWVsZCBhbmQgaGlkZSB0aGUgcmVxdWlyZWQgZmllbGRcclxuICovXHJcbmZ1bmN0aW9uIG1ha2VTdGF0ZU9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xyXG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xyXG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxyXG4gICAgICAgICdkYXRhLWxhYmVsJzogYXR0cnNbJ2RhdGEtbGFiZWwnXSxcclxuICAgICAgICBjbGFzczogJ2Zvcm0taW5wdXQnLFxyXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXHJcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxpbnB1dCAvPicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xyXG5cclxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XHJcblxyXG4gICAgaWYgKCRuZXdFbGVtZW50Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIHRoZSBhcnJheSBvZiBvcHRpb25zIGZyb20gdGhlIHJlbW90ZSByZXF1ZXN0IHRvIHRoZSBuZXdseSBjcmVhdGVkIHNlbGVjdCBib3guXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXNBcnJheVxyXG4gKiBAcGFyYW0ge2pRdWVyeX0gJHNlbGVjdEVsZW1lbnRcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICovXHJcbmZ1bmN0aW9uIGFkZE9wdGlvbnMoc3RhdGVzQXJyYXksICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBbXTtcclxuXHJcbiAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7c3RhdGVzQXJyYXkucHJlZml4fTwvb3B0aW9uPmApO1xyXG5cclxuICAgIGlmICghXy5pc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xyXG4gICAgICAgIHN0YXRlc0FycmF5LnN0YXRlcy5mb3JFYWNoKChzdGF0ZU9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy51c2VJZEZvclN0YXRlcykge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5uYW1lfVwiPiR7c3RhdGVPYmoubGFiZWwgPyBzdGF0ZU9iai5sYWJlbCA6IHN0YXRlT2JqLm5hbWV9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNlbGVjdEVsZW1lbnQuaHRtbChjb250YWluZXIuam9pbignICcpKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZUVsZW1lbnQsIGNvbnRleHQgPSB7fSwgb3B0aW9ucywgY2FsbGJhY2spIHtcclxuICAgIC8qKlxyXG4gICAgICogQmFja3dhcmRzIGNvbXBhdGlibGUgZm9yIHRocmVlIHBhcmFtZXRlcnMgaW5zdGVhZCBvZiBmb3VyXHJcbiAgICAgKlxyXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XHJcbiAgICAgKlxyXG4gICAgICogdXNlSWRGb3JTdGF0ZXMge0Jvb2x9IC0gR2VuZXJhdGVzIHN0YXRlcyBkcm9wZG93biB1c2luZyBpZCBmb3IgdmFsdWVzIGluc3RlYWQgb2Ygc3RyaW5nc1xyXG4gICAgICovXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xyXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcclxuICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xyXG4gICAgfVxyXG5cclxuICAgICQoJ3NlbGVjdFtkYXRhLWZpZWxkLXR5cGU9XCJDb3VudHJ5XCJdJykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcclxuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XHJcblxyXG4gICAgICAgIGlmIChjb3VudHJ5TmFtZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChjb250ZXh0LnN0YXRlX2Vycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShyZXNwb25zZS5kYXRhLnN0YXRlcykpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50IG1heSBoYXZlIGJlZW4gcmVwbGFjZWQgd2l0aCBhIHNlbGVjdCwgcmVzZWxlY3QgaXRcclxuICAgICAgICAgICAgICAgIGNvbnN0ICRzZWxlY3RFbGVtZW50ID0gbWFrZVN0YXRlUmVxdWlyZWQoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkT3B0aW9ucyhyZXNwb25zZS5kYXRhLCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAkc2VsZWN0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gbWFrZVN0YXRlT3B0aW9uYWwoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgbmV3RWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xyXG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XHJcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XHJcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcclxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XHJcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xyXG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XHJcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcclxuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxufTtcclxuIl0sIm5hbWVzIjpbIlBhZ2VNYW5hZ2VyIiwiY2hlY2tJc0dpZnRDZXJ0VmFsaWQiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJ1dGlscyIsIlNoaXBwaW5nRXN0aW1hdG9yIiwiZGVmYXVsdE1vZGFsIiwic2hvd0FsZXJ0TW9kYWwiLCJNb2RhbEV2ZW50cyIsIkNhcnRJdGVtRGV0YWlscyIsIkNhcnQiLCJfUGFnZU1hbmFnZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwib25SZWFkeSIsIiRtb2RhbCIsIiRjYXJ0UGFnZUNvbnRlbnQiLCIkIiwiJGNhcnRDb250ZW50IiwiJGNhcnRNZXNzYWdlcyIsIiRjYXJ0VG90YWxzIiwiJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zIiwiJG92ZXJsYXkiLCJoaWRlIiwiJGFjdGl2ZUNhcnRJdGVtSWQiLCIkYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24iLCJzZXRBcHBsZVBheVN1cHBvcnQiLCJiaW5kRXZlbnRzIiwid2luZG93IiwiQXBwbGVQYXlTZXNzaW9uIiwiYWRkQ2xhc3MiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIl90aGlzIiwiaXRlbUlkIiwiZGF0YSIsIiRlbCIsIm9sZFF0eSIsInBhcnNlSW50IiwidmFsIiwibWF4UXR5IiwibWluUXR5IiwibWluRXJyb3IiLCJtYXhFcnJvciIsIm5ld1F0eSIsInNob3ciLCJhcGkiLCJjYXJ0IiwiaXRlbVVwZGF0ZSIsImVyciIsInJlc3BvbnNlIiwic3RhdHVzIiwicmVtb3ZlIiwicmVmcmVzaENvbnRlbnQiLCJlcnJvcnMiLCJqb2luIiwiY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UiLCJwcmVWYWwiLCJfdGhpczIiLCJOdW1iZXIiLCJpbnZhbGlkRW50cnkiLCJpc0ludGVnZXIiLCJjb250ZXh0IiwiaW52YWxpZEVudHJ5TWVzc2FnZSIsInJlcGxhY2UiLCJjYXJ0UmVtb3ZlSXRlbSIsIl90aGlzMyIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJwcm9kdWN0SWQiLCJfdGhpczQiLCJPYmplY3QiLCJhc3NpZ24iLCJwcm9kdWN0Rm9yQ2hhbmdlSWQiLCJtb2RhbCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIm9wZW4iLCJmaW5kIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJ1cGRhdGVDb250ZW50IiwiY29udGVudCIsIm9wdGlvbkNoYW5nZUhhbmRsZXIiLCIkcHJvZHVjdE9wdGlvbnNDb250YWluZXIiLCJtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCIsIm91dGVySGVpZ2h0IiwibGVuZ3RoIiwiY3NzIiwiaGFzQ2xhc3MiLCJvbmUiLCJvcGVuZWQiLCJwcm9kdWN0RGV0YWlscyIsImJpbmRHaWZ0V3JhcHBpbmdGb3JtIiwiaG9va3MiLCJvbiIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsIiRmb3JtIiwiJHN1Ym1pdCIsIiRtZXNzYWdlQm94Iiwib3B0aW9uQ2hhbmdlIiwic2VyaWFsaXplIiwicmVzdWx0IiwicHVyY2hhc2luZ19tZXNzYWdlIiwidGV4dCIsInByb3AiLCJwdXJjaGFzYWJsZSIsImluc3RvY2siLCJfdGhpczUiLCIkY2FydEl0ZW1zUm93cyIsIiRjYXJ0UGFnZVRpdGxlIiwidG90YWxzIiwicGFnZVRpdGxlIiwic3RhdHVzTWVzc2FnZXMiLCJhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zIiwibG9jYXRpb24iLCJyZWxvYWQiLCJnZXRDb250ZW50IiwiaHRtbCIsInJlcGxhY2VXaXRoIiwicXVhbnRpdHkiLCJ0cmlnZ2VyIiwiZmlsdGVyIiwiYmluZENhcnRFdmVudHMiLCJfdGhpczYiLCJkZWJvdW5jZVRpbWVvdXQiLCJfYmluZCIsIl9kZWJvdW5jZSIsInByZXZlbnREZWZhdWx0Iiwib25RdHlGb2N1cyIsInZhbHVlIiwiY2hhbmdlIiwic3RyaW5nIiwiaWNvbiIsInNob3dDYW5jZWxCdXR0b24iLCJvbkNvbmZpcm0iLCJiaW5kUHJvbW9Db2RlRXZlbnRzIiwiX3RoaXM3IiwiJGNvdXBvbkNvbnRhaW5lciIsIiRjb3Vwb25Gb3JtIiwiJGNvZGVJbnB1dCIsImNvZGUiLCJhcHBseUNvZGUiLCJiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzIiwiX3RoaXM4IiwiJGNlcnRDb250YWluZXIiLCIkY2VydEZvcm0iLCIkY2VydElucHV0IiwidG9nZ2xlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJpbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUiLCJhcHBseUdpZnRDZXJ0aWZpY2F0ZSIsInJlc3AiLCJiaW5kR2lmdFdyYXBwaW5nRXZlbnRzIiwiX3RoaXM5IiwiZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMiLCIkc2VsZWN0IiwiaWQiLCJpbmRleCIsImFsbG93TWVzc2FnZSIsInRvZ2dsZVZpZXdzIiwiJHNpbmdsZUZvcm0iLCIkbXVsdGlGb3JtIiwic2hpcHBpbmdFcnJvck1lc3NhZ2VzIiwiY291bnRyeSIsInNoaXBwaW5nQ291bnRyeUVycm9yTWVzc2FnZSIsInByb3ZpbmNlIiwic2hpcHBpbmdQcm92aW5jZUVycm9yTWVzc2FnZSIsInNoaXBwaW5nRXN0aW1hdG9yIiwiZGVmYXVsdCIsInN0YXRlQ291bnRyeSIsIm5vZCIsIlZhbGlkYXRvcnMiLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiY29sbGFwc2libGVGYWN0b3J5IiwiJGVsZW1lbnQiLCIkc3RhdGUiLCJpc0VzdGltYXRvckZvcm1PcGVuZWQiLCJpbml0Rm9ybVZhbGlkYXRpb24iLCJiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlIiwiYmluZEVzdGltYXRvckV2ZW50cyIsInNoaXBwaW5nRXN0aW1hdG9yQWxlcnQiLCJzaGlwcGluZ1ZhbGlkYXRvciIsInN1Ym1pdCIsInRhcCIsImF0dHIiLCJyZW1vdmVBdHRyIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiYmluZFZhbGlkYXRpb24iLCJiaW5kU3RhdGVWYWxpZGF0aW9uIiwiYmluZFVQU1JhdGVzIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwiY291bnRyeUlkIiwiaXNOYU4iLCJlcnJvck1lc3NhZ2UiLCIkZWxlIiwiZWxlVmFsIiwiVVBTUmF0ZVRvZ2dsZSIsIiRlc3RpbWF0b3JGb3JtVXBzIiwiJGVzdGltYXRvckZvcm1EZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCIkbGFzdCIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsImlzIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsInJlbW92ZUNsYXNzIiwidG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlIiwidG9nZ2xlQnV0dG9uIiwiYnV0dG9uU2VsZWN0b3IiLCIkdG9nZ2xlQ29udGFpbmVyIiwiY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlIiwic2VsZWN0b3JUb0FjdGl2YXRlIiwiJGVzdGltYXRvckNvbnRhaW5lciIsIiRlc3RpbWF0b3JGb3JtIiwicGFyYW1zIiwiY291bnRyeV9pZCIsInN0YXRlX2lkIiwiY2l0eSIsInppcF9jb2RlIiwiZ2V0U2hpcHBpbmdRdW90ZXMiLCJjbGlja0V2ZW50IiwicXVvdGVJZCIsInN1Ym1pdFNoaXBwaW5nUXVvdGUiLCJQcm9kdWN0RGV0YWlsc0Jhc2UiLCJvcHRpb25DaGFuZ2VEZWNvcmF0b3IiLCJpc0Jyb3dzZXJJRSIsImNvbnZlcnRJbnRvQXJyYXkiLCJfUHJvZHVjdERldGFpbHNCYXNlIiwiJHNjb3BlIiwicHJvZHVjdEF0dHJpYnV0ZXNEYXRhIiwiY2FsbCIsIiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQiLCJoYXNPcHRpb25zIiwidHJpbSIsImhhc0RlZmF1bHRPcHRpb25zIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJvcHRpb25DaGFuZ2VDYWxsYmFjayIsIl9pc0VtcHR5IiwidXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMiLCJ1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzIiwiZWFjaCIsIm9wdGlvbkxhYmVsIiwiY2hpbGRyZW4iLCJpbm5lclRleHQiLCJvcHRpb25UaXRsZSIsInNwbGl0IiwicmVxdWlyZWQiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidHlwZSIsImdldEF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiaXNTYXRpc2ZpZWQiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJzZWxlY3QiLCJzZWxlY3RlZEluZGV4IiwiZGF0ZVN0cmluZyIsIm1hcCIsIngiLCJjaGVja2VkIiwiZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCIsInByb2R1Y3RWYXJpYW50c2xpc3QiLCJtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0IiwiaW5wdCIsImRhdGFzZXQiLCJwcm9kdWN0QXR0cmlidXRlVmFsdWUiLCJsYWJlbCIsImxhYmVscyIsInRpdGxlIiwicHJvZHVjdFZhcmlhbnQiLCJzb3J0IiwidmlldyIsInByb2R1Y3ROYW1lIiwibWF0Y2giLCJjYXJkIiwiY2VydCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJtYWtlU3RhdGVSZXF1aXJlZCIsInN0YXRlRWxlbWVudCIsImF0dHJzIiwiX3RyYW5zZm9ybSIsIml0ZW0iLCJyZXQiLCJuYW1lIiwicmVwbGFjZW1lbnRBdHRyaWJ1dGVzIiwiJG5ld0VsZW1lbnQiLCIkaGlkZGVuSW5wdXQiLCJwcmV2IiwiYXBwZW5kIiwibWFrZVN0YXRlT3B0aW9uYWwiLCJhZGRPcHRpb25zIiwic3RhdGVzQXJyYXkiLCIkc2VsZWN0RWxlbWVudCIsImNvbnRhaW5lciIsInByZWZpeCIsInN0YXRlcyIsImZvckVhY2giLCJzdGF0ZU9iaiIsImNhbGxiYWNrIiwiY291bnRyeU5hbWUiLCJnZXRCeU5hbWUiLCJzdGF0ZV9lcnJvciIsIiRjdXJyZW50SW5wdXQiLCJuZXdFbGVtZW50IiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJKU09OIiwicGFyc2UiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsImtleSIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJzb3VyY2VSb290IjoiIn0=
