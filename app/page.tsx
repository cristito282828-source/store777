import { WooNavbar } from '@/components/layout/navbar/woo-navbar';
import SeasonalBanner from '@/components/custom/SeasonalBanner';
import FooterCustom from '@/components/custom/FooterCustom';

export const metadata = {
  title: 'Lorem Ipsum Store',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  keywords: 'lorem, ipsum, dolor, sit amet, consectetur, adipiscing elit',
};

export default function HomePage() {
  return (
    <>
      <WooNavbar />
      <main id="main-content" className="min-h-screen bg-gray-50 pt-24">
        <SeasonalBanner />
      </main>
      <FooterCustom />
    </>
  );
}
