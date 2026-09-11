const MAANIKO_WHATSAPP_NUMBER = "8801995322033";

export default function WhatsAppGuideBanner() {
  const whatsappUrl = `https://wa.me/${MAANIKO_WHATSAPP_NUMBER}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp-এ Maaniko-এর সঙ্গে কথা বলুন"
      title="WhatsApp-এ আমাদের সঙ্গে কথা বলুন"
      className="
        group
        fixed
        bottom-[88px]
        right-4
        z-[60]
        flex
        size-7
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_6px_24px_rgba(37,211,102,0.38)]
        transition-all
        duration-300
        hover:scale-110
        hover:bg-[#20bd5a]
        hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)]
        active:scale-95

        md:bottom-[92px]
        md:right-6
        md:size-[60px]

        xl:bottom-6
        xl:right-8
        xl:size-16
      "
    >
      {/* subtle pulse effect */}
      <span
        aria-hidden="true"
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-[#25D366]/30
          opacity-0
          transition
          group-hover:animate-ping
          group-hover:opacity-100
        "
      />

      {/* WhatsApp Logo */}
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
        className="size-5 md:size-9"
      >
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.93 7.93 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607ZM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592Zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.115.133-.232.148-.43.05-.197-.099-.836-.308-1.592-.985-.589-.525-.985-1.173-1.103-1.372-.115-.197-.012-.304.086-.403.09-.09.197-.232.296-.346.1-.116.133-.198.198-.33.065-.134.033-.248-.016-.347-.05-.099-.445-1.076-.612-1.47-.16-.387-.323-.334-.445-.34-.115-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.132 1.394 2.132 3.38 2.992.47.205.84.326 1.129.418.475.151.907.13 1.249.079.38-.058 1.171-.48 1.338-.943.164-.462.164-.86.114-.943-.049-.084-.182-.133-.38-.232Z" />
      </svg>
    </a>
  );
}
