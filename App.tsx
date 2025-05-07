import styled from '@emotion/styled'
import CryptoTable from './components/CryptoTable'
import './App.css'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  padding: 2rem;
  color: #fff;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #00ffff;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

function App() {
  return (
    <Container>
      <Header>
        <Title>Crypto Price Tracker</Title>
      </Header>
      <CryptoTable />
    </Container>
  )
}

export default App
