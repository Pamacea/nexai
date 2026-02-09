import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/shared/testing';
import { CorruptedSkillNode } from '../CorruptedSkillNode';

describe('CorruptedSkillNode', () => {
  const mockNode = {
    id: 'metal',
    name: 'METAL',
    symbol: '[X]',
  };

  it('should render node symbol', () => {
    renderWithProviders(
      <CorruptedSkillNode
        node={mockNode}
        isActive={false}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText('[X]')).toBeInTheDocument();
  });

  it('should not have active class when inactive', () => {
    const { container } = renderWithProviders(
      <CorruptedSkillNode
        node={mockNode}
        isActive={false}
        onClick={vi.fn()}
      />
    );
    const button = container.querySelector('.corrupted-node');
    expect(button).not.toHaveClass('active');
  });

  it('should have active class when active', () => {
    const { container } = renderWithProviders(
      <CorruptedSkillNode
        node={mockNode}
        isActive={true}
        onClick={vi.fn()}
      />
    );
    const button = container.querySelector('.corrupted-node');
    expect(button).toHaveClass('active');
  });

  it('should set aria-pressed to false when inactive', () => {
    renderWithProviders(
      <CorruptedSkillNode
        node={mockNode}
        isActive={false}
        onClick={vi.fn()}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('should set aria-pressed to true when active', () => {
    renderWithProviders(
      <CorruptedSkillNode
        node={mockNode}
        isActive={true}
        onClick={vi.fn()}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <CorruptedSkillNode
        node={mockNode}
        isActive={false}
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have correct font class', () => {
    const { container } = renderWithProviders(
      <CorruptedSkillNode
        node={mockNode}
        isActive={false}
        onClick={vi.fn()}
      />
    );
    const button = container.querySelector('.font-space-mono');
    expect(button).toBeInTheDocument();
  });
});
