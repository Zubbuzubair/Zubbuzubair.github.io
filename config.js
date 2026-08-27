/* ============================================================
   CONFIG.JS — Edit everything here. Nothing else needs to change.
   This is the only file you need to touch to make this your own.
   ============================================================ */

const PORTFOLIO_CONFIG = {

  /* ---------- Identity ---------- */
  name: "Alex Rivera",
  role: "Data Scientist · Data Analyst · Machine Learning Enthusiast",
  tagline: "Turning complex data into actionable insights, predictive models, and measurable business outcomes.",
  location: "Austin, TX",
  status: "Open to Data Science / Data Analytics Opportunities",
  avatarInitials: "AR",

  /* ---------- Links ---------- */
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:you@example.com",
    resume: "assets/resume.pdf"
  },

  /* GitHub username used for the live GitHub Intelligence panel */
  githubUsername: "octocat",

  /* ---------- Executive KPIs (hero strip) ---------- */
  kpis: [
    { label: "Projects Completed",    value: 42,  suffix: "" },
    { label: "Years of Experience",   value: 4,   suffix: "+" },
    { label: "Datasets Analyzed",     value: 130, suffix: "+" },
    { label: "ML Models Built",       value: 27,  suffix: "" },
    { label: "Problems Solved",       value: 58,  suffix: "" },
    { label: "GitHub Contributions",  value: 1840,suffix: "" }
  ],

  /* ---------- Analytics Profile (About) ---------- */
  profile: [
    { label: "Data Science",        value: 92 },
    { label: "Data Analytics",      value: 95 },
    { label: "Machine Learning",    value: 88 },
    { label: "Statistical Analysis",value: 85 },
    { label: "Data Visualization",  value: 93 },
    { label: "Business Intelligence", value: 80 }
  ],

  bio: "I'm a data scientist who treats every dataset as a question waiting for a rigorous answer. My work spans exploratory analysis, statistical modeling, and production ML — but the throughline is always the same: translate ambiguity into a decision someone can act on. I've partnered with product, marketing, and ops teams to turn raw logs and spreadsheets into forecasts, segments, and dashboards that changed what leadership decided to do next.",

  /* ---------- Skills ---------- */
  skills: {
    Programming: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 92 },
      { name: "R", level: 75 },
      { name: "JavaScript", level: 65 }
    ],
    "Data Science": [
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 90 },
      { name: "Scikit-learn", level: 90 },
      { name: "SciPy", level: 78 },
      { name: "TensorFlow", level: 72 },
      { name: "PyTorch", level: 68 }
    ],
    Visualization: [
      { name: "Power BI", level: 88 },
      { name: "Tableau", level: 84 },
      { name: "Matplotlib", level: 90 },
      { name: "Seaborn", level: 88 },
      { name: "Plotly", level: 82 }
    ],
    Databases: [
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 65 }
    ],
    Tools: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "Jupyter", level: 95 },
      { name: "VS Code", level: 90 },
      { name: "Docker", level: 60 }
    ]
  },

  /* ---------- Featured Projects ---------- */
  projects: [
    {
      title: "Customer Churn Prediction",
      category: "Classification",
      problem: "A subscription business was losing 6.8% of customers monthly with no early-warning system to flag at-risk accounts.",
      dataset: "50k customer records · 21 behavioral & billing features",
      methodology: "Feature engineering on usage recency/frequency, class-imbalance handling with SMOTE, model comparison across Logistic Regression, Random Forest, and XGBoost with stratified k-fold CV.",
      tech: ["Python", "Scikit-learn", "XGBoost", "Pandas"],
      metrics: [
        { label: "Accuracy", value: "91.2%" },
        { label: "Precision", value: "88.4%" },
        { label: "Recall", value: "85.7%" },
        { label: "F1 Score", value: "0.87" }
      ],
      findings: "Contract type and support-ticket frequency were the strongest churn predictors — flagging the top-decile risk score let the retention team cut monthly churn by 23%.",
      github: "https://github.com/yourusername/churn-prediction",
      demo: "#",
      chart: { type: "bar", data: [72, 79, 84, 88, 91] }
    },
    {
      title: "Sales Analytics Dashboard",
      category: "Business Intelligence",
      problem: "Regional sales leads had no unified view of revenue trends, customer segments, or performance against target.",
      dataset: "3 years of POS + CRM transaction history across 12 regions",
      methodology: "SQL data modeling into a star schema, DAX measures for YoY/MoM trend analysis, RFM-based customer segmentation surfaced in an interactive Power BI report.",
      tech: ["SQL", "Power BI", "DAX"],
      metrics: [
        { label: "Revenue Tracked", value: "$18.4M" },
        { label: "Regions", value: "12" },
        { label: "Refresh", value: "Daily" },
        { label: "Adoption", value: "94%" }
      ],
      findings: "Surfaced a 31% underperformance in the Southeast region tied to stockouts, prompting a supply-chain fix within a quarter.",
      github: "https://github.com/yourusername/sales-dashboard",
      demo: "#",
      chart: { type: "line", data: [40, 55, 48, 62, 70, 68, 80] }
    },
    {
      title: "House Price Prediction",
      category: "Regression",
      problem: "Buyers and agents lacked a data-driven estimate of fair market value beyond comparable-sales guesswork.",
      dataset: "12k residential sales · location, structural, and market features",
      methodology: "Extensive feature engineering (age, renovation, neighborhood price index), comparison of Linear, Ridge, and Gradient Boosting regressors, SHAP-based interpretability.",
      tech: ["Python", "Scikit-learn", "SHAP"],
      metrics: [
        { label: "R²", value: "0.91" },
        { label: "RMSE", value: "$18.2k" },
        { label: "MAE", value: "$12.7k" },
        { label: "Models Tested", value: "6" }
      ],
      findings: "Gradient Boosting outperformed linear baselines by 14 R² points; square footage and neighborhood index dominated feature importance.",
      github: "https://github.com/yourusername/house-price-prediction",
      demo: "#",
      chart: { type: "bar", data: [65, 71, 76, 83, 91] }
    },
    {
      title: "Customer Segmentation",
      category: "Unsupervised Learning",
      problem: "Marketing ran one-size-fits-all campaigns with no structural understanding of distinct customer groups.",
      dataset: "40k customers · purchase history, engagement, and demographic features",
      methodology: "Standardized features, dimensionality reduction with PCA, K-Means with elbow/silhouette validation to select cluster count, cluster profiling for actionable personas.",
      tech: ["Python", "Scikit-learn", "PCA", "K-Means"],
      metrics: [
        { label: "Clusters", value: "5" },
        { label: "Silhouette", value: "0.61" },
        { label: "Variance Explained", value: "82%" },
        { label: "Campaign Lift", value: "+19%" }
      ],
      findings: "Identified a high-value, low-frequency 'occasional big spender' segment overlooked by prior campaigns — a targeted push lifted conversion 19%.",
      github: "https://github.com/yourusername/customer-segmentation",
      demo: "#",
      chart: { type: "scatter", data: [[20,30],[35,45],[50,25],[65,60],[80,40],[45,70],[30,55]] }
    }
  ],

  /* ---------- Data Lab charts ---------- */
  dataLab: {
    revenueTrend: { labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"], values: [42,48,45,58,62,60,71,76] },
    customerGrowth: { labels: ["Q1","Q2","Q3","Q4"], values: [1200,1850,2400,3100] },
    churnRate: { labels: ["Jan","Feb","Mar","Apr","May","Jun"], values: [6.8,6.1,5.4,5.0,4.3,3.9] },
    modelAccuracy: { labels: ["Log. Reg.","Random Forest","XGBoost","SVM","Neural Net"], values: [79,86,91,82,88] },
    featureImportance: { labels: ["Tenure","Support Tickets","Contract Type","Monthly Charge","Usage Freq."], values: [0.28,0.24,0.21,0.16,0.11] },
    correlation: {
      labels: ["Tenure","Charges","Support","Usage","Contract"],
      matrix: [
        [1.00, 0.42, -0.35, 0.51, 0.38],
        [0.42, 1.00, -0.18, 0.33, 0.22],
        [-0.35, -0.18, 1.00, -0.29, -0.41],
        [0.51, 0.33, -0.29, 1.00, 0.47],
        [0.38, 0.22, -0.41, 0.47, 1.00]
      ]
    },
    segmentation: { labels: ["Champions","Loyal","At Risk","New","Occasional"], values: [28,24,18,17,13] },
    geographic: { labels: ["West","South","Midwest","Northeast","International"], values: [32,27,19,15,7] }
  },

  /* ---------- Experience Timeline ---------- */
  timeline: [
    {
      type: "work",
      date: "2023 — Present",
      org: "Meridian Analytics",
      role: "Data Scientist",
      points: [
        "Built and deployed 8 production ML models serving real-time predictions",
        "Led migration of reporting stack to a centralized Power BI semantic model",
        "Mentored 2 junior analysts on statistical rigor and experiment design"
      ]
    },
    {
      type: "work",
      date: "2021 — 2023",
      org: "Northwind Retail Co.",
      role: "Data Analyst",
      points: [
        "Owned weekly revenue and inventory reporting for a $40M product line",
        "Automated ETL pipelines, cutting reporting turnaround from 3 days to 4 hours",
        "Partnered with marketing on segmentation driving a 12% lift in campaign ROI"
      ]
    },
    {
      type: "internship",
      date: "Summer 2020",
      org: "Cascade Insurance Group",
      role: "Data Analytics Intern",
      points: [
        "Built claims-anomaly detection scripts flagging 3x more outliers than manual review",
        "Presented findings to senior actuaries, informing a policy pricing review"
      ]
    },
    {
      type: "education",
      date: "2017 — 2021",
      org: "University of Texas at Austin",
      role: "B.S. in Statistics & Data Science",
      points: [
        "Concentration in Machine Learning · GPA 3.8",
        "Capstone: predictive maintenance modeling for campus HVAC systems"
      ]
    }
  ],

  /* ---------- Certifications ---------- */
  certifications: [
    {
      name: "Google Data Analytics Professional Certificate",
      issuer: "Google",
      date: "2022",
      id: "GDA-88291",
      url: "#"
    },
    {
      name: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2023",
      id: "TFD-45102",
      url: "#"
    },
    {
      name: "Microsoft Certified: Power BI Data Analyst Associate",
      issuer: "Microsoft",
      date: "2022",
      id: "PL-300-9931",
      url: "#"
    },
    {
      name: "AWS Certified Machine Learning – Specialty",
      issuer: "Amazon Web Services",
      date: "2024",
      id: "AWS-ML-70214",
      url: "#"
    }
  ]
};
