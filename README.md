# Bot Discord com Slash Commands

Este é um bot Discord desenvolvido para responder a comandos usando comandos slash (slash commands) e interagir com a API GPT-3.5-turbo da OpenAI para gerar respostas a partir de mensagens de usuários.

## Pré-requisitos

Antes de executar o bot, você precisará ter as seguintes dependências instaladas:

- Node.js (versão 14 ou superior)
- Gerenciador de pacotes npm ou yarn
- Token do bot Discord (obtenha criando um bot no [portal de desenvolvedores do Discord](https://discord.com/developers/applications))
- Chave de API da OpenAI (obtenha se cadastrando na [OpenAI](https://beta.openai.com/signup/))

## Instalação

1. Clone este repositório para o seu computador local.

2. No diretório raiz do projeto, crie um arquivo `.env` e adicione as seguintes variáveis de ambiente:

```
TOKEN=seu_token_do_bot_discord
CLIENT_ID=seu_client_id_do_bot_discord
GUILD_ID=seu_guild_id
OPENAI_API_KEY=sua_chave_de_api_da_openai
```

Substitua `seu_token_do_bot_discord`, `seu_client_id_do_bot_discord`, `seu_guild_id` e `sua_chave_de_api_da_openai` pelas informações relevantes do seu bot Discord e chave de API da OpenAI.

3. Execute o seguinte comando para instalar as dependências:

```
npm install
```

ou

```
yarn install
```

## Executando o Bot

Para executar o bot, use o seguinte comando:

```
npm start
```

ou

```
yarn start
```

O bot estará online e pronto para responder a comandos slash no servidor Discord associado ao `GUILD_ID`.

## Comandos Slash

O bot possui o seguinte comando slash disponível:

- `/chatgpt` - Gera uma resposta usando o modelo GPT-3.5-turbo da OpenAI. O usuário deve fornecer uma mensagem como entrada.

## Limites de Taxa

O bot implementa um mecanismo de limitação de taxa para evitar atingir os limites da API da OpenAI e do Discord. Os limites de taxa são os seguintes:

- OpenAI API:
  - 3 RPM (Requisições por Minuto)
  - 40.000 TPM (Requisições por Minuto)

- Discord Slash Commands (Bots em Desenvolvimento):
  - 200 RPD (Requisições por Hora)
  - 5 RPM (Requisições por Minuto)

- Discord Slash Commands (Bots Públicos):
  - 2000 RPD (Requisições por Hora)
  - 50 RPM (Requisições por Minuto)

O bot implementa um mecanismo de espera exponencial para lidar com limites de taxa excedidos.

## Contribuindo

Se você quiser contribuir para este projeto, fique à vontade para abrir uma issue ou enviar um pull request. Vamos adorar receber contribuições para melhorar o bot!

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.
