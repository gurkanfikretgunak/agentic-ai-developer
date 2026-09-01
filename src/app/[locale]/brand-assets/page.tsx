import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BrandAssetStudio,
  type BrandAssetsCopy,
} from "@/components/brand-assets/BrandAssetStudio";
import type { AcceptedPostcardData } from "@/components/brand-assets/AcceptedPostcardDocument";
import {
  LogoMeaningNote,
  type LogoMeaningCopy,
} from "@/components/brand-assets/LogoMeaningNote";
import type { WelcomeCohortData } from "@/components/brand-assets/WelcomeCohortDocument";
import { isLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const PAGE: Record<
  Locale,
  { kicker: string; title: string; subtitle: string; meaning: LogoMeaningCopy }
> = {
  en: {
    kicker: "Brand // Official Assets",
    title: "Brand Assets",
    subtitle:
      "Official MasterFabric Academy marks and on-demand announcement cards. Edit the template, preview live, then download a PNG — same workflow as the certificate generator.",
    meaning: {
      trigger: "What's the meaning of the MasterFabric logo?",
      title: "Meaning of the MasterFabric mark",
      paragraphs: [
        "The mark is formed where the Göktürk (Old Turkic) letters for M and F meet — the initials of MasterFabric, drawn as intersecting strokes rather than a decorative monogram.",
        "At that meeting point the geometry stands for the human at the center: will, resolve, and the discipline of military success — a focused axis rather than ornament.",
        "MasterFabric itself reads as craft taken seriously: from fabric to finished product, work refined with precise workmanship at every step.",
      ],
      attribution:
        "Quoted from MasterFabric founder Gürkan Fikret Günak — source of this brand interpretation.",
      close: "Close",
    },
  },
  tr: {
    kicker: "Marka // Resmi Varlıklar",
    title: "Marka Varlıkları",
    subtitle:
      "Resmi MasterFabric Academy logoları ve anlık duyuru kartları. Şablonu düzenleyin, canlı önizleyin, PNG indirin — sertifika üreticisiyle aynı akış.",
    meaning: {
      trigger: "MasterFabric logosunun anlamı nedir?",
      title: "MasterFabric işaretinin anlamı",
      paragraphs: [
        "İşaret, Göktürk alfabesindeki M ve F harflerinin bir araya gelmesiyle oluşur — MasterFabric’in baş harfleri; süs bir monogram değil, kesişen çizgilerle çizilmiş bir birleşim.",
        "O buluşma noktasında geometri insanı / merkeziyeti temsil eder: irade, kararlılık ve askeri başarı disiplini — süs değil, odaklı bir eksen.",
        "MasterFabric adı da okunduğu gibi gelir: kumaşından ürününe kadar hassas bir işçilikle işlenen noktayı ifade eder.",
      ],
      attribution:
        "MasterFabric kurucusu Gürkan Fikret Günak’tan alıntılanarak eklenmiştir — bu marka yorumunun kaynağı.",
      close: "Kapat",
    },
  },
};

const COPY: Record<Locale, BrandAssetsCopy> = {
  en: {
    kicker: PAGE.en.kicker,
    title: PAGE.en.title,
    subtitle: PAGE.en.subtitle,
    tabs: {
      logos: "Logos",
      accepted: "Accepted postcard",
      welcome: "Welcome cohort",
      github: "GitHub badge",
      wallpapers: "Wallpapers",
    },
    logos: {
      title: "Marks & badge",
      hint: "Use these assets on LinkedIn, GitHub, slides, and cohort announcements. Keep the monochrome treatment — white on black or black on white.",
      badgeTitle: "Academy badge",
      badgeHint: "Circular embroidered-patch mark used on certificates and the site header.",
      markTitle: "MasterFabric mark",
      markHint: "Parent brand geometric mark. Renders in currentColor — download the SVG for print or dark/light use.",
      downloadPng: "Download PNG",
      downloadSvg: "Download SVG",
      usage: {
        dontTitle: "Don'ts — wrong usage",
        dontHint:
          "These break the mark. Keep proportions, keep monochrome, keep clear space.",
        dontLabel: "Don't",
        warningBand: "Warning — incorrect brand usage. Do not reproduce these treatments.",
        dontItems: [
          {
            label: "Don't stretch",
            detail: "Never scale X and Y independently. Lock aspect ratio.",
          },
          {
            label: "Don't recolor",
            detail: "No gradients, brand rainbows, or off-palette fills.",
          },
          {
            label: "Don't rotate or glow",
            detail: "No tilt, drop shadows, or neon glow effects.",
          },
          {
            label: "Don't crop the badge",
            detail: "Show the full circular patch — never clip the ring.",
          },
        ],
        usageTitle: "How to place the Academy badge",
        usageHint:
          "Examples for a LinkedIn cover and a 1:1 social post. Badge stays circular, high contrast, with breathing room.",
        linkedinLabel: "LinkedIn cover",
        linkedinHint: "≈ 4:1 banner — badge on the right, wordmark / title on the left.",
        squareLabel: "1:1 post",
        squareHint: "Square feed post — badge centered above the headline.",
        squareKicker: "New drop",
        squareHeadline: "You're in · Cohort 1",
        squareSub: "academy.masterfabric.co",
        coverDownload: "Download cover",
        coverGenerating: "Generating…",
        coverFormats: {
          linkedin: "LinkedIn · 4:1",
          x: "X · 3:1",
          default: "Default · 16:9",
        },
        squareDownload: "Download",
        squareSizeLabel: "Size",
      },
    },
    github: {
      title: "GitHub README badge",
      hint: "Embed the Academy badge at the top of a repository README. Preview the layout, copy Markdown / HTML / iframe snippets, then place it above your title.",
      previewTitle: "Live preview",
      previewHint: "How the badge reads at the top of a README — centered, linked to the Academy.",
      snippetsTitle: "Resource code",
      markdownLabel: "Markdown (README)",
      htmlLabel: "HTML",
      iframeLabel: "iframe",
      iframeNote:
        "GitHub sanitizes iframes in README files — use the Markdown snippet there. iframe is for docs sites and external pages.",
      copy: "Copy",
      copied: "Copied",
      creditLabel: "Include subsidiary credit",
      creditLine: "academy.masterfabric.co is a ",
      creditBrand: "MasterFabric",
      creditSuffix: " subsidiary.",
      sizeLabel: "Size",
      styleLabel: "Badge style",
      styles: {
        patch: "Patch",
        mark: "Mark",
        pill: "Pill",
      },
      pillLeft: "MasterFabric",
      pillRight: "Academy",
      positionTitle: "How to position in README",
      positionSteps: [
        "Open README.md and start with a centered block at the very top — before the H1.",
        "Paste the Markdown snippet. Keep width around 100–140px so the circular badge stays sharp.",
        "Link the image to https://academy.masterfabric.co so the badge is clickable.",
        "Put shields / tech badges on the next line under the title — not beside the Academy badge.",
      ],
    },
    accepted: {
      title: "Accepted postcard",
      hint: "Generate a shareable acceptance announcement for a new trainee. Fill the fields, preview, download PNG.",
      fields: {
        kicker: "Kicker",
        headline: "Headline",
        name: "Recipient name",
        body: "Body line",
        program: "Program",
        cohortLabel: "Cohort label",
        dateLabel: "Date / cohort detail",
        siteUrl: "Site URL",
      },
      downloadPng: "Download PNG",
      generating: "Generating…",
    },
    welcome: {
      title: "Welcome cohort card",
      hint: "Announce a new cohort start. Edit copy, preview the card, then export a social-ready PNG.",
      fields: {
        kicker: "Kicker",
        cohortName: "Cohort name",
        program: "Program",
        tagline: "Tagline",
        startsLabel: "Starts label",
        startsValue: "Start date",
        capacityLine: "Capacity / note",
        siteUrl: "Site URL",
      },
      downloadPng: "Download PNG",
      generating: "Generating…",
    },
    wallpapers: {
      title: "Device wallpapers",
      hint: "Official AI Engineer HUD loyalty wallpaper — three-circle Venn, holographic pedestal, Academy seal. Preview in device frames, then download the native iOS or Android export.",
      platforms: {
        ios: "iOS",
        android: "Android",
      },
      specs: {
        ios: "iPhone · 1290 × 2796 · 9:19.5",
        android: "Android · 1440 × 3200 · 9:20",
      },
      downloadPng: "Download wallpaper PNG",
      previewLabel: "Device preview",
      analysisTitle: "Composition analysis",
      analysis: [
        "Vertical monochrome FUI on #050505 — centered symmetry, bloom on white strokes, soft vignette edges.",
        "Three-circle Venn: MACHINE LEARNING (top) · SOFTWARE ENGINEERING (bottom-left) · PRODUCT & DATA (bottom-right).",
        "Overlap labels: Model Deployment · Data Pipelines · System Architecture — core node reads AI ENGINEER.",
        "Corner HUD readouts (SYS.ARCH / CORE.SYSTEMS) plus base taglines Learn. Build. Scale. / Intelligence by Design.",
        "Holographic light column into a circular pedestal; MasterFabric Academy metallic seal locked at the bottom safe zone.",
        "Safe zones: Venn sits below Dynamic Island / punch-hole; Academy badge clears the home / gesture bar.",
      ],
      howTitle: "How to set it",
      howSteps: [
        "Download the PNG for your platform (iOS or Android).",
        "Open Photos / Gallery, select the image, then Set as Wallpaper.",
        "Prefer Lock Screen + Home Screen so the Academy seal stays above the dock.",
        "Do not stretch, recolor, or crop the Venn — keep the full HUD composition.",
      ],
    },
  },
  tr: {
    kicker: PAGE.tr.kicker,
    title: PAGE.tr.title,
    subtitle: PAGE.tr.subtitle,
    tabs: {
      logos: "Logolar",
      accepted: "Kabul kartı",
      welcome: "Kohort karşılama",
      github: "GitHub rozeti",
      wallpapers: "Duvar kağıtları",
    },
    logos: {
      title: "İşaretler & rozet",
      hint: "Bu varlıkları LinkedIn, GitHub, sunum ve kohort duyurularında kullanın. Monokrom kalın — siyah üzerinde beyaz veya beyaz üzerinde siyah.",
      badgeTitle: "Akademi rozeti",
      badgeHint: "Sertifikalarda ve site başlığında kullanılan dairesel yama işareti.",
      markTitle: "MasterFabric işareti",
      markHint: "Ana markanın geometrik işareti. currentColor ile boyanır — baskı veya açık/koyu kullanım için SVG indirin.",
      downloadPng: "PNG indir",
      downloadSvg: "SVG indir",
      usage: {
        dontTitle: "Yapmayın — yanlış kullanım",
        dontHint:
          "Bunlar işareti bozar. Oranı koruyun, monokrom kalın, boşluk bırakın.",
        dontLabel: "Yapma",
        warningBand: "Uyarı — hatalı marka kullanımı. Bu uygulamaları çoğaltmayın.",
        dontItems: [
          {
            label: "Germeyin",
            detail: "X ve Y’yi ayrı ölçeklemeyin. En-boy oranını kilitleyin.",
          },
          {
            label: "Renklendirmeyin",
            detail: "Gradyan, gökkuşağı veya palet dışı dolgu yok.",
          },
          {
            label: "Döndürmeyin / parlatmayın",
            detail: "Eğim, gölge veya neon glow efekti kullanmayın.",
          },
          {
            label: "Rozeti kırpmayın",
            detail: "Dairesel yamanın tamamını gösterin — halkayı kesmeyin.",
          },
        ],
        usageTitle: "Akademi rozeti nasıl yerleştirilir",
        usageHint:
          "LinkedIn kapak ve 1:1 sosyal gönderi örnekleri. Rozet dairesel, yüksek kontrastlı ve etrafında boşluklu kalır.",
        linkedinLabel: "LinkedIn kapak",
        linkedinHint: "≈ 4:1 banner — rozet sağda, başlık solda.",
        squareLabel: "1:1 gönderi",
        squareHint: "Kare akış gönderisi — rozet başlığın üstünde ortalanır.",
        squareKicker: "Yeni sezon",
        squareHeadline: "Geldiniz · Kohort 1",
        squareSub: "academy.masterfabric.co",
        coverDownload: "Kapak indir",
        coverGenerating: "Üretiliyor…",
        coverFormats: {
          linkedin: "LinkedIn · 4:1",
          x: "X · 3:1",
          default: "Varsayılan · 16:9",
        },
        squareDownload: "İndir",
        squareSizeLabel: "Boyut",
      },
    },
    github: {
      title: "GitHub README rozeti",
      hint: "Akademi rozetini bir depo README’sinin en üstüne yerleştirin. Düzeni önizleyin, Markdown / HTML / iframe kodunu kopyalayın, başlığın üstüne koyun.",
      previewTitle: "Canlı önizleme",
      previewHint: "Rozetin README üstünde nasıl göründüğü — ortalanmış, Akademi’ye bağlı.",
      snippetsTitle: "Kaynak kod",
      markdownLabel: "Markdown (README)",
      htmlLabel: "HTML",
      iframeLabel: "iframe",
      iframeNote:
        "GitHub README’de iframe’leri temizler — orada Markdown kullanın. iframe dokümantasyon siteleri ve harici sayfalar içindir.",
      copy: "Kopyala",
      copied: "Kopyalandı",
      creditLabel: "İştirak satırını ekle",
      creditLine: "academy.masterfabric.co bir ",
      creditBrand: "MasterFabric",
      creditSuffix: " iştirakidir.",
      sizeLabel: "Boyut",
      styleLabel: "Rozet stili",
      styles: {
        patch: "Yama",
        mark: "İşaret",
        pill: "Pill",
      },
      pillLeft: "MasterFabric",
      pillRight: "Academy",
      positionTitle: "README’de nasıl konumlanır",
      positionSteps: [
        "README.md’yi açın ve en üste, H1’den önce ortalanmış bir blok ekleyin.",
        "Markdown snippet’ini yapıştırın. Dairesel rozet net kalsın diye genişliği 100–140px tutun.",
        "Görseli https://academy.masterfabric.co adresine bağlayın — rozet tıklanabilir olsun.",
        "Shields / teknoloji rozetlerini başlığın altına koyun — Akademi rozetinin yanına değil.",
      ],
    },
    accepted: {
      title: "Kabul kartı",
      hint: "Yeni bir stajyer için paylaşılabilir kabul duyurusu üretin. Alanları doldurun, önizleyin, PNG indirin.",
      fields: {
        kicker: "Üst etiket",
        headline: "Başlık",
        name: "Alıcı adı",
        body: "Gövde metni",
        program: "Program",
        cohortLabel: "Kohort etiketi",
        dateLabel: "Tarih / kohort detayı",
        siteUrl: "Site URL",
      },
      downloadPng: "PNG indir",
      generating: "Üretiliyor…",
    },
    welcome: {
      title: "Kohort karşılama kartı",
      hint: "Yeni bir kohort başlangıcını duyurun. Metni düzenleyin, kartı önizleyin, sosyal medya için PNG dışa aktarın.",
      fields: {
        kicker: "Üst etiket",
        cohortName: "Kohort adı",
        program: "Program",
        tagline: "Slogan",
        startsLabel: "Başlangıç etiketi",
        startsValue: "Başlangıç tarihi",
        capacityLine: "Kapasite / not",
        siteUrl: "Site URL",
      },
      downloadPng: "PNG indir",
      generating: "Üretiliyor…",
    },
    wallpapers: {
      title: "Cihaz duvar kağıtları",
      hint: "Resmi AI Engineer HUD loyalty wallpaper — üç daireli Venn, holografik kaide, Akademi mührü. Cihaz çerçevesinde önizleyin, iOS veya Android native export’u indirin.",
      platforms: {
        ios: "iOS",
        android: "Android",
      },
      specs: {
        ios: "iPhone · 1290 × 2796 · 9:19.5",
        android: "Android · 1440 × 3200 · 9:20",
      },
      downloadPng: "Duvar kağıdı PNG indir",
      previewLabel: "Cihaz önizleme",
      analysisTitle: "Kompozisyon analizi",
      analysis: [
        "Dikey monokrom FUI, #050505 zemin — merkez simetri, beyaz stroke’larda bloom, kenarlarda soft vignette.",
        "Üç daireli Venn: MACHINE LEARNING (üst) · SOFTWARE ENGINEERING (sol alt) · PRODUCT & DATA (sağ alt).",
        "Kesişim etiketleri: Model Deployment · Data Pipelines · System Architecture — çekirdek düğüm: AI ENGINEER.",
        "Köşe HUD okumaları (SYS.ARCH / CORE.SYSTEMS) ve alt sloganlar: Learn. Build. Scale. / Intelligence by Design.",
        "Holografik ışık sütunu dairesel kaideye iner; MasterFabric Academy metalik mühür alt safe zone’da kilitlenir.",
        "Safe zone: Venn, Dynamic Island / punch-hole altında; Akademi rozeti home / gesture bar’ın üstünde kalır.",
      ],
      howTitle: "Nasıl ayarlanır",
      howSteps: [
        "Platformunuza göre PNG’yi indirin (iOS veya Android).",
        "Fotoğraflar / Galeri’de görseli seçip Duvar Kağıdı Olarak Ayarla’ya dokunun.",
        "Akademi mührü dock’un üstünde kalsın diye Kilit + Ana Ekran’ı tercih edin.",
        "Venn’i germeyin, renklendirmeyin veya kırpmayın — HUD kompozisyonunun tamamını koruyun.",
      ],
    },
  },
};

const DEFAULTS: Record<
  Locale,
  {
    accepted: AcceptedPostcardData;
    welcome: WelcomeCohortData;
  }
> = {
  en: {
    accepted: {
      kicker: "Accepted",
      headline: "You're in",
      name: "Ali Yurtsever",
      body: "has been accepted into",
      program: "Agentic AI Developer Training",
      cohortLabel: "Cohort 1",
      dateLabel: "July 1, 2026",
      siteUrl: "academy.masterfabric.co",
    },
    welcome: {
      kicker: "Welcome",
      cohortName: "Cohort 1",
      program: "Agentic AI Developer Training",
      tagline: "Build agents that ship. Twenty-five seats. One cohort.",
      startsLabel: "Starts",
      startsValue: "July 1, 2026",
      capacityLine: "25 seats",
      siteUrl: "academy.masterfabric.co",
    },
  },
  tr: {
    accepted: {
      kicker: "Kabul",
      headline: "Kabul edildiniz",
      name: "Ali Yurtsever",
      body: "şu programa kabul edildi:",
      program: "Agentic AI Developer Training",
      cohortLabel: "Kohort 1",
      dateLabel: "1 Temmuz 2026",
      siteUrl: "academy.masterfabric.co",
    },
    welcome: {
      kicker: "Hoş geldiniz",
      cohortName: "Kohort 1",
      program: "Agentic AI Developer Training",
      tagline: "Üreten ajanlar geliştirin. Yirmi beş koltuk. Bir kohort.",
      startsLabel: "Başlangıç",
      startsValue: "1 Temmuz 2026",
      capacityLine: "25 koltuk",
      siteUrl: "academy.masterfabric.co",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = PAGE[locale];
  return {
    title: page.title,
    description: page.subtitle,
    alternates: {
      canonical: `/${locale}/brand-assets`,
      languages: {
        en: "/en/brand-assets",
        tr: "/tr/brand-assets",
        "x-default": "/en/brand-assets",
      },
    },
  };
}

export default async function BrandAssetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const page = PAGE[locale];
  const copy = COPY[locale];
  const defaults = DEFAULTS[locale];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
        {page.kicker}
      </span>
      <h1
        className="mt-4 text-3xl font-bold text-white sm:text-4xl"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        {page.title}
      </h1>
      <LogoMeaningNote subtitle={page.subtitle} meaning={page.meaning} />

      <div className="mt-10">
        <BrandAssetStudio copy={copy} defaults={defaults} />
      </div>
    </div>
  );
}
