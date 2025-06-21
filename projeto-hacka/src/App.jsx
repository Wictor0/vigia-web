import { useState } from 'react'
import TopTabs from './components/TopTabs.jsx'
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('monitoramento')
  const [mapView, setMapView] = useState('satellite')

  const alerts = [
    {
      id: 1,
      tipo: 'Lixo acumulado',
      local: 'Asa Norte, Quadra 312 – Brasília/DF',
      hora: '14:23',
      prioridade: 'alta',
      destino: 'SLU',
    },
    {
      id: 2,
      tipo: 'Iluminação precária',
      local: 'Asa Norte, Quadra 312 – Brasília/DF',
      hora: '14:23',
      prioridade: 'media',
      destino: 'CEB',
    },
  ]

  const prioridadeCor = {
    alta: 'red',
    media: 'orange',
    baixa: 'green',
  }

  return (
    <div className="app-container">
      <TopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="status-boxes">
        <div className="status-box">
          <span className="status-title">Alertas ativos</span>
          <div className="status-value">24 <span className="negativo">-3</span></div>
        </div>

        <div className="status-box">
          <span className="status-title">Resolvidos hoje</span>
          <div className="status-value">156 <span className="positivo">+12</span></div>
        </div>

        <div className="status-box">
          <span className="status-title">Câmeras online</span>
          <div className="status-value">847 <span className="azul">98%</span></div>
        </div>
      </div>

      <div className="main-content">
        <div className="map-section">
          <div className="background-map">
          <div className="map-header">
            <div classname="tittle-map">
              <h3 className="map-title">Mapa de alertas - Distrito Federal</h3>
            </div>
            <div className="map-controls">
              <button
                className={`map-button ${mapView === 'satellite' ? 'selected' : ''}`}
                onClick={() => setMapView('satellite')}
              >
                Satélite
              </button>
              <button
                className={`map-button ${mapView === 'traffic' ? 'selected' : ''}`}
                onClick={() => setMapView('traffic')}
              >
                Tráfego
              </button>
            </div>
          </div>
          <div classname="map-view">
            <div className="map-placeholder">
            <div classname="legend-container">
              <div classname="legend-map">
              <h4>Legendas</h4>
              </div>
            </div>
            </div>
          </div>
        </div>
        </div>

        <div className="alerts-section">
          <div className="alert-list">
            <div className="header-alerts">
              <strong>ALERTAS RECENTES</strong>
              <span className="ativos-badge">{alerts.length} ativos</span>
            </div>
            <div className="alerts-scroll">
              {alerts.map((alert) => (
                <div key={alert.id} className="alert-item">
                  <div
                    className="prioridade-dot"
                    style={{ backgroundColor: prioridadeCor[alert.prioridade] }}
                  ></div>
                  <strong>{alert.tipo}</strong>
                  <p>{alert.local}</p>
                  <p className="hora">{alert.hora}</p>
                  <div className="alert-buttons">
                    <button className="btn-encaminhar">
                      Encaminhar &gt; {alert.destino}
                    </button>
                    <button className="btn-detalhes">Detalhes</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
