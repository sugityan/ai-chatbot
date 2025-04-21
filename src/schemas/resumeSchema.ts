import { z } from "zod";
import {
  EDUCATION_TYPES,
  GENDERS,
  LANGUAGE_LEVELS,
  PREFECTURES,
} from "@/constants";

const prefectureSchema = z.enum(PREFECTURES);
const skillSchema = z.string().min(1, "スキルを入力してください");

export const resumeSchema = z.object({
  // 基本情報
  basicInfo: z.object({
    lastName: z.string().min(1, "姓を入力してください"),
    firstName: z.string().min(1, "名を入力してください"),
    lastNameKana: z.string().min(1, "姓（カナ）を入力してください"),
    firstNameKana: z.string().min(1, "名（カナ）を入力してください"),
    gender: z.enum(GENDERS),
    birthDate: z.string().min(1, "生年月日を入力してください"),
    phoneNumber: z.string().min(1, "電話番号を入力してください"),
    prefecture: prefectureSchema,
    currentSalary: z.number().min(0, "現在の年収を入力してください"),
    managementExperience: z
      .number()
      .min(0, "マネジメント経験人数を入力してください"),
    // Originally, we set the minimum number of preferred locations to 1.
    // However, this caused a bug on the client side where the submit button wouldn’t respond
    // and no error message was shown if nothing was selected.
    // Since we’re using a select tab on the client,
    // it doesn’t trigger the required validation if no option is selected at first.
    // So we changed the minimum to 0.

    // TODO: Restore this to `.min(1)` once the client implements a check after button push
    // that ensures all inputs and selects have some value before submitting the form.
    preferredLocations: z
      .array(prefectureSchema)
      .min(0, "希望勤務地を入力してください"),
    desiredSalary: z.number().min(0, "希望年収を入力してください"),
  }),

  // 職務要約・スキル
  summary: z.object({
    description: z.string().min(1, "職務要約を入力してください"),
    skills: z.array(skillSchema).min(1, "スキルを1つ以上入力してください"),
  }),

  // 職務経歴
  workHistory: z.array(
    z.object({
      companyName: z.string().min(1, "企業名を入力してください"),
      departmentAndPosition: z
        .string()
        .min(1, "部署・役職名を入力してください"),
      startDate: z.object({
        year: z.string().min(1, "入社年を選択してください"),
        month: z.string().min(1, "入社月を選択してください"),
      }),
      endDate: z.object({
        year: z.string().min(1, "退社年を選択してください"),
        month: z.string().min(1, "退社月を選択してください"),
      }),
      isCurrently: z.boolean(),
      projects: z.array(
        z.object({
          name: z.string().min(1, "プロジェクト名を入力してください"),
          startDate: z.object({
            year: z.string().min(1, "開始年を選択してください"),
            month: z.string().min(1, "開始月を選択してください"),
          }),
          endDate: z.object({
            year: z.string().min(1, "終了年を選択してください"),
            month: z.string().min(1, "終了月を選択してください"),
          }),
          isCurrent: z.boolean(),
          description: z.string().min(1, "業務内容を入力してください"),
        })
      ),
    })
  ),

  // 学歴
  education: z.array(
    z.object({
      id: z.string().optional(),
      type: z.enum(EDUCATION_TYPES),
      graduationDate: z.object({
        year: z.string().min(1, "卒業年を選択してください"),
        month: z.string().min(1, "卒業月を選択してください"),
      }),
      schoolName: z.string().min(1, "学校名を入力してください"),
      majorSubject: z.string().min(1, "学部/学科/専攻を入力してください"),
    })
  ),

  // 表彰
  awards: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, "表彰名を入力してください"),
      year: z.string().min(1, "受賞年を入力してください"),
      description: z.string().min(1, "概要を入力してください"),
    })
  ),

  // 語学力・海外経験
  languageAndOverseas: z.object({
    languages: z.array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1, "言語を入力してください"),
        level: z.enum(LANGUAGE_LEVELS),
      })
    ),
    studyAbroad: z.array(
      z.object({
        id: z.string().optional(),
        country: z.string().min(1, "国名を入力してください"),
        years: z.number().min(0, "年数を入力してください"),
      })
    ),
    workAbroad: z.array(
      z.object({
        id: z.string().optional(),
        country: z.string().min(1, "国名を入力してください"),
        years: z.number().min(0, "年数を入力してください"),
      })
    ),
  }),

  // 資格
  certifications: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, "資格名を入力してください"),
      acquisitionYear: z.number().min(1, "取得年を入力してください"),
    })
  ),

  // 特記事項
  specialNotes: z.string(),

  // フリーフォーマット
  freeFormat: z.string(),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
