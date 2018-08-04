
let restorePrevContents = (currentTree) => {
  return currentTree.previousTree.pop();
};

module.exports = restorePrevContents;