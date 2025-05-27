import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { 
  CreditCardIcon, 
  ShoppingBagIcon, 
  ZapIcon, 
  MonitorIcon, 
  WifiIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  UsersIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  SparklesIcon
} from 'lucide-react';
import Link from 'next/link';

/**
 * SpotlightMachineCard Component
 * Interactive machine showcase with hover effects
 */
const SpotlightMachineCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative h-160 w-full rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with vending machine interior */}
      <Image
        src="/images/machines/machine-snacks.jpg"
        alt=""
        fill
        className="object-cover transition-transform duration-700 ease-out"
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        aria-hidden="true"
      />
      
      {/* Dynamic overlay */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          isHovered 
            ? 'bg-gradient-radial from-transparent via-[#000000]/30 to-[#000000]/80' 
            : 'bg-gradient-to-t from-[#000000]/90 to-[#000000]/40'
        }`} 
      />
      
      {/* Spotlight machine card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -10 : 0
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className={`relative transition-all duration-500 ${
          isHovered ? 'bg-[#000000]/50' : 'bg-[#000000]/80'
        } backdrop-blur-sm border-2 border-[#FD5A1E]/50 rounded-2xl shadow-2xl`}>
          
          {/* Machine image with glow effect */}
          <div className="relative aspect-[4/3] h-68 sm:h-80 md:h-70 rounded-xl overflow-hidden">
            <Image
              src="/images/machines/vending-machines-bg.png"
              alt="Premium vending machine showcase"
              fill
              className="object-cover"
            />
            
            {/* Animated glow */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#FD5A1E]/30 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FD5A1E] animate-pulse" />
            </div>
            
            {/* Tech indicators */}
            <div className="absolute bottom-2 left-2 right-2 flex justify-between">
              <span className="bg-[#FD5A1E] text-[#000000] px-2 py-1 rounded text-xs font-bold">
                Interactive
              </span>
              <span className="bg-[#000000]/90 text-[#FD5A1E] px-2 py-1 rounded text-xs font-bold">
                Smart Tech
              </span>
            </div>
          </div>
          
          {/* Hover content */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              height: isHovered ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <h3 className="text-lg font-bold text-[#F5F5F5] text-center mb-2">
              21.5&quot; Touchscreen Technology
            </h3>
            <div className="flex justify-center space-x-2">
              <div className="w-6 h-6 bg-[#FD5A1E]/20 rounded-full flex items-center justify-center">
                <MonitorIcon size={12} className="text-[#FD5A1E]" />
              </div>
              <div className="w-6 h-6 bg-[#FD5A1E]/20 rounded-full flex items-center justify-center">
                <CreditCardIcon size={12} className="text-[#FD5A1E]" />
              </div>
              <div className="w-6 h-6 bg-[#FD5A1E]/20 rounded-full flex items-center justify-center">
                <WifiIcon size={12} className="text-[#FD5A1E]" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Props for WorkplaceTransformSection component
 */
interface WorkplaceTransformSectionProps {
  /**
   * Whether to render the section heading inside this component
   * @default true
   */
  renderHeading?: boolean;

  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * PremiumFeature Component
 * Highlights individual premium features with visual emphasis
 */
interface PremiumFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  delay?: number;
}

const PremiumFeature = ({ icon, title, description, highlight, delay = 0 }: PremiumFeatureProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-[#FD5A1E]/5 transition-all group"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-[#FD5A1E]/10 rounded-full flex items-center justify-center group-hover:bg-[#FD5A1E]/20 transition-all">
        <div className="text-[#FD5A1E] text-xl">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-[#F5F5F5] font-bold text-lg mb-1">{title}</h4>
        <p className="text-[#A5ACAF] text-sm mb-2">{description}</p>
        <span className="text-[#FD5A1E] text-sm font-semibold">{highlight}</span>
      </div>
    </motion.div>
  );
};

/**
 * UpgradeMetric Component
 * Displays quantifiable benefits of the upgrade
 */
interface UpgradeMetricProps {
  metric: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

const UpgradeMetric = ({ metric, label, icon, delay = 0 }: UpgradeMetricProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center p-6 bg-[#111111] rounded-xl border border-[#333333] hover:border-[#FD5A1E] transition-all group"
    >
      <div className="text-[#FD5A1E] text-3xl mb-3 flex justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-[#FD5A1E] mb-2">{metric}</div>
      <div className="text-[#A5ACAF] text-sm">{label}</div>
    </motion.div>
  );
};

/**
 * WorkplaceTransformSection Component
 * Showcases the premium upgrade benefits with creative vending machine interior background
 */
const WorkplaceTransformSection = ({ 
  renderHeading = true, 
  className = "" 
}: WorkplaceTransformSectionProps) => {
  // State for responsive behavior
  const [, setIsMobileView] = useState(false);

  // Effect to handle responsive behavior
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Section Header - Only rendered if renderHeading is true */}
      {/* Section Header - Only rendered if renderHeading is true */}
      {renderHeading && (
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4 sm:mb-6">
            <SparklesIcon size={16} className="mr-2" />
            Advanced Workplace Solutions
          </span>
          <h2 
            id="transform-heading" 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-4 sm:mb-6 leading-tight"
          >
            Transform Your Workplace with{' '}
            <span className="text-[#FD5A1E]">Latest Technology</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-[#A5ACAF] max-w-4xl mx-auto leading-relaxed">
            Discover how our advanced vending solutions enhance employee satisfaction and workplace convenience.
          </p>
        </motion.div>
      )}

      {/* Main Showcase with Creative Background Implementation */}
      <motion.div
        className="mb-16 sm:mb-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative rounded-2xl overflow-hidden border border-[#FD5A1E]/30 bg-[#111111] shadow-2xl">
          {/* Creative Vending Machine Interior Background - subtle overlay */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/95 via-[#000000]/80 to-[#000000]/95" />
          </div>

          {/* Premium Header */}
          <div className="relative z-10 p-6 sm:p-8 border-b border-[#FD5A1E]/30 bg-gradient-to-r from-[#FD5A1E]/10 to-transparent backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F5F5] mb-2">
                  The AMP Technology Advantage
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-[#A5ACAF]">
                  Experience the difference advanced technology makes
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-[#FD5A1E] text-[#000000] px-4 py-2 rounded-full text-xs font-bold flex items-center">
                  <CheckCircleIcon size={14} className="mr-1" />
                  Latest Tech
                </div>
                <div className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center">
                  <CheckCircleIcon size={14} className="mr-1" />
                  Full Service
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Enhanced Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Interactive Machine Showcase using SpotlightMachineCard */}
            <div className="relative p-6 sm:p-8 bg-[#000000]/80 backdrop-blur-sm">
              <div className="space-y-6">
                {/* Enhanced Machine Display with Spotlight Effect */}
                <div className="relative">
                  <SpotlightMachineCard />
                  
                  {/* Additional Context Below Machine */}
                  <div className="mt-6 text-center">
                    <h4 className="text-lg font-bold text-[#F5F5F5] mb-2">
                      Interactive Workplace Solution
                    </h4>
                    <p className="text-sm text-[#A5ACAF] leading-relaxed">
                      Experience the future of workplace convenience with our advanced vending technology
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="flex justify-center space-x-6 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#FD5A1E]">21.5&quot;</div>
                        <div className="text-xs text-[#A5ACAF]">HD Display</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#FD5A1E]">50+</div>
                        <div className="text-xs text-[#A5ACAF]">Products</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#FD5A1E]">24/7</div>
                        <div className="text-xs text-[#A5ACAF]">Support</div>
                      </div>
                    </div>
                  </div>

                  {/* Loading State - Remove this section as it's now handled in SpotlightMachineCard */}
                </div>
              </div>
            </div>

            {/* Enhanced Features List */}
            <div className="p-6 sm:p-8 bg-[#0a0a0a]/90 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-[#F5F5F5] mb-6 flex items-center">
                <StarIcon size={20} className="text-[#FD5A1E] mr-2" />
                Advanced Technology Benefits
              </h4>

              <div className="space-y-4">
                <PremiumFeature
                  icon={<MonitorIcon size={20} />}
                  title="Interactive Touchscreen Experience"
                  description="21.5&quot; HD display with intuitive navigation and detailed product information"
                  highlight="Enhanced user engagement"
                  delay={0.1}
                />

                <PremiumFeature
                  icon={<CreditCardIcon size={20} />}
                  title="Universal Payment Acceptance"
                  description="Credit cards, mobile payments, Apple Pay, Google Pay, and cash options"
                  highlight="Maximum convenience for all users"
                  delay={0.2}
                />

                <PremiumFeature
                  icon={<ShoppingBagIcon size={20} />}
                  title="Customized Product Selection"
                  description="50+ snack and beverage options tailored to your workplace preferences"
                  highlight="Personalized to your team"
                  delay={0.3}
                />

                <PremiumFeature
                  icon={<WifiIcon size={20} />}
                  title="Smart Inventory Management"
                  description="Real-time monitoring ensures products are always available when needed"
                  highlight="Never run out of favorites"
                  delay={0.4}
                />

                <PremiumFeature
                  icon={<ZapIcon size={20} />}
                  title="Professional Implementation"
                  description="Complete installation, setup, and ongoing maintenance service included"
                  highlight="Hassle-free operation"
                  delay={0.5}
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </motion.div>
      </motion.div>

      {/* Workplace Impact Metrics */}
      {/* Workplace Impact Metrics */}
      <motion.div
        className="mb-16 sm:mb-20"
        className="mb-16 sm:mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4">
            Measurable Workplace Improvements
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4">
            Measurable Workplace Improvements
          </h3>
          <p className="text-[#A5ACAF] max-w-2xl mx-auto">
            See the quantifiable benefits our clients experience with advanced vending technology
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <UpgradeMetric
            metric="95%"
            label="Employee Satisfaction Increase"
            icon={<UsersIcon />}
            delay={0.1}
          />
          <UpgradeMetric
            metric="60%"
            label="Reduced Break Time Waste"
            icon={<ClockIcon />}
            delay={0.2}
          />
          <UpgradeMetric
            metric="80%"
            label="Preference for On-Site Options"
            icon={<TrendingUpIcon />}
            delay={0.3}
          />
          <UpgradeMetric
            metric="24/7"
            label="Service & Support"
            icon={<ZapIcon />}
            delay={0.4}
          />
        </div>
      </motion.div>

      {/* Enhanced Value Proposition with Background Effect */}
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-[#FD5A1E]/30 mb-16 sm:mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {/* Subtle product background overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FD5A1E]/20 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-[#FD5A1E]/10 to-transparent backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4">
                Why Choose AMP Vending?
              </h3>
              <p className="text-[#A5ACAF] mb-6 leading-relaxed">
                Unlike traditional vending solutions, AMP Vending provides cutting-edge technology 
                with comprehensive service packages designed to enhance your workplace experience.
              </p>
              
              <div className="space-y-3">
                {[
                  "Professional installation and setup",
                  "Complete maintenance and service included",
                  "Latest payment technology and touchscreen interface",
                  "Customizable product selection for your team",
                  "24/7 monitoring and support",
                  "Immediate workplace value enhancement"
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                    className="flex items-center text-[#F5F5F5]"
                  >
                    <CheckCircleIcon size={16} className="text-[#FD5A1E] mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="inline-block p-8 bg-[#000000]/70 rounded-xl border border-[#FD5A1E]/20 backdrop-blur-sm">
                <div className="text-4xl sm:text-5xl font-bold text-[#FD5A1E] mb-2 flex items-center justify-center">
                  <ClockIcon size={40} className="mr-2" />
                  24/7
                </div>
                <div className="text-[#F5F5F5] font-semibold mb-1">Service Support</div>
                <div className="text-[#A5ACAF] text-sm">Complete maintenance included</div>
                
                <div className="mt-6 pt-6 border-t border-[#FD5A1E]/20">
                  <div className="text-2xl font-bold text-[#F5F5F5] mb-1 flex items-center justify-center">
                    <ShoppingBagIcon size={24} className="mr-2 text-[#FD5A1E]" />
                    50+
                  </div>
                  <div className="text-[#A5ACAF] text-sm">Product options available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Call to Action */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FD5A1E]/20 to-transparent backdrop-blur-sm" />
          <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border border-[#FD5A1E]/30 rounded-2xl bg-[#000000]/50">
            <SparklesIcon size={32} className="text-[#FD5A1E] mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F5F5] mb-4">
              Ready to Experience Advanced Vending Technology?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#A5ACAF] mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your workplace today with state-of-the-art vending technology. 
              Enhanced employee satisfaction starts with a simple consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <Link
                href="/contact"
                className="group px-8 py-4 bg-[#FD5A1E] text-[#000000] rounded-full font-medium shadow-lg hover:bg-[#FD5A1E]/90 transition-all flex items-center justify-center"
                aria-label="Schedule your workplace vending consultation"
              >
                Start Your Upgrade Today
                <ArrowRightIcon size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/vending-machines"
                className="px-8 py-4 bg-transparent text-[#F5F5F5] border border-[#A5ACAF] rounded-full font-medium hover:bg-[#4d4d4d] hover:border-[#FD5A1E] transition-all flex items-center justify-center"
                aria-label="View our complete vending machine collection"
              >
                View All Machines
                <ArrowRightIcon size={16} className="ml-2" />
                View All Machines
                <ArrowRightIcon size={16} className="ml-2" />
              </Link>
            </div>
            </div>
          </div>
        </div>
      </motion.div>
      </motion.div>
    </div>
  );
};

export default WorkplaceTransformSection;