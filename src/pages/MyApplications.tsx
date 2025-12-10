import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { FileText, Clock, CheckCircle, XCircle, Eye, Loader2, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface Application {
  id: string;
  program_id: string;
  program_name: string;
  university_name: string;
  program_degree_level: string | null;
  program_degree_name: string | null;
  status: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nationality: string;
  city: string;
  date_of_birth: string | null;
  current_education_level: string | null;
  gpa: string | null;
  english_test: string | null;
  english_score: string | null;
  budget_range: string | null;
  scholarship_interest: boolean | null;
  created_at: string;
  updated_at: string;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'submitted':
      return { label: 'Submitted', variant: 'secondary' as const, icon: Clock };
    case 'reviewing':
      return { label: 'Under Review', variant: 'default' as const, icon: Eye };
    case 'accepted':
      return { label: 'Accepted', variant: 'default' as const, icon: CheckCircle };
    case 'rejected':
      return { label: 'Rejected', variant: 'destructive' as const, icon: XCircle };
    default:
      return { label: status, variant: 'outline' as const, icon: Clock };
  }
};

const MyApplications = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ['my-applications', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Application[];
    },
    enabled: !!user?.id,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Applications</h1>
              <p className="text-muted-foreground">
                Track the status of all your submitted applications
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : applications && applications.length > 0 ? (
              <div className="grid gap-4">
                {applications.map((app) => {
                  const statusConfig = getStatusConfig(app.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <Card key={app.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div>
                            <CardTitle className="text-lg">{app.program_name}</CardTitle>
                            <CardDescription className="mt-1">
                              {app.university_name}
                              {app.program_degree_level && ` • ${app.program_degree_level}`}
                            </CardDescription>
                          </div>
                          <Badge 
                            variant={statusConfig.variant}
                            className="flex items-center gap-1 w-fit"
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="text-sm text-muted-foreground">
                            <span>Submitted: {formatDate(app.created_at)}</span>
                            {app.updated_at !== app.created_at && (
                              <span className="ml-4">Updated: {formatDate(app.updated_at)}</span>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedApp(app)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't submitted any applications yet. Start exploring programs to apply!
                  </p>
                  <Button onClick={() => navigate('/programs')}>
                    Browse Programs
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        <Footer />

        {/* Application Details Dialog */}
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedApp && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedApp.program_name}</DialogTitle>
                  <DialogDescription>{selectedApp.university_name}</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 mt-4">
                  {/* Status */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Status</h4>
                    <Badge 
                      variant={getStatusConfig(selectedApp.status).variant}
                      className="flex items-center gap-1 w-fit"
                    >
                      {(() => {
                        const Icon = getStatusConfig(selectedApp.status).icon;
                        return <Icon className="h-3 w-3" />;
                      })()}
                      {getStatusConfig(selectedApp.status).label}
                    </Badge>
                  </div>

                  {/* Program Info */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Program Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {selectedApp.program_degree_level && (
                        <div>
                          <span className="text-muted-foreground">Degree Level:</span>{' '}
                          <span className="font-medium">{selectedApp.program_degree_level}</span>
                        </div>
                      )}
                      {selectedApp.program_degree_name && (
                        <div>
                          <span className="text-muted-foreground">Degree:</span>{' '}
                          <span className="font-medium">{selectedApp.program_degree_name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Personal Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>{' '}
                        <span className="font-medium">{selectedApp.first_name} {selectedApp.last_name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>{' '}
                        <span className="font-medium">{selectedApp.email}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>{' '}
                        <span className="font-medium">{selectedApp.phone}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>{' '}
                        <span className="font-medium">{selectedApp.city}, {selectedApp.nationality}</span>
                      </div>
                      {selectedApp.date_of_birth && (
                        <div>
                          <span className="text-muted-foreground">Date of Birth:</span>{' '}
                          <span className="font-medium">{formatDate(selectedApp.date_of_birth)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Academic Info */}
                  {(selectedApp.current_education_level || selectedApp.gpa || selectedApp.english_test) && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Academic Information</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {selectedApp.current_education_level && (
                          <div>
                            <span className="text-muted-foreground">Education Level:</span>{' '}
                            <span className="font-medium">{selectedApp.current_education_level}</span>
                          </div>
                        )}
                        {selectedApp.gpa && (
                          <div>
                            <span className="text-muted-foreground">GPA:</span>{' '}
                            <span className="font-medium">{selectedApp.gpa}</span>
                          </div>
                        )}
                        {selectedApp.english_test && (
                          <div>
                            <span className="text-muted-foreground">English Test:</span>{' '}
                            <span className="font-medium">{selectedApp.english_test}</span>
                          </div>
                        )}
                        {selectedApp.english_score && (
                          <div>
                            <span className="text-muted-foreground">English Score:</span>{' '}
                            <span className="font-medium">{selectedApp.english_score}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  {(selectedApp.budget_range || selectedApp.scholarship_interest) && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Additional Information</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {selectedApp.budget_range && (
                          <div>
                            <span className="text-muted-foreground">Budget Range:</span>{' '}
                            <span className="font-medium">{selectedApp.budget_range}</span>
                          </div>
                        )}
                        {selectedApp.scholarship_interest && (
                          <div>
                            <span className="text-muted-foreground">Scholarship Interest:</span>{' '}
                            <span className="font-medium">Yes</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="pt-4 border-t text-sm text-muted-foreground">
                    <div>Submitted: {formatDate(selectedApp.created_at)}</div>
                    {selectedApp.updated_at !== selectedApp.created_at && (
                      <div>Last Updated: {formatDate(selectedApp.updated_at)}</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
};

export default MyApplications;
