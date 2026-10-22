# Flora Bambini — e-commerce

<!-- leanwork-context:start -->

## Resumo

Loja online de uma marca local de produtos naturais para mães e bebês, que substitui a venda
manual por WhatsApp. Atende uma única cidade, com entrega própria, menos de 100 produtos e até
~50 pedidos por mês. É operada por uma administradora e mantida por um desenvolvedor só:
simplicidade operacional vale mais que flexibilidade, e escalabilidade não dirige decisão nenhuma.

## Stack

- **Backend:** ASP.NET Core MVC, .NET 10, views Razor renderizadas no servidor; projeto único em `src/FloraBambini.Web`
- **Frontend:** não aplicável — sem SPA; JavaScript só para interações pontuais
- **Banco:** SQL Server via EF Core 10 Code First; LocalDB em desenvolvimento e teste; Azure SQL Database (tier Basic) em produção (previsto)
- **Infra:** Azure App Service B1 e Azure Blob Storage para imagens; Azurite em desenvolvimento (previsto, ainda não implementado — ADR-002)
- **Testes:** xUnit, com `WebApplicationFactory` para rotas e telas; projeto em `tests/FloraBambini.Tests`

## Comandos

Todos rodam da raiz do repositório.

```bash
# Build
dotnet build

# Testes — exigem SQL Server LocalDB; cada classe de integração cria e apaga o próprio banco
dotnet test

# Rodar local — exige a connection string `Loja` em user secrets (README, "Rodando localmente")
dotnet run --project src/FloraBambini.Web

# Migrations — a pasta de saída não é a padrão do EF
dotnet ef migrations add <Nome> --project src/FloraBambini.Web --output-dir Dados/Migrations
dotnet ef database update --project src/FloraBambini.Web
```

<!-- TODO: nenhum comando de lint/format configurado — não há `.editorconfig` nem analisador no repositório -->

## Convenções

- Monolito único, organizado por módulo de negócio (`Catalogo`, `Clientes`, `Pedidos`, `Entrega`, `Pagamento`, `Conteudo`), cada um com seus controllers, views, serviços e entidades; nunca por tipo técnico nem em projetos por camada (ADR-001)
- Loja na raiz e painel na `Area` `Admin`; o perfil `Admin` é exigido por política aplicada à área inteira, não por atributo em cada controller (ADR-001, ADR-004)
- Sem API pública e sem SPA (ADR-001)
- Views ficam em `<Modulo>/Loja/Views` e `<Modulo>/Admin/Views`; o módulo sai do namespace do controller. View usada por mais de um módulo (layout, view component) vai em `Compartilhado/Views`: a pasta `Shared` de um módulo não é vista pelos outros (ADR-001)
- EF Core direto no `DbContext`, sem repositório genérico por cima; o esquema muda só por migration (ADR-002)
- Imagens vão para o Blob Storage, nunca para `wwwroot` nem para o disco da aplicação (ADR-002)
- Dinheiro é `decimal` de ponta a ponta, nunca ponto flutuante; só a fronteira com o gateway converte para centavos inteiros (ADR-003)
- Nada que chega de fora muda o estado de um pedido: webhook e retorno do navegador só disparam a consulta ativa ao gateway (ADR-003)
- Autenticação é do ASP.NET Core Identity; não escrever hash, sessão ou token próprios (ADR-004)
- Cálculo de frete fica atrás de uma abstração; o checkout não conhece a regra de faixa de CEP (ADR-005)
- Sem fila e sem worker separado: rotina periódica é serviço hospedado no próprio processo, retomável a partir do estado do banco (ADR-006)
- Produto tem versão de linha e concorrência otimista; transição de estado do pedido é validada no domínio, não na tela (ADR-007)
- Carrinho não guarda preço nem reserva estoque (ADR-008)
- A árvore de categorias é lida em memória com cache; toda escrita que a afeta invalida o cache (ADR-010)
- Código de domínio em português, com o vocabulário do PRD (`Categoria`, `Produto`, `ServicoDeCategorias`) — premissa do PLAN-001
- Regra de negócio violada volta como `Resultado` com campo e mensagem, não como exceção — premissa do PLAN-001
- Testes de cenário do PRD são nomeados `CA_XX_descricao_do_cenario` — premissa do PLAN-001
- Teste que sobe a aplicação usa `AplicacaoDeTeste` (ambiente `Testing`, que não lê user secrets); teste com banco usa `IClassFixture<BancoDeTeste>`
- Segredos e connection strings ficam fora do repositório (user secrets em desenvolvimento)

## Restrições

- ASP.NET Core MVC em .NET 10, com loja e painel no mesmo projeto
- Hospedagem em Azure App Service com Azure SQL Database; teto de aproximadamente R$ 100 por mês de infraestrutura, sem recurso de nuvem além de aplicação, banco e armazenamento
- Nenhum dado de cartão chega ao backend; o gateway é o InfinitePay, com checkout hospedado
- E-mail sai por SMTP; a cliente entra por código de uso único, sem senha
- O cadastro coleta só nome, e-mail, celular e endereço de entrega; não coletar CPF, gênero nem data de nascimento (LGPD)
- Venda restrita à cidade: CEP fora da área atendida é recusado
- Fora de escopo: nota fiscal, busca textual, aplicativo móvel, multi-loja, marketplace e integração com WhatsApp Business API

## Documentação

- **Arquitetura e ADRs:** `docs/architecture/proposta-arquitetural.md` — ADR-001 a ADR-010 no próprio documento, seção 5
- **PRDs:** `docs/prds/` — requisitos por feature (RN-XX, CA-XX)
- **SPEC-UI e protótipos:** `docs/prototype/` — telas (UI-XX) e protótipo navegável de cada PRD
- **Design de referência:** `docs/design/`
- **Planos:** `docs/plans/` — tarefas de execução (T-XX)
- **Reviews:** `docs/reviews/` — relatórios de review (R-XX)
- **Execução local:** `README.md`, seção "Rodando localmente"

## Como trabalhar neste projeto

Este projeto usa o pipeline SDD Leanwork. Antes de implementar qualquer feature:

1. Verifique se existe um plano em `docs/plans/PLAN-XXX-*.md`
2. Identifique a próxima tarefa pendente sem bloqueio: `Status: Pendente` e todas as tarefas de `Depende de:` com `Status: Concluído`
3. Leia a tarefa inteira, incluindo os campos `Implementa:`, `Valida:`, `Decisões base:` e `Telas:`
4. Abra os artefatos referenciados:
   - Regras de negócio (`RN-XX`) → o PRD indicado no cabeçalho do plano
   - Critérios de aceite (`CA-XX`) → seção Gherkin do mesmo PRD
   - Decisões arquiteturais (`ADR-XX`) → `docs/architecture/`
   - Telas (`UI-XX`) → a SPEC-UI indicada no cabeçalho do plano
5. Respeite os pontos de validação humana marcados no plano
6. Nomeie os testes conforme a convenção `CA_XX_*` para preservar rastreabilidade
7. Atualize o estado ao terminar: campo `Status:` da tarefa (`Pendente` → `Em andamento` → `Concluído`) e uma linha na tabela de Histórico de execução. O plano é a fonte de verdade do estado
8. Execute **uma tarefa por vez** e peça review antes de seguir para a próxima

> Com o plugin Leanwork SDD instalado, `/leanwork-execute` faz os passos 1 a 8 e `/leanwork-review T-XX` faz a revisão. Sem o plugin, seguir os passos manualmente.

<!-- leanwork-context:end -->

<!-- Conteúdo abaixo desta linha é mantido manualmente e não é alterado pela skill context-leanwork. -->
