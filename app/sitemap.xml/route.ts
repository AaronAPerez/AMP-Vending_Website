import { getAllVendingMachines } from "@/lib/data/vendingMachineData";

export async function GET() {
  const baseUrl = 'https://www.ampvendingmachines.com';
  const machines = getAllVendingMachines();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      ${machines.map(machine => `
        <url>
          <loc>${baseUrl}/vending-machines/${machine.id}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;
    
  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}