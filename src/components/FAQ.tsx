import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { theme as themeObj } from '../styles/theme';

interface FAQProps {
  theme: 'light' | 'dark';
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is Taf Downloader free to use?",
    answer: "Yes, Taf Downloader is completely free to use for personal purposes. There are no hidden fees or subscriptions required."
  },
  {
    question: "Is it legal to download videos?",
    answer: "It's legal to download videos for personal use in many cases, especially if they are not copyright protected. However, you should always respect copyright laws and the terms of service of the platform you're downloading from."
  },
  {
    question: "What video formats are supported?",
    answer: "Taf Downloader supports downloading videos in MP4 format with various quality options, from 360p up to 1080p depending on the original video quality."
  },
  {
    question: "Can I download private or age-restricted videos?",
    answer: "No, Taf Downloader can only download publicly available videos that don't require special authentication."
  },
  {
    question: "Why isn't the download starting?",
    answer: "This could be due to several reasons: the URL might be incorrect, the video might be private or age-restricted, or there might be temporary issues with our service. Please try again or contact support if the problem persists."
  }
];

const FAQ: React.FC<FAQProps> = ({ theme }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`py-10 px-2 sm:py-14 sm:px-4 md:py-16 md:px-6 ${themeObj.section[theme]}`}> 
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className={`text-base sm:text-lg ${themeObj.text.tertiary}`}>Get answers to common questions about our video downloader.</p>
        </div>
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${themeObj.card[theme]} backdrop-blur-sm p-6 rounded-2xl ${themeObj.shadow[theme]} hover:${themeObj.shadow[theme]} transition-all duration-500 glow-card pulse-hover`}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-medium ${themeObj.text.secondary}`}>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-blue-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className={`${themeObj.text.secondary}`}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;