export interface ButtonProps {
  btnLabel: string;
  btnAction: () => void;
}

export type SampleProjectElem = {
  sampleProjectLabel: string;
  sampleProjects: ButtonProps[];
};

export interface SampleProjectProps {
  projects: SampleProjectElem[];
}
