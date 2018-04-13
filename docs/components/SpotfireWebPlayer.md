#### Examples:

__1:__ Sample SpotfireWebPlayer

```jsx
  <SpotfireWebPlayer />
```

__2:__ SpotfireWebPlayer as part of a search result.

If the `.type` field is `spotfire`, the `SearchResult` should render as a Spotfire Web Player:

```jsx
  sampleDocs = require('../sampleData/Documents').default;

  const { StaticRouter } = require('react-router-dom');
  <StaticRouter context={{}}>
    <SearchResult
      document={sampleDocs.spotfire}
      position={4}
      format="list"
    />
  </StaticRouter>

```