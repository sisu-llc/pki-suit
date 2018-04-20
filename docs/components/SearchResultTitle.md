#### Examples:

__1.__ Default Search Result Title

```jsx
  const SearchDocument = require('../../src/api/SearchDocument').default;

  const fields = new Map();
  fields.set('title', ['This is my title!']);
  fields.set('uri', ['#']);
  const doc = new SearchDocument(fields, null, []);

  <SearchResultTitle doc={doc} />
```

__2.__ You can set the header size using `as`

```jsx
  const SearchDocument = require('../../src/api/SearchDocument').default;
  const fields = new Map();
  fields.set('title', ['I change size!']);
  const doc = new SearchDocument(fields, null, []);

  <table>
    <tr>
      <td><h1>H1:</h1></td>
      <td><SearchResultTitle as="h1" doc={doc}/></td>
    </tr>
    <tr>
      <td><h2>H2:</h2></td>
      <td><SearchResultTitle as="h2" doc={doc}/></td>
    </tr>
    <tr>
      <td><h3>H3:</h3></td>
      <td><SearchResultTitle as="h3" doc={doc}/></td>
    </tr>
    <tr>
      <td><h4>H4:</h4></td>
      <td><SearchResultTitle as="h4" doc={doc}/></td>
    </tr>
  </table>
```
