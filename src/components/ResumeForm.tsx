"use client";

import { ResumeFormProvider } from "@/components/form/ResumeFormProvider";
import { BasicInfoSection } from "@/components/sections/BasicInfoSection";
import { SummarySection } from "@/components/sections/SummarySection";
import { WorkHistorySection } from "@/components/sections/WorkHistorySection";
import { EducationSection } from "@/components/sections/EducationSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { LanguageAndOverseasSection } from "@/components/sections/LanguageAndOverseasSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { NotesSection } from "@/components/sections/NotesSection";

export function ResumeForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        職務経歴書作成
      </h1>

      <ResumeFormProvider>
        <div className="space-y-6 sm:space-y-8">
          <BasicInfoSection />
          <SummarySection />
          <WorkHistorySection />
          <EducationSection />
          <AwardsSection />
          <LanguageAndOverseasSection />
          <CertificationsSection />
          <NotesSection />
        </div>
      </ResumeFormProvider>
    </div>
  );
}
