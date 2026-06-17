import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const VACCINE_GLOSSARY = [
  {
    id: 1,
    name: 'BCG',
    fullName: 'Bacillus Calmette-Guérin',
    description: 'Protects against tuberculosis (TB). Usually given at birth or shortly after. This vaccine is especially important in countries where TB is common.',
    age: 'At birth',
    diseases: ['Tuberculosis'],
    sideEffects: 'Small sore at injection site, may leave a small scar'
  },
  {
    id: 2,
    name: 'OPV',
    fullName: 'Oral Polio Vaccine',
    description: 'Protects against poliomyelitis (polio). Given orally in multiple doses. Polio can cause paralysis and is preventable through vaccination.',
    age: '6, 10, 14 weeks',
    diseases: ['Poliomyelitis'],
    sideEffects: 'Very rare, generally very safe'
  },
  {
    id: 3,
    name: 'Hepatitis B',
    fullName: 'Hepatitis B Vaccine',
    description: 'Protects against Hepatitis B virus infection, which can cause serious liver disease. Critical for preventing chronic liver problems and liver cancer.',
    age: 'Birth, 6, 10, 14 weeks',
    diseases: ['Hepatitis B'],
    sideEffects: 'Mild soreness at injection site, low-grade fever'
  },
  {
    id: 4,
    name: 'DPT',
    fullName: 'Diphtheria, Pertussis, Tetanus',
    description: 'A combination vaccine that protects against three serious diseases: diphtheria (throat infection), whooping cough (pertussis), and tetanus (lockjaw).',
    age: '6, 10, 14 weeks, with boosters',
    diseases: ['Diphtheria', 'Pertussis (Whooping Cough)', 'Tetanus'],
    sideEffects: 'Soreness, redness at injection site, mild fever'
  },
  {
    id: 5,
    name: 'MMR',
    fullName: 'Measles, Mumps, Rubella',
    description: 'Protects against measles, mumps, and rubella. Usually given at 9-12 months. These diseases can cause serious complications if contracted.',
    age: '9-12 months, with a second dose',
    diseases: ['Measles', 'Mumps', 'Rubella'],
    sideEffects: 'Mild rash, fever 7-12 days after vaccination'
  },
  {
    id: 6,
    name: 'Polio Booster',
    fullName: 'Polio Booster Dose',
    description: 'Booster dose to maintain immunity against polio throughout childhood and into adulthood.',
    age: '16-24 months',
    diseases: ['Poliomyelitis'],
    sideEffects: 'Very rare, generally very safe'
  },
  {
    id: 7,
    name: 'Hib',
    fullName: 'Haemophilus Influenzae Type B',
    description: 'Protects against Haemophilus influenzae type b, which can cause meningitis, pneumonia, and other serious infections in young children.',
    age: '6, 10, 14 weeks',
    diseases: ['Meningitis', 'Pneumonia', 'Epiglottitis'],
    sideEffects: 'Mild soreness at injection site, low fever'
  },
  {
    id: 8,
    name: 'Rotavirus',
    fullName: 'Rotavirus Vaccine',
    description: 'Protects against rotavirus, the most common cause of severe diarrhea in infants and young children. Given orally.',
    age: '6, 10, 14 weeks',
    diseases: ['Severe Diarrhea', 'Dehydration'],
    sideEffects: 'Mild diarrhea, irritability'
  },
  {
    id: 9,
    name: 'PCV',
    fullName: 'Pneumococcal Conjugate Vaccine',
    description: 'Protects against pneumococcal bacteria that can cause pneumonia, meningitis, and blood infections.',
    age: '6, 10, 14 weeks',
    diseases: ['Pneumonia', 'Meningitis', 'Blood Infections'],
    sideEffects: 'Redness at injection site, mild fever'
  },
  {
    id: 10,
    name: 'Varicella',
    fullName: 'Chickenpox Vaccine',
    description: 'Protects against chickenpox (varicella), a highly contagious disease that causes itchy rash and fever.',
    age: '12-15 months',
    diseases: ['Chickenpox (Varicella)'],
    sideEffects: 'Mild rash, soreness at injection site'
  }
];

export function VaccineGlossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  const filteredVaccines = VACCINE_GLOSSARY.filter(vaccine =>
    vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccine.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#06b6d4]/20 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-[#06b6d4]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Vaccine Glossary</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Learn about vaccines in simple, parent-friendly language. Click any vaccine for detailed information.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search vaccine name or disease..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base bg-card/50 backdrop-blur-lg border-border"
            />
          </div>
        </motion.div>

        {/* Vaccine Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVaccines.map((vaccine, idx) => (
            <motion.div
              key={vaccine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card
                className="p-6 backdrop-blur-lg bg-card/50 border-border hover:border-[#06b6d4]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#06b6d4]/10 hover:-translate-y-1 cursor-pointer h-full"
                onClick={() => setSelectedVaccine(vaccine)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/20 flex items-center justify-center">
                    <Info className="w-6 h-6 text-[#06b6d4]" />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {vaccine.age}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{vaccine.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{vaccine.fullName}</p>
                
                <p className="text-sm text-foreground/80 line-clamp-3 mb-4">
                  {vaccine.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {vaccine.diseases.slice(0, 2).map((disease, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-[#10b981]/20 text-[#10b981]"
                    >
                      {disease}
                    </span>
                  ))}
                  {vaccine.diseases.length > 2 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      +{vaccine.diseases.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center text-[#06b6d4] text-sm font-medium mt-auto pt-2 border-t border-border">
                  <span>Learn more</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredVaccines.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No vaccines found</h3>
            <p className="text-muted-foreground">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Vaccine Detail Dialog */}
        <Dialog open={selectedVaccine !== null} onOpenChange={() => setSelectedVaccine(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/20 flex items-center justify-center">
                  <Info className="w-6 h-6 text-[#06b6d4]" />
                </div>
                <span>{selectedVaccine?.name}</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Full Name */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-muted-foreground mb-1">FULL NAME</h4>
                <p className="text-lg">{selectedVaccine?.fullName}</p>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">WHAT IT DOES</h4>
                <p className="text-foreground/90 leading-relaxed">
                  {selectedVaccine?.description}
                </p>
              </div>

              {/* Recommended Age */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">RECOMMENDED AGE</h4>
                <div className="inline-flex items-center px-4 py-2 rounded-lg bg-[#06b6d4]/10 text-[#06b6d4]">
                  {selectedVaccine?.age}
                </div>
              </div>

              {/* Protects Against */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">PROTECTS AGAINST</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVaccine?.diseases.map((disease, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 rounded-lg bg-[#10b981]/20 text-[#10b981] font-medium"
                    >
                      {disease}
                    </span>
                  ))}
                </div>
              </div>

              {/* Side Effects */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">POSSIBLE SIDE EFFECTS</h4>
                <div className="p-4 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20">
                  <p className="text-foreground/90">
                    {selectedVaccine?.sideEffects}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    These are usually mild and temporary. Contact your healthcare provider if you have concerns.
                  </p>
                </div>
              </div>

              {/* Important Note */}
              <div className="p-4 rounded-lg bg-card border border-[#06b6d4]/30">
                <h4 className="font-semibold mb-2 flex items-center space-x-2">
                  <Info className="w-5 h-5 text-[#06b6d4]" />
                  <span>Important</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Always consult with your healthcare provider before getting vaccinated. 
                  This information is for educational purposes and should not replace professional medical advice.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
