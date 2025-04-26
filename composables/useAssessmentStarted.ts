export const useAssessmentStarted = () => {
  const assessment = useAssessment();
  return computed(() => {
    return !!assessment.value;
  });
}
