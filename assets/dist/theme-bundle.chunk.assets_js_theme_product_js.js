"use strict";
(self["webpackChunkStyle"] = self["webpackChunkStyle"] || []).push([["assets_js_theme_product_js"],{

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/*
 Import all product specific js
 */







var Product = /*#__PURE__*/function (_PageManager) {
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal-review-form')[0];
    return _this;
  }
  _inheritsLoose(Product, _PageManager);
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    (0,_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.classifyForm)('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]({
      $reviewForm: $reviewForm
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();
    this.pdpVideo();
    this.recentlyViewedCookies(this.context);
  };
  _proto.getCookie = function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  };
  _proto.recentlyViewedCookies = function recentlyViewedCookies(context) {
    var productId = context.productId,
      recently_viewed_expires_date = context.recently_viewed_expires_date,
      recently_viewed_product_limit = context.recently_viewed_product_limit;
    if (productId > 0) {
      var dateExp = new Date();
      dateExp.setDate(dateExp.getDate() + parseInt(recently_viewed_expires_date));
      var productIdsList = [];
      var exit_rv_cookie = this.getCookie('bc_recently_viewed');
      var exit_rv_cookie_spt = exit_rv_cookie.split(",");
      if (exit_rv_cookie_spt.length > 0 && exit_rv_cookie_spt.length == recently_viewed_product_limit) {
        return false;
      }
      if (document.cookie.indexOf('bc_recently_viewed') != -1) {
        productIdsList = exit_rv_cookie_spt;
        if (exit_rv_cookie_spt.indexOf(productId) === -1) {
          productIdsList.push(productId);
        }
      } else {
        productIdsList.push(productId);
      }
      if (productIdsList.length > 0) {
        document.cookie = "bc_recently_viewed=" + productIdsList + ";expires=" + dateExp.toGMTString() + "; path=/";
      }
    }
  }
  // Sphere: Agregar logica para vista del video 
  ;
  _proto.pdpVideo = function pdpVideo() {
    var $videoThumbnail = $('.productView-thumbnail[data-video="true"]');
    var $mainImageContainer = $('.productView-img-container');
    var $mainImage = $('.productView-image--default');
    var $zoomContainer = $('[data-image-gallery-main]');
    if (!$('#videoContainer').length) {
      var videoContainer = $('<div id="videoContainer" class="productView-video-container" style="display: none;"></div>');
      var videoFrame = $('<iframe id="productVideo" width="100%" height="750" frameborder="0" allowfullscreen></iframe>');
      videoContainer.append(videoFrame);
      $mainImageContainer.append(videoContainer);
    }
    var $videoContainer = $('#videoContainer');
    var $videoFrame = $('#productVideo');
    var disableZoom = function disableZoom() {
      return $zoomContainer.off('mousemove').off('mouseenter').off('mouseleave');
    };
    var enableZoom = function enableZoom() {
      $zoomContainer.on('mousemove', zoomHandler).on('mouseenter', zoomHandler).on('mouseleave', zoomHandler);
    };
    $videoThumbnail.on('click', function (event) {
      event.preventDefault();
      var videoId = $(this).find('a').attr('data-video-id');
      if (videoId) {
        var videoUrl = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&showinfo=0&playsinline=1&enablejsapi=1&loop=1&playlist=" + videoId;
        $mainImage.hide();
        disableZoom();
        $videoFrame.attr('src', videoUrl);
        $videoContainer.show();
        $('html, body').scrollTop($mainImageContainer.offset().top);
      }
    });
    $('.productView-thumbnail:not([data-video]), .slick-prev, .slick-next').on('click', function () {
      $videoContainer.hide();
      $videoFrame.attr('src', '');
      $mainImage.show();
      enableZoom();
    });
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoGallery: () => (/* binding */ VideoGallery),
/* harmony export */   "default": () => (/* binding */ videoGallery)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9wcm9kdWN0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ3lDO0FBQ0Y7QUFDZTtBQUNBO0FBQ0g7QUFDTTtBQUNmO0FBQUEsSUFFckJPLE9BQU8sMEJBQUFDLFlBQUE7RUFDeEIsU0FBQUQsUUFBWUUsT0FBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUNqQkEsS0FBQSxHQUFBRixZQUFBLENBQUFHLElBQUEsT0FBTUYsT0FBTyxDQUFDO0lBQ2RDLEtBQUEsQ0FBS0UsR0FBRyxHQUFHQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSTtJQUMvQkwsS0FBQSxDQUFLTSxXQUFXLEdBQUdDLENBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztJQUM1RFAsS0FBQSxDQUFLUSxnQkFBZ0IsR0FBR0QsQ0FBQyxDQUFDLHVDQUF1QyxDQUFDO0lBQ2xFUCxLQUFBLENBQUtTLFdBQVcsR0FBR2IseURBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFDLE9BQUFJLEtBQUE7RUFDN0Q7RUFBQ1UsY0FBQSxDQUFBYixPQUFBLEVBQUFDLFlBQUE7RUFBQSxJQUFBYSxNQUFBLEdBQUFkLE9BQUEsQ0FBQWUsU0FBQTtFQUFBRCxNQUFBLENBRURFLE9BQU8sR0FBUCxTQUFBQSxPQUFPQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxNQUFBO0lBQ047SUFDQVAsQ0FBQyxDQUFDUSxRQUFRLENBQUMsQ0FBQ0MsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFlBQU07TUFDdkMsSUFBSUYsTUFBSSxDQUFDWixHQUFHLENBQUNlLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxPQUFPZCxNQUFNLENBQUNlLE9BQU8sQ0FBQ0MsWUFBWSxLQUFLLFVBQVUsRUFBRTtRQUMvRmhCLE1BQU0sQ0FBQ2UsT0FBTyxDQUFDQyxZQUFZLENBQUMsSUFBSSxFQUFF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QixLQUFLLEVBQUVDLE9BQU8sRUFBSztJQUNuQyxJQUFNQyxHQUFHLEdBQUc3RyxDQUFDLENBQUM0RyxPQUFPLENBQUM7SUFDdEIsSUFBTUUsYUFBYSxHQUFHRCxHQUFHLENBQUNYLElBQUksQ0FBQ08sU0FBUyxDQUFDLFlBQVlsQixZQUFZO0lBRWpFLElBQUl1QixhQUFhLEVBQUU7TUFDZjtJQUNKO0lBRUFELEdBQUcsQ0FBQ1gsSUFBSSxDQUFDTyxTQUFTLEVBQUUsSUFBSWxCLFlBQVksQ0FBQ3NCLEdBQUcsQ0FBQyxDQUFDO0VBQzlDLENBQUMsQ0FBQztBQUNOIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU3R5bGUvLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9TdHlsZS8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3ZpZGVvLWdhbGxlcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuIEltcG9ydCBhbGwgcHJvZHVjdCBzcGVjaWZpYyBqc1xyXG4gKi9cclxuaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcclxuaW1wb3J0IFJldmlldyBmcm9tICcuL3Byb2R1Y3QvcmV2aWV3cyc7XHJcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xyXG5pbXBvcnQgUHJvZHVjdERldGFpbHMgZnJvbSAnLi9jb21tb24vcHJvZHVjdC1kZXRhaWxzJztcclxuaW1wb3J0IHZpZGVvR2FsbGVyeSBmcm9tICcuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeSc7XHJcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xyXG5pbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3QgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICB0aGlzLiRyZXZpZXdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nKTtcclxuICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcclxuICAgICAgICB0aGlzLnJldmlld01vZGFsID0gbW9kYWxGYWN0b3J5KCcjbW9kYWwtcmV2aWV3LWZvcm0nKVswXTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICAgIC8vIExpc3RlbiBmb3IgZm91bmRhdGlvbiBtb2RhbCBjbG9zZSBldmVudHMgdG8gc2FuaXRpemUgVVJMIGFmdGVyIHJldmlldy5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xvc2UuZm5kdG4ucmV2ZWFsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHZhbGlkYXRvcjtcclxuXHJcbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZVxyXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IFByb2R1Y3REZXRhaWxzKCQoJy5wcm9kdWN0VmlldycpLCB0aGlzLmNvbnRleHQsIHdpbmRvdy5CQ0RhdGEucHJvZHVjdF9hdHRyaWJ1dGVzKTtcclxuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XHJcblxyXG4gICAgICAgIHZpZGVvR2FsbGVyeSgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1bGtQcmljaW5nSGFuZGxlcigpO1xyXG5cclxuICAgICAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcclxuXHJcbiAgICAgICAgaWYgKCRyZXZpZXdGb3JtLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCByZXZpZXcgPSBuZXcgUmV2aWV3KHsgJHJldmlld0Zvcm0gfSk7XHJcblxyXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvciA9IHJldmlldy5yZWdpc3RlclZhbGlkYXRpb24odGhpcy5jb250ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5hcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJHJldmlld0Zvcm0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcmV2aWV3Rm9ybS5vbignc3VibWl0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3RSZXZpZXdIYW5kbGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMucGRwVmlkZW8oKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWNlbnRseVZpZXdlZENvb2tpZXModGhpcy5jb250ZXh0KVxyXG4gICAgfVxyXG5cclxuICAgIGdldENvb2tpZShjbmFtZSkge1xyXG4gICAgICAgIHZhciBuYW1lID0gY25hbWUgKyBcIj1cIjtcclxuICAgICAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjID0gY2FbaV07XHJcbiAgICAgICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PSAnICcpIGMgPSBjLnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lKSAhPSAtMSkgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBjLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJlY2VudGx5Vmlld2VkQ29va2llcyhjb250ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgeyBwcm9kdWN0SWQsIHJlY2VudGx5X3ZpZXdlZF9leHBpcmVzX2RhdGUsIHJlY2VudGx5X3ZpZXdlZF9wcm9kdWN0X2xpbWl0fSA9IGNvbnRleHQ7XHJcbiAgICAgICAgaWYocHJvZHVjdElkID4gMCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVFeHAgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBkYXRlRXhwLnNldERhdGUoZGF0ZUV4cC5nZXREYXRlKCkgKyBwYXJzZUludChyZWNlbnRseV92aWV3ZWRfZXhwaXJlc19kYXRlKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvZHVjdElkc0xpc3QgPSBbXVxyXG4gICAgICAgICAgICBjb25zdCBleGl0X3J2X2Nvb2tpZSA9IHRoaXMuZ2V0Q29va2llKCdiY19yZWNlbnRseV92aWV3ZWQnKTtcclxuICAgICAgICAgICAgY29uc3QgZXhpdF9ydl9jb29raWVfc3B0ID0gZXhpdF9ydl9jb29raWUuc3BsaXQoXCIsXCIpOyAgXHJcbiAgICAgICAgICAgIGlmKGV4aXRfcnZfY29va2llX3NwdC5sZW5ndGggPiAwICYmIGV4aXRfcnZfY29va2llX3NwdC5sZW5ndGggPT0gcmVjZW50bHlfdmlld2VkX3Byb2R1Y3RfbGltaXQpeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCdiY19yZWNlbnRseV92aWV3ZWQnKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkc0xpc3QgPSBleGl0X3J2X2Nvb2tpZV9zcHQ7XHJcbiAgICAgICAgICAgICAgICBpZihleGl0X3J2X2Nvb2tpZV9zcHQuaW5kZXhPZihwcm9kdWN0SWQpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZHNMaXN0LnB1c2gocHJvZHVjdElkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZHNMaXN0LnB1c2gocHJvZHVjdElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihwcm9kdWN0SWRzTGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGBiY19yZWNlbnRseV92aWV3ZWQ9JHtwcm9kdWN0SWRzTGlzdH07ZXhwaXJlcz0ke2RhdGVFeHAudG9HTVRTdHJpbmcoKX07IHBhdGg9L2A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBTcGhlcmU6IEFncmVnYXIgbG9naWNhIHBhcmEgdmlzdGEgZGVsIHZpZGVvIFxyXG4gICAgcGRwVmlkZW8oKSB7XHJcbiAgICAgICAgY29uc3QgJHZpZGVvVGh1bWJuYWlsID0gJCgnLnByb2R1Y3RWaWV3LXRodW1ibmFpbFtkYXRhLXZpZGVvPVwidHJ1ZVwiXScpO1xyXG4gICAgICAgIGNvbnN0ICRtYWluSW1hZ2VDb250YWluZXIgPSAkKCcucHJvZHVjdFZpZXctaW1nLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0ICRtYWluSW1hZ2UgPSAkKCcucHJvZHVjdFZpZXctaW1hZ2UtLWRlZmF1bHQnKTtcclxuICAgICAgICBjb25zdCAkem9vbUNvbnRhaW5lciA9ICQoJ1tkYXRhLWltYWdlLWdhbGxlcnktbWFpbl0nKTsgXHJcbiAgICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAoISQoJyN2aWRlb0NvbnRhaW5lcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aWRlb0NvbnRhaW5lciA9ICQoJzxkaXYgaWQ9XCJ2aWRlb0NvbnRhaW5lclwiIGNsYXNzPVwicHJvZHVjdFZpZXctdmlkZW8tY29udGFpbmVyXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjwvZGl2PicpO1xyXG4gICAgICAgICAgICBjb25zdCB2aWRlb0ZyYW1lID0gJCgnPGlmcmFtZSBpZD1cInByb2R1Y3RWaWRlb1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjc1MFwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nKTtcclxuICAgICAgICAgICAgdmlkZW9Db250YWluZXIuYXBwZW5kKHZpZGVvRnJhbWUpO1xyXG4gICAgICAgICAgICAkbWFpbkltYWdlQ29udGFpbmVyLmFwcGVuZCh2aWRlb0NvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgY29uc3QgJHZpZGVvQ29udGFpbmVyID0gJCgnI3ZpZGVvQ29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgJHZpZGVvRnJhbWUgPSAkKCcjcHJvZHVjdFZpZGVvJyk7XHJcbiAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBkaXNhYmxlWm9vbSA9ICgpID0+ICR6b29tQ29udGFpbmVyLm9mZignbW91c2Vtb3ZlJykub2ZmKCdtb3VzZWVudGVyJykub2ZmKCdtb3VzZWxlYXZlJyk7XHJcbiAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBlbmFibGVab29tID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHpvb21Db250YWluZXIub24oJ21vdXNlbW92ZScsIHpvb21IYW5kbGVyKS5vbignbW91c2VlbnRlcicsIHpvb21IYW5kbGVyKS5vbignbW91c2VsZWF2ZScsIHpvb21IYW5kbGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgJHZpZGVvVGh1bWJuYWlsLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHZpZGVvSWQgPSAkKHRoaXMpLmZpbmQoJ2EnKS5hdHRyKCdkYXRhLXZpZGVvLWlkJyk7XHJcbiAgICAgICAgICAgIGlmICh2aWRlb0lkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlb1VybCA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3ZpZGVvSWR9P2F1dG9wbGF5PTEmbXV0ZT0xJm1vZGVzdGJyYW5kaW5nPTEmcmVsPTAmY29udHJvbHM9MCZzaG93aW5mbz0wJnBsYXlzaW5saW5lPTEmZW5hYmxlanNhcGk9MSZsb29wPTEmcGxheWxpc3Q9JHt2aWRlb0lkfWA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJG1haW5JbWFnZS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlWm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgJHZpZGVvRnJhbWUuYXR0cignc3JjJywgdmlkZW9VcmwpO1xyXG4gICAgICAgICAgICAgICAgJHZpZGVvQ29udGFpbmVyLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5Jykuc2Nyb2xsVG9wKCRtYWluSW1hZ2VDb250YWluZXIub2Zmc2V0KCkudG9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXRodW1ibmFpbDpub3QoW2RhdGEtdmlkZW9dKSwgLnNsaWNrLXByZXYsIC5zbGljay1uZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdmlkZW9Db250YWluZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAkdmlkZW9GcmFtZS5hdHRyKCdzcmMnLCAnJyk7IFxyXG4gICAgICAgICAgICAkbWFpbkltYWdlLnNob3coKTtcclxuICAgICAgICAgICAgZW5hYmxlWm9vbSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFyaWFEZXNjcmliZVJldmlld0lucHV0cygkZm9ybSkge1xyXG4gICAgICAgICRmb3JtLmZpbmQoJ1tkYXRhLWlucHV0XScpLmVhY2goKF8sIGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xyXG4gICAgICAgICAgICBjb25zdCBtc2dTcGFuSWQgPSBgJHskaW5wdXQuYXR0cignbmFtZScpfS1tc2dgO1xyXG5cclxuICAgICAgICAgICAgJGlucHV0LnNpYmxpbmdzKCdzcGFuJykuYXR0cignaWQnLCBtc2dTcGFuSWQpO1xyXG4gICAgICAgICAgICAkaW5wdXQuYXR0cignYXJpYS1kZXNjcmliZWRieScsIG1zZ1NwYW5JZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvZHVjdFJldmlld0hhbmRsZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy4kcmV2aWV3TGluay50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBidWxrUHJpY2luZ0hhbmRsZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyNidWxrX3ByaWNpbmcnKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBWaWRlb0dhbGxlcnkge1xyXG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLiRwbGF5ZXIgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1wbGF5ZXJdJyk7XHJcbiAgICAgICAgdGhpcy4kdmlkZW9zID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8taXRlbV0nKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHt9O1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdE5ld1ZpZGVvKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge1xyXG4gICAgICAgICAgICBpZDogJHRhcmdldC5kYXRhKCd2aWRlb0lkJyksXHJcbiAgICAgICAgICAgICRzZWxlY3RlZFRodW1iOiAkdGFyZ2V0LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TWFpblZpZGVvKCk7XHJcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUaHVtYigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1haW5WaWRlbygpIHtcclxuICAgICAgICB0aGlzLiRwbGF5ZXIuYXR0cignc3JjJywgYC8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dGhpcy5jdXJyZW50VmlkZW8uaWR9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWN0aXZlVGh1bWIoKSB7XHJcbiAgICAgICAgdGhpcy4kdmlkZW9zLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlby4kc2VsZWN0ZWRUaHVtYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLiR2aWRlb3Mub24oJ2NsaWNrJywgdGhpcy5zZWxlY3ROZXdWaWRlby5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmlkZW9HYWxsZXJ5KCkge1xyXG4gICAgY29uc3QgcGx1Z2luS2V5ID0gJ3ZpZGVvLWdhbGxlcnknO1xyXG4gICAgY29uc3QgJHZpZGVvR2FsbGVyeSA9ICQoYFtkYXRhLSR7cGx1Z2luS2V5fV1gKTtcclxuXHJcbiAgICAkdmlkZW9HYWxsZXJ5LmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGVsID0gJChlbGVtZW50KTtcclxuICAgICAgICBjb25zdCBpc0luaXRpYWxpemVkID0gJGVsLmRhdGEocGx1Z2luS2V5KSBpbnN0YW5jZW9mIFZpZGVvR2FsbGVyeTtcclxuXHJcbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGVsLmRhdGEocGx1Z2luS2V5LCBuZXcgVmlkZW9HYWxsZXJ5KCRlbCkpO1xyXG4gICAgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlBhZ2VNYW5hZ2VyIiwiUmV2aWV3IiwiY29sbGFwc2libGVGYWN0b3J5IiwiUHJvZHVjdERldGFpbHMiLCJ2aWRlb0dhbGxlcnkiLCJjbGFzc2lmeUZvcm0iLCJtb2RhbEZhY3RvcnkiLCJQcm9kdWN0IiwiX1BhZ2VNYW5hZ2VyIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIiRyZXZpZXdMaW5rIiwiJCIsIiRidWxrUHJpY2luZ0xpbmsiLCJyZXZpZXdNb2RhbCIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwib25SZWFkeSIsIl90aGlzMiIsImRvY3VtZW50Iiwib24iLCJpbmRleE9mIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJ2YWxpZGF0b3IiLCJwcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsInNldFByb2R1Y3RWYXJpYW50IiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwiJHJldmlld0Zvcm0iLCJsZW5ndGgiLCJyZXZpZXciLCJyZWdpc3RlclZhbGlkYXRpb24iLCJhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJwcm9kdWN0UmV2aWV3SGFuZGxlciIsInBkcFZpZGVvIiwicmVjZW50bHlWaWV3ZWRDb29raWVzIiwiZ2V0Q29va2llIiwiY25hbWUiLCJuYW1lIiwiY2EiLCJjb29raWUiLCJzcGxpdCIsImkiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwicHJvZHVjdElkIiwicmVjZW50bHlfdmlld2VkX2V4cGlyZXNfZGF0ZSIsInJlY2VudGx5X3ZpZXdlZF9wcm9kdWN0X2xpbWl0IiwiZGF0ZUV4cCIsIkRhdGUiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsInBhcnNlSW50IiwicHJvZHVjdElkc0xpc3QiLCJleGl0X3J2X2Nvb2tpZSIsImV4aXRfcnZfY29va2llX3NwdCIsInB1c2giLCJ0b0dNVFN0cmluZyIsIiR2aWRlb1RodW1ibmFpbCIsIiRtYWluSW1hZ2VDb250YWluZXIiLCIkbWFpbkltYWdlIiwiJHpvb21Db250YWluZXIiLCJ2aWRlb0NvbnRhaW5lciIsInZpZGVvRnJhbWUiLCJhcHBlbmQiLCIkdmlkZW9Db250YWluZXIiLCIkdmlkZW9GcmFtZSIsImRpc2FibGVab29tIiwib2ZmIiwiZW5hYmxlWm9vbSIsInpvb21IYW5kbGVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZpZGVvSWQiLCJmaW5kIiwiYXR0ciIsInZpZGVvVXJsIiwiaGlkZSIsInNob3ciLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCIkZm9ybSIsImVhY2giLCJfIiwiaW5wdXQiLCIkaW5wdXQiLCJtc2dTcGFuSWQiLCJzaWJsaW5ncyIsInRyaWdnZXIiLCJkZWZhdWx0IiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsImUiLCIkdGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImlkIiwiZGF0YSIsIiRzZWxlY3RlZFRodW1iIiwic2V0TWFpblZpZGVvIiwic2V0QWN0aXZlVGh1bWIiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiYmluZCIsInBsdWdpbktleSIsIiR2aWRlb0dhbGxlcnkiLCJpbmRleCIsImVsZW1lbnQiLCIkZWwiLCJpc0luaXRpYWxpemVkIl0sInNvdXJjZVJvb3QiOiIifQ==
