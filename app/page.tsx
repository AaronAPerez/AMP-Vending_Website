import HomePage from '@/components/landing/HomePage';
import HomeMetaTags from '@/components/seo/MetaTags';
import { PAGE_METADATA } from '@/lib/data/seoData';


export const metadata = PAGE_METADATA.HOME;

export default async function Home() {
  return (
    <>
      <HomeMetaTags meta={PAGE_METADATA.HOME} />
      <HomePage />
    </>
  );
}