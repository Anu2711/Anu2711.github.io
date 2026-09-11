/* Company marks, in order of preference:
     logo:   "assets/logos/babylist.svg"  — your own file (do this before launch)
     domain: "babylist.com"               — pulls the company favicon via Google's service
     neither                              — a monogram chip from the company name        */
const EXPERIENCE = [
  {
    year:"2026", range:"Sept 2026 – present", current:true, start:"2026-09", end:null, type:"full",
    role:"Analytics Engineer", company:"Stake", domain:"getstake.com",
    bullets:[
      "[What you're building at Stake — add one or two bullets once there's something concrete to say.]",
    ],
    metrics:[],
  },
  {
    year:"2024", range:"Sept 2024 – Sept 2026", start:"2024-09", end:"2026-09", type:"full",
    role:"Data Scientist", company:"Network International", domain:"network.ae",
    bullets:[
      "Go-to analytics partner for cross-functional stakeholders. Built an end-to-end scheme non-compliance fee pipeline from messy weekly reports into a self-serve, org-wide dashboard, then worked directly with merchants to eliminate avoidable fees.",
      "Designed data models and a next-best-action recommendation engine for issuers on Databricks and MLflow, combining predictive models with rule-based heuristics to surface targeted insights and flag at-risk accounts.",
    ],
    metrics:[ ["$500K","annual savings"], ["40%","month-over-month cost reduction"] ],
    note:"the one I'm proudest of",
  },
  {
    year:"2023", range:"Sept – Dec 2023", start:"2023-09", end:"2023-12", type:"coop",
    role:"Data Scientist Co-op", company:"Babylist", domain:"babylist.com",
    bullets:[
      "Built self-serve dashboards and data models in Sigma with SHAP-based monitoring on SageMaker, surfacing feature drift through dbt models.",
      "Partnered with Product and merchandising on a coast-to-coast consumer affinity analysis that informed Q4 merchandising strategy.",
      "Engineered new features for the outbound shipment cost model.",
    ],
    metrics:[ ["~30%","less model debugging time"], ["~15%","lower prediction error"] ],
  },
  {
    year:"2023", range:"May – Sept 2023", start:"2023-05", end:"2023-09", type:"coop",
    role:"Data Engineer Co-op", company:"Babylist", domain:"babylist.com",
    bullets:[
      "Built and maintained dbt models and ELT pipelines feeding Snowflake; overhauled the dbt pre-commit validation pipeline.",
      "Migrated ELT pipelines from Astronomer's native Kubernetes clusters to AWS EKS.",
      "Led a Permifrost to Terraform migration for all Snowflake RBAC, removing manual permission management.",
      "Automated AppsFlyer ingestion into Snowflake with a production Airflow DAG for daily attribution reporting.",
    ],
    metrics:[ ["10×","faster commits (300s to 30s)"], ["$500/mo","infra cost removed"] ],
    note:"nobody likes waiting on pre-commit",
  },
  {
    year:"2022", range:"Sept – Dec 2022", start:"2022-09", end:"2022-12", type:"coop",
    role:"Data Engineer Co-op", company:"RideCo, Transit Labs", domain:"rideco.com",
    bullets:[
      "Redesigned a per-client reporting pipeline for NTD report generation, powering live operational reports used daily by analysts.",
      "Built PostgreSQL pipelines for day-to-day business reporting.",
      "Developed walking-distance models with sub-meter accuracy for finer-grained ridership reporting.",
    ],
    metrics:[ ["4×","faster reports (20s to 5s)"], ["~3 h/mo","analyst time saved"] ],
  },
  {
    year:"2022", range:"Sept 2022 – April 2023", start:"2022-09", end:"2023-04", type:"other",
    role:"Technical Project Manager", company:"WAT.ai", domain:"watai.ca",
    bullets:[
      "Delivered deep learning benchmarks comparing Python and Julia frameworks; implemented an MLP on MNIST and ResNet-18 on CIFAR-10 in Flux.jl.",
    ],
    metrics:[ ["91%","ResNet-18 accuracy on CIFAR-10"] ],
  },
  {
    year:"2022", range:"Jan – April 2022", start:"2022-01", end:"2022-04", type:"coop",
    role:"Database Developer & Researcher Co-op", company:"SAP", domain:"sap.com",
    bullets:[
      "Prototyped a SAP HANA query rewrite engine that automatically leverages existing materialized views.",
    ],
    metrics:[ ["~40%","faster query execution on targeted workloads"] ],
  },
];
