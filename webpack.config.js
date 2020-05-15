const webpack = require("webpack");
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const threadLoader = require('thread-loader');

threadLoader.warmup({}, [
	'babel-loader',
	'ts-loader'
]);

const cacheLoader = {
	loader: 'cache-loader',
	options: {
		cacheDirectory: path.resolve(__dirname, './.cache')
	},
}

const config = {
	"entry": {
		"main": "./src/main.ts"
	},
	"output": {
		"filename": "[name].js",
		"path": path.resolve(__dirname, './dist'),
		"publicPath": "/"
	},
	"target": "node",
	"externals": [nodeExternals()],
	"module": {
		"rules": [
			{
				"test": /\.tsx?$/,
				"use": [cacheLoader, "thread-loader", {
					loader: 'ts-loader',
					options: {
						happyPackMode: true,
						transpileOnly: true
					}
				}],
			},
			{
				"test": /\.jsx?$/,
				"use": [cacheLoader, "thread-loader", "babel-loader"]
			},
			{
				"test": /\.js$/,
				"use": ["source-map-loader"],
				"enforce": "pre"
			}
		]
	}
}

module.exports = (conf, argv) => {
	return config;
};