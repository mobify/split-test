# split-test

A support library to simplify split testing. We have a repository of working examples you can reference in https://github.com/mobify/adaptivejs-split-test-examples

## Quickstart

Install `split-test` using bower:

    $ bower install split-test --save

### Defining a split condition

```js
var splitTest = SplitTest.init(
	{
		'A': 0.4,
		'B': 0.5,
		'C': 0.1
	},
	{
		namespace: 'foo'
	}
);
```

### Obtaining the split value

```js
splitTest.getChoice();
```

## Methods

### `init`

Adds a script to a custom container.

| Parameter name | Type | Description |
|----------------|-------------|-----|
| **value** | Object | The split condition |
| **options** | Object | The setup parameters |

```js
var splitTest = SplitTest.init(
	{
		'A': 0.4,
		'B': 0.5,
		'C': 0.1
	},
	{
		namespace: 'foo',
		cookieDomain: 'http://www.foo.com',
		lifetime: 15
	}
);
```
**Available options**

| Options | Type | Description |
|----------------|-------------|------|
| **namespace** | String | The namespace of the cookie to prevent conflict between cookie names |
| **cookieDomain** | String | The domain of this cookie. Default to the hostname |
| **lifetime** | Integer (milliseconds) | The lifetime of the cookie. Default to 30 days. |

### `getChoice`

Returns the split choice key.

```js
// This returns either 'A', 'B', or 'C'
var choice = splitTest.getChoice();
```
### `setChoice`

Manually sets the split choice.

| Parameter name | Type | Description |
|----------------|-------------|-----------|
| **value** | String | split choice key |

```js
splitTest.setChoice('C');

// This return 'C'
splitTest.getChoice();
```

## How to create and ship a change

* Make your code changes and create a pull-request
* Ensure the tests still work (`grunt test`)
* Get your change reviewed and :+1:'ed

## Roadmap

(tbd)

## Changelog

* 2014-09-22: Initial commit

## Glossary

* `Split testing`: todo
* `Split condition`: todo

## Where to get help

Talk to @jansepar or @dbader.
