import './style.scss';

function getBuildTriggers({ datoApiToken }) {
  return fetch('https://site-api.datocms.com/build-triggers', {
    headers: {
      'X-Api-Version': 3,
      Authorization: `Bearer ${datoApiToken}`,
      Accept: 'application/json',
    },
  }).then(response => response.json()).then(({ data }) => data);
}

function createContainer() {
  const container = document.createElement('div');
  container.classList.add('preview-links');
  document.body.appendChild(container);
  return container;
}

function createLink({ text, url }) {
  const link = document.createElement('a');
  link.href = url;
  link.textContent = text;
  link.rel = 'noopener';
  link.target = '_blank';
  return link;
}

function startPlugin(plugin) {
  plugin.startAutoResizer();

  const { urlPattern } = plugin.parameters.instance;
  const { datoApiToken } = plugin.parameters.global;
  const paramPattern = /({\s?[0-9a-zA-Z]+\s?})/g;
  const paramFields = urlPattern.match(paramPattern)
    .map(param => param.substring(1, param.length - 2).trim());
  const container = createContainer();
  const gettingBuildTriggers = getBuildTriggers({ datoApiToken });

  function getUrlPath() {
    return urlPattern.replace(paramPattern, (param) => {
      const paramName = param.substring(1, param.length - 2).trim();
      const paramValue = (paramName === 'locale')
        ? plugin.locale
        : plugin.getFieldValue(paramName);
      return paramValue;
    });
  }

  function updateLinks() {
    container.innerHTML = '';
    gettingBuildTriggers.then((triggers) => {
      const urlPath = getUrlPath();
      triggers.forEach((trigger) => {
        const { name: text, frontend_url: baseUrl } = trigger.attributes;
        const url = (baseUrl.endsWith('/') && urlPath.startsWith('/'))
          ? `${baseUrl}${urlPath.substr(1)}`
          : `${baseUrl}${urlPath}`;
        const link = createLink({ url, text });
        container.appendChild(link);
      });
    });
  }

  updateLinks();

  paramFields.forEach((paramField) => {
    plugin.addFieldChangeListener(paramField, () => updateLinks());
  });
}

window.DatoCmsPlugin.init(startPlugin);
