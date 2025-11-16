import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { User, GraduationCap, FileText, BarChart } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { role, isAdmin, isAgency } = useUserRole();
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.email}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
                  <CardDescription>Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Role: <span className="font-semibold capitalize">{role}</span>
                  </p>
                  <Button variant="outline" className="w-full">View Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    My Applications
                  </CardTitle>
                  <CardDescription>Track your application status</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    You have 0 active applications
                  </p>
                  <Button variant="outline" className="w-full">View Applications</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Programs
                  </CardTitle>
                  <CardDescription>Explore available programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse programs and scholarships
                  </p>
                  <Button variant="outline" className="w-full">Browse Programs</Button>
                </CardContent>
              </Card>
            </div>

            {(isAdmin || isAgency) && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  {isAdmin ? 'Admin' : 'Agency'} Tools
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {isAdmin && (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            User Management
                          </CardTitle>
                          <CardDescription>Manage users and roles</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full" onClick={() => window.location.href = '/admin'}>
                            Open Admin Panel
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart className="h-5 w-5" />
                            Analytics
                          </CardTitle>
                          <CardDescription>View system analytics</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full">View Analytics</Button>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {isAgency && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Agency Dashboard
                        </CardTitle>
                        <CardDescription>Manage student applications</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full" onClick={() => window.location.href = '/agency'}>
                          Open Agency Panel
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8">
              <Button variant="outline" onClick={async () => {
                await signOut();
                navigate('/auth');
              }}>Sign Out</Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
