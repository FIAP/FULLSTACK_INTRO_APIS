const express = require('express');
const k8s = require('@kubernetes/client-node');
const path = require('path');

const app = express();
const port = 3000;

const kubeconfig = new k8s.KubeConfig();
const kubeconfigPath = path.join(process.env.HOME, '.kube', 'config');
console.log('Carregando configuração do Kubernetes de:', kubeconfigPath);

try {
  kubeconfig.loadFromFile(kubeconfigPath);
  console.log('Configuração do Kubernetes carregada com sucesso.');
} catch (error) {
  console.error('Erro ao carregar a configuração do Kubernetes:', error.message);
  process.exit(1);
}

const k8sApi = kubeconfig.makeApiClient(k8s.CoreV1Api);

app.use(express.static('public'));

app.get('/pods', async (req, res) => {
  try {
    console.log('Tentando obter os pods...');
    const pods = await k8sApi.listNamespacedPod('default');
    console.log('Pods obtidos com sucesso:', pods.body);

    const formattedPods = pods.body.items.map(pod => ({
      name: pod.metadata.name,
      namespace: pod.metadata.namespace,
      nodeName: pod.spec.nodeName,
      podIP: pod.status.podIP,
      hostIP: pod.status.hostIP,
      phase: pod.status.phase,
      startTime: pod.status.startTime
    }));

    res.json(formattedPods);
  } catch (err) {
    console.error('Erro ao obter os pods:', err.message);
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
