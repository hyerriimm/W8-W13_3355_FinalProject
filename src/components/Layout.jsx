import React from 'react';
import styled from 'styled-components';

const Layout = (props) => {
    return (
        <StLayout>
            {props.children}
        </StLayout>
    );
}

export default Layout;

const StLayout = styled.div`
min-width: 375px;
margin: 0 auto;
height: 100vh;
`;