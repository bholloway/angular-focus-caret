/* globals angular, define, module */
(function () {

  // export AMD
  if ((typeof define === 'function') && define.amd) {
    define(function amdDefinition() {
      return createModule();
    });
  }
  // export CommonJS
  else if ((typeof module === 'object') && module.exports) {
    module.exports = createModule();
  }
  // browser
  else {
    createModule();
  }

  /**
   * Create the angular module just in time for export.
   * @returns {string} The name of the angular module
   */
  function createModule() {
    angular.module('focus-caret', [])
      .directive('focusCaret', focusCaretDirective);

    return 'focus-caret';
  }

  /**
   * @ngDoc directive
   * @name focusCaret
   * @description
   * Set caret to a known position whenever the `<input>` receives focus.
   *
   * The position is determined by the value of the attribute. Use `NaN` or empty value to set caret to the end of the
   * content. Otherwise specify an integer offset.
   * @ngInject
   */
  function focusCaretDirective($timeout) {
    return {
      restrict: 'A',
      scope   : {
        focusCaret: '&'
      },
      link    : link
    };

    function link(scope, element) {
      var timeout,
          dom = element[0];
      element.on('focus', onFocus);
      scope.$on('$destroy', dispose);

      function onFocus() {
          $timeout.cancel(timeout);
          timeout = $timeout(setCaret, 0);
      }

      function setCaret() {
        var arg    = scope.focusCaret(),
            int    = (typeof arg !== 'number') ? NaN : (arg < 0) ? Math.ceil(arg) : Math.floor(arg),
            length = (typeof dom.value === 'string') ? dom.value.length : 0,
            index  = isNaN(int) ? length : (int < 0) ? Math.max(0, length + int) : Math.min(length, int);
        dom.setSelectionRange(index, index);
      }

      function dispose() {
        $timeout.cancel(timeout);
        element.off('focus', onFocus);
      }
    }
  }

})();