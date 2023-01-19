import { useState } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const regiaoInicial = {
    latitude: -23.533773,
    longitude: -46.65529,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  /* Usando state para controlar a localização */
  const [localizacao, setLocalizacao] = useState({
    latitude: -33.867886,
    longitude: -63.987,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  const marcarLocal = (event) => {
    /* Spread operator isso faz com que pegamos os parâmetros passados na const anterior e podemos usá-las */
    setLocalizacao({
      ...localizacao,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    console.log(localizacao);
  };

  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <MapView
          onPress={marcarLocal}
          style={estilos.mapa}
          initialRegion={regiaoInicial}
          liteMode={false}
          mapType="satellite"
          userInterfaceStyle="dark"
        >
          <Marker
            draggable
            coordinate={localizacao}
            title="Aqui!!!"
            onPress={(e) => console.log(e.nativeEvent)}
          >
            {<Image source={require("./assets/ghost.png")} />}
          </Marker>
        </MapView>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  mapa: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
});
