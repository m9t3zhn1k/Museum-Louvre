mapboxgl.accessToken = 'pk.eyJ1IjoibTl0M3pobjFrIiwiYSI6ImNrdWg3dnJiczBnc3Mydm5tNGhjd214ZmoifQ.-RyoUsLnGmNIKbcshgNHOQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/m9t3zhn1k/ckuhep5so521e18ohsgthl3mq',
    center: [2.3364, 48.86091],
    zoom: 15.75,
    
});
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');
map.on('click', ({ point }) => {
    const features = map.queryRenderedFeatures(point, {
      layers: ['four-items', 'one-item']
    });
    if (!features.length) {
      return;
    }
    const feature = features[0];
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
    )
    .addTo(map);
});