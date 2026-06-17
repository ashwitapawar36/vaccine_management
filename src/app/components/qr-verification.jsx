import { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Scan, CheckCircle2, Shield, Calendar, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

export function QRVerification({ childData }) {
  const [activeTab, setActiveTab] = useState('generate');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Mock data for demo
  const mockChildData = childData || {
    childName: 'Demo Child',
    dateOfBirth: '2025-06-15',
    hospital: 'Kokilaben Dhirubhai Ambani Hospital',
    parentName: 'Demo Parent',
    vaccineStatus: 'up-to-date',
    completedVaccines: 3,
    totalVaccines: 6,
    nextVaccine: 'DPT',
    nextDueDate: '2026-03-05'
  };

  // Generate QR data
  const qrData = JSON.stringify({
    id: 'VAX-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    name: mockChildData.childName,
    dob: mockChildData.dateOfBirth,
    status: mockChildData.vaccineStatus || 'up-to-date',
    verified: true,
    timestamp: new Date().toISOString()
  });

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning animation
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        verified: true,
        childName: mockChildData.childName,
        status: mockChildData.vaccineStatus || 'up-to-date',
        completedVaccines: mockChildData.completedVaccines || 3,
        totalVaccines: mockChildData.totalVaccines || 6,
        nextVaccine: mockChildData.nextVaccine || 'DPT',
        nextDueDate: mockChildData.nextDueDate || '2026-03-05',
        lastVaccination: '2026-02-10'
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-16 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#06b6d4]/20 flex items-center justify-center">
            <QrCode className="w-8 h-8 text-[#06b6d4]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">QR Verification System</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate secure QR codes for instant verification or scan to verify vaccination status
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="generate" className="data-[state=active]:bg-[#06b6d4] data-[state=active]:text-primary-foreground">
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR
              </TabsTrigger>
              <TabsTrigger value="verify" className="data-[state=active]:bg-[#06b6d4] data-[state=active]:text-primary-foreground">
                <Scan className="w-4 h-4 mr-2" />
                Verify QR
              </TabsTrigger>
            </TabsList>

            {/* Generate Tab */}
            <TabsContent value="generate">
              <div className="grid md:grid-cols-2 gap-8">
                {/* QR Code Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="p-8 backdrop-blur-lg bg-card/50 border-[#06b6d4]/30 shadow-2xl shadow-[#06b6d4]/20">
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold mb-2">Digital Verification Code</h2>
                      <p className="text-sm text-muted-foreground">
                        Scan to verify vaccination status
                      </p>
                    </div>

                    {/* QR Code */}
                    <div className="relative">
                      <motion.div
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(6, 182, 212, 0.3)',
                            '0 0 40px rgba(6, 182, 212, 0.5)',
                            '0 0 20px rgba(6, 182, 212, 0.3)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-6 bg-white rounded-2xl mx-auto w-fit"
                      >
                        <QRCodeSVG
                          value={qrData}
                          size={220}
                          level="H"
                          includeMargin={true}
                          fgColor="#0f172a"
                        />
                      </motion.div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4 text-[#10b981]" />
                        <span>Secure & Encrypted</span>
                      </div>
                      <div className="text-center text-xs text-muted-foreground">
                        ID: {qrData.slice(10, 25)}...
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="space-y-6"
                >
                  <Card className="p-6 backdrop-blur-lg bg-card/50 border-border">
                    <h3 className="text-lg font-bold mb-4">Vaccination Record</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Child Name</p>
                        <p className="font-semibold">{mockChildData.childName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                        <p className="font-semibold">
                          {new Date(mockChildData.dateOfBirth).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <Badge className="bg-[#10b981] hover:bg-[#059669]">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Up to Date
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Progress</p>
                        <p className="font-semibold">
                          {mockChildData.completedVaccines || 3} of {mockChildData.totalVaccines || 6} completed
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 backdrop-blur-lg bg-card/50 border-[#06b6d4]/30">
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-[#06b6d4]" />
                      <span>Privacy Notice</span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      This QR code contains minimal information for verification purposes only. 
                      Full medical records are not accessible through this code. 
                      Only vaccination status and next due date are shared.
                    </p>
                  </Card>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-[#06b6d4] hover:bg-[#0891b2]"
                      onClick={() => {
                        // In a real app, this would trigger a download or share
                        alert('QR Code download feature - would download the QR code as an image');
                      }}
                    >
                      Download QR Code
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4]/10"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'VaxVault QR Code',
                            text: 'My vaccination verification QR code'
                          });
                        } else {
                          alert('Share feature - would share the QR code');
                        }
                      }}
                    >
                      Share
                    </Button>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Verify Tab */}
            <TabsContent value="verify">
              <div className="max-w-2xl mx-auto">
                {!scanResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="p-12 backdrop-blur-lg bg-card/50 border-border text-center">
                      <motion.div
                        animate={isScanning ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 180, 360]
                        } : {}}
                        transition={{ duration: 2, repeat: isScanning ? Infinity : 0 }}
                        className="w-32 h-32 mx-auto mb-6 rounded-full bg-[#06b6d4]/20 flex items-center justify-center"
                      >
                        <Scan className="w-16 h-16 text-[#06b6d4]" />
                      </motion.div>

                      <h2 className="text-2xl font-bold mb-3">
                        {isScanning ? 'Scanning QR Code...' : 'Scan QR Code'}
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        {isScanning 
                          ? 'Please wait while we verify the vaccination record'
                          : 'Point your camera at a VaxVault QR code to verify vaccination status'
                        }
                      </p>

                      {isScanning ? (
                        <div className="space-y-4">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 2 }}
                              className="h-full bg-[#06b6d4]"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">Verifying...</p>
                        </div>
                      ) : (
                        <Button
                          size="lg"
                          onClick={handleScan}
                          className="bg-[#06b6d4] hover:bg-[#0891b2] px-8"
                        >
                          <Scan className="w-5 h-5 mr-2" />
                          Start Scanning
                        </Button>
                      )}

                      <div className="mt-8 pt-8 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          For demo purposes, clicking "Start Scanning" will show a sample verification result
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="p-8 backdrop-blur-lg bg-card/50 border-[#10b981]/50 shadow-2xl shadow-[#10b981]/20">
                      {/* Success Header */}
                      <div className="text-center mb-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.6 }}
                          className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#10b981]/20 flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-10 h-10 text-[#10b981]" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-[#10b981] mb-2">
                          Verified Successfully
                        </h2>
                        <p className="text-muted-foreground">
                          Vaccination record has been verified
                        </p>
                      </div>

                      {/* Verification Details */}
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Child Name</p>
                              <p className="text-lg font-semibold">{scanResult.childName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Status</p>
                              <Badge className={
                                scanResult.status === 'up-to-date' 
                                  ? 'bg-[#10b981] hover:bg-[#059669]' 
                                  : 'bg-[#f59e0b] hover:bg-[#d97706]'
                              }>
                                {scanResult.status === 'up-to-date' ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Up to Date
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Pending
                                  </>
                                )}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Last Vaccination</p>
                              <p className="font-semibold flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-[#06b6d4]" />
                                <span>{new Date(scanResult.lastVaccination).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}</span>
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Completion</p>
                              <div className="flex items-center space-x-3">
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(scanResult.completedVaccines / scanResult.totalVaccines) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className="h-full bg-[#10b981]"
                                  />
                                </div>
                                <span className="text-sm font-semibold">
                                  {scanResult.completedVaccines}/{scanResult.totalVaccines}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Next Due Vaccine</p>
                              <p className="text-lg font-semibold">{scanResult.nextVaccine}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Next Due Date</p>
                              <p className="font-semibold flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-[#f59e0b]" />
                                <span>{new Date(scanResult.nextDueDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-border">
                          <div className="flex items-start space-x-3 p-4 rounded-lg bg-[#06b6d4]/10">
                            <Shield className="w-5 h-5 text-[#06b6d4] flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-1">Privacy Protected</h4>
                              <p className="text-sm text-muted-foreground">
                                Only vaccination status information is displayed. Full medical records remain private and secure.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={() => setScanResult(null)}
                            className="flex-1 bg-[#06b6d4] hover:bg-[#0891b2]"
                          >
                            Scan Another
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setScanResult(null)}
                            className="flex-1"
                          >
                            Done
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
