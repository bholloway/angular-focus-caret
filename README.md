# angular-focus-caret

Angular 1.x directive to set a caret position whenever an element receives focus.

## Installation

### NPM

When using [browserify](http://browserify.org/) or similar npm-based build system.

In the command line:

```
npm install angular-focus-caret --save
```

In your angular composition `require()` the package as a dependency of your module:

```javascript
angular.module('myModule', [
  require('angular-focus-caret')
])
```

The package will export the correct name for its angular module.

### Bower

In the command line:

```
bower install angular-focus-caret --save
```

In your angular composition list the directive as a dependency of your module:

```javascript
angular.module('myModule', [
  'focus-caret'
])
```

## Usage

Set caret to the end of content whenever the `<input>` receives focus.

```html
<input focus-caret/>
```

Set the caret to index `2` whenever the `<input>` receives focus.

```html
<input focus-caret="2"/>
```