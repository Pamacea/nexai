'use client';

import { Artifact, itemTypeLabels } from '@/lib/data';

interface CorruptedArtifactCardProps {
  artifact: Artifact;
}

export function CorruptedArtifactCard({ artifact }: CorruptedArtifactCardProps) {
  // Durability scramble effect using CSS animation only - no JS state updates
  // GPU-accelerated with transform3d and will-change for better performance

  return (
    <a
      href={artifact.url}
      target="_blank"
      rel="noopener noreferrer"
      className="corrupted-card angled-corrupted block"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-space-grotesk text-2xl font-bold uppercase text-bone-white">
            <span className="stricken">{artifact.name}</span> {artifact.name}
          </h3>
          <p className="text-blood-red text-sm mt-1">
            [{itemTypeLabels[artifact.itemType]}]
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-bone-white/50 uppercase">Rareté</span>
          <p className="font-space-mono text-blood-red font-bold uppercase">
            {artifact.rarity}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-label">SLOT</div>
          <div className="stat-value uppercase">{artifact.slot}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">GENRE</div>
          <div className="stat-value uppercase">{artifact.genre}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">DURABILITÉ</div>
          <div className="stat-value scramble-stat" data-base-value={artifact.durability}>
            {artifact.durability}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">ID</div>
          <div className="stat-value">#{artifact.id}</div>
        </div>
      </div>

      {/* Lore */}
      <p className="mt-4 text-bone-white/70 font-space-mono text-sm leading-relaxed">
        {artifact.lore}
      </p>

      {/* Corrupted Button */}
      <div className="mt-6">
        <button className="corrupted-btn w-full">
          ~~ÉQUIPER~~ CORROMPRE
        </button>
      </div>
    </a>
  );
}
