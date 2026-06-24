import { WooNavbar } from '@/components/layout/navbar/woo-navbar';
import SeasonalBanner from '@/components/custom/SeasonalBanner';
import FooterCustom from '@/components/custom/FooterCustom';
import FeaturedProducts from '@/components/custom/FeaturedProducts';
import { getProducts, getCollections } from '@/lib/woocommerce';

// Helper: limpia el HTML que WooCommerce devuelve en price/regularPrice
function cleanHtmlPrice(raw: string | null | undefined): string {
  if (!raw) return '';
  return raw
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
}

export const revalidate = 300; // 5 minutos

export default async function HomePage() {
  // Traer productos destacados desde WooCommerce
  let featured: {
    id: string;
    name: string;
    slug: string;
    price: string;
    category: string;
    categorySlug: string;
    imageSrc: string;
    description: string;
  }[] = [];

  try {
    const products = await getProducts({});
    featured = products.map((p: any) => ({
      id: p.id,
      name: p.title || p.name,
      slug: p.handle || p.slug,
      price: cleanHtmlPrice(p.priceRange?.minVariantPrice?.amount ?? p.price) || 'Consultar precio',
      category: p.collections?.[0]?.title || p.productType || 'General',
      categorySlug: p.collections?.[0]?.handle || '',
      imageSrc: p.featuredImage?.url || p.images?.[0]?.url || '/placeholder.png',
      description: p.description || '',
    }));
  } catch (err) {
    console.error('Error fetching featured products for home:', err);
  }

  // Traer categorías para mostrar en el panel derecho del FeaturedProducts
  let featuredCategories: { name: string; slug: string }[] = [];
  try {
    const collections = await getCollections();
    featuredCategories = collections
      .filter((c: any) => c.handle && c.handle !== 'uncategorized' && c.handle !== 'all')
      .slice(0, 6)
      .map((c: any) => ({
        name: c.title || c.name || c.handle,
        slug: c.handle,
      }));
  } catch (err) {
    console.error('Error fetching collections for home:', err);
  }

  return (
    <>
      <WooNavbar />
      <main id="main-content" className="min-h-screen bg-gray-50 pt-24">
        <SeasonalBanner />
        {featured.length > 0 && (
          <FeaturedProducts
            products={featured}
            categories={featuredCategories}
            title="Productos Destacados"
          />
        )}
      </main>
      <FooterCustom />
    </>
  );
}
