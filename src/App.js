import Giphy from "./components/Giphy";
import styled from '@emotion/styled'

function App() {
  return (
    <Wrapper>
      <Giphy/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: black;
  top: 0;
`

export default App;
