import './TopTabs.css'
import logo from '../assets/logo.png'

export default function TopTabs({ activeTab, setActiveTab }) {
  return (
    <div className="header">
      <div className="logo-header">
          <img src={logo} alt="Logo"/>
        </div>
        <div className="header-title">
        <h1>SISTEMA DE SEGURANÇA URBANA INTELIGENTE</h1>
        <p>Polícia Militar do Distrito Federal - Central de Monitoramento</p>
      </div>
      <div className="top-tabs">
        {['monitoramento', 'modelo'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab === 'monitoramento' ? 'Monitoramento' : 'Modelo de predição'}
          </button>
        ))}
      </div>
    </div>
  )
}
