import { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, Calendar, Phone, Mail, Hospital, Baby, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function ChildRegistration({ onRegister, onNavigate }) {
  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: '',
    parentName: '',
    phone: '',
    email: '',
    hospital: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      onRegister(formData);
      onNavigate('dashboard');
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <Card className="p-12 text-center backdrop-blur-lg bg-card/50 border-[#10b981]/50 shadow-2xl shadow-[#10b981]/20 max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#10b981]/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-[#10b981]" />
            </motion.div>
            <h2 className="text-3xl font-bold text-[#10b981] mb-4">
              Success!
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Digital Vaccine Card Created Successfully
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#06b6d4]/20 flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-[#06b6d4]" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Digital Vaccine Card</h1>
            <p className="text-muted-foreground">
              Register your child and start tracking vaccinations digitally
            </p>
          </div>

          <Card className="p-8 backdrop-blur-lg bg-card/50 border-border shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="childName" className="flex items-center space-x-2">
                  <Baby className="w-4 h-4 text-[#06b6d4]" />
                  <span>Child's Full Name</span>
                </Label>
                <Input
                  id="childName"
                  name="childName"
                  placeholder="Enter child's name"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#06b6d4]" />
                  <span>Date of Birth</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentName" className="flex items-center space-x-2">
                  <UserPlus className="w-4 h-4 text-[#06b6d4]" />
                  <span>Parent/Guardian Name</span>
                </Label>
                <Input
                  id="parentName"
                  name="parentName"
                  placeholder="Enter your name"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[#06b6d4]" />
                    <span>Phone Number</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[#06b6d4]" />
                    <span>Email Address</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital" className="flex items-center space-x-2">
                  <Hospital className="w-4 h-4 text-[#06b6d4]" />
                  <span>Primary Hospital/Clinic</span>
                </Label>
                <Input
                  id="hospital"
                  name="hospital"
                  placeholder="e.g., Kokilaben Dhirubhai Ambani Hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-primary-foreground py-6 text-lg"
                  size="lg"
                >
                  Create Digital Vaccine Card
                </Button>
              </div>
            </form>
          </Card>

          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('landing')}
              className="text-muted-foreground hover:text-[#06b6d4]"
            >
              ← Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
