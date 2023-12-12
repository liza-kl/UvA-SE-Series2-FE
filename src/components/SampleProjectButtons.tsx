import { Button, ButtonGroup, Text } from '@geist-ui/core';

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

export const SampleProjectButtons = ({ projects }: SampleProjectProps) => {
  return (
    <>
      <Text h2>Sample projects</Text>
      <Text p>
        Or choose one of the sample projects below (the number refers to the
        different mass thresholds)
      </Text>
      {projects.map((project) => (
        <>
          <Text h3>{project.sampleProjectLabel}</Text>
          <ButtonGroup type="secondary">
            {project.sampleProjects.map((proj) => (
              <>
                <Button onClick={proj.btnAction}>{proj.btnLabel}</Button>
              </>
            ))}
          </ButtonGroup>
        </>
      ))}
    </>
  );
};
