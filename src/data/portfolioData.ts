export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai' | 'web' | 'coding';
  categoryLabel: string;
  image: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  architectureHighlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  codeSnippet?: { language: string; code: string };
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export const PORTFOLIO_DATA = {
  name: "Venkat Reddy Vaddi",
  title: "CSE (AI & ML) Student · Aspiring Software Engineer",
  institution: "NIAT X Joy University",
  degree: "B.Tech in Computer Science and Engineering (AI & ML)",
  email: "venkatvaddi1329@gmail.com",
  location: "Joy University Campus / Open for Internships",
  bio: "Computer Science & Engineering student specializing in Artificial Intelligence and Machine Learning at NIAT X Joy University. Enthusiastic beginner programmer building solid foundations in Python, Data Structures, Web Development, and foundational Machine Learning models.",
  stats: [
    { label: "Institution", value: "NIAT X Joy Univ" },
    { label: "Degree Track", value: "B.Tech CSE" },
    { label: "Specialization", value: "AI & ML" },
    { label: "Coding Focus", value: "Python & Web" },
  ],
  projects: [
    {
      id: "ai-disease-classifier",
      title: "LeafScan AI",
      subtitle: "Plant Leaf Health Classifier using Computer Vision",
      category: "ai",
      categoryLabel: "AI & Machine Learning",
      image: "/src/assets/images/project_ai_workflow_1794286007453.jpg",
      description: "A machine learning project built with Python and Scikit-learn to classify healthy vs. diseased plant leaves from image datasets.",
      problem: "Farmers and gardeners often struggle to diagnose early crop leaf blight without agricultural expert assistance.",
      solution: "Developed an image preprocessing and feature extraction pipeline with color histogram analysis and trained a Random Forest / CNN classifier.",
      impact: "Achieved 89.4% classification accuracy on test dataset of 2,400 leaf samples with real-time prediction output.",
      metrics: [
        { label: "Model Accuracy", value: "89.4%" },
        { label: "Dataset Size", value: "2,400 imgs" },
        { label: "Inference Time", value: "<120ms" }
      ],
      tags: ["Python", "OpenCV", "Scikit-Learn", "NumPy", "Matplotlib"],
      architectureHighlights: [
        "Feature extraction utilizing HSV color space and edge contours",
        "Data augmentation (rotation, flipping) to prevent model overfitting",
        "Interactive Python notebook with confusion matrix and precision/recall curves"
      ],
      githubUrl: "https://github.com/venkatvaddi/leafscan-ai",
      liveUrl: "#",
      codeSnippet: {
        language: "python",
        code: `# LeafScan AI Classifier Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import cv2, numpy as np

def extract_color_features(image_path):
    img = cv2.imread(image_path)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    hist = cv2.calcHist([hsv], [0, 1], None, [18, 25], [0, 180, 0, 256])
    return cv2.normalize(hist, hist).flatten()

# Train Model on Extracted Features
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
clf = RandomForestClassifier(n_estimators=100, max_depth=12)
clf.fit(X_train, y_train)`
      }
    },
    {
      id: "algo-visualizer",
      title: "AlgoVision Web",
      subtitle: "Interactive Sorting & Search Algorithm Visualizer",
      category: "web",
      categoryLabel: "Web Development",
      image: "/src/assets/images/project_telemetry_1794286008262.jpg",
      description: "An educational web tool that animates sorting algorithms (Bubble Sort, Selection Sort, Merge Sort, Quick Sort) step-by-step with adjustable speed.",
      problem: "Understanding time complexity and pointer swaps in algorithms is challenging when reading static textbook code.",
      solution: "Created dynamic responsive canvas animations highlighting comparisons, swaps, and sorted partitions in real time.",
      impact: "Helped classmates and peer study groups understand Big-O space and time complexity visually.",
      metrics: [
        { label: "Algorithms Built", value: "6 Algos" },
        { label: "Visual Framerate", value: "60 FPS" },
        { label: "Step Accuracy", value: "100%" }
      ],
      tags: ["JavaScript", "HTML5 Canvas", "CSS3", "Algorithms", "DSA"],
      architectureHighlights: [
        "Asynchronous generator functions for pausing and stepping through sorting loops",
        "Color-coded state indicators (Comparing, Swapping, Sorted)",
        "Dynamic array size and speed sliders for customized exploration"
      ],
      githubUrl: "https://github.com/venkatvaddi/algovision-visualizer",
      liveUrl: "#",
      codeSnippet: {
        language: "javascript",
        code: `// Async Generator for Step-by-Step Bubble Sort
async function* bubbleSortVisualizer(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], array: [...arr] };
      }
    }
  }
}`
      }
    },
    {
      id: "campus-connect",
      title: "CampusConnect",
      subtitle: "Student Hub for Hackathons & Study Groups",
      category: "web",
      categoryLabel: "Web Development",
      image: "/src/assets/images/project_collaborative_1794286008652.jpg",
      description: "A clean, responsive web application for university students to discover campus workshops, form study squads, and share notes.",
      problem: "College announcements and peer project collaboration were scattered across unofficial chat groups without a unified board.",
      solution: "Designed a clean React & Tailwind interface with category filters, event countdowns, and a responsive bookmarking system.",
      impact: "Used as a collaborative prototype in university coursework for human-computer interaction and web basics.",
      metrics: [
        { label: "Component Count", value: "18+" },
        { label: "Mobile Responsive", value: "100%" },
        { label: "Load Time", value: "<0.8s" }
      ],
      tags: ["React", "Tailwind CSS", "JavaScript", "Local Storage", "Vite"],
      architectureHighlights: [
        "Component-driven layout with custom hooks for state persistence",
        "Responsive grid design ensuring seamless usability on mobile devices",
        "Form validation with clean user feedback alerts"
      ],
      githubUrl: "https://github.com/venkatvaddi/campus-connect",
      liveUrl: "#"
    },
    {
      id: "smart-grade-calculator",
      title: "SmartGPA & Attendance Planner",
      subtitle: "Academic Performance & Cutoff Calculator",
      category: "coding",
      categoryLabel: "Core Coding & Logic",
      image: "/src/assets/images/project_telemetry_1794286008262.jpg",
      description: "A Python and web-based utility that calculates semester CGPA, project grades, and predicts required attendance to meet target thresholds.",
      problem: "Students frequently miscalculate cumulative grade points and minimum lecture attendance required for semester exams.",
      solution: "Built a structured calculation engine supporting weighted credits, grade conversions, and safe absence forecasts.",
      impact: "Tested and utilized by over 40+ engineering classmates during semester examinations.",
      metrics: [
        { label: "Calculation Error", value: "0.0%" },
        { label: "Active Users", value: "40+ peers" },
        { label: "Subjects Handled", value: "Up to 12" }
      ],
      tags: ["Python", "Flask / JS", "SQLite", "Data Logic"],
      architectureHighlights: [
        "Modular mathematical calculation functions with edge-case unit testing",
        "Persistent local data storage for semester history",
        "Instant visual indicators for attendance safety zones (>75%)"
      ],
      githubUrl: "https://github.com/venkatvaddi/smart-gpa-calculator"
    },
    {
      id: "py-data-insights",
      title: "PyData Exploratory Suite",
      subtitle: "Student Performance & Dataset Statistical Analyzer",
      category: "ai",
      categoryLabel: "AI & Machine Learning",
      image: "/src/assets/images/project_ai_workflow_1794286007453.jpg",
      description: "Exploratory data analysis (EDA) scripts analyzing real-world student exam metrics, correlation matrices, and distribution charts.",
      problem: "Raw CSV data tables make it difficult to identify academic trends and subject correlations.",
      solution: "Implemented automated Python data cleaning, missing value handling, and generated publication-ready statistical charts.",
      impact: "Demonstrated early data science proficiency in university lab assessments.",
      metrics: [
        { label: "Data Records", value: "5,000+" },
        { label: "Charts Generated", value: "12 Plots" },
        { label: "Cleaning Speed", value: "<1.5s" }
      ],
      tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
      architectureHighlights: [
        "Automated handling of outliers and missing values with statistical imputations",
        "Seaborn correlation heatmaps and box-plot distributions",
        "Detailed markdown documentation explaining statistical findings"
      ],
      githubUrl: "https://github.com/venkatvaddi/pydata-insights"
    }
  ] as Project[],
  experiences: [
    {
      period: "2024 — Present",
      role: "B.Tech Student in CSE (AI & ML)",
      company: "NIAT X Joy University",
      location: "Joy University Campus",
      summary: "Pursuing undergraduate engineering degree with focused coursework in Computer Science, Artificial Intelligence, and Machine Learning.",
      achievements: [
        "Active member of the University Coding and Technical Club, participating in weekly programming challenges.",
        "Consistently securing top grades in foundational programming labs (Python, C Programming, and Data Structures).",
        "Collaborating on peer group mini-projects applying Python and basic web development to real campus problems."
      ],
      technologies: ["Python", "C Language", "Data Structures", "HTML5", "CSS3", "JavaScript", "Git"]
    },
    {
      period: "2024",
      role: "AI & Machine Learning Foundation Track",
      company: "NIAT Academic Training",
      location: "Academic Coursework",
      summary: "Hands-on intensive learning program covering mathematical fundamentals for machine learning, linear algebra, and data science libraries.",
      achievements: [
        "Completed hands-on modules in NumPy array operations, Pandas dataframe manipulations, and data visualization with Matplotlib.",
        "Implemented foundational algorithms from scratch including Linear Regression, KNN (K-Nearest Neighbors), and Decision Trees.",
        "Built and documented multiple mini-projects published on GitHub with clean README walkthroughs."
      ],
      technologies: ["Python", "NumPy", "Pandas", "Scikit-Learn", "Matplotlib", "Jupyter Notebooks"]
    },
    {
      period: "2023 — 2024",
      role: "Computer Science Foundations & Problem Solving",
      company: "Academic Milestones",
      location: "Joy University",
      summary: "Mastered fundamental computer science principles, algorithmic thinking, and object-oriented programming.",
      achievements: [
        "Solved 100+ basic algorithmic problems covering arrays, strings, searching, and recursion.",
        "Learned version control with Git and created structured open-source project repositories.",
        "Created first responsive static websites using modern HTML5, CSS Flexbox, and JavaScript."
      ],
      technologies: ["C", "Python", "Data Structures", "Algorithms", "Git & GitHub"]
    }
  ] as ExperienceItem[],
  philosophies: [
    {
      title: "Strong Foundations First",
      description: "Mastering fundamental data structures, memory basics, and core algorithmic complexity is the bedrock before jumping into complex frameworks."
    },
    {
      title: "Learn by Building Real Projects",
      description: "Theory is cemented when writing actual code. I turn lecture concepts into working tools—from algorithm visualizers to machine learning classifiers."
    },
    {
      title: "Clean Code & Documentation",
      description: "Even beginner programs deserve clean formatting, meaningful variable names, and clear README guides that anyone can clone and run."
    },
    {
      title: "Curiosity for AI & Machine Learning",
      description: "Fascinated by how mathematical models extract patterns from data. Committed to growing from classical ML into deep learning and neural systems."
    }
  ],
  skillCategories: [
    {
      title: "Programming Languages",
      description: "Core languages learned and used in university coursework and hands-on coding.",
      skills: ["Python", "C Language", "JavaScript", "Java (Basics)", "SQL (Basics)", "HTML5 & CSS3"]
    },
    {
      title: "AI & Machine Learning (Learning)",
      description: "Foundational libraries and concepts being studied in the AIML curriculum.",
      skills: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib & Seaborn", "Linear Regression", "KNN & Decision Trees", "Jupyter Notebooks", "Basic Computer Vision (OpenCV)"]
    },
    {
      title: "Web Development (Beginner)",
      description: "Building responsive, modern user interfaces and client-side web applications.",
      skills: ["React (Fundamentals)", "Tailwind CSS", "JavaScript ES6+", "DOM Manipulation", "Vite", "Responsive Design", "Local Storage APIs"]
    },
    {
      title: "Tools & Computer Science Basics",
      description: "Essential developer tooling and foundational computer science subjects.",
      skills: ["Git & GitHub", "VS Code", "Linux Command Line (Basics)", "Data Structures (Arrays, Lists, Stacks)", "Object-Oriented Programming (OOP)", "Big-O Time Complexity"]
    }
  ] as SkillCategory[]
};
