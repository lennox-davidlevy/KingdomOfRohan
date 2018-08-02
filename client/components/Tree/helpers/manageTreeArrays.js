
const fs = require('fs');
const pullDataFromCSV = require('./pullDataFromCSV.js');

const leaf = {
  title: 'name',
  src: 'path/to/img',
  author: 'name'
}

// const tree = {
//   data: [],
//   previousTree: [],
//   currentTree: {
//     currentSelection: data[0],
//     subA: data[1],
//     subB: data[2],
//     subA_branch1: [data[3],data[4],data[5]],
//     subA_branch2: [data[6],data[7],data[8]],
//     subB_branch1: [data[9],data[10],data[11]],
//     subB_branch2: [data[12],data[13],data[14]]
//   }
// }

const generateFreshTreeContent = (mood, targetItem) => {
  // get mood resources form CSV files
  // build tree
    // randomize 14 selections into data array
    // fill tree with those items
  // return tree

};

const regenerateTreeContent = (mood, targetItem, tree) => {
  // get mood resources form CSV files
  // build tree 
    // push old tree into previous category


};

module.exports = { generateFreshTreeContent, regenerateTreeContent };