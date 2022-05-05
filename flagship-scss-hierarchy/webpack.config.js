const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/client/index.js',
	output: {
		filename: 'css-hierarchy.js',
		path: path.resolve(__dirname, 'fabric-scss')
	},
	devServer: {
		contentBase: './fabric-scss'
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: extractWebpackPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			},
			{
				test: /\.scss$/,
				use: extractWebpackPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new extractWebpackPlugin('css-hierarchy.css'),
		new HtmlWebpackPlugin({
			hash: true,
			title: 'SCSS hierarchy',
			myPageHeader: 'SCSS hierarchy',
			template: './src/client/template/index.html',
			filename: './index.html'
		})
	]
};