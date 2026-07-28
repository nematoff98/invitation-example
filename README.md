# To'y taklifnomasi

Premium, mobil-birinchi, kinematik to'y taklifnoma sahifasi. Scroll bo'yicha
sahnalar joyida almashadi (GSAP), oltin-qora "sham nuri" estetikasi, to'yona
karta raqami (bir tegishda nusxalash), countdown va musiqa tugmasi.

## Ishga tushirish

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/ — deploy uchun tayyor statik fayllar
npm run preview   # build natijasini ko'rish
```

`dist/` papkasini istalgan statik hostingga (Netlify, Vercel, GitHub Pages,
oddiy hosting) yuklab, link orqali ulashish mumkin.

## Nima qayerda tahrirlanadi

Barcha matn **`index.html`** ichida — fayl boshidagi qo'llanma izohiga qarang:

| Nima | Qayerda |
|------|---------|
| Ismlar | `data-bride` / `data-groom` va sahnalardagi matn |
| Sana (countdown shu qiymatdan o'qiydi) | `<time datetime="2026-09-12T18:00:00+05:00">` |
| To'yxona nomi / manzil | "Manzil" sahnasi |
| Xarita havolasi | "Xaritada ochish" tugmasidagi `href` |
| Dastur | "Dastur" sahnasidagi ro'yxat |
| Karta raqami | "To'yona" sahnasidagi `.card__number` (`data-copy` ham yangilang) |
| Aloqa raqamlari | "Yakun" sahnasidagi telefonlar |
| Musiqa | `public/audio/nikoh.mp3` fayl qo'shing (`public/audio/README.txt`) |
| Rang / shrift | `src/style.css` yuqorisidagi `:root` tokenlar |

## Xususiyatlar

- **Mobil-birinchi**, sekin internetda tez ochilishga moslangan (yengil build,
  rasmlar lazy-load, shriftlar self-hosted va subset).
- **`prefers-reduced-motion`** — harakat kamaytirilsa, sahnalar oddiy oqim
  ko'rinishida, animatsiyasiz ko'rsatiladi.
- JavaScript ishlamasa ham matn to'liq o'qiladi (progressive enhancement).
