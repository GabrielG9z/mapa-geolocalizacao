import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Alert,
  Button,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  useEffect(() => {
    async function obterLocalizacao() {
      //Acessando o status da requisição de permissão de uso
      const { status } = await Location.requestForegroundPermissionsAsync();

      /* Verificando o status */
      /*  if (status !== "granted") {
        Alert.alert(
          "Ops",
          "Você não autorizou o uso de recursos de localização"
        );
        return;
      } */
      let localizacaoAtual = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao(localizacaoAtual);
    }
    obterLocalizacao();
  }, []);
  console.log(minhaLocalizacao);

  const regiaoInicial = {
    latitude: -23.533773,
    longitude: -46.65529,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  /* Usando state para controlar a localização */
  const [localizacao, setLocalizacao] = useState();

  const marcarLocal = (event) => {
    /* Spread operator isso faz com que pegamos os parâmetros passados na const anterior e podemos usá-las */
    setLocalizacao({
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      latitude: minhaLocalizacao.coords.latitude,
      longitude: minhaLocalizacao.coords.longitude,
    });
    console.log(localizacao);
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={estilos.container}>
        <View style={estilos.viewBotao}>
          <Button title="Onde estou ?" onPress={marcarLocal} />
        </View>
        <View>
          <MapView
            onPress={marcarLocal}
            style={estilos.mapa}
            region={localizacao ?? regiaoInicial}
            liteMode={false}
            mapType="hybrid"
            userInterfaceStyle="dark"
          >
            {localizacao && (
              <Marker
                coordinate={localizacao}
                title="Aqui!!!"
                onPress={(e) => console.log(e.nativeEvent)}
              />
            )}
          </MapView>
        </View>
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  viewMapa: { flex: 1 },
  viewBotao: {},
  mapa: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
});
