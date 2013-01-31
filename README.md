# win-spawn

  Spawn for node.js but in a way that works regardless of which OS you're using.  Use this if you want to use spawn with a JavaScript file.  It works by explicitly invoking node on windows.  It also shims support for environment variable setting by attempting to parse the command with a regex.  Since all modification is wrapped in `if (os === 'Windows_NT')` it can be safely used on non-windows systems and will not break anything.

## Installation

  $ npm install win-spawn

## Usage

### Command Line

  All the following will work exactly as if the 'win-spawn ' prefix was ommitted when on unix.

    $ win-spawn foo
    $ win-spawn ./bin/foo
    $ win-spawn NODE_PATH=./lib foo
    $ win-spawn NODE_PATH=./lib foo arg1 arg2

### API

This will just pass through to `child_process.spawn` on unix systems, but will correctly parse the arguments on windows.

```javascript
spawn('foo', [], {stdio: 'inherit'});
spawn('./bin/foo', [], {stdio: 'inherit'});
spawn('NODE_PATH=./lib foo', [], {stdio: 'inherit'});
spawn('NODE_PATH=./lib foo', [arg1, arg2], {stdio: 'inherit'});
```