/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { PhoneSpecs } from './PhoneSpecs';
import { phoneDetailMock } from '@/mocks/phoneDetailMock';

describe('Given the PhoneSpecs component', () => {
  describe('When it renders with specs', () => {
    test('Then it should display the specifications title', () => {
      render(<PhoneSpecs specs={phoneDetailMock.specs} />);

      expect(screen.getByText('SPECIFICATIONS')).toBeInTheDocument();
    });

    test('Then it should display all spec labels', () => {
      render(<PhoneSpecs specs={phoneDetailMock.specs} />);

      expect(screen.getByText('SCREEN')).toBeInTheDocument();
      expect(screen.getByText('RESOLUTION')).toBeInTheDocument();
      expect(screen.getByText('PROCESSOR')).toBeInTheDocument();
      expect(screen.getByText('MAIN CAMERA')).toBeInTheDocument();
      expect(screen.getByText('SELFIE CAMERA')).toBeInTheDocument();
      expect(screen.getByText('BATTERY')).toBeInTheDocument();
      expect(screen.getByText('OS')).toBeInTheDocument();
      expect(screen.getByText('SCREEN REFRESH RATE')).toBeInTheDocument();
    });

    test('Then it should display the correct spec values', () => {
      render(<PhoneSpecs specs={phoneDetailMock.specs} />);

      expect(
        screen.getByText(phoneDetailMock.specs.screen)
      ).toBeInTheDocument();
      expect(
        screen.getByText(phoneDetailMock.specs.battery)
      ).toBeInTheDocument();
      expect(screen.getByText(phoneDetailMock.specs.os)).toBeInTheDocument();
    });
  });
});
