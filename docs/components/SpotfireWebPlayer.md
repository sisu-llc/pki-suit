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
    const docs = require('../sampleData/Documents').default;
    const spotfireDoc = docs.spotfire;
    spotfireDoc.fields.set('pki.spotfire.filter.table', ['WorldBankData']);
    spotfireDoc.fields.set('pki.spotfire.filter.column', ['Country Name']);
    spotfireDoc.fields.set('pki.spotfire.filter.values', ['Algeria']);

    const { StaticRouter } = require('react-router-dom');

    <StaticRouter context={{}}>
      <SearchResult document={spotfireDoc} position={1} />
    </StaticRouter>
```
