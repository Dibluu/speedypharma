// ─── Product data types ──────────────────────────────────────────────────────
// This interface maps directly to what the future API will return.
// When the API is ready, swap the mock below for a fetch() call.

export interface ProductKeyInfo {
  label: string
  value: string
}

export interface ProductReview {
  author: string
  text: string
  date: string
}

export interface CrossSellProduct {
  slug: string
  name: string
  price: string
  img: string
}

export interface Product {
  slug: string
  name: string
  subtitle: string
  badge?: string
  price: string
  priceRaw: number
  unit: string
  stock: 'in_stock' | 'low_stock' | 'out_of_stock'
  images: string[]
  category: string
  categoryHref: string
  keyInfos: ProductKeyInfo[]
  pharmacistAdvice: string
  description: string
  notice: string
  composition: string
  rating: number
  reviewCount: number
  reviews: ProductReview[]
  crossSell: CrossSellProduct[]
}

// ─── Mock data (replace with API call when ready) ────────────────────────────

export const PRODUCTS_CATALOG: Record<string, Product> = {
  dafalgan: {
    slug: 'dafalgan',
    name: 'Dafalgan 1g',
    subtitle: 'Paracétamol 1000mg — 20 comprimés effervescents',
    badge: 'Essentiel',
    price: '€7,95',
    priceRaw: 7.95,
    unit: '20 comprimés',
    stock: 'in_stock',
    images: [
      '/assets/produits/dafalgan.jpg',
      '/assets/produits/dafalgan.jpg',
      '/assets/produits/dafalgan.jpg',
    ],
    category: 'Douleur',
    categoryHref: '/#problemes',
    keyInfos: [
      { label: 'Posologie', value: '1 comp. / 4-6h' },
      { label: 'Principe actif', value: 'Paracétamol 1g' },
      { label: 'Format', value: '20 comprimés' },
      { label: 'Délai d\'action', value: '~30 min' },
    ],
    pharmacistAdvice:
      'Le Dafalgan 1g, c\'est mon premier réflexe pour les douleurs légères à modérées. La dose de 1g est efficace pour un adulte, mais attention : ne dépassez pas 4g par jour et espacez les prises d\'au moins 4 heures. Si vous prenez déjà d\'autres médicaments, vérifiez qu\'ils ne contiennent pas déjà du paracétamol — c\'est l\'erreur la plus fréquente.',
    description:
      'Le Dafalgan 1g est un antalgique et antipyrétique à base de paracétamol, indiqué pour le traitement symptomatique des douleurs d\'intensité légère à modérée (maux de tête, douleurs dentaires, courbatures, règles douloureuses) et des états fébriles. Les comprimés effervescents permettent une absorption rapide et une action dès 30 minutes après la prise.',
    notice:
      'Ne pas utiliser en cas d\'allergie au paracétamol ou à l\'un des excipients. Ne pas dépasser 4 comprimés par jour. Respecter un intervalle d\'au moins 4 heures entre deux prises. Demandez conseil à votre pharmacien en cas de doute. Tenir hors de portée des enfants.',
    composition:
      'Paracétamol 1000 mg. Excipients : acide citrique anhydre, bicarbonate de sodium, carbonate de sodium anhydre, sorbitol, povidone, saccharine sodique, arôme citron.',
    rating: 4.8,
    reviewCount: 127,
    reviews: [
      {
        author: 'Marie L.',
        text: 'Efficace rapidement, je recommande. Action en moins de 30 minutes pour mes maux de tête.',
        date: 'il y a 3 jours',
      },
      {
        author: 'Thomas D.',
        text: 'Mon essentiel contre les migraines. Le format effervescent passe très bien.',
        date: 'il y a 1 semaine',
      },
      {
        author: 'Sophie M.',
        text: 'Livraison rapide, produit conforme. Je commande régulièrement.',
        date: 'il y a 2 semaines',
      },
    ],
    crossSell: [
      { slug: 'melatonine', name: 'Mélatonine 1mg', price: '€9,50', img: '/assets/produits/melatonine.jpg' },
      { slug: 'vitamine-c', name: 'Vitamine C 1000mg', price: '€6,90', img: '/assets/produits/vitamine-c.jpg' },
      { slug: 'strepsil', name: 'Strepsils Miel Citron', price: '€5,20', img: '/assets/produits/strepsil.jpg' },
    ],
  },
}
