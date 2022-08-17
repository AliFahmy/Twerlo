import React from 'react';
import Toast from 'react-bootstrap/Toast';
import styled from 'styled-components';
const CustomToast = ({ variant, show }) => {
  const successMessage = 'Correct Answer 🎉';
  const wrongMessage = 'Wrong Answer ❌';
  return (
    <StyledToast bg={variant} show={show}>
      <Toast.Body>
        {variant === 'success' ? successMessage : wrongMessage}
      </Toast.Body>
    </StyledToast>
  );
};
const StyledToast = styled(Toast)`
  @media (min-width: 240px) {
    width: 60%;
  }
  @media (min-width: 1024px) {
    width: 30%;
  }
`;
export default CustomToast;
