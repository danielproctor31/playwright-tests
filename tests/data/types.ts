export interface BlogPost {
  title: string;
  url: string;
  publishDate?: string;
  tags?: string[];
}

export interface SiteNavigation {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
}
