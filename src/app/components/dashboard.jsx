import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, Clock, AlertCircle, Download, 
  Baby, Calendar, Hospital, Bell, QrCode, Cloud,
  Info
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

const VACCINES = [
  {
    id: 1,
    name: 'BCG',
    fullName: 'Bacillus Calmette-Guérin',
    dueDate: '2025-12-15',
    status: 'completed',
    description: 'Protects against tuberculosis (TB). Usually given at birth or shortly after.',
    age: 'At birth'
  },
  {
    id: 2,
    name: 'OPV',
    fullName: 'Oral Polio Vaccine',
    dueDate: '2026-01-20',
    status: 'completed',
    description: 'Protects against poliomyelitis (polio). Given orally in multiple doses.',
    age: '6, 10, 14 weeks'
  },
  {
    id: 3,
    name: 'Hepatitis B',
    fullName: 'Hepatitis B Vaccine',
    dueDate: '2026-02-10',
    status: 'completed',
    description: 'Protects against Hepatitis B virus infection. Critical for liver health.',
    age: 'Birth, 6, 10, 14 weeks'
  },
  {
    id: 4,
    name: 'DPT',
    fullName: 'Diphtheria, Pertussis, Tetanus',
    dueDate: '2026-03-05',
    status: 'upcoming',
    description: 'Protects against diphtheria, whooping cough (pertussis), and tetanus.',
    age: '6, 10, 14 weeks'
  },
  {
    id: 5,
    name: 'MMR',
    fullName: 'Measles, Mumps, Rubella',
    dueDate: '2026-03-28',
    status: 'upcoming',
    description: 'Protects against measles, mumps, and rubella. Usually given at 9-12 months.',
    age: '9-12 months'
  },
  {
    id: 6,
    name: 'Polio Booster',
    fullName: 'Polio Booster Dose',
    dueDate: '2025-11-10',
    status: 'missed',
    description: 'Booster dose to maintain immunity against polio.',
    age: '16-24 months'
  }
];

