const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'docs'),
		filename: 'main.js'
	},
	devServer: {
		open: true,
		https: true,
		host: '0.0.0.0',
		useLocalIp: true
	},
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.ejs'
		})
	]
}