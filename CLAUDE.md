# Design Context

Strategik kontekst: `PRODUCT.md` (register: brand — bitta premium to'y taklifnoma sahifasi).

## Texnik chegaralar

- Mobil birinchi; sekin internetda ~2s ichida ochilishi ustuvor — yengil qolsin.
- Animatsiya kutubxonasi RUXSAT (GSAP + ScrollTrigger). Scroll bo'yicha joyida almashadigan (pinned) o'tishlar shu bilan.
- Kerakli paketlarni o'rnatish RUXSAT (foydalanuvchi tasdiqlagan). Yengillik uchun paket tanlash o'ylab qilinsin.
- Iloji boricha transform/opacity bilan animatsiya (layout property'larni animatsiya qilmaslik) — silliqlik uchun.
- `prefers-reduced-motion` majburiy — muqobil crossfade/oniy o'tish.
- Fon musiqasi: default O'CHIQ, foydalanuvchi tugma orqali yoqadi (avtomatik yonmaydi).
- To'yona uchun karta raqami — bir tegishda nusxalanadigan.
- Framework/UI kutubxona shart emas; oddiy HTML/CSS + maqsadli JS afzal.
