/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { Register } from '../../src/auth';

describe('Register component', () => {
  render(<Register />)

  const nameInput = screen.getAllByRole('textbox').find(item => item.id === 'userName');
  const nickNameInput = screen.getAllByRole('textbox').find(item => item.id === 'nickName');
  const emailInput = screen.getAllByRole('textbox').find(item => item.id === 'email');
  // const passwordInput = screen.getAllByRole('textbox');

  test('should render the registration form inputs', () => {
    // screen.debug();

    expect(nameInput).toBeDefined();
    expect(nickNameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    // expect(passwordInput).toBeDefined();
  });

  test('should handle form submission', () => {
    render(<Register />);

    // Simulate user input
    fireEvent.change(nameInput, {
      target: { value: 'testuser' }
    });
    fireEvent.change(nickNameInput, {
      target: { value: 'testnickname' }
    });
    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' }
    });

    expect(nameInput.value).toBe('testuser');
    expect(nickNameInput.value).toBe('testnickname');
    expect(emailInput.value).toBe('test@example.com');
    // validate this values have changed
  });
});
