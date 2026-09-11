/* Nodes for the hero graph. group: 0 warehouse, 1 orchestration, 2 ML, 3 BI, 4 languages
   hub:true = labelled + slightly larger. links refer to node ids. */
const GRAPH = {
  nodes:[
    {id:"Snowflake",g:0,hub:true},{id:"dbt",g:0,hub:true},{id:"PostgreSQL",g:0},{id:"Databricks",g:0},
    {id:"Airflow",g:1,hub:true},{id:"Terraform",g:1},{id:"AWS",g:1},{id:"Kubernetes",g:1},
    {id:"PyTorch",g:2,hub:true},{id:"MLflow",g:2},{id:"SageMaker",g:2},{id:"scikit-learn",g:2},{id:"PySpark",g:2},
    {id:"Sigma",g:3,hub:true},{id:"Power BI",g:3},{id:"Tableau",g:3},
    {id:"Python",g:4,hub:true},{id:"SQL",g:4,hub:true},{id:"R",g:4},{id:"Julia",g:4},
  ],
  links:[
    ["Snowflake","dbt"],["dbt","Airflow"],["Snowflake","PostgreSQL"],["Snowflake","Terraform"],["Databricks","MLflow"],
    ["Airflow","AWS"],["AWS","Kubernetes"],["Airflow","Python"],["dbt","SQL"],["Snowflake","SQL"],
    ["PyTorch","Python"],["MLflow","PyTorch"],["SageMaker","AWS"],["scikit-learn","Python"],["PySpark","Databricks"],
    ["Sigma","Snowflake"],["Sigma","dbt"],["Power BI","SQL"],["Tableau","SQL"],
    ["R","scikit-learn"],["Julia","PyTorch"],["Python","SQL"],["Databricks","Snowflake"],
  ],
};
