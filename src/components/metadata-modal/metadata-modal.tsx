"use client";

import { translations } from "@/assets/static-data/translations";
import { MuseumObjectContext } from "@/context/museum-object-context";
import { useFocusTrap } from "@/utils/useFocusTrap";
import Image from "next/image";
import { useContext, useEffect } from "react";
import IIIFLogo from "../../assets/images/iiif_notext.png";
import CloseIcon from "../icons/close";

interface MetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MetadataModal({ isOpen, onClose }: MetadataModalProps) {
  const { museumObjectState } = useContext(MuseumObjectContext);
  const { activeLanguage, manifestData } = museumObjectState;
  const modalRef = useFocusTrap(isOpen);

  // Escape key and click outside handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, modalRef]);

  // Helper function to get localized text
  const getLocalizedText = (text: any) => {
    if (typeof text === "string") return text;
    return text?.[activeLanguage] || text?.["en"] || text;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div
        ref={modalRef}
        className="relative max-h-[80vh] w-[90vw] max-w-2xl overflow-hidden rounded-lg border-2 border-white bg-black shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="metadata-modal-title"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-400 px-6 py-4">
          <h2
            id="metadata-modal-title"
            className="text-xl font-semibold text-white"
          >
            {translations[activeLanguage].metadata}
          </h2>
          <button
            onClick={onClose}
            className="additional-controls-button w-max-content group flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-black text-white hover:border-ncmaOrange hover:bg-ncmaDarkOrange focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-400"
            aria-label={translations[activeLanguage].closeModal}
          >
            <CloseIcon className="h-4 w-4 fill-white group-hover:fill-ncmaOrange" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
          {manifestData ? (
            <div className="space-y-4">
              {/* IIIF Metadata */}
              {manifestData.metadata?.map((item: any, index: number) => {
                const label = getLocalizedText(item.label);
                const value = getLocalizedText(item.value);

                if (!label || !value) return null;

                return (
                  <div
                    key={index}
                    className="border-b border-gray-400 pb-3 last:border-b-0"
                  >
                    <dt className="mb-1 text-sm font-bold text-gray-400">
                      {typeof label === "string"
                        ? label
                        : Array.isArray(label)
                          ? label.join(", ")
                          : ""}
                    </dt>
                    <dd className="text-sm text-white">
                      {typeof value === "string" ? (
                        value.includes("<") ? (
                          <div dangerouslySetInnerHTML={{ __html: value }} />
                        ) : (
                          value
                        )
                      ) : Array.isArray(value) ? (
                        value.join(", ")
                      ) : (
                        ""
                      )}
                    </dd>
                  </div>
                );
              })}

              {/* Required Statement */}
              {manifestData.requiredStatement && (
                <div className="border-b border-gray-400 pb-3 last:border-b-0">
                  <dt className="mb-1 text-sm font-bold text-gray-400">
                    {translations[activeLanguage].requiredStatement}
                  </dt>
                  <dd className="text-sm text-white">
                    {getLocalizedText(manifestData.requiredStatement.value)}
                  </dd>
                </div>
              )}

              {/* Rights */}
              {manifestData.rights && (
                <div className="border-b border-gray-400 pb-3 last:border-b-0">
                  <dt className="mb-1 text-sm font-bold text-gray-400">
                    {translations[activeLanguage].rights}
                  </dt>
                  <dd className="text-sm text-white">{manifestData.rights}</dd>
                </div>
              )}

              {/* IIIF Manifest URL */}
              {manifestData.id && (
                <div className="border-b border-gray-400 pb-3 last:border-b-0">
                  <dt className="mb-1 flex items-center gap-2 text-sm font-bold text-gray-400">
                    <Image src={IIIFLogo} alt="IIIF Logo" className="h-4 w-4" />
                    {translations[activeLanguage].manifest}
                  </dt>
                  <dd className="text-sm text-white">
                    <a
                      href={manifestData.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-blue-600 underline hover:text-blue-800"
                    >
                      {manifestData.id}
                    </a>
                  </dd>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {translations[activeLanguage].noMetadataAvailable}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
