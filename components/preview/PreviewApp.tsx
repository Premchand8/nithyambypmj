"use client";

import { ConceptA } from "@/components/concepts/ConceptA";
import { ConceptB } from "@/components/concepts/ConceptB";
import { ConceptC } from "@/components/concepts/ConceptC";
import { ConceptD } from "@/components/concepts/ConceptD";
import {
  PreviewProvider,
  usePreview,
} from "@/components/preview/PreviewContext";

function PreviewCanvas() {
  const {
    activeDesign,
    page,
    setPage,
    activeProduct,
    setActiveProduct,
  } = usePreview();

  const conceptProps = {
    page,
    onNavigate: setPage,
    activeProduct,
    onSelectProduct: setActiveProduct,
  };

  return (
    <div className="min-h-dvh w-full">
      {activeDesign === "A" && <ConceptA {...conceptProps} />}
      {activeDesign === "B" && <ConceptB {...conceptProps} />}
      {activeDesign === "C" && <ConceptC {...conceptProps} />}
      {activeDesign === "D" && <ConceptD {...conceptProps} />}
    </div>
  );
}

/** Phase 1 preview — no top stakeholder chrome; switcher lives in site header */
export function PreviewApp() {
  return (
    <PreviewProvider>
      <PreviewCanvas />
    </PreviewProvider>
  );
}
