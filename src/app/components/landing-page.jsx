import { motion } from 'motion/react';
import { Shield, Bell, QrCode, ArrowRight, Cloud, Users, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/10 via-transparent to-[#10b981]/10"></div>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#06b6d4]/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Never Miss a{' '}
                <span className="text-[#06b6d4]">Vaccine</span> Again.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                A secure, digital vaccine card system with smart reminders and instant QR verification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('register')}
                  className="bg-[#06b6d4] hover:bg-[#0891b2] text-primary-foreground text-lg px-8 py-6"
                >
                  Create Digital Card
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => onNavigate('dashboard')}
                  className="border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4]/10 text-lg px-8 py-6"
                >
                  View Demo
                </Button>
              </div>
            </motion.div>

            {/* Right Animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <Card className="p-8 backdrop-blur-lg bg-card/50 border-[#06b6d4]/20 shadow-2xl shadow-[#06b6d4]/20">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#06b6d4]/20 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-[#06b6d4]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Digital Vaccine Card</h3>
                      <p className="text-sm text-muted-foreground">Secure & Verified</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {['BCG', 'DPT', 'MMR', 'Polio'].map((vaccine, idx) => (
                      <motion.div
                        key={vaccine}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                      >
                        <span className="font-medium">{vaccine}</span>
                        <span className="text-[#10b981]">✓ Completed</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Floating Notification */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -right-4 top-1/4 max-w-xs"
              >
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Card className="p-4 backdrop-blur-lg bg-card/80 border-[#f59e0b]/50 shadow-lg">
                    <div className="flex items-start space-x-3">
                      <Bell className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Reminder</p>
                        <p className="text-xs text-muted-foreground">MMR vaccine due in 3 days</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powerful Features for Peace of Mind
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage vaccination records safely and efficiently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Centralized Digital Vault',
                description: 'Never lose another vaccination card. All records stored securely in one place.',
                color: '#06b6d4'
              },
              {
                icon: Bell,
                title: 'Smart Reminders',
                description: 'Automated notifications ensure you never miss an important vaccination date.',
                color: '#f59e0b'
              },
              {
                icon: QrCode,
                title: 'QR Instant Verification',
                description: 'Quick verification for schools, hospitals, and travel with privacy-focused design.',
                color: '#10b981'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="p-8 h-full backdrop-blur-lg bg-card/50 border-border hover:border-[#06b6d4]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#06b6d4]/10 hover:-translate-y-1">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                       style={{ backgroundColor: `${feature.color}20` }}>
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Cloud className="w-8 h-8 text-[#06b6d4] mb-3" />
              <h4 className="font-semibold mb-2">Cloud Synced</h4>
              <p className="text-sm text-muted-foreground">Your data is always backed up</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-[#10b981] mb-3" />
              <h4 className="font-semibold mb-2">HIPAA Compliant</h4>
              <p className="text-sm text-muted-foreground">Privacy and security first</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-[#f59e0b] mb-3" />
              <h4 className="font-semibold mb-2">Multi-Child Support</h4>
              <p className="text-sm text-muted-foreground">Manage entire family</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-[#06b6d4]" />
              <span className="text-sm text-muted-foreground">© 2026 VaxVault. Secure. Smart. Simplified.</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center space-x-2"
            >
              <Heart className="w-5 h-5 text-[#ef4444]" />
              <span className="text-sm text-muted-foreground">Healthcare for Everyone</span>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
