# Thyroid Nodule Classification Using Machine Learning & Interactive Simulation

## Overview

This repository contains both the **original research project** and its **extended interactive simulation** version developed for the classification of thyroid nodules using advanced Machine Learning (ML), Deep Learning (DL), and a Hybrid modeling approach.

Originally submitted as a final year project for the **Bachelor of Engineering in Computer Engineering** at **King Mongkut's University of Technology Thonburi (KMUTT)**, this work is now extended into a user-friendly **online educational simulation tool** to facilitate broader accessibility, especially for non-technical users, clinicians, and medical researchers.

## Project Members

* **Ms. Suhani Mehta** (64070503483)
* **Ms. Krisha Botadara** (64070503484)

## Project Advisors

* **Dr. Jaturon Harnsomburana, Ph.D.** (Advisor)
* **Asst. Prof. Dr.-Ing Priyakorn Pusawiro, Ph.D.** (Co-Advisor)
* **Dr. Piyanit Wepulanon, Ph.D.** (Committee Member)
* **Dr. Aye Hninn Khine, Ph.D.** (Committee Member)

---

## 📘 Original Research Abstract

This research investigates ML, DL, and hybrid modeling approaches for classifying thyroid nodules using ultrasound images. Two datasets were used: DDTI (images + clinical metadata) and TR12345 (TIRADS-labeled images from KMUTT). The models implemented include:

* ML on clinical metadata
* DL (custom CNNs)
* Hybrid DL feature extraction + ML classifier

The hybrid approach supports both binary (benign/malignant) and multiclass (TIRADS) classification.

> **Keywords**: medical imaging, ultrasound, machine learning, deep learning, thyroid nodules, TIRADS, hybrid model

---

## 🎯 Objectives

- Evaluate ML, DL, and hybrid models for thyroid classification

- Compare performance across models using TIRADS score

- Design a custom CNN for binary classification (benign vs malignant)

- Utilize pre-trained models for hybrid model

- Test models on two distinct datasets (DDTI and TR12345)

- Assess model generalizability and robustness

- Provide insights for future AI applications in medical imaging

## 🌐 Interactive Simulation Platform

An extended simulation platform was built using **Next.js, TailwindCSS, Framer Motion**, and **SVG-based animations** to visually represent each stage of the pipeline. This simulation aims to make the research process **interactive and understandable** for a wider audience.

![Simulation Home Page](/public/home-page.png)
*Landing page of the simulation platform*

### 🌟 Key Features

* Dataset upload & visualization
* Preprocessing pipeline: feature extraction, encoding, normalization, PCA
* Hybrid model pipeline simulation (DL feature extraction + ML classification)

    ![Hybrid Workflow](/public/hybrid-workflow.png)
    *Hybrid feature extraction and classification pipeline*
    
    ![Hybrid Preprocessing Pipeline](/public/hybrid-preprceesing-step.png)
    *Feature preprocessing steps visualized in the simulation*

    ![ML Model Training Animation](/public/ml-model-training.png)
    *Animated model training visualization for RF, DT, SVM, XGB*

* Animated training pipeline for RF, DT, SVM, XGB
* Binary & multiclass classification options
* Result metrics visualization
* User feedback integration via Google Forms

> 📌 Explore the simulation here: [Interactive Platform](https://thyroid-classification.vercel.app)

---

## 🧠 Technologies Used

### ML/DL Modeling

* Python, Scikit-learn, TensorFlow/Keras
* VGG16, EfficientNetB0, Decision Tree (DT), Support Vector Machine (SVM), Random Forest (RF), XGBoost (XGB)

### Web Platform

* **Frontend**: Next.js, TailwindCSS, Framer Motion
* **Animation & SVG**: Custom SVG pipelines and motion-based visualization

---

## 🧪 Datasets Used

1. **DDTI Dataset**: Public ultrasound dataset with XML clinical metadata
2. **TR12345 Dataset**: KMUTT-provided dataset with TIRADS labeled images

---

## 📊 Model Performance (Highlights)

![Best Performing Model](/public/best-model.png)
*Best model performance comparison chart*

![Hybrid Model Results](/public/hybrid-result.png)
*Classification report and confusion matrix from hybrid model*

![Binary Classification (DDTI)](/public/ddti-binar-result.png)
*DDTI dataset binary classification performance*


* Hybrid model outperforms pure ML/DL in interpretability and class-level precision

---

## 📁 Project Report and Artifacts

You can view the complete project report, and related artifacts via Google Drive:

> 📄 [Click here to access the Drive folder](https://drive.google.com/drive/folders/1D4IArTiPzwnePuxgoDzB4Tdu4JliC80R?usp=sharing)

---

## 🔍 How to Run Locally (Simulation Platform)

```bash
git clone https://github.com/Krisha1703/Thyroid-Classification.git
cd thyroid-classification
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

---

## 📢 Feedback

Your feedback is highly appreciated to improve this research and simulation.

> 📝 [Click here to give feedback](https://forms.gle/ZznjZdozsHycEHLo6)

We also ask for:

* **Overall rating of the simulation experience**
* **Rating of the research methodology presented**

---

## 🙏 Acknowledgements

We sincerely thank our project advisors and committee members at KMUTT for their invaluable guidance and support throughout the research and simulation development journey.

---

## 📌 License

This project is licensed under the MIT License. See the LICENSE file for details.
