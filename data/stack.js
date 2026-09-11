/* slug = Simple Icons id (https://simpleicons.org), and must have a matching pair of
   files in assets/icons/<slug>-ink.svg and -brand.svg (see js/render.js). Omit slug, or
   use one with no local file, and the chip renders as a monogram — nothing breaks.
   dbt, Astronomer, AWS and Tableau have no Simple Icons mark (removed from the library),
   so they're intentionally left without a slug. */
const STACK = [
  { name:"Warehousing & modelling", items:[["Snowflake","snowflake"],["dbt"],["PostgreSQL","postgresql"],["Databricks","databricks"]] },
  { name:"Orchestration & cloud",   items:[["Airflow","apacheairflow"],["Astronomer"],["AWS"],["Terraform","terraform"],["Kubernetes","kubernetes"],["Azure"]] },
  { name:"Languages",               items:[["Python","python"],["SQL"],["R","r"],["Julia","julia"],["C/C++","cplusplus"],["Bash","gnubash"]] },
  { name:"Machine learning",        items:[["PyTorch","pytorch"],["TensorFlow","tensorflow"],["scikit-learn","scikitlearn"],["MLflow","mlflow"],["SageMaker"],["PySpark","apachespark"],["Hugging Face","huggingface"]] },
  { name:"BI & analytics",          items:[["Sigma"],["Power BI"],["Tableau"]] },
  { name:"Also",                    items:[["Selenium","selenium"],["BeautifulSoup"],["Git","git"],["Docker","docker"]] },
];
