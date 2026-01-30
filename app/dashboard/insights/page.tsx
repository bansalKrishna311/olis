"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Lock, Sparkles } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

        .font-modern {
          font-family: 'Sora', sans-serif;
        }
      `}</style>

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 font-modern">
          Insights
        </h1>
        <p className="text-gray-500 font-modern mt-1">
          AI-powered analysis of your LinkedIn presence
        </p>
      </div>

      {/* Locked state */}
      <Card className="border-0 shadow-sm">
        <CardContent className="py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-gray-300" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Lock className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 font-modern mb-2">
            Coming Soon
          </h2>
          <p className="text-gray-500 font-modern max-w-md mx-auto">
            AI-powered insights will help you understand your writing patterns, 
            audience engagement, and content opportunities. This feature is currently 
            in development.
          </p>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
            <h3 className="text-sm font-medium text-gray-700 font-modern mb-3">
              What you'll get:
            </h3>
            <ul className="text-sm text-gray-600 font-modern space-y-2 text-left">
              <li className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                Voice tone analysis across your posts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                Content pattern recognition
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                Engagement predictions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                Personalized recommendations
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
