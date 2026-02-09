'use client';

import { useNavigation } from '@/hooks/useNavigation';

export function ContactSlide() {
  const { goToSlide } = useNavigation({ totalSlides: 4 });

  return (
    <div className="px-8 max-w-4xl mx-auto text-center">
      <h2 id="contact-title" className="font-space-grotesk text-epic font-bold uppercase text-blood-red mb-8 glitch-text" data-text="CONTACT">
        CONTACT
      </h2>

      <div className="space-y-8 mb-16">
        <p className="font-space-mono text-bone-white/60 text-lg">
          Rejoignez la corruption
        </p>

        <nav className="flex flex-col gap-6 items-center" aria-label="Liens de contact">
          <a
            href="mailto:contact@nexai.io"
            className="corrupted-btn bg-transparent border-2 border-blood-red text-bone-white px-8 py-4 font-space-mono text-base font-bold uppercase tracking-[0.1em] cursor-pointer transition-all duration-200 hover:bg-blood-red hover:text-void-black hover:animate-glitch animate-border-crack text-lg"
            aria-label="Envoyer un email à contact@nexai.io"
          >
            [EMAIL CORROMPU]
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-space-mono text-blood-red hover:text-bone-white transition-colors text-lg"
            aria-label="Visiter notre GitHub (ouvre dans un nouvel onglet)"
          >
            GitHub <span aria-hidden="true">→</span>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-space-mono text-blood-red hover:text-bone-white transition-colors text-lg"
            aria-label="Visiter notre Twitter (ouvre dans un nouvel onglet)"
          >
            Twitter <span aria-hidden="true">→</span>
          </a>
        </nav>
      </div>

      <footer className="mt-20 pt-12 border-t border-blood-red/30">
        <p className="font-space-grotesk text-3xl font-bold uppercase text-bone-white mb-4">
          NEXAI
        </p>
        <p className="font-space-mono text-blood-red uppercase tracking-widest mb-2">
          Collection de sites corrompues
        </p>
        <p className="font-space-mono text-bone-white/40 text-sm">
          © 2026 — [VERSION CORROMPUE]
        </p>
      </footer>

      <div className="mt-16">
        <button
          onClick={() => goToSlide(0)}
          className="corrupted-btn bg-transparent border-2 border-blood-red text-bone-white px-8 py-4 font-space-mono text-base font-bold uppercase tracking-[0.1em] cursor-pointer transition-all duration-200 hover:bg-blood-red hover:text-void-black hover:animate-glitch animate-border-crack"
          aria-label="Retourner à la page d'accueil"
        >
          [RETOUR AU DEBUT]
        </button>
      </div>
    </div>
  );
}
