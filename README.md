# DatoCMS plugin: Model Deployment Links

**This DatoCMS plugin adds a sidebar widget with links to deployments (build triggers) _per model with configurable url path_ (e.g. `/{ locale }/blog/{ slug }`), so your editors can easily view the item they are editing.**

![](https://github.com/voorhoede/datocms-plugin-model-deployment-links/raw/master/docs/sidebar-widget-links.jpg)

## Features

* Supports customisable URLs per model in your CMS.
* Supports single and multi-language instances.
* Supports multiple deployment environments (build triggers).

## Background

By default DatoCMS already links to your depoyment environments in the main menu:

![](https://github.com/voorhoede/datocms-plugin-model-deployment-links/raw/master/docs/deployment-links-in-main-menu.jpg)

These items link to the **Website frontend URL** you entered for the related build trigger:

![](https://github.com/voorhoede/datocms-plugin-model-deployment-links/raw/master/docs/build-trigger-settings.jpg)

This plugin adds links to **model-specific URLs** on those websites:

![](https://github.com/voorhoede/datocms-plugin-model-deployment-links/raw/master/docs/sidebar-widget-links.jpg)

The sidebar shows a link for each deployment environment. The URL is based on the form values of the item being edited and optionally the current locale.

This enables your editors to directly view the item they are editing.

## Configuration

First add this plugin via DatoCMS Settings > Plugins > Add (`/admin/plugins/new`).

### Global plugin settings

Then enter the DatoCMS API full-access token used to fetch this deployment environments (build triggers):

![](https://github.com/voorhoede/datocms-plugin-model-deployment-links/raw/master/docs/global-plugin-settings.jpg)

This token is available via Settings > API Tokens > Full-access API token (`/admin/access_tokens/`).

### Model specific settings

Add the sidebar widget to a model by adding a **JSON field** and setting the presentation to **Model Deployment Links**:

![](https://github.com/voorhoede/datocms-plugin-model-deployment-links/raw/master/docs/plugin-instance-settings.jpg)

Enter the URL pattern for this model. You can add model field values using `{ field_key }`. The item ID and item model API key are available using `{ id }` and `{ modelApiKey }`. The current locale is available using `{ locale }` (*note: localization must be enabled on the field* to make the `locale` value available).

This results in **model-specific URLs** in the sidebar of your content page:

![](https://github.com/voorhoede/datocms-plugin-model-deployment-links/raw/master/docs/sidebar-widget-links.jpg)

---

## Contributing

See [contributing.md](contributing.md).

## Credits

Scaffolded using [DatoCMS plugin Yeoman generator](https://github.com/datocms/generator-datocms-plugin).

## License

[MIT Licensed](license) by [De Voorhoede](https://www.voorhoede.nl).
