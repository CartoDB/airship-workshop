function createMap(q) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: carto.basemaps.darkmatter,
    center: [-3.7004486182019036, 40.43514466401393],
    zoom: 10
  });
  
  carto.setDefaultAuth({
    username: 'cartovl',
    apiKey: 'default_public'
  });
  
  const source = new carto.source.SQL(q || 'select * from madrid_listings');
  
  const layerviz = new carto.Viz(`
    @hoodHist: globalHistogram($neighbourhood_group)
    @featureCount: viewportCount()
    @avgPrice: viewportAvg($price)
    @minPrice: globalMin($price)
    @maxPrice: globalMax($price)
  `);
  
  const layer = new carto.Layer('layer', source, layerviz);
  
  layer.addTo(map);

  return {
    map,
    layer
  };
}