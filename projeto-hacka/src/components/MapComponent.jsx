import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

// A chave agora é lida de forma segura das variáveis de ambiente.
// O React substitui esta variável pelo valor do seu arquivo .env durante a compilação.
const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const MapComponent = ({ alerts, flyToPosition }) => {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  // Coordenadas iniciais do mapa (centro de Brasília)
  const mapCenter = {
    lat: -15.793889,
    lng: -47.882778,
  };

  // Efeito que "voa" para a posição do marcador
  useEffect(() => {
    if (map && flyToPosition) {
      const [lat, lng] = flyToPosition;
      map.panTo({ lat, lng });
      map.setZoom(16);
    }
  }, [flyToPosition, map]);

  const handleMarkerClick = (markerId) => {
    setActiveMarker(markerId);
  };

  // Se a chave da API não for encontrada, mostra uma mensagem de erro em vez do mapa.
  if (!REACT_APP_GOOGLE_API_KEY) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        Erro: A Chave da API do Google Maps não foi configurada.
        Por favor, configure o arquivo .env com a variável REACT_APP_GOOGLE_API_KEY.
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
    >
      <GoogleMap
        onLoad={setMap}
        mapContainerStyle={{ width: "100%", height: "100%", borderRadius: '10px' }}
        center={mapCenter}
        zoom={12}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {alerts.map((alert) => (
          (alert.latitude && alert.longitude) && (
            <Marker
              key={alert.id}
              position={{ lat: alert.latitude, lng: alert.longitude }}
              onClick={() => handleMarkerClick(alert.id)}
            >
              {activeMarker === alert.id && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <h4>{alert.tipo}</h4>
                    <p>{alert.descricao}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          )
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
