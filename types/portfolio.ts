export interface DevLogItem {
  id: string;
  isPinned?: boolean;
  date: string;
  category: string;
  title: string;
  body: string;
  description?: string | string[];
  logoUrl?: string;
  company?: string;
  type?: string;
  duration?: string;
  location?: string;
  tools?: {
    name: string;
    iconName: string;
    color: string;
  }[];
  codeSnippet?: {
    title: string;
    lang: string;
    content: string;
  } | null;
  tags?: string[];
  liveUrl?: string | null;
  codeUrl?: string | null;
  screenshots?: Screenshot[];
}

export interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface GitHubPR {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
}
