'use client';

interface CorruptedSkillNodeProps {
  node: {
    id: string;
    name: string;
    symbol: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export function CorruptedSkillNode({ node, isActive, onClick }: CorruptedSkillNodeProps) {
  return (
    <button
      onClick={onClick}
      className={`
        corrupted-node
        ${isActive ? 'active' : ''}
        font-space-mono
      `}
      aria-pressed={isActive}
    >
      <span className="text-bone-white font-bold text-lg">{node.symbol}</span>
    </button>
  );
}
