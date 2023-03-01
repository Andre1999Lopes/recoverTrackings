Script para recuperar trackings a partir do JSON de um chatbot.

Recebe dois argumentos de linha de comando, sendo o primeiro o nome do arquivo do bot e o segundo o nome do arquivo que será criado com as ações. Há um terceiro parâmetro opcional que é o tipo de ação desejada. Atualmente, o script suporta as seguintes ações:
- tracking: Recuperar os trackings do bot.
- merge: Recuperar as definições de contatos do bot.

Caso o parâmetro de ação não seja passado, o script irá recuperar os trackings.

Exemplo de uso: `node recoverTrackings.js nomeBot.json nomeBotTrackings.json tracking`
