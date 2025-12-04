import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2, Copy, Check, Twitter, Facebook, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShareResultsButtonsProps {
  hollandCodes: string;
  topCareerTitle: string;
  matchPercentage: number;
}

export const ShareResultsButtons = ({
  hollandCodes,
  topCareerTitle,
  matchPercentage,
}: ShareResultsButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  // Create shareable URL with encoded results
  const shareUrl = `${window.location.origin}/careers?type=${hollandCodes}`;
  
  // Create share text
  const shareText = t('careers.quiz.shareText')
    .replace('{codes}', hollandCodes)
    .replace('{career}', topCareerTitle)
    .replace('{percentage}', matchPercentage.toString());

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(t('careers.quiz.linkCopied'));
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(t('careers.quiz.copyError'));
    }
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          {t('careers.quiz.share')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="center">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-center mb-1">
            {t('careers.quiz.shareResults')}
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="h-9 w-9"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={shareOnTwitter}
              className="h-9 w-9 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={shareOnFacebook}
              className="h-9 w-9 hover:bg-[#4267B2]/10 hover:text-[#4267B2] hover:border-[#4267B2]"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={shareOnLinkedIn}
              className="h-9 w-9 hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:border-[#0077B5]"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
