import { Phone, MapPin, Settings, HeadphonesIcon } from "lucide-react";
import { GlareCard } from "./ui/aceternity/glare-card";
import { motion } from "framer-motion";

/**
 * ProcessSection Component
 * Displays the step-by-step process of implementing vending machines
 * Updated with enhanced styling and visual elements
 */
export function ProcessGlareCard() {
    // Define process steps with icons and descriptions
    const processSteps = [
        {
            number: 1,
            title: "Request a Consultation",
            description: "Schedule a quick call to discuss your workplace needs and machine options.",
            icon: <Phone size={24} />,
            color: "from-pink-500 to-orange-500"
        },
        {
            number: 2,
            title: "Site Assessment",
            description: "We'll visit your location to identify the optimal placement for your machines.",
            icon: <MapPin size={24} />,
            color: "from-orange-500 to-amber-500"
        },
        {
            number: 3,
            title: "Installation",
            description: "Our team handles the complete setup with zero disruption to your workplace.",
            icon: <Settings size={24} />,
            color: "from-amber-500 to-yellow-500"
        },
        {
            number: 4,
            title: "Ongoing Support",
            description: "We handle all maintenance and restocking automatically. You simply enjoy the convenience.",
            icon: <HeadphonesIcon size={24} />,
            color: "from-yellow-500 to-green-500"
        }
    ];

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
                    Simple Process
                </span>
                <h2
                    id="process-heading"
                    className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4"
                >
                    Getting Started <span className="text-[#FD5A1E]">Is Simple</span>
                </h2>
                <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
                    Our streamlined process gets your vending machines up and running with minimal effort.
                </p>
            </motion.div>
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {processSteps.map((step, index) => (
                    <GlareCard key={step.number} className="flex flex-col items-center justify-evenly">
                        <motion.div
                            key={step.number}
                            className="relative bg-[#111111] rounded-xl overflow-hidden border border-[#333333] shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                        >
                            {/* Step number with gradient background */}
                            <div className="relative h-40 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-80`}></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-5xl font-bold text-white">{step.number}</span>
                                </div>

                                {/* Icon circle overlapping the top and bottom sections */}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-[#111111] w-16 h-16 rounded-full border-4 border-[#111111] flex items-center justify-center shadow-lg">
                                        <div className={`bg-gradient-to-r ${step.color} w-full h-full rounded-full flex items-center justify-center text-white`}>
                                            {step.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content section */}
                            <div className="p-6 pt-8 text-center">
                                <h3 className="text-xl font-bold text-[#F5F5F5] mb-3">{step.title}</h3>
                                <p className="text-[#A5ACAF]">{step.description}</p>
                            </div>

                            {/* Connecting line between cards (visible on desktop only) */}
                            {index < processSteps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 right-0 w-8 h-0.5 bg-[#FD5A1E]/60 translate-x-full z-10"></div>
                            )}
                        </motion.div>
                    </GlareCard>
                ))}
            </div>
        </div>
    );
};
