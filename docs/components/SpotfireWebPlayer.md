#### Examples:

__1:__ Sample SpotfireWebPlayer

```jsx
  <SpotfireWebPlayer />
```

__2:__ SpotfireWebPlayer filtered using Parameters

```jsx
  const filter = { table: 'WorldBankData', column: 'Country Name', values: ['Algeria'] };
  <SpotfireWebPlayer filters={[filter]}/>
```

__3:__ SpotfireWebPlayer as part of a search result.

If the `pki.suit.type` field is `spotfire`, the `SearchResult` should render as a Spotfire Web Player:

```jsx
  const docs = require('../sampleData/Documents').default;

  const { StaticRouter } = require('react-router-dom');
  <StaticRouter context={{}}>
    <SearchResult document={docs.spotfire} position={1} />
  </StaticRouter>

```

__4:__ SpotfireWebPlayer as a SearchResult but with filters from the Document

```jsx
    const SearchDocument = require( '../../src/api/SearchDocument').default;

    const docs = require('../sampleData/Documents').default;
    const spotfireDoc = new SearchDocument(new Map(docs.spotfire.fields));
    spotfireDoc.fields.set('pki.spotfire.filter.table', ['WorldBankData']);
    spotfireDoc.fields.set('pki.spotfire.filter.column', ['Country Name']);
    spotfireDoc.fields.set('pki.spotfire.filter.values', ['Algeria']);
    spotfireDoc.fields.set('pki.spotfire.file', ['/User Demos/Gerard Conway/worldbank']);
    spotfireDoc.fields.set('pki.spotfire.host', ['http://crspotfire191.pkiapps.net:443/spotfire/wp/']);

    const { StaticRouter } = require('react-router-dom');

    <StaticRouter context={{}}>
      <SearchResult document={spotfireDoc} position={1} />
    </StaticRouter>
```
