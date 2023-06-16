import styled from '@emotion/native';
import { View } from 'react-native';
import MapView from 'react-native-maps';

export const MapScreenContainer = styled(View)`
    flex: 1;

    border-top-width: 0.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
`;

export const Map = styled(MapView)`
    flex: 1;
`;
