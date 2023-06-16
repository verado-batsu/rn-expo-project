import styled from '@emotion/native';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const MapScreenContainer = styled(View)`
    flex: 1;

    border-top-width: 0.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
`;

const Map = styled(MapView)`
    flex: 1;
`;

export function MapScreen() {
    const {
        params: { location },
    } = useRoute();
    console.log(location);
    return (
        <MapScreenContainer>
            <Map
                initialRegion={{
                    ...location,
                    latitudeDelta: 1.001,
                    longitudeDelta: 1.006,
                }}
            >
                <Marker coordinate={location} />
            </Map>
        </MapScreenContainer>
    );
}
