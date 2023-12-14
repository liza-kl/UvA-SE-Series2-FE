import { Button, ButtonGroup, Text } from '@geist-ui/core';
import { SampleProjectProps } from './SampleProjectButtons.types';

export const SampleProjectButtons = ({ projects }: SampleProjectProps) => {
  return (
    <>
      <Text h2 mt={1}>
        Sample projects
      </Text>
      <Text p>
        Or choose one of the sample projects below (the number refers to the
        different mass thresholds)
      </Text>
      {projects.map((project) => (
        <>
          <Text h3>{project.sampleProjectLabel}</Text>
          <ButtonGroup type="secondary" key={project.sampleProjectLabel}>
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
