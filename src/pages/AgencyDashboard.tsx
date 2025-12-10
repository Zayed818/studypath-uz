import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Search, Clock, CheckCircle, AlertCircle, User, Mail, Phone, GraduationCap, FileText, MessageSquare, Loader2 } from 'lucide-react';

interface HelpRequest {
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
  resolved_at: string | null;
}

interface Application {
  id: string;
  user_id: string | null;
  program_id: string;
  university_name: string;
  program_name: string;
  program_degree_level: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string | null;
  nationality: string;
  city: string;
  date_of_birth: string | null;
  current_education_level: string | null;
  gpa: string | null;
  english_test: string | null;
  english_score: string | null;
  budget_range: string | null;
  scholarship_interest: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

const AgencyDashboard = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('requests');
  const [requestSearch, setRequestSearch] = useState('');
  const [requestStatusFilter, setRequestStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');
  const [requestNotes, setRequestNotes] = useState('');
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [appDialogOpen, setAppDialogOpen] = useState(false);
  const [appStatus, setAppStatus] = useState('');

  const { data: helpRequests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ['help-requests', requestStatusFilter, requestSearch],
    queryFn: async () => {
      let query = supabase.from('help_requests').select('*').order('created_at', { ascending: false });
      if (requestStatusFilter !== 'all') query = query.eq('status', requestStatusFilter);
      if (requestSearch) query = query.or(`full_name.ilike.%${requestSearch}%,email.ilike.%${requestSearch}%,program_name.ilike.%${requestSearch}%`);
      const { data, error } = await query;
      if (error) throw error;
      return data as HelpRequest[];
    },
  });

  const { data: applications = [], isLoading: applicationsLoading } = useQuery({
    queryKey: ['applications', appStatusFilter, appSearch],
    queryFn: async () => {
      let query = supabase.from('applications').select('*').order('created_at', { ascending: false });
      if (appStatusFilter !== 'all') query = query.eq('status', appStatusFilter);
      if (appSearch) query = query.or(`first_name.ilike.%${appSearch}%,last_name.ilike.%${appSearch}%,email.ilike.%${appSearch}%,program_name.ilike.%${appSearch}%`);
      const { data, error } = await query;
      if (error) throw error;
      return data as Application[];
    },
  });

