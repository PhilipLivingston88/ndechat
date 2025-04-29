export interface BlogPost {
  id: string;
  title: string;
  category: 'science' | 'research'; // 'science' 对应科学思辨板块，'research' 对应重要研究见解
  content: string;
  summary?: string;
  coverImage?: string;
  author?: string;
  publishDate: string;
  tags?: string[];
  media?: {
    images?: string[];
    audio?: string[];
    video?: string[];
    links?: {
      url: string;
      title: string;
      type: 'youtube' | 'other';
    }[];
  };
}