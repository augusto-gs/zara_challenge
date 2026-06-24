/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('Given the SearchBar component', () => {
  describe('When it renders with an empty value', () => {
    test('Then it should show the placeholder', () => {
      render(
        <SearchBar value="" onChange={jest.fn()} resultCount={0} />
      );

      expect(
        screen.getByPlaceholderText('Search for a smartphone...')
      ).toBeInTheDocument();
    });

    test('Then it should not show the clear button', () => {
      render(
        <SearchBar value="" onChange={jest.fn()} resultCount={0} />
      );

      expect(
        screen.queryByRole('button', { name: /clear search/i })
      ).not.toBeInTheDocument();
    });
  });

  describe('When it renders with a value', () => {
    test('Then it should show the clear button', () => {
      render(
        <SearchBar value="samsung" onChange={jest.fn()} resultCount={2} />
      );

      expect(
        screen.getByRole('button', { name: /clear search/i })
      ).toBeInTheDocument();
    });

    test('Then it should display the result count', () => {
      render(
        <SearchBar value="samsung" onChange={jest.fn()} resultCount={2} />
      );

      expect(screen.getByText('2 RESULTS')).toBeInTheDocument();
    });
  });

  describe('When the user types in the input', () => {
    test('Then it should call onChange with the new value', async () => {
      const onChange = jest.fn();
      render(
        <SearchBar value="" onChange={onChange} resultCount={0} />
      );

      await userEvent.type(
        screen.getByRole('searchbox', { name: /search for a smartphone/i }),
        'apple'
      );

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('When the user clicks the clear button', () => {
    test('Then it should call onChange with an empty string', async () => {
      const onChange = jest.fn();
      render(
        <SearchBar value="samsung" onChange={onChange} resultCount={2} />
      );

      await userEvent.click(
        screen.getByRole('button', { name: /clear search/i })
      );

      expect(onChange).toHaveBeenCalledWith('');
    });
  });
});
