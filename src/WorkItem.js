class WorkItem {
  #idWorkItem;
  #title;
  #originalEstimate = 0;
  #remainingWork = 0;
  #spentWork = 0;
  #spentWorkNF = 0;
  #timeEstimateAnalysis = 0;
  #remainingWorkAnalysis = 0;
  #spentWorkAnalysis = 0;
  #timeEstimateDevelopment = 0;
  #remainingWorkDevelopment = 0;
  #spentWorkDevelopment = 0;
  #timeEstimateHomologation = 0;
  #remainingWorkHomologation = 0;
  #spentWorkHomologation = 0;

  /**
   * @param {Number} idWorkItem
   */
  set idWorkItem (idWorkItem) {
    this.#idWorkItem = idWorkItem;
  };

  get idWorkItem () {
    return this.#idWorkItem;
  };

  /**
   * @param {String} title
   */
   set title (title) {
    this.#title = title;
  };

  get title () {
    return this.#title;
  };

  /**
   * @param {Number} originalEstimate
   */
   set originalEstimate (originalEstimate) {
    this.#originalEstimate = originalEstimate;
  };

  get originalEstimate () {
    return this.#originalEstimate;
  };

  /**
   * @param {Number} remainingWork
   */
   set remainingWork (remainingWork) {
    this.#remainingWork = remainingWork;
  };

  get remainingWork () {
    return this.#remainingWork;
  };

  /**
   * @param {Number} spentWork
   */
   set spentWork (spentWork) {
    this.#spentWork = spentWork;
  };

  get spentWork () {
    return this.#spentWork;
  };

  /**
   * @param {Number} spentWorkNF
   */
   set spentWorkNF (spentWorkNF) {
    this.#spentWorkNF = spentWorkNF;
  };

  get spentWorkNF () {
    return this.#spentWorkNF;
  };

  /**
   * @param {Number} timeEstimateAnalysis
   */
   set timeEstimateAnalysis (timeEstimateAnalysis) {
    this.#timeEstimateAnalysis = timeEstimateAnalysis;
  };

  get timeEstimateAnalysis () {
    return this.#timeEstimateAnalysis;
  };

  /**
   * @param {Number} remainingWorkAnalysis
   */
   set remainingWorkAnalysis (remainingWorkAnalysis) {
    this.#remainingWorkAnalysis = remainingWorkAnalysis;
  };

  get remainingWorkAnalysis () {
    return this.#remainingWorkAnalysis;
  };

  /**
   * @param {Number} spentWorkAnalysis
   */
   set spentWorkAnalysis (spentWorkAnalysis) {
    this.#spentWorkAnalysis = spentWorkAnalysis;
  };

  get spentWorkAnalysis () {
    return this.#spentWorkAnalysis;
  };

  /**
   * @param {Number} timeEstimateDevelopment
   */
   set timeEstimateDevelopment (timeEstimateDevelopment) {
    this.#timeEstimateDevelopment = timeEstimateDevelopment;
  };

  get timeEstimateDevelopment () {
    return this.#timeEstimateDevelopment;
  };

  /**
   * @param {Number} remainingWorkDevelopment
   */
   set remainingWorkDevelopment (remainingWorkDevelopment) {
    this.#remainingWorkDevelopment = remainingWorkDevelopment;
  };

  get remainingWorkDevelopment () {
    return this.#remainingWorkDevelopment;
  };

  /**
   * @param {Number} spentWorkDevelopment
   */
   set spentWorkDevelopment (spentWorkDevelopment) {
    this.#spentWorkDevelopment = spentWorkDevelopment;
  };

  get spentWorkDevelopment () {
    return this.#spentWorkDevelopment;
  };

  /**
   * @param {Number} timeEstimateHomologation
   */
   set timeEstimateHomologation (timeEstimateHomologation) {
    this.#timeEstimateHomologation = timeEstimateHomologation;
  };

  get timeEstimateHomologation () {
    return this.#timeEstimateHomologation;
  };

  /**
   * @param {Number} remainingWorkHomologation
   */
   set remainingWorkHomologation (remainingWorkHomologation) {
    this.#remainingWorkHomologation = remainingWorkHomologation;
  };

  get remainingWorkHomologation () {
    return this.#remainingWorkHomologation;
  };

  /**
   * @param {Number} spentWorkHomologation
   */
   set spentWorkHomologation (spentWorkHomologation) {
    this.#spentWorkHomologation = spentWorkHomologation;
  };

  get spentWorkHomologation () {
    return this.#spentWorkHomologation;
  };

};

module.exports = WorkItem;