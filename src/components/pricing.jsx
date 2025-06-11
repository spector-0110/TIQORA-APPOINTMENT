import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, Users, Check, Crown, Star, Zap } from "lucide-react";
import { useState, useCallback, useEffect, useMemo, memo } from "react";

// Pricing configuration
const PRICING = {
  BASE_PRICE_PER_DOCTOR: 4999.99,
  YEARLY_DISCOUNT_PERCENTAGE: 20,
  VOLUME_DISCOUNTS: [
    { minDoctors: 10, discount: 10 },
    { minDoctors: 20, discount: 15 },
    { minDoctors: 50, discount: 20 },
  ]
};

const LIMITS = {
  MIN_DOCTORS: 1,
  MAX_DOCTORS: 50
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Add custom CSS styles for the slider
const sliderStyles = `
  .slider {
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    opacity: 0.9;
    transition: opacity 0.2s;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    cursor: pointer;
    border: 3px solid #1e293b;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    transition: all 0.2s ease;
  }

  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
  }

  .slider::-moz-range-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    cursor: pointer;
    border: 3px solid #1e293b;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    transition: all 0.2s ease;
  }

  .slider::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
  }
`;

export default function Pricing() {
  const [doctorCount, setDoctorCount] = useState(2);
  const [isYearly, setIsYearly] = useState(false);

  // Inject custom styles for the slider
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = sliderStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Calculate pricing based on doctor count and billing cycle
  const calculatePricing = useCallback(() => {
    const basePrice = PRICING.BASE_PRICE_PER_DOCTOR * doctorCount;
    
    // Apply volume discount
    let volumeDiscount = 0;
    for (const tier of PRICING.VOLUME_DISCOUNTS) {
      if (doctorCount >= tier.minDoctors) {
        volumeDiscount = tier.discount;
      }
    }
    
    // Calculate monthly price with volume discount
    const monthlyPrice = basePrice * (1 - volumeDiscount / 100);
    
    // Apply yearly discount if selected
    const finalPrice = isYearly ? monthlyPrice * (1 - PRICING.YEARLY_DISCOUNT_PERCENTAGE / 100) : monthlyPrice;
    
    return {
      monthlyPrice: monthlyPrice,
      yearlyPrice: finalPrice,
      volumeDiscount,
      yearlyDiscount: isYearly ? PRICING.YEARLY_DISCOUNT_PERCENTAGE : 0,
      totalSavings: isYearly ? (monthlyPrice * 12) - (finalPrice * 12) : 0,
      pricePerDoctor: finalPrice / doctorCount
    };
  }, [doctorCount, isYearly]);

  const pricing = calculatePricing();

  const handleDoctorCountChange = (value) => {
    const count = Math.max(LIMITS.MIN_DOCTORS, Math.min(LIMITS.MAX_DOCTORS, parseInt(value) || LIMITS.MIN_DOCTORS));
    setDoctorCount(count);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Feature tiers based on doctor count
  const getFeatureTier = (count) => {
    if (count >= 10) return 'enterprise';
    if (count >= 2) return 'professional';
    if (count >= 1) return 'standard';
    return 'basic';
  };

  const features = {
    basic: [
      "Patient Appointment Booking",
      "Queue Management System",
      "Basic Admin Dashboard",
      "WhatsApp & SMS Alerts",
      "Email Notifications",
      "Basic Analytics",
      "24/7 Email Support"
    ],
    standard: [
      "All Basic Features",
      "WhatsApp & SMS Alerts",
      "Custom Branding",
      "Advanced Analytics",
      "Role-based Access Control",
      "Priority Email Support"
    ],
    professional: [
      "All Standard Features",
      "Custom Subdomain",
      "API Access",
      "Advanced Reporting",
      "Multi-location Support",
      "Phone Support"
    ],
    enterprise: [
      "All Professional Features",
      "White-label Solution",
      "Custom Integrations",
      "Dedicated Account Manager",
      "SLA Guarantee",
      "24/7 Priority Support"
    ]
  };

  const currentTier = getFeatureTier(doctorCount);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className=" bg-gradient-to-b from-neutral-900 via-gray-800 to-neutral-900 shadow-xl"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pricing That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Scales</span> With You
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pay only for what you use. Our pricing grows with your practice, offering better value as you expand.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Pricing Calculator */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  Pricing Calculator
                </CardTitle>
                <p className="text-gray-400">
                  Calculate your custom pricing based on your practice size
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Doctor Count Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white text-lg font-medium flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-400" />
                      Number of Doctors
                    </Label>
                    <div className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                      <span className="text-blue-300 font-semibold text-lg">{doctorCount}</span>
                    </div>
                  </div>
                  
                  <div className="relative px-2">
                    {/* Custom Slider */}
                    <div className="relative">
                      <input
                        type="range"
                        min={LIMITS.MIN_DOCTORS}
                        max={LIMITS.MAX_DOCTORS}
                        value={doctorCount}
                        onChange={(e) => setDoctorCount(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((doctorCount - LIMITS.MIN_DOCTORS) / (LIMITS.MAX_DOCTORS - LIMITS.MIN_DOCTORS)) * 100}%, #374151 ${((doctorCount - LIMITS.MIN_DOCTORS) / (LIMITS.MAX_DOCTORS - LIMITS.MIN_DOCTORS)) * 100}%, #374151 100%)`
                        }}
                      />
                      
                      {/* Volume Discount Markers */}
                      {PRICING.VOLUME_DISCOUNTS.map((tier, index) => {
                        const position = ((tier.minDoctors - LIMITS.MIN_DOCTORS) / (LIMITS.MAX_DOCTORS - LIMITS.MIN_DOCTORS)) * 100;
                        return (
                          <div
                            key={index}
                            className="absolute top-0 transform -translate-x-1/2"
                            style={{ left: `${position}%` }}
                          >
                            <div className="w-1 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400 font-medium whitespace-nowrap">
                              {tier.discount}% off
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-400 px-2">
                    <span>{LIMITS.MIN_DOCTORS}</span>
                    <span className="text-center">
                      {LIMITS.MAX_DOCTORS / 2} doctors
                    </span>
                    <span>{LIMITS.MAX_DOCTORS}</span>
                  </div>
                  
                  {/* Direct Input Option */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Or enter manually:</span>
                    <div className="relative">
                      <Input
                        type="number"
                        value={doctorCount}
                        onChange={(e) => handleDoctorCountChange(e.target.value)}
                        min={LIMITS.MIN_DOCTORS}
                        max={LIMITS.MAX_DOCTORS}
                        className="w-20 h-8 text-sm bg-gray-700 border-gray-600 text-white text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Cycle Toggle */}
                <div className="space-y-3">
                  <Label className="text-white text-lg font-medium">Billing Cycle</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={!isYearly ? "default" : "outline"}
                      onClick={() => setIsYearly(false)}
                      className="flex-1"
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={isYearly ? "default" : "outline"}
                      onClick={() => setIsYearly(true)}
                      className="flex-1 relative"
                    >
                      Yearly
                      <Badge className="ml-2 bg-green-500 text-white text-xs">
                        Save 20%
                      </Badge>
                    </Button>
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg p-6 border border-blue-500/20">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {formatPrice(isYearly ? pricing.yearlyPrice : pricing.monthlyPrice)}
                      <span className="text-lg text-gray-400 font-normal">
                        /{isYearly ? 'month' : 'month'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-400 mb-4">
                      {formatPrice(pricing.pricePerDoctor)} per doctor per month
                    </div>

                    {/* Discounts Display */}
                    <div className="space-y-2">
                      {pricing.volumeDiscount > 0 && (
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          Volume Discount: {pricing.volumeDiscount}% off
                        </Badge>
                      )}
                      {isYearly && (
                        <div>
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            Yearly Discount: {pricing.yearlyDiscount}% off
                          </Badge>
                          <p className="text-sm text-green-400 mt-2">
                            You save {formatPrice(pricing.totalSavings)} per year!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Size Buttons */}
                <div className="space-y-3">
                  <Label className="text-white text-sm font-medium">Quick Select</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { count: 5, label: "Small Clinic" },
                      { count: 15, label: "Medium Practice" },
                    ].map((option) => (
                      <Button
                        key={option.count}
                        variant="outline"
                        size="sm"
                        onClick={() => setDoctorCount(option.count)}
                        className={`${
                          doctorCount === option.count 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'border-gray-600 text-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {option.count} docs
                        <br />
                        <span className="text-xs opacity-70">{option.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Card */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700 shadow-xl h-full">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {currentTier === 'enterprise' && <Crown className="h-8 w-8 text-yellow-500" />}
                  {currentTier === 'professional' && <Star className="h-8 w-8 text-purple-500" />}
                  {currentTier === 'standard' && <Zap className="h-8 w-8 text-blue-500" />}
                  {currentTier === 'basic' && <Check className="h-8 w-8 text-green-500" />}
                </div>
                
                <CardTitle className="text-2xl font-bold text-white mb-2 capitalize">
                  {currentTier} Plan Features
                </CardTitle>
                <p className="text-gray-400">
                  Your practice qualifies for our {currentTier} tier with {doctorCount} doctors
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4">
                  {features[currentTier].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="flex items-start gap-3"
                    >
                      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-300 leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Volume Discount Info */}
                {doctorCount >= 50 && (
                  <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      Volume Pricing Benefits
                    </h4>
                    <p className="text-sm text-gray-300">
                      You're getting {pricing.volumeDiscount}% off our base pricing due to your practice size. 
                      Larger practices receive better rates and premium support.
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <div className="mt-8">
                  <Button 
                    asChild
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <a href="https://hospital.tiqora.in" target="_blank" rel="noopener noreferrer">
                      Start Free Trial
                    </a>
                  </Button>
                  <p className="text-center text-sm text-gray-400 mt-3">
                    30-day free trial • No credit card required
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Why Choose Our Pricing?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Scale As You Grow",
                  description: "Only pay for active doctors. Add or remove users anytime without penalties."
                },
                {
                  icon: <Calculator className="h-8 w-8" />,
                  title: "Transparent Pricing",
                  description: "No hidden fees, setup costs, or surprise charges. What you see is what you pay."
                },
                {
                  icon: <Crown className="h-8 w-8" />,
                  title: "Volume Discounts",
                  description: "Bigger practices get better rates. Save more as your practice grows."
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}