export function Dashboard({ childData, onNavigate }) {
  const [vaccines, setVaccines] = useState(VACCINES);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [showReminderDialog, setShowReminderDialog] = useState(false);

  // Calculate age
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dob);
    const months = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                   (today.getMonth() - birthDate.getMonth());
    
    if (months < 12) {
      return `${months} months`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths > 0 ? `${remainingMonths} months` : ''}`;
  };

  // Get overall status
  const getOverallStatus = () => {
    const missed = vaccines.filter(v => v.status === 'missed').length;
    const upcoming = vaccines.filter(v => v.status === 'upcoming').length;
    
    if (missed > 0) return 'missed';
    if (upcoming > 0) return 'upcoming';
    return 'complete';
  };

  // Calculate completion percentage
  const completionPercentage = (vaccines.filter(v => v.status === 'completed').length / vaccines.length) * 100;

  const markAsCompleted = (id) => {
    setVaccines(vaccines.map(v => 
      v.id === id ? { ...v, status: 'completed' } : v
    ));
    toast.success('Vaccination marked as completed!', {
      description: 'Record updated successfully'
    });
  };

  const status = getOverallStatus();

  return (
    <div className="min-h-screen pt-16 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-8 backdrop-blur-lg bg-gradient-to-br from-card/80 to-card/50 border-[#06b6d4]/30 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Child Info */}
              <div className="md:col-span-2">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 rounded-full bg-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
                    <Baby className="w-10 h-10 text-[#06b6d4]" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">
                      {childData?.childName || 'Demo Child'}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Age: {calculateAge(childData?.dateOfBirth || '2025-06-15')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Hospital className="w-4 h-4" />
                        <span>{childData?.hospital || 'Kokilaben Dhirubhai Ambani Hospital'}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        className={
                          status === 'complete' ? 'bg-[#10b981] hover:bg-[#059669]' :
                          status === 'upcoming' ? 'bg-[#f59e0b] hover:bg-[#d97706]' :
                          'bg-[#ef4444] hover:bg-[#dc2626]'
                        }
                      >
                        {status === 'complete' && <CheckCircle2 className="w-4 h-4 mr-1" />}
                        {status === 'upcoming' && <Clock className="w-4 h-4 mr-1" />}
                        {status === 'missed' && <AlertCircle className="w-4 h-4 mr-1" />}
                        {status === 'complete' ? 'Up to Date' : 
                         status === 'upcoming' ? 'Upcoming' : 'Action Needed'}
                      </Badge>
                      <Badge variant="outline" className="border-[#06b6d4]/50">
                        <Cloud className="w-4 h-4 mr-1 text-[#06b6d4]" />
                        Cloud Synced
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 mb-3">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted/20"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - completionPercentage / 100)}`}
                      className="text-[#06b6d4] transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#06b6d4]">
                      {Math.round(completionPercentage)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Vaccination Progress
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button 
                onClick={() => setShowReminderDialog(true)}
                className="bg-[#f59e0b] hover:bg-[#d97706]"
              >
                <Bell className="w-4 h-4 mr-2" />
                View Reminders
              </Button>
              <Button 
                onClick={() => onNavigate('qr')}
                variant="outline"
                className="border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4]/10"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
              <Button 
                variant="outline"
                onClick={() => toast.success('Downloading vaccine card...', {
                  description: 'Your PDF will be ready shortly'
                })}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Timeline Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Vaccination Timeline</h2>
          <p className="text-muted-foreground">Track your child's immunization schedule</p>
        </div>

        {/* Vaccine Timeline */}
        <div className="space-y-4">
          {vaccines.map((vaccine, idx) => (
            <motion.div
              key={vaccine.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card 
                className={`p-6 backdrop-blur-lg bg-card/50 border-l-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                  vaccine.status === 'completed' ? 'border-l-[#10b981]' :
                  vaccine.status === 'upcoming' ? 'border-l-[#f59e0b]' :
                  'border-l-[#ef4444]'
                }`}
                onClick={() => setSelectedVaccine(vaccine)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Status Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      vaccine.status === 'completed' ? 'bg-[#10b981]/20' :
                      vaccine.status === 'upcoming' ? 'bg-[#f59e0b]/20' :
                      'bg-[#ef4444]/20'
                    }`}>
                      {vaccine.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-[#10b981]" />}
                      {vaccine.status === 'upcoming' && <Clock className="w-6 h-6 text-[#f59e0b]" />}
                      {vaccine.status === 'missed' && <AlertCircle className="w-6 h-6 text-[#ef4444]" />}
                    </div>

                    {/* Vaccine Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">{vaccine.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVaccine(vaccine);
                          }}
                        >
                          <Info className="w-4 h-4 text-[#06b6d4]" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{vaccine.fullName}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {new Date(vaccine.dueDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}</span>
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {vaccine.age}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center space-x-3">
                    <Badge className={
                      vaccine.status === 'completed' ? 'bg-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/30' :
                      vaccine.status === 'upcoming' ? 'bg-[#f59e0b]/20 text-[#f59e0b] hover:bg-[#f59e0b]/30' :
                      'bg-[#ef4444]/20 text-[#ef4444] hover:bg-[#ef4444]/30'
                    }>
                      {vaccine.status === 'completed' && '✓ Completed'}
                      {vaccine.status === 'upcoming' && '⏳ Upcoming'}
                      {vaccine.status === 'missed' && '❗ Missed'}
                    </Badge>
                    {vaccine.status !== 'completed' && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsCompleted(vaccine.id);
                        }}
                        className="bg-[#10b981] hover:bg-[#059669]"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Vaccine Details Dialog */}
        <Dialog open={selectedVaccine !== null} onOpenChange={() => setSelectedVaccine(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-[#06b6d4]" />
                <span>{selectedVaccine?.name}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">Full Name</h4>
                <p className="text-muted-foreground">{selectedVaccine?.fullName}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">What it protects against</h4>
                <p className="text-muted-foreground">{selectedVaccine?.description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Recommended Age</h4>
                <p className="text-muted-foreground">{selectedVaccine?.age}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Due Date</h4>
                <p className="text-muted-foreground">
                  {selectedVaccine && new Date(selectedVaccine.dueDate).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reminder Dialog */}
        <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-[#f59e0b]" />
                <span>Smart Reminders</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {vaccines.filter(v => v.status === 'upcoming' || v.status === 'missed').map((vaccine) => {
                const daysUntil = Math.ceil((new Date(vaccine.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <Card key={vaccine.id} className={`p-4 ${
                    vaccine.status === 'missed' ? 'border-[#ef4444]/50' : 'border-[#f59e0b]/50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <Bell className={`w-5 h-5 mt-1 ${
                        vaccine.status === 'missed' ? 'text-[#ef4444]' : 'text-[#f59e0b]'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{vaccine.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {vaccine.status === 'missed' 
                            ? `Overdue by ${Math.abs(daysUntil)} days` 
                            : `Due in ${daysUntil} days`}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-[#06b6d4]" />
                  <span>SMS Preview</span>
                </h4>
                <div className="bg-background p-3 rounded text-sm">
                  <p className="text-muted-foreground">
                    "Hi {childData?.parentName || 'Parent'}, your child's DPT vaccine is due on March 5. 
                    Please schedule an appointment at {childData?.hospital || 'your hospital'}. - VaxVault"
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