  const updateRequestMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes: string }) => {
      const updateData: any = { status, agency_notes: notes, updated_at: new Date().toISOString() };
      if (status === 'resolved') updateData.resolved_at = new Date().toISOString();
      const { error } = await supabase.from('help_requests').update(updateData).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['help-requests'] }); toast.success('Request updated'); setRequestDialogOpen(false); },
    onError: () => toast.error('Failed to update request'),
  });

  const updateAppMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('applications').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['applications'] }); toast.success('Application updated'); setAppDialogOpen(false); },
    onError: () => toast.error('Failed to update application'),
  });

  const requestStats = { total: helpRequests.length, pending: helpRequests.filter(r => r.status === 'pending').length, inProgress: helpRequests.filter(r => r.status === 'in_progress').length, resolved: helpRequests.filter(r => r.status === 'resolved').length };
  const appStats = { total: applications.length, submitted: applications.filter(a => a.status === 'submitted').length, reviewing: applications.filter(a => a.status === 'reviewing').length, accepted: applications.filter(a => a.status === 'accepted').length, rejected: applications.filter(a => a.status === 'rejected').length };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': case 'submitted': return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> {status === 'pending' ? 'Pending' : 'Submitted'}</Badge>;
      case 'in_progress': case 'reviewing': return <Badge className="flex items-center gap-1 bg-blue-500"><AlertCircle className="h-3 w-3" /> {status === 'in_progress' ? 'In Progress' : 'Reviewing'}</Badge>;
      case 'resolved': case 'accepted': return <Badge className="flex items-center gap-1 bg-green-500"><CheckCircle className="h-3 w-3" /> {status === 'resolved' ? 'Resolved' : 'Accepted'}</Badge>;
      case 'rejected': return <Badge variant="destructive" className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Rejected</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getHelpTypeLabel = (type: string) => ({ eligibility: 'Eligibility Check', documents: 'Document Help', application_process: 'Application Process', general: 'General Inquiry' }[type] || type);

  return (
    <ProtectedRoute requireRole="agency">
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Agency Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage student help requests and applications</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="requests"><MessageSquare className="h-4 w-4 mr-2" />Help Requests ({requestStats.total})</TabsTrigger>
              <TabsTrigger value="applications"><FileText className="h-4 w-4 mr-2" />Applications ({appStats.total})</TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card><CardHeader className="pb-2"><CardDescription>Total</CardDescription><CardTitle className="text-2xl">{requestStats.total}</CardTitle></CardHeader></Card>
                <Card><CardHeader className="pb-2"><CardDescription>Pending</CardDescription><CardTitle className="text-2xl text-yellow-600">{requestStats.pending}</CardTitle></CardHeader></Card>
                <Card><CardHeader className="pb-2"><CardDescription>In Progress</CardDescription><CardTitle className="text-2xl text-blue-600">{requestStats.inProgress}</CardTitle></CardHeader></Card>
                <Card><CardHeader className="pb-2"><CardDescription>Resolved</CardDescription><CardTitle className="text-2xl text-green-600">{requestStats.resolved}</CardTitle></CardHeader></Card>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={requestSearch} onChange={(e) => setRequestSearch(e.target.value)} className="pl-10" /></div>
                <Select value={requestStatusFilter} onValueChange={setRequestStatusFilter}><SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="resolved">Resolved</SelectItem></SelectContent></Select>
              </div>
              {requestsLoading ? <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : helpRequests.length === 0 ? <Card><CardContent className="py-12 text-center"><MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" /><p className="text-muted-foreground">No help requests found</p></CardContent></Card> : (
                <div className="space-y-4">{helpRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setSelectedRequest(request); setRequestStatus(request.status); setRequestNotes(request.agency_notes || ''); setRequestDialogOpen(true); }}>
                    <CardContent className="p-4"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div className="space-y-1"><div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{request.full_name}</span>{getStatusBadge(request.status)}</div><p className="text-sm text-muted-foreground">{request.university_name} - {request.program_name}</p><div className="flex items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {request.email}</span></div></div><div className="text-right"><Badge variant="outline">{getHelpTypeLabel(request.help_type)}</Badge><p className="text-xs text-muted-foreground mt-1">{new Date(request.created_at).toLocaleDateString()}</p></div></div></CardContent>
                  </Card>
                ))}</div>
              )}
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card><CardHeader className="pb-2"><CardDescription>Total</CardDescription><CardTitle className="text-2xl">{appStats.total}</CardTitle></CardHeader></Card>
                <Card><CardHeader className="pb-2"><CardDescription>Submitted</CardDescription><CardTitle className="text-2xl text-yellow-600">{appStats.submitted}</CardTitle></CardHeader></Card>
                <Card><CardHeader className="pb-2"><CardDescription>Reviewing</CardDescription><CardTitle className="text-2xl text-blue-600">{appStats.reviewing}</CardTitle></CardHeader></Card>
                <Card><CardHeader className="pb-2"><CardDescription>Accepted</CardDescription><CardTitle className="text-2xl text-green-600">{appStats.accepted}</CardTitle></CardHeader></Card>
                <Card><CardHeader className="pb-2"><CardDescription>Rejected</CardDescription><CardTitle className="text-2xl text-red-600">{appStats.rejected}</CardTitle></CardHeader></Card>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={appSearch} onChange={(e) => setAppSearch(e.target.value)} className="pl-10" /></div>
                <Select value={appStatusFilter} onValueChange={setAppStatusFilter}><SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="submitted">Submitted</SelectItem><SelectItem value="reviewing">Reviewing</SelectItem><SelectItem value="accepted">Accepted</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent></Select>
              </div>
              {applicationsLoading ? <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : applications.length === 0 ? <Card><CardContent className="py-12 text-center"><FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" /><p className="text-muted-foreground">No applications found</p></CardContent></Card> : (
                <div className="space-y-4">{applications.map((app) => (
                  <Card key={app.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setSelectedApp(app); setAppStatus(app.status); setAppDialogOpen(true); }}>
                    <CardContent className="p-4"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div className="space-y-1"><div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{app.first_name} {app.last_name}</span>{getStatusBadge(app.status)}</div><p className="text-sm text-muted-foreground">{app.university_name} - {app.program_name}</p><div className="flex items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {app.email}</span><span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {app.phone}</span></div></div><div className="text-right"><div className="flex items-center gap-1 text-sm"><GraduationCap className="h-4 w-4 text-muted-foreground" /><span>{app.program_degree_level || 'N/A'}</span></div><p className="text-xs text-muted-foreground mt-1">{new Date(app.created_at).toLocaleDateString()}</p></div></div></CardContent>
                  </Card>
                ))}</div>
              )}
            </TabsContent>
          </Tabs>

          <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>Help Request Details</DialogTitle><DialogDescription>Review and manage this request</DialogDescription></DialogHeader>
              {selectedRequest && (<div className="space-y-6">
                <div className="grid grid-cols-2 gap-4"><div><Label className="text-muted-foreground">Full Name</Label><p className="font-medium">{selectedRequest.full_name}</p></div><div><Label className="text-muted-foreground">Email</Label><p className="font-medium">{selectedRequest.email}</p></div><div><Label className="text-muted-foreground">Phone</Label><p className="font-medium">{selectedRequest.phone || 'N/A'}</p></div><div><Label className="text-muted-foreground">Preferred Contact</Label><p className="font-medium capitalize">{selectedRequest.preferred_contact_method || 'N/A'}</p></div></div>
                <div className="bg-muted/50 p-4 rounded-lg"><Label className="text-muted-foreground">Program</Label><p className="font-medium">{selectedRequest.program_name}</p><p className="text-sm text-muted-foreground">{selectedRequest.university_name}</p></div>
                <div><Label className="text-muted-foreground">Help Type</Label><Badge variant="outline" className="ml-2">{getHelpTypeLabel(selectedRequest.help_type)}</Badge></div>
                <div><Label className="text-muted-foreground">Message</Label><p className="mt-1 p-3 bg-muted/50 rounded-lg">{selectedRequest.message}</p></div>
                <div className="space-y-4 border-t pt-4">
                  <div><Label>Status</Label><Select value={requestStatus} onValueChange={setRequestStatus}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="resolved">Resolved</SelectItem></SelectContent></Select></div>
                  <div><Label>Agency Notes</Label><Textarea value={requestNotes} onChange={(e) => setRequestNotes(e.target.value)} placeholder="Add notes..." className="mt-1" rows={4} /></div>
                  <Button onClick={() => updateRequestMutation.mutate({ id: selectedRequest.id, status: requestStatus, notes: requestNotes })} disabled={updateRequestMutation.isPending} className="w-full">{updateRequestMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Changes'}</Button>
                </div>
              </div>)}
            </DialogContent>
          </Dialog>

          <Dialog open={appDialogOpen} onOpenChange={setAppDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>Application Details</DialogTitle><DialogDescription>Review and manage this application</DialogDescription></DialogHeader>
              {selectedApp && (<div className="space-y-6">
                <div className="grid grid-cols-2 gap-4"><div><Label className="text-muted-foreground">Full Name</Label><p className="font-medium">{selectedApp.first_name} {selectedApp.last_name}</p></div><div><Label className="text-muted-foreground">Email</Label><p className="font-medium">{selectedApp.email}</p></div><div><Label className="text-muted-foreground">Phone</Label><p className="font-medium">{selectedApp.phone}</p></div><div><Label className="text-muted-foreground">Nationality</Label><p className="font-medium">{selectedApp.nationality}</p></div><div><Label className="text-muted-foreground">City</Label><p className="font-medium">{selectedApp.city}</p></div>{selectedApp.date_of_birth && <div><Label className="text-muted-foreground">Date of Birth</Label><p className="font-medium">{new Date(selectedApp.date_of_birth).toLocaleDateString()}</p></div>}</div>
                <div className="bg-muted/50 p-4 rounded-lg"><Label className="text-muted-foreground">Program</Label><p className="font-medium">{selectedApp.program_name}</p><p className="text-sm text-muted-foreground">{selectedApp.university_name}</p>{selectedApp.program_degree_level && <Badge variant="outline" className="mt-2">{selectedApp.program_degree_level}</Badge>}</div>
                <div className="grid grid-cols-2 gap-4">{selectedApp.current_education_level && <div><Label className="text-muted-foreground">Education Level</Label><p className="font-medium">{selectedApp.current_education_level}</p></div>}{selectedApp.gpa && <div><Label className="text-muted-foreground">GPA</Label><p className="font-medium">{selectedApp.gpa}</p></div>}{selectedApp.english_test && <div><Label className="text-muted-foreground">English Test</Label><p className="font-medium">{selectedApp.english_test} {selectedApp.english_score && `- ${selectedApp.english_score}`}</p></div>}<div><Label className="text-muted-foreground">Scholarship Interest</Label><p className="font-medium">{selectedApp.scholarship_interest ? 'Yes' : 'No'}</p></div></div>
                <div className="space-y-4 border-t pt-4">
                  <div><Label>Application Status</Label><Select value={appStatus} onValueChange={setAppStatus}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="submitted">Submitted</SelectItem><SelectItem value="reviewing">Reviewing</SelectItem><SelectItem value="accepted">Accepted</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent></Select></div>
                  <Button onClick={() => updateAppMutation.mutate({ id: selectedApp.id, status: appStatus })} disabled={updateAppMutation.isPending} className="w-full">{updateAppMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Update Status'}</Button>
                </div>
                <div className="text-xs text-muted-foreground border-t pt-4"><p>Submitted: {new Date(selectedApp.created_at).toLocaleString()}</p></div>
              </div>)}
            </DialogContent>
          </Dialog>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AgencyDashboard;
