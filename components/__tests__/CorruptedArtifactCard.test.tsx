import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/testing';
import { CorruptedArtifactCard } from '../CorruptedArtifactCard';

describe('CorruptedArtifactCard', () => {
  const mockArtifact = {
    id: '1',
    name: 'The Useless Web',
    url: 'https://theuselessweb.com',
    lore: 'A powerful curse that transports the bearer to random useless domains.',
    slot: 'inutile' as const,
    itemType: 'weapon' as const,
    rarity: 'legendary' as const,
    durability: 2012,
    genre: 'metal' as const,
  };

  it('should render artifact name', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    expect(screen.getAllByText('The Useless Web')).toHaveLength(2);
  });

  it('should render item type label', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    expect(screen.getByText('[ARME]')).toBeInTheDocument();
  });

  it('should render rarity', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    expect(screen.getByText('legendary')).toBeInTheDocument();
  });

  it('should render slot', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    expect(screen.getByText('inutile')).toBeInTheDocument();
  });

  it('should render genre', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    expect(screen.getByText('metal')).toBeInTheDocument();
  });

  it('should render durability', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    expect(screen.getByText('2012')).toBeInTheDocument();
  });

  it('should render artifact ID', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('should render lore', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    expect(
      screen.getByText(/A powerful curse that transports/i)
    ).toBeInTheDocument();
  });

  it('should render equip button', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    expect(screen.getByText(/ÉQUIPER.*CORROMPRE/i)).toBeInTheDocument();
  });

  it('should render link with correct href', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://theuselessweb.com');
  });

  it('should have correct rel attributes for security', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have correct target for external link', () => {
    renderWithProviders(<CorruptedArtifactCard artifact={mockArtifact} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
