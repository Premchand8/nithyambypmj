"use client";

import { ConceptA } from "@/components/concepts/ConceptA";
import { ConceptB } from "@/components/concepts/ConceptB";
import { ConceptC } from "@/components/concepts/ConceptC";
import { ConceptD } from "@/components/concepts/ConceptD";
import {
  PreviewProvider,
  usePreview,
} from "@/components/preview/PreviewContext";
import { EnquiryPopup } from "@/components/shared/EnquiryPopup";

function PreviewCanvas() {
  const {
    activeDesign,
    page,
    setPage,
    goBack,
    activeProduct,
    setActiveProduct,
    openProduct,
  } = usePreview();

  const conceptProps = {
    page,
    onNavigate: setPage,
    onBack: goBack,
    activeProduct,
    onSelectProduct: setActiveProduct,
    onOpenProduct: openProduct,
  };

  return (
    <div className="min-h-dvh w-full">
      {activeDesign === "A" && <ConceptA {...conceptProps} />}
      {activeDesign === "B" && <ConceptB {...conceptProps} />}
      {activeDesign === "C" && <ConceptC {...conceptProps} />}
      {activeDesign === "D" && <ConceptD {...conceptProps} />}
      <EnquiryPopup active={page === "home"} design={activeDesign} />
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
