<h1 style="color:purple">🤖 Bot Discord com Slash Commands</h1>

<p style="color:green">
Este é um bot Discord desenvolvido para <strong>responder a comandos</strong> usando comandos slash (slash commands) e interagir com a API GPT-3.5-turbo da OpenAI para <em>gerar respostas</em> a partir de mensagens de usuários.
</p>

<h2 style="color:purple">Pré-requisitos</h2>

<p style="color:green">
Antes de executar o bot, você precisará ter as seguintes dependências instaladas:

- Node.js (versão 14 ou superior)
- Gerenciador de pacotes npm ou yarn
- Token do bot Discord (obtenha criando um bot no <a href="https://discord.com/developers/applications" style="color:green">portal de desenvolvedores do Discord</a>)
- Chave de API da OpenAI (obtenha se cadastrando na <a href="https://beta.openai.com/signup/" style="color:green">OpenAI</a>)
</p>

<h2 style="color:purple">Instalação</h2>

<p style="color:green">
1. Clone este repositório para o seu computador local.

2. No diretório raiz do projeto, crie um arquivo <code>.env</code> e adicione as seguintes variáveis de ambiente:
</p>

<pre style="background-color:purple; color:white; padding:10px;">
TOKEN=seu_token_do_bot_discord
CLIENT_ID=seu_client_id_do_bot_discord
GUILD_ID=seu_guild_id
OPENAI_API_KEY=sua_chave_de_api_da_openai
</pre>

<p style="color:green">
Substitua <code>seu_token_do_bot_discord</code>, <code>seu_client_id_do_bot_discord</code>, <code>seu_guild_id</code> e <code>sua_chave_de_api_da_openai</code> pelas informações relevantes do seu bot Discord e chave de API da OpenAI.
</p>

<p style="color:green">
3. Execute o seguinte comando para instalar as dependências:
</p>

<pre style="background-color:purple; color:white; padding:10px;">
npm install
</pre>

<p style="color:green">
ou
</p>

<pre style="background-color:purple; color:white; padding:10px;">
yarn install
</pre>

<h2 style="color:purple">Executando o Bot</h2>

<p style="color:green">
Para executar o bot, use o seguinte comando:
</p>

<pre style="background-color:purple; color:white; padding:10px;">
npm start
</pre>

<p style="color:green">
ou
</p>

<pre style="background-color:purple; color:white; padding:10px;">
yarn start
</pre>

<p style="color:green">
O bot estará online e pronto para responder a comandos slash no servidor Discord associado ao <code>GUILD_ID</code>.
</p>

<h2 style="color:purple">Comandos Slash</h2>

<p style="color:green">
O bot possui o seguinte comando slash disponível:

- <code>/chatgpt</code> - Gera uma resposta usando o modelo GPT-3.5-turbo da OpenAI. O usuário deve fornecer uma mensagem como entrada.
</p>

<h2 style="color:purple">Limites de Taxa</h2>

<p style="color:green">
O bot implementa um mecanismo de limitação de taxa para evitar atingir os limites da API da OpenAI e do Discord. Os limites de taxa são os seguintes:
</p>

<ul style="color:green">
  <li>OpenAI API:</li>
  <ul style="color:green">
    <li>3 RPM (Requisições por Minuto)</li>
    <li>40.000 TPM (Requisições por Minuto)</li>
  </ul>
  <li>Discord Slash Commands (Bots em Desenvolvimento):</li>
  <ul style="color:green">
    <li>200 RPD (Requisições por Hora)</li>
    <li>5 RPM (Requisições por Minuto)</li>
  </ul>
  <li>Discord Slash Commands (Bots Públicos):</li>
  <ul style="color:green">
    <li>2000 RPD (Requisições por Hora)</li>
    <li>50 RPM (Requisições por Minuto)</li>
  </ul>
</ul>

<p style="color:green">
O bot implementa um mecanismo de espera exponencial para lidar com limites de taxa excedidos.
</p>

<h2 style="color:purple">Contribuindo</h2>

<p style="color:green">
Se você quiser contribuir para este projeto, fique à vontade para abrir uma issue ou enviar um pull request. Vamos adorar receber contribuições para melhorar o bot!
</p>

<h2 style="color:purple">Licença</h2>

<p style="color:green">
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo <a href="LICENSE" style="color:green">LICENSE</a> para obter mais detalhes.
</p>
