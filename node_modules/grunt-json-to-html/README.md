# grunt-json-to-html

> Grunt plugin for [json-to-html](https://github.com/frozzare/json-to-html) [![Build Status](https://travis-ci.org/frozzare/grunt-json-to-html.png?branch=master)](https://travis-ci.org/frozzare/grunt-json-to-html)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-json-to-html --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-json-to-html');
```

## The "json_to_html" task

### Overview
In your project's Gruntfile, add a section named `json_to_html` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  json_to_html: {
    options: {
      // Task-specific options go here.
    },
    files: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.pre
Type: `Boolean`
Default value: `true`

A boolean that adds `<pre>` to html output.

#### options.output
Type: `Function`
Default value: None

A function that can be used as output callback.

### Example

```js
grunt.initConfig({
  json_to_html: {
    options: {
      output: function (html) {
        console.log(html)
      }
    },
    files: {
      'dest/json.html': 'src/data.json',
    },
  },
});
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using [Grunt](http://gruntjs.com/).