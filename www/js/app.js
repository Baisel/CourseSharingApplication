var search = instantsearch({
    appId: '*******************',
    apiKey: '****************************', // search only API key, no ADMIN key
    indexName: 'mso',
    urlSync: true,
    searchParameters: {
      hitsPerPage: 10
    }
  });

search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input'
    })
  );

search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: document.getElementById('hit-template').innerHTML,
        empty: "キーワード <em>\"{{query}}\"</em>は存在しません"
      }
    })
  );

search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination'
    })
  );

search.start();