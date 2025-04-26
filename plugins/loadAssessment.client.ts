export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    await new Promise(loadAssessment);
  });
});
