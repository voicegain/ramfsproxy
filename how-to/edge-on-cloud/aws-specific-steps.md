# <a id="top"></a>AWS Specific Steps
Required Steps, AWS Provided documentation, and recommended best practices
----
**Overview:**
>* Create an AWS Kubernetes cluster with GPU’s and whitelist Voicegain IP's
>* Authorize Voicegain to authenticate by creating a Kubernetes Service Account

## <a id="toc"></a>Table of Contents
- [Step 1: Request GPUs from AWS](#step1)
- [Step 2: Create Cluster](#step2)
- [Step 3: Install Kubectl](#step3)
- [Step 4: Install and Configure awscli](#step4)
- [Step 5: Get kubeconfig](#step5)

## <a id="step1"></a>Step 1: Request GPUs from AWS
In order to use GPUs you must request a Quota increase for them from AWS
The types (P type, G type/ On-demand, Spot instances) that you require are dependent on your Organizations needs.  
AWS Link: [Instance Types](https://aws.amazon.com/ec2/instance-types/)

Be certain you are requesting them for the AWS Region you wish to run your cluster in.  
AWS Link: [EC2 Quota Requests](https://console.aws.amazon.com/servicequotas/home/services/ec2/quotas)

## <a id="step2"></a>Step 2: Create Cluster

AWS Link: [AWS Current Guide for Kubernetes Cluster creation](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html)  
AWS Link: [Creating Amazon EKS Cluster Role](https://docs.aws.amazon.com/eks/latest/userguide/service_IAM_role.html#create-service-role)  
![Create Cluster](./AWS-1a.png)

When you reach the "Cluster endpoint access" card in Cluster Creation; it is required that the API server enpoint is Publically and Privately available, 
however it is recommended that you limit access to your Organization's access IP and Voicegain's access IP. For security purposes this IP address is avaialble upon request. **Please contact Voicegain to receive the required Voicegain Access IP address.**

![Cluster endpoint access](./AWS-2a.png)

Afterward you will need to create nodegroups for your GPU Instasnces for the cluster
AWS Link: [Creating Amazon Node Group](https://docs.aws.amazon.com/eks/latest/userguide/create-managed-node-group.html)

## <a id="step3"></a>Step 3: Install Kubectl

Local system setup, install Kubectl following [these instructions from kubernetes website](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## <a id="step4"></a>Step 4: Install and Configure awscli

Install and configure awscli:

If using Python: 
<pre>
python -m pip install awscli --user
aws configure
</pre>
You can test for successful configuration with:
<pre>
aws eks list-clusters
</pre>

## <a id="step5"></a>Step 5: Get kubeconfig

Retreive kubernetes configuration file:
<pre>
aws eks update-kubeconfig --name YOUR_CLUSTER_NAME
</pre>
And test access with the following:  
<pre>
kubectl get nodes
</pre>

---
Goto: [top of document](#top)