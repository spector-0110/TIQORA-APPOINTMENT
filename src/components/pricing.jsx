import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4
    }
  }
};

export default function Pricing() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Plan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Flexible pricing tailored to your hospital's size and needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Basic",
              price: "₹999/mo",
              features: [
                "Patient Appointment Booking",
                "Daily Queue Tracker",
                "Basic Admin Dashboard",
                "Email Support"
              ]
            },
            {
              title: "Standard",
              price: "₹1999/mo",
              features: [
                "All Basic Features",
                "Custom Subdomain",
                "WhatsApp & SMS Alerts",
                "Role-based Staff Access"
              ]
            },
            {
              title: "Enterprise",
              price: "₹3999/mo",
              features: [
                "All Standard Features",
                "White-label Branding",
                "24/7 Priority Support",
                "API & Integration Options"
              ]
            }
          ].map((plan, i) => (
            <motion.div key={plan.title} variants={fadeInUp}>
              <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white text-2xl mb-2">{plan.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-400 mb-4">{plan.price}</div>
                  <ul className="text-gray-300 space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="mr-2 text-green-400">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}