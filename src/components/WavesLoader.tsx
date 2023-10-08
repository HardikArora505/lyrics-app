import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Bars } from 'react-loading-icons'

const waveAnimation = keyframes`
  0% { transform: scaleY(1); }
  25% { transform: scaleY(2); }
  50% { transform: scaleY(1); }
  75% { transform: scaleY(2); }
  100% { transform: scaleY(1); }
`;

const Wave = styled.div`
  display: inline-block;
  background-color: #000;
  height: 50px;
  width: 5px;
  border-radius: 2px;
  animation: ${waveAnimation} 0.5s infinite ease-in-out;
`;


const WavesLoader = () => {
    return (
        <div>
    <Wave style={{ animationDelay: '0s' }} />
    <Wave style={{ animationDelay: '0.1s' }} />
    <Wave style={{ animationDelay: '0.2s' }} />
    <Wave style={{ animationDelay: '0.3s' }} />
    <Wave style={{ animationDelay: '0.4s' }} />
    {/* <Bars stroke="#000" fill="none" speed={1} width={32} height={32} /> */}
  </div>
    )
}

export default WavesLoader