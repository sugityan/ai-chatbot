// 年の選択肢を生成（1930年から現在まで）
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1929 }, (_, i) => (currentYear - i).toString());
export const YEARS = years.reverse() as readonly string[];

// 月の選択肢を生成（1月から12月）
export const MONTHS = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, '0')
) as readonly string[];

export const PREFECTURES = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
] as const;

export const EDUCATION_TYPES = [
  '大学院卒（博士）',
  '大学院卒（MBA）',
  '大学院卒（修士）',
  '大学卒',
  '高専・専門・短大卒',
  '高校卒',
  'その他',
] as const;

export const GENDERS = ['男性', '女性', '未回答'] as const;

export const LANGUAGE_LEVELS = [
  'ネイティブ',
  'ビジネス会話',
  '日常会話',
  '基礎会話',
  'なし',
] as const;
