import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import GeoJSONFeatures from './GeoJSONFeatures';

// Mocking axios
jest.mock('axios', () => ({
  get: jest.fn(),
}));

// Mock osmtogeojson function
jest.mock('osmtogeojson');

describe('GeoJSONFeatures component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    render(<GeoJSONFeatures />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'GeoJSON App'
    );
    expect(
      screen.getByRole('button', { name: 'Get GeoJSON' })
    ).toBeInTheDocument();
  });

  it('handles fetching GeoJSON data', async () => {
    const mockGeoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [13.5905818, 52.5956855],
                  [13.590704, 52.5955751],
                ],
              ],
            ],
          },
        },
      ],
    };

    // Mock the axios request
    axios.get.mockResolvedValueOnce({ data: mockGeoJSON });

    // Mock the osmtogeojson function
    osmtogeojson.mockImplementation((data) => data);

    render(<GeoJSONFeatures />);

    fireEvent.change(screen.getByLabelText(/left/i), {
      target: { value: '13.5' },
    });
    fireEvent.change(screen.getByLabelText(/bottom/i), {
      target: { value: '52.5' },
    });
    fireEvent.change(screen.getByLabelText(/right/i), {
      target: { value: '13.7' },
    });
    fireEvent.change(screen.getByLabelText(/top/i), {
      target: { value: '52.7' },
    });

    // Trigger the button click
    fireEvent.click(screen.getByRole('button', { name: 'Get GeoJSON' }));

    expect(
      screen.getByRole('button', { name: /fetching/i })
    ).toBeInTheDocument();

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(osmtogeojson).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText(/FeatureCollection/)).toBeInTheDocument();
    });
  });

  it('handles error fetching', async () => {
    // Mock the axios request to simulate an error
    axios.get.mockRejectedValue('Internal Server Error');

    render(<GeoJSONFeatures />);

    fireEvent.click(screen.getByRole('button', { name: 'Get GeoJSON' }));

    await waitFor(() => {
      expect(screen.getByText(/Error fetching data/)).toBeInTheDocument();
    });
  });
});
