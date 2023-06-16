import { useRoute } from '@react-navigation/native';
import { Marker } from 'react-native-maps';

import {
    MapScreenContainer,
    Map,
} from '../../styled-components/nestedScreenStyle/MapScreen.styled';

export function MapScreen() {
    const {
        params: { location },
    } = useRoute();
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
