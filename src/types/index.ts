export interface CodeSnippet {
  id: number;
  language: string;
  title: string;
  description: string;
  code: string;
}

export interface FileGeneration {
  id: number;
  name: string;
  path: string;
  type: 'component' | 'util' | 'config' | 'style' | 'page';
  status: 'pending' | 'generating' | 'complete';
  description?: string;
}

export interface DesignSystemItem {
  id: number;
  name: string;
  description: string;
  type: 'color' | 'typography' | 'component' | 'layout' | 'spacing';
  status: 'thinking' | 'decided';
}

export interface UserInput {
  projectName: string;
  projectType: string;
  features: string[];
  theme: string;
  email?: string;
}