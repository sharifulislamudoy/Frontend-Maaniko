"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import ProductDetailsView from "@/modules/products/components/ProductDetailsView";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { MaanikoProduct } from "@/modules/products/types/product";

type ProductDetailsModalProps = {
  product: MaanikoProduct | null;
  onClose: () => void;
};

export default function ProductDetailsModal({
  product,
  onClose,
}: ProductDetailsModalProps) {
  const { locale, text } = useSiteText();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, product]);

  const modalProduct = useMemo<MaanikoProduct | null>(() => product, [product]);

  const modalTitle = modalProduct
    ? text(modalProduct.name)
    : "পণ্যের বিস্তারিত";

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {modalProduct && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#03182e]/60 p-2 backdrop-blur-[3px] md:p-4 lg:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={modalTitle}
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.985,
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto flex h-full w-full max-w-[1500px] flex-col overflow-hidden rounded-[22px] border border-white/60 bg-[#fff9fb] shadow-[0_28px_90px_rgba(0,0,0,0.32)] md:rounded-[28px]"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="sticky top-0 z-[70] flex shrink-0 items-center justify-between gap-3 border-b border-[#dce3ec] bg-white/95 px-3 py-2 shadow-sm backdrop-blur-xl md:px-5 md:py-3">
              <p className="min-w-0 truncate text-sm font-black text-[#062a54] md:text-base">
                {modalTitle}
              </p>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={"পণ্যের বিস্তারিত বন্ধ করুন"}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-[#dce3ec] bg-white text-[#062a54] shadow-sm transition hover:border-[#FC5689] hover:bg-[#fff4f6] hover:text-[#FC5689] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 md:size-10"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="product-details-modal-content min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <ProductDetailsView product={modalProduct} relatedProducts={[]} />
            </div>

            <style jsx global>{`
              /*
               * Product information panel-এর শেষ দুইটি
               * child হচ্ছে:
               * 1. Mobile/tablet Add to Cart
               * 2. Desktop Add to Cart এবং Order Now
               *
               * এটি শুধু modal-এর ভিতরে hide হবে।
               */
              .product-details-modal-content
                main
                > div:first-child
                > section:first-of-type
                > div:nth-child(2)
                > div:nth-last-child(-n + 2) {
                display: none !important;
              }

              /*
               * Mobile/tablet fixed Order Now bar hide করা হয়েছে।
               */
              .product-details-modal-content main > div.fixed {
                display: none !important;
              }

              /*
               * Fixed button remove করার পর থাকা
               * অতিরিক্ত bottom spacing কমানো হয়েছে।
               */
              .product-details-modal-content main {
                padding-bottom: 1.5rem !important;
              }

              @media (min-width: 768px) {
                .product-details-modal-content main {
                  padding-bottom: 2rem !important;
                }
              }
            `}</style>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
