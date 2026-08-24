"use client";

interface EDCContextProps {
  locale: string;
}

export function EDCContext({ locale }: EDCContextProps) {
  return (
    <div className="rounded-lg border border-card-border bg-card-bg p-5 my-6 max-w-4xl">
      <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
        {locale === "fi" ? "Endokriinisen häirinnän tutkimuskonteksti" : "Endocrine Disruption Research Context"}
      </p>
      <p className="text-sm text-foreground-muted leading-relaxed">
        {locale === "fi"
          ? "Tässä kuvatut vaikutukset ovat rinnakkaisia vakiintuneen endokriinisten häiriöaineiden (EDC) tutkimuskentän löydösten kanssa. BPA, ftalaatit, PCB:t ja parasetamoli ovat osoittaneet häiritsevänsä sikiöaikaista hormoniohjelmointia ja aivojen seksuaalista differentiointia samojen Ca²⁺-riippuvaisten mekanismien kautta. BERM ehdottaa, että EMF on lisä EI-KEMIALLINEN kontribuuttori samalle biologiselle reitille. Tämä ei korvaa tai vähennä kemiallisten EDC:iden tai sosiaalisten/kulttuuristen tekijöiden roolia."
          : "The effects described here parallel well-established findings in endocrine disrupting chemical (EDC) research. BPA, phthalates, PCBs, and paracetamol have been shown to disrupt prenatal hormone programming and brain sexual differentiation through similar Ca²⁺-dependent mechanisms. BERM proposes that EMF is an additional, non-chemical contributor to the same biological pathway. This does not replace or diminish the role of chemical EDCs or social/cultural factors."}
      </p>
    </div>
  );
}
