import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, RefreshCw, Loader2 } from 'lucide-react';
import { hollandTypes, HollandCode } from '@/lib/careerQuizData';

interface SavedResult {
  id: string;
  holland_scores: Record<string, number>;
  top_holland_codes: string;
  top_careers: Array<{
    title: string;
    matchPercentage: number;
    hollandCode: string;
  }>;
  created_at: string;
}

const SavedQuizResults = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [result, setResult] = useState<SavedResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('career_quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .maybeSingle();

      if (!error && data) {
        setResult({
          ...data,
          holland_scores: data.holland_scores as Record<string, number>,
          top_careers: data.top_careers as SavedResult['top_careers']
        });
      }
      setLoading(false);
    };

    fetchResults();
  }, [user]);

  const getHollandCodeName = (code: string): string => {
    const typeInfo = hollandTypes[code as HollandCode];
    if (!typeInfo) return code;
    if (language === 'uz') return typeInfo.nameUz;
    if (language === 'ru') return typeInfo.nameRu;
    return typeInfo.name;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            {t('dashboard.quizResults')}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            {t('dashboard.quizResults')}
          </CardTitle>
          <CardDescription>{t('dashboard.noQuizResults')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {t('dashboard.takeQuizPrompt')}
          </p>
          <Button className="w-full" onClick={() => navigate('/careers')}>
            {t('dashboard.takeQuiz')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const topCodes = result.top_holland_codes.split('');
  const maxScore = Math.max(...Object.values(result.holland_scores));

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              {t('dashboard.quizResults')}
            </CardTitle>
            <CardDescription>
              {t('dashboard.savedOn')} {formatDate(result.created_at)}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/careers')}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('careers.quiz.retake')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personality Type */}
        <div>
          <h4 className="text-sm font-medium mb-2">{t('careers.quiz.yourType')}</h4>
          <div className="flex gap-2 flex-wrap">
            {topCodes.map((code, index) => (
              <Badge key={code} variant={index === 0 ? 'default' : 'secondary'} className="text-sm">
                {code} - {getHollandCodeName(code)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Score Breakdown */}
        <div>
          <h4 className="text-sm font-medium mb-3">{t('careers.quiz.score')}</h4>
          <div className="grid gap-2">
            {Object.entries(result.holland_scores)
              .sort(([, a], [, b]) => b - a)
              .map(([code, score]) => (
                <div key={code} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-24 truncate">
                    {getHollandCodeName(code)}
                  </span>
                  <Progress value={(score / maxScore) * 100} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-8 text-right">{score}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Top Careers */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {t('dashboard.topCareers')}
          </h4>
          <div className="grid gap-2">
            {result.top_careers.slice(0, 5).map((career, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
              >
                <span className="text-sm font-medium">{career.title}</span>
                <Badge variant="outline" className="text-xs">
                  {career.matchPercentage}% {t('careers.quiz.match')}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={() => navigate('/careers')}>
          {t('dashboard.viewFullResults')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SavedQuizResults;
