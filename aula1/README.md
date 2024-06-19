# Kubernetes Node.js Pod Viewer

Este projeto é uma aplicação Node.js simples que lista os pods em execução em um cluster Kubernetes e os exibe em uma interface web. A aplicação utiliza a biblioteca `@kubernetes/client-node` para se comunicar com a API do Kubernetes e `express` para servir a interface web.

## Pré-requisitos

- Docker Desktop com Kubernetes habilitado
- Node.js (versão 14 ou superior)
- `kubectl` configurado e funcionando

## Instalação

1. Instale as dependências:

    ```sh
    npm install
    ```

## Configuração

1. Certifique-se de que o arquivo de configuração do Kubernetes (`kubeconfig`) está localizado em `~/.kube/config`.

2. Crie um pod de exemplo no Kubernetes aplicando o arquivo `pod-example.yaml`:

    ```sh
    kubectl apply -f pod-example.yaml
    ```

## Executar a Aplicação

1. Inicie o servidor Node.js:

    ```sh
    npm start
    ```

2. Abra um navegador e acesse `http://localhost:3000`.

3. Clique no botão "Listar Pods" para ver a lista de pods em execução no namespace `default`.


## Dependências

- `express`: Framework web para Node.js.
- `@kubernetes/client-node`: Cliente oficial do Kubernetes para Node.js.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).