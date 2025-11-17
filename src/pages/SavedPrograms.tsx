import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSavedPrograms } from '@/hooks/useSavedPrograms';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Trash2, FileText, ArrowRight, BookmarkCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SavedPrograms() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { savedPrograms, loading, unsaveProgram, updateNotes } = useSavedPrograms();
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  const toggleSelection = (programId: string) => {
    setSelectedForCompare((prev) =>
      prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId]
    );
  };

  const handleCompare = () => {
    navigate('/compare-programs', { state: { programIds: selectedForCompare } });
  };

  const handleSaveNotes = async (programId: string) => {
    await updateNotes(programId, notesText);
    setEditingNotes(null);
  };

  const startEditingNotes = (programId: string, currentNotes: string | null) => {
    setEditingNotes(programId);
    setNotesText(currentNotes || '');
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <BookmarkCheck className="h-8 w-8 text-primary" />
                {t('savedPrograms.title')}
              </h1>
              <p className="text-muted-foreground mt-2">
                {savedPrograms.length} {savedPrograms.length === 1 ? 'program' : 'programs'} saved
              </p>
            </div>
            {selectedForCompare.length >= 2 && (
              <Button onClick={handleCompare} size="lg">
                {t('savedPrograms.compare')} ({selectedForCompare.length})
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {savedPrograms.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">{t('savedPrograms.empty')}</h2>
                <p className="text-muted-foreground mb-6">{t('savedPrograms.emptyDescription')}</p>
                <Button asChild>
                  <Link to="/programs">{t('savedPrograms.browsePrograms')}</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPrograms.map((program) => (
                <Card key={program.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{program.university_name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{program.program_name}</p>
                      </div>
                      <Checkbox
                        checked={selectedForCompare.includes(program.program_id)}
                        onCheckedChange={() => toggleSelection(program.program_id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary">{program.country}</Badge>
                        <Badge variant="outline">{program.degree}</Badge>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Field:</span> {program.field}
                      </p>
                      {program.tuition && (
                        <p className="text-sm">
                          <span className="font-medium">Tuition:</span> {program.tuition}
                        </p>
                      )}
                      {program.duration && (
                        <p className="text-sm">
                          <span className="font-medium">Duration:</span> {program.duration}
                        </p>
                      )}
                    </div>

                    {editingNotes === program.program_id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          placeholder={t('savedPrograms.notePlaceholder')}
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSaveNotes(program.program_id)}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingNotes(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {program.notes && (
                          <div className="bg-muted p-3 rounded-md text-sm mb-2">
                            <p className="text-muted-foreground">{program.notes}</p>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditingNotes(program.program_id, program.notes)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          {program.notes ? 'Edit Note' : t('savedPrograms.addNote')}
                        </Button>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4">
                      <Button asChild className="flex-1">
                        <Link to={`/programs/${program.program_id}`}>View Details</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => unsaveProgram(program.program_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedForCompare.length === 1 && (
            <p className="text-center text-muted-foreground mt-6">{t('savedPrograms.selectToCompare')}</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
