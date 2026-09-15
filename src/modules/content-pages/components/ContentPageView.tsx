import { FileText } from "lucide-react";
import type { ContentPage } from "@/shared/lib/api/catalog";

export default function ContentPageView({ page }: { page: ContentPage }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff8fb] to-white py-8 text-[#062a54] md:py-14">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <header className="rounded-[28px] border border-[#FC5689]/15 bg-white p-5 shadow-[0_18px_55px_rgba(6,42,84,.07)] md:p-9">
          <p className="text-xs font-black uppercase tracking-wider text-[#FC5689]">
            {page.eyebrow || "Maaniko"}
          </p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">{page.title}</h1>
          {page.summary ? (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              {page.summary}
            </p>
          ) : null}
        </header>

        <div className="mt-5 space-y-4 md:mt-7">
          {page.sections.map((section, index) => (
            <section key={section.id} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#FC5689]/10 text-[#FC5689]">
                  <FileText className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-slate-400">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-0.5 text-xl font-black md:text-2xl">{section.title}</h2>
                </div>
              </div>
              <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 md:text-[15px] md:leading-8">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
