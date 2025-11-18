import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  User,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';

type HelpRequest = {
  id: string;
  user_id: string;
  program_id: string;
  university_name: string;
  program_name: string;
  full_name: string;
  email: string;
  phone: string | null;
  help_type: string;
  message: string;
  current_education_level: string | null;
  preferred_contact_method: string | null;
  status: string;
  agency_notes: string | null;
  created_at: string;
  updated_at: string;
};

const AgencyDashboard = () => {
  const { signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  const [agencyNotes, setAgencyNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  // Fetch help requests
  const { data: helpRequests, isLoading } = useQuery({
    queryKey: ['help-requests', statusFilter, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('help_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (searchQuery) {
        query = query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,university_name.ilike.%${searchQuery}%,program_name.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as HelpRequest[];
    },
  });

  // Update request mutation
  const updateRequestMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<HelpRequest> }) => {
      const { error } = await supabase
        .from('help_requests')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
          ...(updates.status === 'resolved' && { resolved_at: new Date().toISOString() })
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['help-requests'] });
      toast.success(t('agencyDashboard.updateSuccess'));
      setSelectedRequest(null);
    },
    onError: (error) => {
      console.error('Error updating request:', error);
      toast.error(t('agencyDashboard.updateError'));
    },
  });

  const handleUpdateRequest = () => {
    if (!selectedRequest) return;

    const updates: Partial<HelpRequest> = {};
    if (newStatus && newStatus !== selectedRequest.status) {
      updates.status = newStatus;
    }
    if (agencyNotes !== selectedRequest.agency_notes) {
      updates.agency_notes = agencyNotes;
    }

    if (Object.keys(updates).length > 0) {
      updateRequestMutation.mutate({ id: selectedRequest.id, updates });
    } else {
      setSelectedRequest(null);
    }
  };

  const openRequestDetails = (request: HelpRequest) => {
    setSelectedRequest(request);
    setAgencyNotes(request.agency_notes || '');
    setNewStatus(request.status);
  };

  // Calculate stats
  const stats = {
    total: helpRequests?.length || 0,
    pending: helpRequests?.filter(r => r.status === 'pending').length || 0,
    inProgress: helpRequests?.filter(r => r.status === 'in_progress').length || 0,
    resolved: helpRequests?.filter(r => r.status === 'resolved').length || 0,
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: t('agencyDashboard.statusPending'), variant: 'secondary' as const, icon: Clock },
      in_progress: { label: t('agencyDashboard.statusInProgress'), variant: 'default' as const, icon: AlertCircle },
      resolved: { label: t('agencyDashboard.statusResolved'), variant: 'default' as const, icon: CheckCircle2 },
      closed: { label: t('agencyDashboard.statusClosed'), variant: 'outline' as const, icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getHelpTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      eligibility: t('requestHelp.helpTypes.eligibility'),
      documents: t('requestHelp.helpTypes.documents'),
      application: t('requestHelp.helpTypes.application'),
      general: t('requestHelp.helpTypes.general'),
    };
    return types[type] || type;
  };

  return (
    <ProtectedRoute requireRole="agency">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">{t('agencyDashboard.title')}</h1>
                <p className="text-muted-foreground">
                  {t('agencyDashboard.subtitle')}
                </p>
              </div>
              <Button variant="outline" onClick={async () => {
                await signOut();
                navigate('/auth');
              }}>Sign Out</Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('agencyDashboard.totalRequests')}</CardTitle>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">{t('agencyDashboard.allRequests')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('agencyDashboard.pending')}</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pending}</div>
                  <p className="text-xs text-muted-foreground">{t('agencyDashboard.needsResponse')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('agencyDashboard.inProgress')}</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.inProgress}</div>
                  <p className="text-xs text-muted-foreground">{t('agencyDashboard.activeWork')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('agencyDashboard.resolved')}</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.resolved}</div>
                  <p className="text-xs text-muted-foreground">{t('agencyDashboard.completed')}</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  {t('agencyDashboard.filters')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={t('agencyDashboard.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-[200px]">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('agencyDashboard.allStatuses')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('agencyDashboard.allStatuses')}</SelectItem>
                        <SelectItem value="pending">{t('agencyDashboard.statusPending')}</SelectItem>
                        <SelectItem value="in_progress">{t('agencyDashboard.statusInProgress')}</SelectItem>
                        <SelectItem value="resolved">{t('agencyDashboard.statusResolved')}</SelectItem>
                        <SelectItem value="closed">{t('agencyDashboard.statusClosed')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Requests List */}
            <Card>
              <CardHeader>
                <CardTitle>{t('agencyDashboard.helpRequests')}</CardTitle>
                <CardDescription>
                  {t('agencyDashboard.helpRequestsDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading...
                  </div>
                ) : helpRequests && helpRequests.length > 0 ? (
                  <div className="space-y-4">
                    {helpRequests.map((request) => (
                      <Card key={request.id} className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">{request.full_name}</h3>
                                {getStatusBadge(request.status)}
                                <Badge variant="outline">{getHelpTypeLabel(request.help_type)}</Badge>
                              </div>
                              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <GraduationCap className="h-4 w-4" />
                                  <span>{request.program_name} - {request.university_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  <span>{request.email}</span>
                                </div>
                                {request.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{request.phone}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{format(new Date(request.created_at), 'PPp')}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              onClick={() => openRequestDetails(request)}
                            >
                              {t('agencyDashboard.viewDetails')}
                            </Button>
                          </div>
                          <p className="text-sm line-clamp-2 text-muted-foreground">
                            {request.message}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{t('agencyDashboard.noRequests')}</h3>
                    <p className="text-muted-foreground">{t('agencyDashboard.noRequestsDescription')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>

      {/* Request Details Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('agencyDashboard.requestDetails')}</DialogTitle>
            <DialogDescription>
              {t('agencyDashboard.requestDetailsDescription')}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              {/* Student Info */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t('agencyDashboard.studentInfo')}
                </h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('requestHelp.fullName')}:</span>
                    <span className="font-medium">{selectedRequest.full_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('requestHelp.email')}:</span>
                    <span className="font-medium">{selectedRequest.email}</span>
                  </div>
                  {selectedRequest.phone && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('requestHelp.phone')}:</span>
                      <span className="font-medium">{selectedRequest.phone}</span>
                    </div>
                  )}
                  {selectedRequest.current_education_level && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('requestHelp.educationLevel')}:</span>
                      <span className="font-medium capitalize">{selectedRequest.current_education_level}</span>
                    </div>
                  )}
                  {selectedRequest.preferred_contact_method && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('requestHelp.contactMethod')}:</span>
                      <span className="font-medium capitalize">{selectedRequest.preferred_contact_method}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Program Info */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  {t('agencyDashboard.programInfo')}
                </h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">University:</span>
                    <span className="font-medium">{selectedRequest.university_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Program:</span>
                    <span className="font-medium">{selectedRequest.program_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('requestHelp.helpType')}:</span>
                    <span className="font-medium">{getHelpTypeLabel(selectedRequest.help_type)}</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {t('agencyDashboard.studentMessage')}
                </h3>
                <p className="text-sm bg-muted/50 p-4 rounded-lg">{selectedRequest.message}</p>
              </div>

              {/* Status Update */}
              <div className="space-y-3">
                <h3 className="font-semibold">{t('agencyDashboard.updateStatus')}</h3>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">{t('agencyDashboard.statusPending')}</SelectItem>
                    <SelectItem value="in_progress">{t('agencyDashboard.statusInProgress')}</SelectItem>
                    <SelectItem value="resolved">{t('agencyDashboard.statusResolved')}</SelectItem>
                    <SelectItem value="closed">{t('agencyDashboard.statusClosed')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Agency Notes */}
              <div className="space-y-3">
                <h3 className="font-semibold">{t('agencyDashboard.agencyNotes')}</h3>
                <Textarea
                  placeholder={t('agencyDashboard.agencyNotesPlaceholder')}
                  value={agencyNotes}
                  onChange={(e) => setAgencyNotes(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Timestamps */}
              <div className="grid gap-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>{t('agencyDashboard.createdAt')}:</span>
                  <span>{format(new Date(selectedRequest.created_at), 'PPp')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('agencyDashboard.updatedAt')}:</span>
                  <span>{format(new Date(selectedRequest.updated_at), 'PPp')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                  {t('requestHelp.cancel')}
                </Button>
                <Button 
                  onClick={handleUpdateRequest}
                  disabled={updateRequestMutation.isPending}
                >
                  {updateRequestMutation.isPending ? 'Saving...' : t('agencyDashboard.saveChanges')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
};

export default AgencyDashboard;
