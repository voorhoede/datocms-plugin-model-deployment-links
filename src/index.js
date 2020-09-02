import './style.scss';

/**
 * @see https://www.datocms.com/docs/content-management-api/resources/build_trigger/instances
 */
function getBuildTriggers({ datoApiToken }) {
  return fetch('https://site-api.datocms.com/build-triggers', {
    headers: {
      'X-Api-Version': 3,
      Authorization: `Bearer ${datoApiToken}`,
      Accept: 'application/json',
    },
  }).then(response => response.json()).then(({ data }) => data);
}

function toggleAttribute(element, attribute) {
  if (element.hasAttribute(attribute)) {
    element.removeAttribute(attribute);
  } else {
    element.setAttribute(attribute, true);
  }
}

function createList() {
  const list = document.createElement('ul');
  list.classList.add('preview-links');
  document.body.appendChild(list);
  return list;
}

function createLink({ text, url }) {
  const link = document.createElement('a');
  link.href = url;
  link.textContent = text;
  link.rel = 'noopener';
  link.target = '_blank';
  return link;
}

function createItem({ text, url }) {
  const item = document.createElement('li');
  const button = document.createElement('button');
  const canvas = document.createElement('canvas');
  const link = createLink({ text, url });

  button.type = 'button';
  button.textContent = 'QR code';
  canvas.setAttribute('hidden', true);
  button.addEventListener('click', () => {
    toggleAttribute(canvas, 'hidden');
    button.classList.toggle('is-active');
  });
  window.QRCode.toCanvas(canvas, url, (error) => {
    if (error) console.error(error);
  });

  item.appendChild(button);
  item.appendChild(link);
  item.appendChild(canvas);
  return item;
}

/**
 * @see https://www.datocms.com/docs/building-plugins/sdk-reference
 */
function startPlugin(plugin) {
  plugin.startAutoResizer();

  const { urlPattern } = plugin.parameters.instance;
  const { datoApiToken } = plugin.parameters.global;
  const isMultiLocale = (plugin.site.attributes.locales.length > 1);
  const paramPattern = /({\s?[0-9a-zA-Z]+\s?})/g;
  const paramMatches = urlPattern.match(paramPattern) || [];
  const paramFields = paramMatches.map(param => param.substring(1, param.length - 2).trim());

  const list = createList();
  const gettingBuildTriggers = getBuildTriggers({ datoApiToken });

  function getFieldValue(fieldKey) {
    return plugin.getFieldValue(fieldKey, plugin.locale) || plugin.getFieldValue(fieldKey);
  }

  function getUrlPath() {
    return urlPattern.replace(paramPattern, (param) => {
      const paramName = param.substring(1, param.length - 2).trim();
      switch (paramName) {
        case 'id':
          return plugin.itemId;
        case 'locale':
          return plugin.locale;
        case 'modelApiKey':
          return plugin.itemType.attributes.api_key;
        default:
          return getFieldValue(paramName);
      }
    });
  }

  function updateLinks() {
    list.innerHTML = '';
    gettingBuildTriggers.then((triggers) => {
      const urlPath = getUrlPath();
      triggers.forEach((trigger) => {
        const { name: text, frontend_url: baseUrl } = trigger.attributes;
        const url = (baseUrl.endsWith('/') && urlPath.startsWith('/'))
          ? `${baseUrl}${urlPath.substr(1)}`
          : `${baseUrl}${urlPath}`;
        const item = createItem({ url, text });
        list.appendChild(item);
      });
    });
  }

  updateLinks();

  paramFields.forEach((paramField) => {
    plugin.addFieldChangeListener(paramField, () => updateLinks());
  });

  if (isMultiLocale) {
    let currentLocale = plugin.locale;
    setInterval(() => {
      if (currentLocale !== plugin.locale) updateLinks();
      currentLocale = plugin.locale;
    }, 1000);
  }
}

window.DatoCmsPlugin.init(startPlugin);
