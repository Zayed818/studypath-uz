import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSavedPrograms } from '@/hooks/useSavedPrograms';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function ComparePrograms() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { savedPrograms } = useSavedPrograms();
  const [programsToCompare, setProgramsToCompare] = useState<any[]>([]);

  useEffect(() => {
    const programIds = location.state?.programIds || [];
    if (programIds.length < 2) {
      navigate('/saved-programs');
      return;
    }

    const programs = savedPrograms.filter((p) => programIds.includes(p.program_id));
    setProgramsToCompare(programs);
  }, [location.state, savedPrograms, navigate]);

  if (programsToCompare.length < 2) {
    return null;
  }

  const comparisonRows = [
    { label: t('savedPrograms.compare.university'), key: 'university_name' },
    { label: t('savedPrograms.compare.program'), key: 'program_name' },
    { label: t('savedPrograms.compare.country'), key: 'country' },
    { label: t('savedPrograms.compare.degree'), key: 'degree' },
    { label: t('savedPrograms.compare.field'), key: 'field' },
    { label: t('savedPrograms.compare.tuition'), key: 'tuition' },
    { label: t('savedPrograms.compare.duration'), key: 'duration' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/saved-programs')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('savedPrograms.compare.backToSaved')}
            </Button>
            <h1 className="text-3xl font-bold mt-4">{t('savedPrograms.compare.title')}</h1>
            <p className="text-muted-foreground mt-2">
              Comparing {programsToCompare.length} programs
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${programsToCompare.length}, 1fr)` }}>
                {/* Header Row */}
                <div className="font-semibold"></div>
                {programsToCompare.map((program) => (
                  <Card key={program.id}>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">{program.university_name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{program.program_name}</p>
                    </CardHeader>
                  </Card>
                ))}

                {/* Comparison Rows */}
                {comparisonRows.map((row) => (
                  <>
                    <div key={`label-${row.key}`} className="font-semibold py-4 flex items-center">
                      {row.label}
                    </div>
                    {programsToCompare.map((program) => {
                      const value = program[row.key] || 'N/A';
                      const allValues = programsToCompare.map((p) => p[row.key]);
                      const isDifferent = new Set(allValues).size > 1;

                      return (
                        <div
                          key={`${program.id}-${row.key}`}
                          className={`py-4 px-4 rounded-md ${
                            isDifferent ? 'bg-yellow-50 dark:bg-yellow-950/20' : ''
                          }`}
                        >
                          {row.key === 'country' || row.key === 'degree' ? (
                            <Badge variant={isDifferent ? 'default' : 'secondary'}>{value}</Badge>
                          ) : (
                            <p className="text-sm">{value}</p>
                          )}
                        </div>
                      );
                    })}
                  </>
                ))}

                {/* Notes Row */}
                <div className="font-semibold py-4 flex items-center">Personal Notes</div>
                {programsToCompare.map((program) => (
                  <div key={`notes-${program.id}`} className="py-4 px-4">
                    {program.notes ? (
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                        {program.notes}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No notes</p>
                    )}
                  </div>
                ))}

                {/* Action Row */}
                <div className="font-semibold py-4"></div>
                {programsToCompare.map((program) => (
                  <div key={`action-${program.id}`} className="py-4">
                    <div className="space-y-2">
                      <Button asChild className="w-full">
                        <Link to={`/programs/${program.program_id}`}>
                          View Details
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/apply/${program.program_id}`}>
                          {t('savedPrograms.compare.applyNow')}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
