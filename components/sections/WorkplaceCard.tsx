import React from 'react';
import Image from 'next/image';
import FeatureItem from './FeatureItem';
import { motion } from 'framer-motion';

interface WorkplaceCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    description: string;
    features: {
        icon: React.ReactNode;
        title: string;
        description: string;
    }[];
    highlighted?: boolean;
}

const WorkplaceCard = ({
    title,
    imageSrc,
    imageAlt,
    description,
    features,
    highlighted = false
}: WorkplaceCardProps) => {
    return (
        <motion.div
            className="grid grid-cols-1 gap-6 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
        >

            <div className={`rounded-xl overflow-hidden border ${highlighted ? 'border-[#FD5A1E]/30' : 'border-[#a4acac]'} h-full w-full`}>
                <div className={`p-5 ${highlighted ? 'bg-gradient-to-b from-[#4d4d4d]/40 to-[#000000]' : 'bg-[#000000]'}`}>
                    <h3 className={`text-xl font-bold mb-3 ${highlighted ? 'text-[#FD5A1E]' : 'text-[#F5F5F5]'}`}>
                        {title}
                    </h3>

                    <div className={`rounded-lg overflow-hidden mb-4 border ${highlighted ? 'border-[#FD5A1E]/30' : 'border-[#4d4d4d]'}`}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={100}
                            height={100}
                            quality={100}
                            className="object-cover w-100 h-80 mx-auto"
                            sizes="(max-width: 400px) 100vw, 50vw"
                        />
                    </div>

                    <p className="text-[#A5ACAF] mb-4">{description}</p>
                </div>

                <div className="p-5 bg-[#000000]/50">
                    <h4 className={`text-lg font-medium mb-3 ${highlighted ? 'text-[#FD5A1E]' : 'text-[#F5F5F5]'}`}>
                        Key Features
                    </h4>

                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <FeatureItem
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                highlighted={highlighted}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WorkplaceCard;