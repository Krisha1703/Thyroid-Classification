// Replace this URL with your actual CSV image or keep placeholder
export const csvIconURL = '/csv.png'
// Constants for animation and pipeline
export const PACKET_COUNT = 30; // Number of packets circulating
export const STREAM_SPEED = 0.01; // Speed of packet progress (0 to 1 per frame)



export const PHASES_MODELS = ['rf', 'dt', 'svm', 'xgb'];


// Colors for different nodes and packets
export const colors = {
  root: '#2563eb',      
  pipeline: '#6b7280',   
  test: '#00B4D8',      
  adasyn: '#f97316',    
  scaling: '#10b981',   
  selectkbest: '#8b5cf6',
  calibration: '#ef4444',
  train: '#3b82f6',      
  model: '#4b5563',      
  evaluate: '#4CAF50',  
  rf: '#2A9D8F',
  dt: '#E76F51',
  svm: '#F9C74F',
  xgb: '#B5179E',
};

// Positioning of nodes in vertical layout (top to bottom)
export const nodes = {
  root: { x: 280, y: 20 },
  split: { x: 280, y: 100 },
  testBranch: { x: 100, y: 220 },
  testEnd: { x: 100, y: 320 },
  trainStages: [
    { x: 280, y: 170, name: 'adasyn' },
    { x: 280, y: 240, name: 'scaling' },
    { x: 280, y: 320, name: 'selectkbest' },
    { x: 280, y: 400, name: 'calibration' },
  ],
  models: [
    { x: 460, y: 200, name: 'rf' },
    { x: 520, y: 240, name: 'dt' },
    { x: 580, y: 300, name: 'svm' },
    { x: 640, y: 350, name: 'xgb' },
  ],
};

export const nodeDescriptions = {
  root: "📥 Root Node: This is where your CSV file (containing all the data) enters the system.",
  
  split: "🔀 Data Split: The data is divided into two parts — one for training the model, and another for testing it later. This helps us check how well the model learns and generalizes.",
  
  train: "🎓 Train Branch: This part of the data is used to teach the model how to recognize patterns and make predictions.",
  
  test: "🧪 Test Branch: This set is kept aside and only used at the end to see how well the trained model performs on new, unseen data.",
  
  evaluate: "📊 Evaluation: After training and testing, the model's accuracy and performance are calculated and shown here.",

  adasyn: "⚖️ ADASYN (Balancing): Sometimes we have more examples of one type than another (e.g., more 'benign' than 'malignant'). This step creates synthetic examples to balance things out, so the model doesn’t become biased.",
  
  scaling: "📏 Feature Scaling: Adjusts the values in your dataset so that all features are on a similar scale. This helps the model learn better and faster.",
  
  selectkbest: "🧠 SelectKBest (Feature Selection): From all available features, this step picks the most important ones — the ones that really help the model make decisions.",
  
  calibration: "🛠️ Calibration: This step fine-tunes how confident the model is in its predictions, making the probability scores more trustworthy.",
  
  rf: "🌲 Random Forest: A group of decision trees that work together. It combines their results to make better and more stable predictions.",
  
  dt: "🌳 Decision Tree: A simple model that asks yes/no questions about the data to make a decision — like a flowchart.",
  
  svm: "📐 SVM (Support Vector Machine): This model draws a boundary between classes in the data. It tries to separate them as clearly as possible.",
  
  xgb: "⚡ XGBoost: An advanced model that builds several small models one after another, each one learning from the previous. It’s powerful and often very accurate.",
};


