# Preview Links DatoCMS plugin

**Sidebar widget with configurable links to preview a specific item.**

## Configuration

[Describe/screenshot any global/instance parameters this plugin requires]

## Development

Install all the project dependencies with:

```bash
yarn install
```

Add this plugin in development mode to one of your DatoCMS project with:

```bash
yarn addToProject
```

Start the local development server with:

```bash
yarn start
```

The plugin will be served from [http://localhost:5000/](http://localhost:5000/). Insert this URL as the plugin [Entry point URL](https://www.datocms.com/docs/plugins/creating-a-new-plugin/).

## Publishing

Before publishing this plugin, make sure:

* you've properly described any configuration parameters in this README file;
* you've properly compiled this project's `package.json` following the [official rules](https://www.datocms.com/docs/plugins/publishing/);
* you've added a cover image (`cover.png`) and a preview GIF (`preview.gif`) into the `docs` folder.

When everything's ready, just run:

```
yarn publish
```

## Credits

* Scaffolded using [DatoCMS plugin Yeoman generator](https://github.com/datocms/generator-datocms-plugin)

## License

[MIT Licensed](license) by [De Voorhoede](https://www.voorhoede.nl)
