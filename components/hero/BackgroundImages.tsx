import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SEOOptimizedImage } from '@/lib/utils/SEOOptimizedImage';
import { Product } from '../landing/ProductSection';

// Product images with proper dimensions and SEO attributes
const productImages = [
    {
        src: '/images/products/lays.jpg',
        width: 179,
        height: 165,
        alt: 'Lays Classic chips',
        keywords: ['potato chips', 'snack vending']
    },
    {
        src: '/images/products/doritos.jpg',
        width: 179,
        height: 158,
        alt: 'Doritos chips',
        keywords: ['corn chips', 'office snacks']
    },
    {
        src: '/images/products/snickers.jpg',
        width: 179,
        height: 163,
        alt: 'Snickers chocolate bar',
        keywords: ['chocolate bar', 'candy vending']
    },
    {
        src: '/images/products/kitkat.jpg',
        width: 179,
        height: 269,
        alt: 'Kit Kat chocolate bar',
        keywords: ['chocolate wafer', 'sweet treats']
    },
    {
        src: '/images/products/coke.jpg',
        width: 179,
        height: 269,
        alt: 'Coca Cola beverage',
        keywords: ['soft drink', 'beverage vending']
    },
    {
        src: '/images/products/monster.jpg',
        width: 179,
        height: 208,
        alt: 'Monster energy drink',
        keywords: ['energy drink', 'workplace beverages']
    },
    {
        src: '/images/products/redbull.jpg',
        width: 179,
        height: 269,
        alt: 'Red Bull energy drink',
        keywords: ['energy drink', 'refreshment options']
    },
    {
        src: '/images/products/gatorade.jpg',
        width: 179,
        height: 269,
        alt: 'Gatorade sports drink',
        keywords: ['sports drink', 'hydration options']
    },
    {
        src: '/images/products/starburst.jpg',
        width: 179,
        height: 239,
        alt: 'Starburst fruit chews',
        keywords: ['fruit candy', 'chewy treats']
    },
    {
        src: '/images/beverages/justwater.jpg',
        width: 179,
        height: 269,
        alt: 'Just Water bottle',
        keywords: ['bottled water', 'hydration']
    },
    {
        src: '/images/products/cheetos.jpg',
        width: 179,
        height: 225,
        alt: 'Cheetos cheese puffs',
        keywords: ['cheese snacks', 'crunchy treats']
    },
    {
        src: '/images/products/mms.jpg',
        width: 179,
        height: 247,
        alt: 'M&Ms chocolate candies',
        keywords: ['chocolate candy', 'colorful treats']
    },
    {
        src: '/images/products/orangecrush.jpg',
        width: 179,
        height: 176,
        alt: 'Orange Crush soda',
        keywords: ['orange soda', 'citrus beverage']
    },
    {
        src: '/images/products/mountaindew.jpg',
        width: 179,
        height: 269,
        alt: 'Mountain Dew soda',
        keywords: ['citrus soda', 'energizing beverage']
    },
    {
        src: '/images/products/threemusketeers.jpg',
        width: 179,
        height: 163,
        alt: '3 Musketeers chocolate bar',
        keywords: ['chocolate nougat', 'candy bar']
    },
    {
        src: '/images/products/fanta.jpg',
        width: 179,
        height: 269,
        alt: 'Fanta orange soda',
        keywords: ['orange drink', 'fruit flavored soda']
    },
    {
        src: '/images/products/skittles.jpg',
        width: 179,
        height: 200,
        alt: 'Skittles fruit candy',
        keywords: ['fruit candy', 'rainbow treats']
    },
    {
        src: '/images/beverages/drpepper.jpg',
        width: 179,
        height: 269,
        alt: 'Dr Pepper soda',
        keywords: ['unique flavor soda', 'classic beverage']
    },
    {
        src: '/images/products/poptarts.jpg',
        width: 179,
        height: 200,
        alt: 'Pop-Tarts pastries',
        keywords: ['breakfast pastry', 'toaster treats']
    },
    {
        src: '/images/products/layssourcream.jpg',
        width: 179,
        height: 165,
        alt: 'Lays Sour Cream & Onion chips',
        keywords: ['flavored chips', 'savory snacks']
    },
];

export const BackgroundImages = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Only start loading after component mounts (after LCP)
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isLoaded) {
        return (
            <div className="absolute inset-0 bg-black z-10" aria-hidden="true" />
        );
    }

    return (
        <>
            <div
                className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 z-10"
                aria-hidden="true"
            >
                {productImages.map((src, index) => {
                    const offset = Math.min(scrollY * 0.1 * (index % 6 + 1) * 0.2, 100);
                    const opacity = Math.max(0.3, 1 - (scrollY * 0.001));

                    return (
                        <div
                            key={index}
                            className="relative rounded-lg overflow-hidden w-full h-50"
                            style={{
                                transform: `translateY(${offset}px)`,
                                opacity
                            }}
                        >
                            <SEOOptimizedImage
                                src={src}
                                alt=""
                                isAboveFold={true} // Hero images are above the fold
                                className="object-cover"
                                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
                        </div>
                    );
                })}
            </div>
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black z-10"
                aria-hidden="true"
            >
            </div>

        </>
    );
};

export default BackgroundImages;