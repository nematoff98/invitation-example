# Product

## Register

brand

## Users

Bitta to'y taklifnomasini link orqali oladigan mehmonlar. Ular deyarli har doim **telefonda**, ko'pincha sekin yoki cheklangan mobil internetda ochadi. Yosh oralig'i keng: yaqin do'stlardan tortib keksa qarindoshlargacha — ya'ni katta, o'qiladigan matn va oddiy, aniq harakatlar zarur.

Ikkinchi darajali foydalanuvchi — taklifnomani buyurtma qilgan kelin-kuyov (yoki oila). Ular sahifa nafis, "shablon emas" va o'zlarining tadbiriga mos bo'lishini xohlaydi.

**Job to be done:** mehmon sahifani ochadi, tadbir tafsilotlarini (sana, joy, vaqt) tez tushunadi, hissiy taassurot oladi va kerak bo'lsa to'yona uchun karta raqamini oson ko'chirib oladi.

## Product Purpose

Yagona, ulashiladigan **to'y taklifnoma sahifasi**. Bu yerda dizaynning o'zi mahsulot: mehmonning birinchi taassuroti — yasalayotgan narsa. Muvaffaqiyat — mehmon sahifani "chiroyli va esda qolarli" deb his qilishi, tadbir ma'lumotini adashmasdan olishi va texnik to'siqlarsiz (tez ochiladi, telefonda mukammal, musiqa bezovta qilmaydi) tugatishi.

Asosiy funksional elementlar:
- Tadbir tafsilotlari (kim, qachon, qayerda, dastur).
- To'yona uchun **karta raqami** — bir tegishda nusxa olinadi.
- Yoqimli fon **musiqasi** — default o'chiq, foydalanuvchi yoqadi.
- Scroll bo'yicha **joyida almashadigan** (pinned / bo'lim-bo'lim) kinematik o'tishlar.

## Brand Personality

Nafis · samimiy · zamonaviy. Ovoz — sokin va hurmatli, ko'z-ko'z qilmaydigan hashamat. Kayfiyat premium, lekin iliq: sovuq korporativ emas, band bayramona ham emas. Mehmon o'zini alohida taklif qilingandek his qilishi kerak.

Vizual yo'nalish (tasdiqlashga ochiq): kinematik, fotosuratga tayangan kompozitsiya + nafis tipografika. Rasm va tipografika hissiyotni ko'taradi; harakat esa hikoyani ochib beradi, chalg'itmaydi.

## Anti-references

- **Arzon tayyor shablon** taklifnomalar — umumiy, "har kim ishlatgan" ko'rinish.
- **Qalashgan bezak** — haddan tashqari gulli, band, o'qishga qiyin.
- **Eskirgan klipart / 2010-gradientlar / WordArt** hissi.
- **Sovuq korporativ** — his-tuyg'usiz, texnik biznes ko'rinishi.
- Og'ir, sekin yuklanadigan sahifa — sekin internetda mehmonni yo'qotadigan.

## Design Principles

1. **Telefon — birinchi va asosiy.** Har bir qaror mobil ekrandan boshlanadi; desktop keyin. Yengil va tez (sekin internetda ~2s ichida ochiladi) — bu did masalasi, texnik tafsilot emas.
2. **Dizayn mahsulotning o'zi.** Taklifnoma taassurot qoldirishi kerak; "shablondek" ko'ringan zahoti muvaffaqiyatsiz. Har bir bo'lim atayin, o'ziga tortadigan bo'lsin.
3. **His-tuyg'u texnikadan ustun.** Animatsiya va effektlar hissiyotga xizmat qiladi, o'zini ko'rsatish uchun emas. Kinematik o'tish tadbir hikoyasini ochsin.
4. **Harakat maqsadli va hurmatli.** Joyida almashadigan (pinned) o'tishlar niyat bilan; hech qachon o'qishga yoki ma'lumotga to'sqinlik qilmasin. `prefers-reduced-motion` majburiy — muqobil sifatida sodda crossfade.
5. **Mehmonga hurmat.** Musiqa avtomatik yonmaydi (foydalanuvchi yoqadi). Matn katta, kontrastli, keksa qarindoshlar ham o'qiy oladigan. Karta raqami — ishonchli va bir tegishda nusxalanadigan.

## Accessibility & Inclusion

- **Kontrast:** matn WCAG AA — asosiy matn fon bilan ≥4.5:1, katta/qalin matn ≥3:1. "Nafislik uchun" och-kulrang matndan qochish.
- **Reduced motion:** `prefers-reduced-motion: reduce` bo'lganda barcha kinematik/pinned harakatlar sodda crossfade yoki bir zumda o'tishga almashadi.
- **Musiqa:** hech qachon avtomatik yonmaydi; aniq boshqaruv tugmasi (yoq/o'chir), holati ko'rinadigan.
- **Tap-targetlar:** kamida 44×44px — keksa qo'llar va kichik ekranlar uchun.
- **O'qilishi:** yetarli matn o'lchami va qatorlar orasi; til — o'zbekcha (lotin), maxsus harflar (o', g', sh, ch) to'g'ri ko'rsatilishi.
- **Yengillik = inklyuziya:** sekin/qimmat internetli mehmonlar ham to'siqsiz ochishi uchun sahifa yengil bo'lsin.
