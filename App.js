import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

export default function App() {

  const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY;

  const [mapRegion, setmapRegion] = useState({
    latitude: 20.637518960745023,
    longitude: -105.21658975422447,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });

  const [destination, setDestination] = useState({
    latitude: 20.63810589308976,
    longitude: -105.2200480945302,
  });

  const [origin, setOrigin] = useState({
    latitude: 20.6376586047853,
    longitude: -105.21645244881698,
  });

  const [showResult, setResult] = useState({});
  console.log(1, showResult.distance)
  return (
    <>
    <View style={styles.container}>
      <MapView
        minZoomLevel={14}
        zoomEnabled={true}
        zoomTapEnabled={true}
        showsCompass={true}
        showsScale={true}
        showsUserLocation={false}
        followsUserLocation={false}
        showsMyLocationButton={false}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion} >

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={8}
          strokeColor="blue"

          onStart={(params) => {
            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
          }}

          onReady={result => {
            setResult(result)
            console.log(`Distance: ${result.distance} km`)
            console.log(`Duration: ${result.duration} min.`)
          }}

        />

        <Marker
          coordinate={origin}
          title="Start"
        />
        <Marker
          coordinate={destination}
          title="End"
        />

      </MapView>
    </View>
    <View style={styles.footer}>
    <Text style={styles.footer}>distance: {showResult.distance} duration: {showResult.duration} </Text>
      </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '90%',
  },
  footer: {
    padding: 10, marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
